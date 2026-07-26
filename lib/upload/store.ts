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
  const [folder, filename] = parts;
  if (!isUploadFolder(folder)) return null;
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return { folder, filename };
}

function safeFilename(originalName: string, mimeType: string) {
  const fromName = originalName.split(".").pop()?.toLowerCase() || "";
  const ext =
    ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)
      ? fromName === "jpeg"
        ? "jpg"
        : fromName
      : EXT_BY_MIME[mimeType] || "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
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
  const filename = safeFilename(file.name || "image", file.type);

  await connectDB();
  await StoredUpload.create({
    folder,
    filename,
    mimeType: file.type,
    size: buffer.length,
    data: buffer,
  });

  return {
    url: uploadPublicUrl(folder, filename),
    filename,
    folder,
    size: buffer.length,
  };
}

export async function getStoredUpload(folder: UploadFolder, filename: string) {
  if (
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename.includes("%")
  ) {
    return null;
  }
  await connectDB();
  return StoredUpload.findOne({ folder, filename }).lean();
}

/** Normalize mongoose Binary / Buffer / Uint8Array to Node Buffer. */
export function toNodeBuffer(data: unknown): Buffer {
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof Uint8Array) return Buffer.from(data);
  if (data && typeof data === "object") {
    const maybe = data as { buffer?: ArrayBuffer; data?: number[] };
    if (maybe.buffer instanceof ArrayBuffer) {
      return Buffer.from(maybe.buffer);
    }
    if (Array.isArray(maybe.data)) {
      return Buffer.from(maybe.data);
    }
  }
  return Buffer.from(data as ArrayBuffer);
}

/** Delete a Mongo-stored upload by its public `/api/uploads/...` URL. */
export async function deleteUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}
