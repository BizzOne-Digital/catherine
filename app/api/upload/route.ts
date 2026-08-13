import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  isUploadFolder,
  saveFolderUpload,
  deleteUploadByUrl,
} from "@/lib/upload/store";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    const form = await req.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "misc");
    const replaceUrl = String(form.get("replaceUrl") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!isUploadFolder(folderRaw)) {
      return NextResponse.json(
        { error: "Invalid folder. Use pages, products, gallery, or misc." },
        { status: 400 }
      );
    }

    const saved = await saveFolderUpload(file, folderRaw);

    // Best-effort cleanup of previous Mongo upload when replacing
    if (replaceUrl.startsWith("/api/uploads/")) {
      try {
        await deleteUploadByUrl(replaceUrl);
      } catch {
        /* ignore */
      }
    }

    return NextResponse.json({
      success: true,
      url: saved.url,
      filename: saved.filename,
      folder: saved.folder,
      size: saved.size,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    console.error("[api/upload]", err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
