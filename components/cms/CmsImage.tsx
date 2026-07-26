"use client";
import Image, { type ImageProps } from "next/image";
import { resolveCmsImage, DEFAULT_CMS_IMAGE } from "@/lib/cmsImage";

type Props = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallback?: string;
};

/** next/image wrapper that safely resolves Mongo uploads + legacy /uploads/ paths. */
export default function CmsImage({
  src,
  fallback = DEFAULT_CMS_IMAGE,
  alt,
  ...rest
}: Props) {
  const resolved = resolveCmsImage(src, fallback);
  if (!resolved) return null;

  const unoptimized =
    resolved.startsWith("/api/uploads/") || rest.unoptimized === true;

  return <Image src={resolved} alt={alt} {...rest} unoptimized={unoptimized} />;
}
