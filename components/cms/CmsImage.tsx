"use client";
import Image, { type ImageProps } from "next/image";
import { resolveCmsImage, DEFAULT_CMS_IMAGE, isMongoUploadUrl } from "@/lib/cmsImage";

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

  // Mongo-stored uploads: plain <img> avoids next/image optimizer issues on API routes
  if (isMongoUploadUrl(resolved)) {
    const { fill, className, style, width, height } = rest;

    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt || ""}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            ...(typeof style === "object" && style ? style : {}),
          }}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt || ""}
        className={className}
        style={style}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
      />
    );
  }

  return <Image src={resolved} alt={alt} {...rest} />;
}
