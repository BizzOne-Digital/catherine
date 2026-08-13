/**
 * One-time helper: find Google Place ID for Lumina Medi Spa.
 * Usage: GOOGLE_PLACES_API_KEY=your_key node scripts/find-place-id.mjs
 */
const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.error("Set GOOGLE_PLACES_API_KEY first.");
  process.exit(1);
}

const query =
  process.env.GOOGLE_PLACE_QUERY ||
  "Lumina Medi Spa, 42 Village Centre Place, Mississauga, Ontario";

const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": key,
    "X-Goog-FieldMask":
      "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
  },
  body: JSON.stringify({ textQuery: query, maxResultCount: 3 }),
});

const data = await res.json();
if (!res.ok) {
  console.error(data);
  process.exit(1);
}

const places = data.places || [];
if (!places.length) {
  console.log("No places found for:", query);
  process.exit(1);
}

for (const p of places) {
  console.log("---");
  console.log("Name:", p.displayName?.text);
  console.log("Address:", p.formattedAddress);
  console.log("Place ID:", p.id);
  console.log("Rating:", p.rating, `(${p.userRatingCount || 0} reviews)`);
  console.log("Add to .env.local:");
  console.log(`GOOGLE_PLACE_ID=${p.id}`);
}
