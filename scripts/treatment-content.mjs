/**
 * Builds page sections for each treatment from extracted static page content.
 * Key: `${categorySlug}/${treatmentSlug}`
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const extracted = JSON.parse(
  readFileSync(resolve(root, "scripts", "_extracted-content.json"), "utf8")
);

/** Card / listing images from seed treatments */
const listingImages = {
  botox: "/images/treatments/botox.jpg",
  "dysport-nuceiva": "/images/treatments/dysport.jpg",
  daxxify: "/images/treatments/daxxify.jpg",
  "dermal-fillers": "/images/treatments/dermal-fillers.jpg",
  "lip-filler": "/images/treatments/lip-filler.jpg",
  "skin-boosters": "/images/treatments/skin-boosters.jpg",
  "purifying-facial": "/images/treatments/purifying-facial.jpg",
  "relaxation-facial": "/images/treatments/relaxation-facial.jpg",
  "chemical-peel": "/images/treatments/chemical-peel.jpg",
  microneedling: "/images/treatments/microneedling.jpg",
  "ipl-photofacial": "/images/treatments/ipl-photofacial.jpg",
  "small-area": "/images/treatments/laser-face.jpg",
  "large-area": "/images/treatments/laser-legs.jpg",
  "full-body": "/images/treatments/laser-full-body.jpg",
  "body-sculpting-hifem": "/images/treatments/emsculpt.jpg",
};

function sid(prefix, n) {
  return `${prefix}-${n}`;
}

export function buildSections(categorySlug, treatmentSlug, fallbackImage = "") {
  const key = `${categorySlug}/${treatmentSlug}`;
  const d = extracted[key];
  const image = d?.img || listingImages[treatmentSlug] || fallbackImage || "";

  if (!d) {
    return [
      {
        id: sid("hero", 1),
        type: "hero",
        title: "",
        content: "",
        image,
        items: [],
        order: 0,
      },
    ];
  }

  return [
    {
      id: sid("hero", 1),
      type: "hero",
      title: d.h1 || "",
      content: d.heroP || "",
      image,
      items: [],
      order: 0,
    },
    {
      id: sid("about", 2),
      type: "about",
      title: "About This Treatment",
      content: d.aboutText || "",
      image: "",
      items: [],
      order: 1,
    },
    {
      id: sid("benefits", 3),
      type: "benefits",
      title: "Benefits",
      content: "",
      image: "",
      items: d.items || [],
      order: 2,
    },
    {
      id: sid("ideal", 4),
      type: "ideal_for",
      title: "Ideal For",
      content: d.ideal || "",
      image: "",
      items: [],
      order: 3,
    },
    {
      id: sid("recovery", 5),
      type: "recovery",
      title: "Recovery",
      content: d.recovery || "",
      image: "",
      items: [],
      order: 4,
    },
  ];
}

export { listingImages };
