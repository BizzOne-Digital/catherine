import mongoose from "mongoose";
import { Binary } from "mongodb";
import connectDB from "@/lib/mongodb";
import StoredUpload, {
  UPLOAD_FOLDERS,
  type UploadFolder,
} from "@/models/StoredUpload";

export const MAX_UPLOAD_BYTES = Math.floor(4.5 * 1024 * 1024); // 4.5MB — Vercel body limit friendly

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export function uploadPublicUrl(folder: UploadFolder, filename: string) {
  return `/api/uploads/${folder}/${filename}`;
}

export function parseUploadUrl(
  url: string
): { folder: UploadFolder; filename: string } | null {
  if (!url?.startsWith("/api/uploads/")) return null;
  const parts = url.replace(/^\/api\/uploads\//, "").split("/");
  if (parts.length !== 2) return null;
  const [folder, rawName] = parts;
  let filename = rawName;
  try {
    filename = decodeURIComponent(rawName);
  } catch {
    /* keep raw */
  }
  if (!isUploadFolder(folder)) return null;
  if (
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    return null;
  }
  return { folder, filename };
}

function safeFilename(originalName: string, mimeType: string) {
  const fromName = originalName.split(".").pop()?.toLowerCase() || "";
  const ext = ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)
    ? fromName === "jpeg"
      ? "jpg"
      : fromName
    : EXT_BY_MIME[mimeType] || "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
}

function uploadsCollection() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB not connected");
  return db.collection("storeduploads");
}

/**
 * Normalize mongoose Buffer / BSON Binary / Uint8Array to a Node Buffer.
 */
export function toNodeBuffer(data: unknown): Buffer {
  if (data == null) return Buffer.alloc(0);

  if (Buffer.isBuffer(data)) {
    return data.length ? Buffer.from(data) : Buffer.alloc(0);
  }

  if (data instanceof Binary) {
    const u8 = data.buffer;
    return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength);
  }

  if (data instanceof Uint8Array) {
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  }

  if (data instanceof ArrayBuffer) {
    return Buffer.from(data);
  }

  if (typeof data === "object") {
    const o = data as {
      buffer?: unknown;
      data?: unknown;
      _bsontype?: string;
      value?: unknown;
      length?: number;
    };

    // BSON Binary-like (driver / mongoose)
    if (o._bsontype === "Binary" || typeof o.value === "function") {
      try {
        if (typeof o.value === "function") {
          const v = (o.value as (asRaw?: boolean) => unknown)(true);
          if (v instanceof Uint8Array || Buffer.isBuffer(v)) {
            return toNodeBuffer(v);
          }
        }
      } catch {
        /* fall through */
      }
    }

    if (o.buffer != null) {
      if (Buffer.isBuffer(o.buffer)) return Buffer.from(o.buffer);
      if (o.buffer instanceof Uint8Array) {
        const u8 = o.buffer;
        return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength);
      }
      if (o.buffer instanceof ArrayBuffer) {
        return Buffer.from(o.buffer);
      }
    }

    // Mongoose JSON form: { type: 'Buffer', data: number[] }
    if (Array.isArray(o.data)) {
      return Buffer.from(o.data as number[]);
    }
    if (o.data != null && o.data !== o) {
      return toNodeBuffer(o.data);
    }
  }

  throw new Error("Unsupported binary image payload from MongoDB");
}

export async function saveFolderUpload(
  file: File,
  folder: UploadFolder
): Promise<{ url: string; filename: string; folder: UploadFolder; size: number }> {
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, and GIF are allowed");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image must be under 4.5MB (try a smaller photo)");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!buffer.length) {
    throw new Error("Empty image file");
  }

  const filename = safeFilename(file.name || "image", file.type);
  const mimeType = file.type || "application/octet-stream";
  const now = new Date();

  await connectDB();

  // Native insert with explicit Binary — more reliable than mongoose Buffer on Vercel
  const col = uploadsCollection();
  await col.updateOne(
    { folder, filename },
    {
      $set: {
        folder,
        filename,
        mimeType,
        size: buffer.length,
        data: new Binary(buffer, Binary.SUBTYPE_DEFAULT),
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );

  // Verify bytes landed
  const verify = await col.findOne(
    { folder, filename },
    { projection: { size: 1, data: 1 } }
  );
  const stored = toNodeBuffer(verify?.data);
  if (!stored.length) {
    throw new Error("Upload saved but image bytes were empty — try again");
  }

  return {
    url: uploadPublicUrl(folder, filename),
    filename,
    folder,
    size: stored.length,
  };
}

export async function getStoredUpload(folder: UploadFolder, filename: string) {
  let name = filename;
  try {
    name = decodeURIComponent(filename);
  } catch {
    name = filename;
  }

  if (
    !name ||
    name.includes("..") ||
    name.includes("/") ||
    name.includes("\\") ||
    name.includes("%00")
  ) {
    return null;
  }

  await connectDB();

  // Native driver read — avoids mongoose Buffer hydration quirks
  const doc = await uploadsCollection().findOne(
    { folder, filename: name },
    { projection: { folder: 1, filename: 1, mimeType: 1, size: 1, data: 1 } }
  );
  if (!doc) return null;

  return {
    folder: doc.folder as UploadFolder,
    filename: doc.filename as string,
    mimeType: (doc.mimeType as string) || "application/octet-stream",
    size: Number(doc.size) || 0,
    data: doc.data,
  };
}

/** Delete a Mongo-stored upload by its public `/api/uploads/...` URL. */
export async function deleteUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const result = await uploadsCollection().deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  // Keep mongoose model index in sync if it was used elsewhere
  try {
    await StoredUpload.deleteOne({
      folder: parsed.folder,
      filename: parsed.filename,
    });
  } catch {
    /* ignore */
  }
  return result.deletedCount > 0;
}
