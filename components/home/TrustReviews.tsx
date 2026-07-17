"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
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

export default function TrustReviews() {
  const [rating, setRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [mapsUrl, setMapsUrl] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data: ReviewsResponse) => {
        if (data?.reviews?.length) setReviews(data.reviews.slice(0, 6));
        if (typeof data?.rating === "number") setRating(data.rating);
        if (typeof data?.totalReviews === "number") setTotalReviews(data.totalReviews);
        if (data?.mapsUrl) setMapsUrl(data.mapsUrl);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(1) : rating.toFixed(1);

  return (
    <section className="section-pad section-warm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="container-luxury">
        <ScrollReveal className="flex flex-col items-center mb-12">
          <div className="flex gap-1 mb-3">
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
          <p className="font-playfair text-4xl sm:text-5xl text-gold mb-1">{ratingLabel}</p>
          <p className="font-inter text-sm text-soft-taupe tracking-wide">
            Average Rating on Google
            {typeof totalReviews === "number" ? ` · ${totalReviews} review${totalReviews === 1 ? "" : "s"}` : ""}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <SectionHeading
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Real results, real people — their words speak louder than ours."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {!loaded && reviews.length === 0 && (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-xl border border-gold/15 bg-ivory/60"
                  aria-hidden
                />
              ))}
            </>
          )}

          {reviews.map((review, i) => (
            <ScrollReveal key={review._id} delay={i * 0.15}>
              <ReviewCard
                clientName={review.clientName}
                rating={review.rating}
                reviewText={review.reviewText}
                reviewDate={review.reviewDate}
                source={review.source || "google"}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="flex justify-center mt-10">
          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-3 px-6 rounded-full border border-gold/20 bg-white/3 transition-colors hover:border-gold/40"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              <span className="font-inter text-sm text-soft-taupe">View all Google Reviews</span>
            </a>
          ) : (
            <div className="flex items-center gap-3 py-3 px-6 rounded-full border border-gold/20 bg-white/3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
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
