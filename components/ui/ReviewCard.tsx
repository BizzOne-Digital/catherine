import { Star } from "lucide-react";

interface ReviewCardProps {
  clientName: string;
  rating: number;
  reviewText: string;
  reviewDate?: string;
  source?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-gold text-gold" : "fill-soft-taupe/30 text-soft-taupe/30"}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ clientName, rating, reviewText, reviewDate, source = "google" }: ReviewCardProps) {
  const initials = clientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="surface-card p-6 card-hover flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-deep-gold/20 flex items-center justify-center flex-shrink-0 border border-gold/20">
            <span className="font-playfair text-sm text-gold font-semibold">{initials}</span>
          </div>
          <div>
            <p className="font-inter text-sm font-medium text-text-dark">{clientName}</p>
            {reviewDate && (
              <p className="font-inter text-xs text-soft-taupe/60 mt-0.5">{reviewDate}</p>
            )}
          </div>
        </div>
        {/* Google "G" icon */}
        {source === "google" && (
          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-gold/80">G</span>
          </div>
        )}
      </div>

      {/* Stars */}
      <StarRating rating={rating} />

      {/* Text */}
      <p className="flex-1 font-inter text-sm leading-relaxed text-text-dark/80 line-clamp-6">
        &ldquo;{reviewText}&rdquo;
      </p>

      {/* Bottom border accent */}
      <div className="w-8 h-px bg-gold/30" />
    </div>
  );
}
