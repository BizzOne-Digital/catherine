"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar, Tag, Image as ImageIcon } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { BlogPost } from "@/lib/blog-fallbacks";

function BlogContent({ content }: { content: string }) {
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="blog-content">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph.trim()}</p>
      ))}
    </div>
  );
}

function PostImage({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="blog-detail-image-placeholder">
        <ImageIcon size={36} className="text-gold/30" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 768px"
      onError={() => setImgError(true)}
      priority
    />
  );
}

export default function BlogDetailView({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const publishedDate = post.publishedAt || post.createdAt;

  return (
    <>
      <section className="blog-detail-hero relative overflow-hidden bg-luxury-black pt-24 pb-10 sm:pt-28 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(214,181,109,0.06)_0%,transparent_55%)]" />
        <div className="container-luxury relative z-10 max-w-4xl">
          <ScrollReveal>
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 font-inter text-xs uppercase tracking-[0.16em] text-gold/70 transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} />
              Back to Journal
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 font-inter text-[10px] uppercase tracking-[0.16em] text-gold">
                <Tag size={11} />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-inter text-xs text-soft-taupe/70">
                <Calendar size={12} />
                {publishedDate ? format(new Date(publishedDate), "MMMM d, yyyy") : ""}
              </span>
            </div>

            <h1 className="font-playfair text-3xl leading-tight text-warm-beige sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="blog-detail-lead mt-5 font-cormorant text-xl italic leading-relaxed text-soft-taupe lg:text-2xl">
              {post.excerpt}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-soft-black">
        <div className="container-luxury max-w-4xl">
          <ScrollReveal delay={0.1}>
            <div className="blog-detail-image-wrap">
              <PostImage src={post.featuredImage} alt={post.title} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-10 lg:mt-12">
            <BlogContent content={post.content} />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-12">
            <div className="rounded-xl border border-gold/15 bg-luxury-black/40 p-6 text-center lg:p-8">
              <p className="font-cormorant text-xl italic text-soft-taupe">
                Ready to explore treatments mentioned in this article?
              </p>
              <Link href="/booking" className="btn-gold mt-5 inline-flex items-center gap-3 rounded-sm group">
                Book a Consultation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {related.length > 0 && (
            <ScrollReveal delay={0.25} className="mt-16">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-2 block font-inter text-[11px] uppercase tracking-[4px] text-gold/80">
                    Keep Reading
                  </span>
                  <h2 className="font-playfair text-2xl text-warm-beige lg:text-3xl">
                    Related Articles
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item._id}
                    href={`/blog/${item.slug}`}
                    className="blog-related-card group"
                  >
                    <div className="blog-related-card-image relative overflow-hidden">
                      {item.featuredImage ? (
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <span className="font-playfair text-2xl text-gold/15">✦</span>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="font-inter text-[10px] uppercase tracking-[0.16em] text-gold/60">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-playfair text-lg leading-snug text-warm-beige transition-colors group-hover:text-gold">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 font-inter text-sm text-soft-taupe">
                        {item.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 font-inter text-xs text-gold/70 transition-all group-hover:gap-2 group-hover:text-gold">
                        Read Article <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
