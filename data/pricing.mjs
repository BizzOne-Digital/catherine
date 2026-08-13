/**
 * Official Lumina Medi Spa treatment pricing catalog.
 */
export const pricingCategories = [
  "Injectables",
  "Lip Filler",
  "Mesotherapy / Skin Boosters",
  "Microneedling",
  "Skin Treatments",
  "IPL Laser and Light",
  "Laser Hair Removal",
  "Muscle Toning",
];

/** Flat list for DB seed — order within each category */
export const pricingItems = [
  // Injectables
  {
    treatmentName: "Botox®/Dysport®",
    category: "Injectables",
    price: "Starting at $8/unit",
    description: "Lead to send inquiry or book consultation",
    order: 1,
  },
  // Lip Filler
  {
    treatmentName: "Lip Filler — Full Syringe",
    category: "Lip Filler",
    price: "$499",
    order: 1,
  },
  {
    treatmentName: "Lip Filler — Half Syringe",
    category: "Lip Filler",
    price: "$325",
    order: 2,
  },
  // Mesotherapy
  {
    treatmentName: "NCTF® HA Skin Booster — One Vial",
    category: "Mesotherapy / Skin Boosters",
    price: "$399",
    order: 1,
  },
  {
    treatmentName: "NCTF® HA Skin Booster — Package of 3",
    category: "Mesotherapy / Skin Boosters",
    price: "$999",
    order: 2,
  },
  // Microneedling
  {
    treatmentName: "Microneedling with Hyaluronic Acid Serum — Face",
    category: "Microneedling",
    price: "$199",
    order: 1,
  },
  {
    treatmentName: "Microneedling with Hyaluronic Acid Serum — Face and Neck",
    category: "Microneedling",
    price: "$245",
    order: 2,
  },
  {
    treatmentName: "Package of 3: Microneedling with HA (Face)",
    category: "Microneedling",
    price: "$499",
    order: 3,
  },
  {
    treatmentName: "Package of 3: Microneedling with HA (Face and Neck)",
    category: "Microneedling",
    price: "$625",
    order: 4,
  },
  // Skin treatments / Facials
  {
    treatmentName: "Purifying Pore Refinement Hydrafacial",
    category: "Skin Treatments",
    price: "$169",
    duration: "60 minutes",
    order: 1,
  },
  {
    treatmentName: "Hydra Glow Rejuvenating Hydrafacial",
    category: "Skin Treatments",
    price: "$169",
    duration: "60 minutes",
    order: 2,
  },
  {
    treatmentName: "Signature Relaxation Facial",
    category: "Skin Treatments",
    price: "$145",
    duration: "60 minutes",
    order: 3,
  },
  {
    treatmentName: "Glow and Go Facial",
    category: "Skin Treatments",
    price: "$95",
    duration: "30 minutes",
    order: 4,
  },
  {
    treatmentName: "Package of Any Facial (5 Sessions)",
    category: "Skin Treatments",
    price: "$575",
    order: 5,
  },
  {
    treatmentName: "Package of Any Facial (3 Sessions)",
    category: "Skin Treatments",
    price: "$375",
    order: 6,
  },
  {
    treatmentName: "Package of Any Facial (2 Sessions)",
    category: "Skin Treatments",
    price: "$270",
    order: 7,
  },
  {
    treatmentName: "Add-on: Premium Skin Booster via Infusion",
    category: "Skin Treatments",
    price: "$80",
    order: 8,
  },
  // IPL
  {
    treatmentName: "IPL Full Face Complexion Reset",
    category: "IPL Laser and Light",
    price: "$229",
    order: 1,
  },
  {
    treatmentName: "IPL Spot Treatment for Acne Scars and Pigmentation",
    category: "IPL Laser and Light",
    price: "$149",
    order: 2,
  },
  {
    treatmentName: "Package of 3: IPL Full Face Complexion Reset",
    category: "IPL Laser and Light",
    price: "$575",
    order: 3,
  },
  {
    treatmentName: "Package of 3: IPL Spot Treatment for Acne Scars and Pigmentation",
    category: "IPL Laser and Light",
    price: "$399",
    order: 4,
  },
  {
    treatmentName: "LED Light Therapy",
    category: "IPL Laser and Light",
    price: "$45",
    order: 5,
  },
  // Laser hair removal
  {
    treatmentName: "Small Area Laser Hair Removal (Chin OR Upper Lip)",
    category: "Laser Hair Removal",
    price: "$55",
    order: 1,
  },
  {
    treatmentName: "Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
    category: "Laser Hair Removal",
    price: "$88",
    order: 2,
  },
  {
    treatmentName: "Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
    category: "Laser Hair Removal",
    price: "$150",
    order: 3,
  },
  {
    treatmentName: "Full Body Laser Hair Removal",
    category: "Laser Hair Removal",
    price: "$325",
    order: 4,
  },
  {
    treatmentName: "Package of 6: Small Area Laser Hair Removal (Chin OR Upper Lip)",
    category: "Laser Hair Removal",
    price: "$350",
    order: 5,
  },
  {
    treatmentName: "Package of 6: Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
    category: "Laser Hair Removal",
    price: "$479",
    order: 6,
  },
  {
    treatmentName: "Package of 6: Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
    category: "Laser Hair Removal",
    price: "$599",
    order: 7,
  },
  {
    treatmentName: "Package of 6: Full Body Laser Hair Removal",
    category: "Laser Hair Removal",
    price: "$1200",
    order: 8,
  },
  // Muscle toning
  {
    treatmentName: "Muscle Toning with HIFEM (Single Area)",
    category: "Muscle Toning",
    price: "$149",
    order: 1,
  },
  {
    treatmentName: "Package of 4: Muscle Toning with HIFEM (Single Area)",
    category: "Muscle Toning",
    price: "$449",
    order: 2,
  },
  {
    treatmentName: "Muscle Toning with HIFEM (Two Areas)",
    category: "Muscle Toning",
    price: "$199",
    order: 3,
  },
  {
    treatmentName: "Package of 4: Muscle Toning with HIFEM (Two Areas)",
    category: "Muscle Toning",
    price: "$599",
    order: 4,
  },
];
