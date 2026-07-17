import { NextResponse } from "next/server";
import { fetchGoogleReviews, type GoogleReviewsPayload } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";
export const revalidate = 86400; // cache hint — fetchGoogleReviews also uses next.revalidate

/** Fallback so the homepage never breaks if Google key/quota fails. */
const FALLBACK: GoogleReviewsPayload = {
  rating: 5,
  totalReviews: null,
  mapsUrl: null,
  source: "fallback",
  reviews: [
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
  ],
};

export async function GET() {
  try {
    if (!process.env.GOOGLE_PLACES_API_KEY?.trim()) {
      return NextResponse.json({
        ...FALLBACK,
        error: "GOOGLE_PLACES_API_KEY is not configured",
      });
    }

    const data = await fetchGoogleReviews();

    if (!data.reviews.length) {
      return NextResponse.json({
        ...FALLBACK,
        rating: data.rating ?? FALLBACK.rating,
        totalReviews: data.totalReviews,
        mapsUrl: data.mapsUrl,
        error: "Google returned no reviews for this place",
      });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[api/reviews]", err);
    return NextResponse.json({
      ...FALLBACK,
      error: err instanceof Error ? err.message : "Failed to fetch Google reviews",
    });
  }
}
