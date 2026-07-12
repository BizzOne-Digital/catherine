"use client";
import { Star } from "lucide-react";
import ReviewCard from "@/components/ui/ReviewCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const reviews = [
  {
    _id: "1",
    clientName: "Sarah M.",
    rating: 5,
    reviewText:
      "Absolutely incredible experience from start to finish. Catherine is meticulous, gentle, and truly listens to what you want. My skin has never looked better — completely natural results.",
    reviewDate: "2 weeks ago",
    source: "google",
  },
  {
    _id: "2",
    clientName: "Jennifer L.",
    rating: 5,
    reviewText:
      "I've been to many medi spas but Lumina is in a completely different league. The attention to detail, the luxurious atmosphere, and the stunning results speak for themselves. I won't go anywhere else.",
    reviewDate: "1 month ago",
    source: "google",
  },
  {
    _id: "3",
    clientName: "Angela T.",
    rating: 5,
    reviewText:
      "My Botox results look so natural — exactly what I wanted. Catherine took time to understand my concerns and the whole experience felt premium and personal. Highly recommend to anyone in Mississauga!",
    reviewDate: "3 weeks ago",
    source: "google",
  },
];

export default function TrustReviews() {
  return (
    <section className="section-pad bg-soft-black relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="container-luxury">
        {/* Rating snapshot */}
        <ScrollReveal className="flex flex-col items-center mb-12">
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="font-playfair text-4xl sm:text-5xl text-gold mb-1">5.0</p>
          <p className="font-inter text-sm text-soft-taupe tracking-wide">Average Rating on Google</p>
        </ScrollReveal>

        <ScrollReveal>
          <SectionHeading
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Real results, real people — their words speak louder than ours."
          />
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, i) => (
            <ScrollReveal key={review._id} delay={i * 0.15}>
              <ReviewCard
                clientName={review.clientName}
                rating={review.rating}
                reviewText={review.reviewText}
                reviewDate={review.reviewDate}
                source={review.source}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Google badge */}
        <ScrollReveal delay={0.4} className="flex justify-center mt-10">
          <div className="flex items-center gap-3 py-3 px-6 rounded-full border border-gold/20 bg-white/3">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">G</span>
            </div>
            <span className="font-inter text-sm text-soft-taupe">Verified Google Reviews</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
