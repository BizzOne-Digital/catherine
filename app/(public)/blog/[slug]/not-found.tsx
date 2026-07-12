import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogNotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-luxury-black px-4">
      <div className="text-center">
        <h1 className="font-playfair text-4xl text-warm-beige">Article Not Found</h1>
        <p className="mt-4 font-inter text-sm text-soft-taupe">
          This blog post may have been moved or removed.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 font-inter text-xs uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold/80"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>
      </div>
    </section>
  );
}
