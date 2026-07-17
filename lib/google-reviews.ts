/**
 * Google Places (New) helpers for fetching Lumina Medi Spa reviews.
 * Requires GOOGLE_PLACES_API_KEY. Optional GOOGLE_PLACE_ID skips the text search.
 */

export const MEDICARD_PLACE_QUERY =
  "Lumina Medi Spa, 42 Village Centre Place, Mississauga, Ontario";

export type GoogleReview = {
  _id: string;
  clientName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  source: "google";
  profilePhotoUrl?: string;
  authorUrl?: string;
};

export type GoogleReviewsPayload = {
  rating: number | null;
  totalReviews: number | null;
  mapsUrl: string | null;
  reviews: GoogleReview[];
  source: "google" | "fallback";
};

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlaceDetails = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

function getApiKey(): string | null {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || null;
}

function getConfiguredPlaceId(): string | null {
  const id = process.env.GOOGLE_PLACE_ID?.trim();
  if (!id) return null;
  // New Places API expects resource name "places/{id}"
  return id.startsWith("places/") ? id : `places/${id}`;
}

async function placesFetch(url: string, init?: RequestInit) {
  const key = getApiKey();
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY is not set");

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      ...(init?.headers || {}),
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Places error ${res.status}: ${body.slice(0, 300)}`);
  }

  return res.json();
}

/** Resolve Place ID via Text Search when GOOGLE_PLACE_ID is missing. */
export async function resolvePlaceId(): Promise<string> {
  const configured = getConfiguredPlaceId();
  if (configured) return configured;

  const data = await placesFetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: process.env.GOOGLE_PLACE_QUERY?.trim() || MEDICARD_PLACE_QUERY,
      maxResultCount: 1,
    }),
  });

  const placeId = data?.places?.[0]?.id as string | undefined;
  if (!placeId) {
    throw new Error(
      "Could not find Lumina Medi Spa on Google. Set GOOGLE_PLACE_ID in .env.local"
    );
  }

  return placeId.startsWith("places/") ? placeId : `places/${placeId}`;
}

function mapReviews(place: PlaceDetails): GoogleReview[] {
  const list = place.reviews || [];
  return list
    .filter((r) => r.text?.text && r.authorAttribution?.displayName)
    .map((r, i) => ({
      _id: r.name || `google-review-${i}`,
      clientName: r.authorAttribution?.displayName || "Google User",
      rating: Math.round(r.rating || 5),
      reviewText: (r.text?.text || "").trim(),
      reviewDate: r.relativePublishTimeDescription || "",
      source: "google" as const,
      profilePhotoUrl: r.authorAttribution?.photoUri,
      authorUrl: r.authorAttribution?.uri,
    }));
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  const placeName = await resolvePlaceId();

  const place = (await placesFetch(
    `https://places.googleapis.com/v1/${placeName}`,
    {
      method: "GET",
      headers: {
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    }
  )) as PlaceDetails;

  return {
    rating: typeof place.rating === "number" ? place.rating : null,
    totalReviews: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
    mapsUrl: place.googleMapsUri || null,
    reviews: mapReviews(place),
    source: "google",
  };
}
