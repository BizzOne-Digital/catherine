"use client";
import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { resolveCmsImage } from "@/lib/cmsImage";

type UploadFolder = "pages" | "products" | "gallery" | "misc";

const MAX_EDGE = 2000;
const JPEG_QUALITY = 0.8;

/** Resize/compress in browser so phone photos fit Vercel body limits. */
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;
    if (width > MAX_EDGE || height > MAX_EDGE) {
      const scale = MAX_EDGE / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob: Blob | null = await new Promise((resolve) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else canvas.toBlob((b2) => resolve(b2), "image/jpeg", JPEG_QUALITY);
        },
        "image/webp",
        JPEG_QUALITY
      );
    });

    if (!blob || blob.size === 0) return file;

    const ext = blob.type === "image/webp" ? "webp" : "jpg";
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${base}.${ext}`, { type: blob.type });
  } catch {
    return file;
  }
}

export default function ImageUploadField({
  label = "Image",
  value,
  onChange,
  folder = "misc",
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
}) {
  const [uploading, setUploading] = useState(false);
  const previewSrc = value ? resolveCmsImage(value, value) : "";

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const prepared = await compressImage(file);
      const body = new FormData();
      body.append("file", prepared);
      body.append("folder", folder);
      if (value?.startsWith("/api/uploads/")) {
        body.append("replaceUrl", value);
      }

      const r = await fetch("/api/upload", {
        method: "POST",
        body,
        credentials: "include",
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Upload failed");
      if (!d.url) throw new Error("Upload succeeded but no URL returned");
      onChange(d.url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="space-y-2">
        <input
          className="admin-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/api/uploads/... or /images/..."
        />
        <div className="flex flex-wrap items-center gap-2">
          <label className="admin-btn inline-flex cursor-pointer items-center gap-2 border border-gold/20 text-gold hover:bg-gold/10">
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                handleFile(e.target.files?.[0] || null);
                e.target.value = "";
              }}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="admin-btn border border-gold/20 text-soft-taupe hover:text-gold"
              title="Remove image"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {previewSrc && (
          <div className="relative mt-2 flex h-28 w-full items-center justify-center overflow-hidden rounded-lg border border-gold/15 bg-luxury-black/40">
            {/* Use plain img for Mongo API URLs — avoids next/image optimizer issues */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.3";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
