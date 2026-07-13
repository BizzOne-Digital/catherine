"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { format } from "date-fns";
import { fallbackBlogPosts, type BlogPost } from "@/lib/blog-fallbacks";

function BlogThumbnail({
  src,
  alt,
  className = "aspect-video",
  iconSize = "text-5xl",
}: {
  src: string;
  alt: string;
  className?: string;
  iconSize?: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#F7EFE4] to-[#EDE3D3] ${className}`}>
        <span className={`font-playfair text-gold/10 ${iconSize}`}>✦</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackBlogPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => { if (data?.posts?.length >= 3) setPosts(data.posts); })
      .catch(() => {});
  }, []);

  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 page-text-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.05)_0%,transparent_60%)]" />
        <div className="container-luxury relative z-10 text-center">
          <ScrollReveal>
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">
              Insights & Education
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-6xl text-warm-beige leading-tight mb-5">
              The Lumina <em className="text-gold not-italic">Journal</em>
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
            <p className="font-cormorant text-xl italic text-soft-taupe max-w-xl mx-auto">
              Expert insights on medical aesthetics, skincare science, and the art of natural enhancement.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          {/* Featured Post */}
          {featured && (
            <ScrollReveal className="mb-12">
              <motion.div
                className="group relative rounded-2xl overflow-hidden border border-gold/20 surface-card hover:border-gold/35 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2"
                whileHover={{ y: -3 }}
              >
                <BlogThumbnail
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="aspect-video min-h-[250px] lg:aspect-auto lg:min-h-[320px]"
                />
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-inter text-[10px] tracking-[2px] uppercase bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="font-inter text-[10px] tracking-[2px] uppercase text-gold/60">{featured.category}</span>
                  </div>
                  <h2 className="font-playfair text-2xl sm:text-3xl text-warm-beige mb-4 group-hover:text-gold transition-colors duration-300 leading-snug">
                    {featured.title}
                  </h2>
                  <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1.5 text-soft-taupe/60">
                      <Calendar size={12} />
                      <span className="font-inter text-xs">
                        {featured.publishedAt ? format(new Date(featured.publishedAt), "MMMM d, yyyy") : ""}
                      </span>
                    </div>
                    <Link href={`/blog/${featured.slug}`} className="flex items-center gap-2 text-gold text-sm font-inter group-hover:gap-3 transition-all">
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          )}

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <ScrollReveal key={post._id} delay={i * 0.1}>
                <motion.div
                  className="group rounded-xl overflow-hidden border border-gold/20 surface-card hover:border-gold/35 transition-all duration-500 flex flex-col h-full"
                  whileHover={{ y: -4 }}
                >
                  <BlogThumbnail
                    src={post.featuredImage}
                    alt={post.title}
                    className="aspect-video"
                    iconSize="text-3xl"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={11} className="text-gold/60" />
                      <span className="font-inter text-[10px] tracking-[2px] uppercase text-gold/60">{post.category}</span>
                    </div>
                    <h3 className="font-playfair text-xl text-warm-beige mb-3 group-hover:text-gold transition-colors duration-300 leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                      <div className="flex items-center gap-1.5 text-soft-taupe/50">
                        <Calendar size={11} />
                        <span className="font-inter text-xs">
                          {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : ""}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="font-inter text-xs text-gold/60 hover:text-gold transition-colors flex items-center gap-1">
                        Read <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
