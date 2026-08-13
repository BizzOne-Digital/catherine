import { NextResponse } from "next/server";
import { fetchGoogleReviews, type GoogleReviewsPayload } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

/** Curated Google reviews shown on the homepage. */
export const CURATED_REVIEWS: GoogleReviewsPayload["reviews"] = [
  {
    _id: "bianca-l",
    clientName: "Bianca L.",
    rating: 5,
    reviewText:
      "I had a microneedling done with Wendy yesterday and I was very pleasant with my experience. She was very thorough, taking her time not making me feel rushed. I was hesitant to try microneedling again because of the pain but the pain was minimal compared to my past experience (at other spas). I will be coming back for more! Looking forward to seeing the result soon.",
    reviewDate: "",
    source: "google",
  },
  {
    _id: "jasmine-z",
    clientName: "Jasmine Z.",
    rating: 5,
    reviewText:
      "Very nice, calm, and aesthetic spa. I got an IPL treatment to get rid of hair on the upper lip and it was quick and painless. My mom got a deep facial treatment as well. Will definitely be coming back here often.",
    reviewDate: "",
    source: "google",
  },
  {
    _id: "monica-w",
    clientName: "Monica W.",
    rating: 5,
    reviewText:
      "I had such a great experience! The space was clean, relaxing, and I loved the little treats and drinks to start. The receptionist was super friendly, and Wendy was amazing and tailored everything to my skin concerns. My acne looked noticeably smaller after and my face was way less red. I left feeling refreshed and taken care of. Definitely recommend!",
    reviewDate: "",
    source: "google",
  },
  {
    _id: "rebeca-c",
    clientName: "Rebeca C.",
    rating: 5,
    reviewText:
      "Absolutely the best spa I've been to. Wendy is so sweet and very knowledgeable. We started with a skin analysis and walked through the details of my skin. The facial was tailored for my needs and was so relaxing and amazing.",
    reviewDate: "",
    source: "google",
  },
  {
    _id: "sandra-s",
    clientName: "Sandra S.",
    rating: 5,
    reviewText:
      "Great New Convenient location in Mississauga! I just had a facial skin analysis done here. They are equipped with the latest technologies and knowledgeable staff to assist you. The facility is cozy and comfortable space to relax and get treatments done. Highly recommend going to Lumina Medi Spa Mississauga for your next treatment.",
    reviewDate: "",
    source: "google",
  },
  {
    _id: "christina-b",
    clientName: "Christina B.",
    rating: 5,
    reviewText:
      "Great services and beautiful space! Wendy is very knowledgeable about everything related to skincare, and guides you for the right services dependent on your skin type and concerns. I've been here for a few services already and do see an improvement in my skin complexion!",
    reviewDate: "",
    source: "google",
  },
];

const FALLBACK: GoogleReviewsPayload = {
  rating: 5,
  totalReviews: null,
  mapsUrl: null,
  source: "fallback",
  reviews: CURATED_REVIEWS,
};

export async function GET() {
  try {
    if (!process.env.GOOGLE_PLACES_API_KEY?.trim()) {
      return NextResponse.json(FALLBACK);
    }

    const data = await fetchGoogleReviews();

    return NextResponse.json({
      rating: data.rating ?? FALLBACK.rating,
      totalReviews: null,
      mapsUrl: data.mapsUrl,
      source: data.source,
      reviews: CURATED_REVIEWS,
    });
  } catch (err) {
    console.error("[api/reviews]", err);
    return NextResponse.json({
      ...FALLBACK,
      error: err instanceof Error ? err.message : "Failed to fetch Google reviews",
    });
  }
}
