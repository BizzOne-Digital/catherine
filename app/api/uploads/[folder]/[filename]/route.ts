import { NextRequest, NextResponse } from "next/server";
import { getStoredUpload, isUploadFolder, toNodeBuffer } from "@/lib/upload/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { folder: string; filename: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { folder, filename } = params;

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
    if (!doc?.data) {
      return new NextResponse("Not found", { status: 404 });
    }

    const bytes = toNodeBuffer(doc.data);

    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType || "application/octet-stream",
        "Content-Length": String(bytes.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[api/uploads GET]", err);
    return new NextResponse("Error", { status: 500 });
  }
}
