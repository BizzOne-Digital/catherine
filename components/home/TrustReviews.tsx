"use client";
import { useCallback, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReviewCard from "@/components/ui/ReviewCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Review = {
  _id: string;
  clientName: string;
  rating: number;
  reviewText: string;
  reviewDate?: string;
  source?: string;
};

type ReviewsResponse = {
  rating: number | null;
  totalReviews: number | null;
  mapsUrl: string | null;
  reviews: Review[];
  source?: string;
};

const AUTO_MS = 5000;

function usePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export default function TrustReviews() {
  const [rating, setRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [mapsUrl, setMapsUrl] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const perView = usePerView();

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data: ReviewsResponse) => {
        if (data?.reviews?.length) setReviews(data.reviews);
        if (typeof data?.rating === "number") setRating(data.rating);
        if (typeof data?.totalReviews === "number") setTotalReviews(data.totalReviews);
        if (data?.mapsUrl) setMapsUrl(data.mapsUrl);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const pageCount = Math.max(1, Math.ceil(reviews.length / perView));

  useEffect(() => {
    setIndex((i) => Math.min(i, pageCount - 1));
  }, [pageCount]);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (!loaded || reviews.length <= perView || paused) return;
    const t = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % pageCount);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [loaded, reviews.length, perView, paused, pageCount]);

  const visible = reviews.slice(index * perView, index * perView + perView);
  const ratingLabel = rating.toFixed(1);

  return (
    <section className="section-pad section-warm relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/3 blur-[100px]" />

      <div className="container-luxury">
        <ScrollReveal className="mb-12 flex flex-col items-center">
          <div className="mb-3 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={22}
                className={
                  i < Math.round(rating)
                    ? "fill-gold text-gold"
                    : "fill-soft-taupe/25 text-soft-taupe/25"
                }
              />
            ))}
          </div>
          <p className="mb-1 font-playfair text-4xl text-gold sm:text-5xl">{ratingLabel}</p>
          <p className="font-inter text-sm tracking-wide text-soft-taupe">
            Average Rating on Google
            {typeof totalReviews === "number"
              ? ` · ${totalReviews} review${totalReviews === 1 ? "" : "s"}`
              : ""}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <SectionHeading
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Real results, real people — their words speak louder than ours."
          />
        </ScrollReveal>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {!loaded && reviews.length === 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-56 animate-pulse rounded-xl border border-gold/15 bg-ivory/60"
                  aria-hidden
                />
              ))}
            </div>
          )}

          {reviews.length > 0 && (
            <>
              <div className="overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${index}-${perView}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -48 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid gap-6 ${
                      perView === 3
                        ? "grid-cols-3"
                        : perView === 2
                          ? "grid-cols-2"
                          : "grid-cols-1"
                    }`}
                  >
                    {visible.map((review) => (
                      <div key={review._id} className="h-full min-h-[17rem]">
                        <ReviewCard
                          clientName={review.clientName}
                          rating={review.rating}
                          reviewText={review.reviewText}
                          reviewDate={review.reviewDate}
                          source={review.source || "google"}
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {pageCount > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-ivory/80 text-gold transition-colors hover:border-gold/50 hover:bg-gold/10"
                    aria-label="Previous reviews"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2" role="tablist" aria-label="Review slides">
                    {Array.from({ length: pageCount }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        onClick={() => goTo(i, i > index ? 1 : -1)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === index ? "w-7 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/50"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-ivory/80 text-gold transition-colors hover:border-gold/50 hover:bg-gold/10"
                    aria-label="Next reviews"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <ScrollReveal delay={0.4} className="mt-10 flex justify-center">
          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-gold/20 bg-white/3 px-6 py-3 transition-colors hover:border-gold/40"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              <span className="font-inter text-sm text-soft-taupe">View all Google Reviews</span>
            </a>
          ) : (
            <div className="flex items-center gap-3 rounded-full border border-gold/20 bg-white/3 px-6 py-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              <span className="font-inter text-sm text-soft-taupe">Verified Google Reviews</span>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
