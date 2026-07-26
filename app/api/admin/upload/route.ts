import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { isUploadFolder, saveFolderUpload } from "@/lib/upload/store";

export const runtime = "nodejs";

/** @deprecated Prefer POST /api/upload — kept as thin alias for older clients. */
export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    const form = await req.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "misc");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!isUploadFolder(folderRaw)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const saved = await saveFolderUpload(file, folderRaw);
    return NextResponse.json({
      success: true,
      url: saved.url,
      filename: saved.filename,
      folder: saved.folder,
      size: saved.size,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
