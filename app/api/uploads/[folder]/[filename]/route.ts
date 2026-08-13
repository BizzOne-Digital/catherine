import { NextRequest, NextResponse } from "next/server";
import {
  getStoredUpload,
  isUploadFolder,
  toNodeBuffer,
} from "@/lib/upload/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { folder: string; filename: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const folder = params.folder;
    const filename = params.filename;

    if (!isUploadFolder(folder)) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\") ||
      /%2e|%2f|%5c/i.test(filename)
    ) {
      return new NextResponse("Not found", { status: 404 });
    }

    const doc = await getStoredUpload(folder, filename);
    if (!doc) {
      return new NextResponse("Not found", { status: 404 });
    }

    let bytes: Buffer;
    try {
      bytes = toNodeBuffer(doc.data);
    } catch (err) {
      console.error("[api/uploads] buffer convert failed", err);
      return new NextResponse("Corrupt image", { status: 500 });
    }

    if (!bytes.length) {
      console.error("[api/uploads] empty bytes", {
        folder,
        filename,
        reportedSize: doc.size,
      });
      return new NextResponse("Empty image — please re-upload", { status: 404 });
    }

    // Copy into a plain ArrayBuffer-backed Uint8Array (avoids empty body quirks with Node Buffer)
    const body = new Uint8Array(bytes.byteLength);
    body.set(bytes);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType || "application/octet-stream",
        "Content-Length": String(body.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[api/uploads GET]", err);
    return new NextResponse("Error", { status: 500 });
  }
}
