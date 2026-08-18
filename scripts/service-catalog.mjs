/**
 * Lumina Medi Spa — full services / treatments catalog for seeding.
 */
export const FRESHA_MAIN =
  "https://www.fresha.com/en-GB/a/lumina-medi-spa-mississauga-42-village-centre-place-d6pg69mk";

function sec(type, order, { title = "", content = "", items = [], image = "" } = {}) {
  return { id: `${type}-${order}`, type, title, content, image, items, order };
}

function buildSections({ hero, includes, about, benefits, idealFor, recovery } = {}) {
  const sections = [];
  let o = 0;
  if (hero) {
    sections.push(
      sec("hero", o++, {
        title: hero.title || "",
        content: hero.content || "",
        image: hero.image || "",
      })
    );
  }
  if (includes?.items?.length) {
    sections.push(
      sec("custom", o++, {
        title: includes.title || "Treatments Include",
        content: includes.content || "",
        items: includes.items,
      })
    );
  }
  if (about) {
    sections.push(
      sec("about", o++, {
        title: about.title || "About This Treatment",
        content: about.content || "",
      })
    );
  }
  if (benefits?.items?.length) {
    sections.push(
      sec("benefits", o++, {
        title: benefits.title || "Benefits",
        content: benefits.content || "",
        items: benefits.items,
      })
    );
  }
  if (idealFor) {
    sections.push(sec("ideal_for", o++, { title: "Ideal For", content: idealFor }));
  }
  if (recovery) {
    sections.push(sec("recovery", o++, { title: "Recovery", content: recovery }));
  }
  return sections;
}

export const serviceCategories = [
  {
    title: "Botox & Neuromodulators",
    slug: "injectables-wrinkle-relaxers",
    description:
      "Smooth and soften wrinkles with precise, natural-looking Botox treatments customized to your unique facial anatomy and aesthetic goals.",
    icon: "Sparkles",
    order: 1,
    detailPage: "/services/injectables-wrinkle-relaxers/botox-or-dysport",
  },
  {
    title: "Dermal Fillers & Skin Boosters",
    slug: "dermal-fillers-skin-boosters",
    description:
      "Restore volume, refine facial contours, and enhance your natural features with subtle, elegant hyaluronic acid treatments.",
    icon: "Heart",
    order: 2,
    detailPage: "",
  },
  {
    title: "Facials & Skin Health",
    slug: "facials-skin-health",
    description:
      "Customized medical-grade facials designed to refresh and rejuvenate your skin while targeting concerns such as acne, congestion, dullness, dehydration, and uneven texture. Featuring deep cleansing, professional extractions, customized skincare, and LED light therapy, each treatment helps improve skin clarity, texture, and overall radiance.",
    icon: "Droplets",
    order: 3,
    detailPage: "",
  },
  {
    title: "Microneedling & IPL Photofacial",
    slug: "microneedling-skin-resurfacing",
    description:
      "Advanced skin treatments to stimulate collagen, refine texture, and improve pigmentation, redness, and uneven skin tone.",
    icon: "Activity",
    order: 4,
    detailPage: "",
  },
  {
    title: "Laser Hair Removal",
    slug: "laser-hair-removal",
    description:
      "Comfortable, long-term hair reduction with advanced medical-grade diode laser technology for smoother, low-maintenance skin.",
    icon: "Zap",
    order: 5,
    detailPage: "",
  },
  {
    title: "HIFEM Muscle Toning",
    slug: "body-sculpting-contouring",
    description:
      "Advanced electromagnetic technology that stimulates targeted muscle contractions to help tone, strengthen, and define areas such as the abdomen, glutes, and arms.",
    icon: "Activity",
    order: 6,
    detailPage: "/services/body-sculpting-contouring/body-sculpting-hifem",
  },
];

export const treatmentsByCategory = {
  "injectables-wrinkle-relaxers": [
    {
      name: "Botox or Dysport",
      slug: "botox-or-dysport",
      shortDescription:
        "Smooth and soften wrinkles with precise, natural-looking Botox treatments customized to your unique facial anatomy and aesthetic goals.",
      price: "From $8/unit",
      image: "/images/treatments/botox-main.png",
      beforeImage: "/images/treatments/botox-before-after.png",
      afterImage: "__combined__",
      popular: true,
      order: 1,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Smooth and soften wrinkles with precise, natural-looking Botox treatments customized to your unique facial anatomy and aesthetic goals.",
          image: "/images/treatments/botox-main.png",
        },
        includes: {
          title: "Treatments Include",
          items: [
            "Forehead Lines — Soften horizontal lines while maintaining natural expression.",
            "Frown Lines (11s) — Reduce lines between the brows for a refreshed appearance.",
            "Crow's Feet — Minimize fine lines around the eyes.",
            "Brow Lift — Create a subtle lifted, more open eye appearance.",
            "Lip Flip — Enhance the upper lip with subtle muscle relaxation.",
            "DAO & Lower Face Refinement — Soften downturned mouth appearance and refine facial balance.",
            "Masseter Botox (TMJ & Jawline Refinement) — Relax jaw tension and enhance jawline definition.",
            "Nefertiti Lift (Jawline & Neck Refinement) — Improve the appearance of a smoother, more sculpted jawline and neck.",
            "Neck Bands — Smooth visible neck muscle bands.",
          ],
        },
        about: {
          content:
            "Botox is a trusted neuromodulator for softening dynamic wrinkles caused by repeated facial expressions. Our precise injection techniques target specific muscles to smooth forehead lines, frown lines (11s), and crow's feet while preserving your natural expressions.\n\nThis treatment temporarily relaxes the muscles responsible for wrinkle formation, creating a smoother, refreshed appearance. Results typically begin within 3–5 days, with full results developing over approximately two weeks.",
        },
        benefits: {
          items: [
            "Smooths forehead lines, frown lines, and crow's feet",
            "Softens the appearance of dynamic wrinkles",
            "Helps minimize the development of deeper expression lines over time",
            "Maintains natural facial movement and expression",
            "Results typically last 3–5 months",
            "Quick and comfortable treatment",
            "Health Canada-approved and extensively studied",
          ],
        },
        idealFor:
          "Adults seeking a refreshed, balanced appearance or targeted muscle relaxation. Botox can help soften expression lines, enhance features such as the lips and jawline, and address concerns such as forehead lines, frown lines, crow's feet, lip flip, masseter tension, and other personalized treatment goals.",
        recovery:
          "Botox requires minimal downtime, and most clients return to their regular activities immediately. Mild redness, swelling, tenderness, or occasional bruising at injection sites may occur and typically resolves within a few days.\n\nFor optimal results, avoid rubbing or applying pressure to treated areas, lying flat for approximately 4 hours, strenuous exercise, excessive heat exposure (such as saunas and hot tubs), and alcohol consumption for the first 24 hours after treatment. Your provider will review aftercare instructions to support a smooth recovery.",
      }),
    },
  ],

  "dermal-fillers-skin-boosters": [
    {
      name: "Dermal Fillers",
      slug: "dermal-fillers",
      shortDescription:
        "Restore volume, refine facial contours, and enhance your natural features with subtle, elegant results.",
      price: "",
      hidePrice: true,
      image: "/images/treatments/dermal-fillers.jpg",
      order: 1,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Hyaluronic acid dermal fillers are designed to restore volume, refine facial contours, and enhance your natural features with subtle, elegant results.",
          image: "/images/treatments/dermal-fillers.jpg",
        },
        about: {
          content:
            "Hyaluronic acid dermal fillers are designed to restore volume, refine facial contours, and enhance your natural features with subtle, elegant results. Through precise injection techniques, we customize treatment areas such as the cheeks, lips, chin, and jawline to create balanced facial harmony.\n\nResults are immediate, with duration depending on the area treated, filler selection, and individual response. Your provider will recommend a personalized treatment plan designed to complement your facial anatomy and aesthetic goals.",
        },
        benefits: {
          items: [
            "Restores lost volume and enhances facial contours",
            "Defines and balances features such as cheeks, lips, chin, and jawline",
            "Softens the appearance of facial folds and lines",
            "Provides immediate visible results",
            "Offers customizable treatment options based on your facial anatomy and goals",
            "Creates natural-looking enhancement while maintaining facial harmony",
            "Hyaluronic acid fillers can be adjusted or dissolved if needed",
            "Results vary by treatment area and product selected, with many lasting several months to over a year",
          ],
        },
        idealFor:
          "Adults looking to restore facial volume, enhance facial contours, or achieve greater balance and symmetry. Dermal fillers can be customized to enhance areas such as the cheeks, lips, chin, and jawline, or soften the appearance of facial folds while maintaining natural-looking results.",
        recovery:
          "Dermal filler treatments require minimal downtime, and most clients can return to their daily activities shortly after treatment. Mild swelling, bruising, redness, or tenderness may occur and typically improves over several days. To support optimal results, avoid strenuous exercise, excessive heat exposure (such as saunas and hot tubs), alcohol consumption, and pressure on treated areas for the recommended period following your appointment. Your provider will provide aftercare instructions based on your treatment.",
      }),
    },
    {
      name: "Lip Filler",
      slug: "lip-filler",
      shortDescription:
        "Enhance lip shape, restore volume, and create balanced definition with premium hyaluronic acid fillers.",
      price: "From $499/syringe",
      image: "/images/treatments/lip-filler.jpg",
      beforeImage: "",
      afterImage: "",
      popular: true,
      order: 2,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Lip filler treatments use premium hyaluronic acid fillers to enhance lip shape, restore volume, and create balanced definition.",
          image: "/images/treatments/lip-filler.jpg",
        },
        about: {
          content:
            "Lip filler treatments use premium hyaluronic acid fillers to enhance lip shape, restore volume, and create balanced definition. Our precise approach focuses on achieving natural-looking results that complement your facial features while preserving your unique character and expression.\n\nWhether you're looking to define the lip borders, improve symmetry, or add subtle volume, each treatment is customized to your individual anatomy and aesthetic goals for harmonious, refined results.",
        },
        benefits: {
          items: [
            "Adds natural-looking volume and enhances lip shape",
            "Defines lip borders and cupid's bow",
            "Improves lip hydration and softens the appearance of fine lines",
            "Enhances lip symmetry and facial balance",
            "Provides immediate visible results",
            "Customized to your anatomy and aesthetic goals",
            "Hyaluronic acid fillers can be adjusted or dissolved if needed",
            "Long-lasting results, with effects that may last up to 12 months depending on the filler used and individual response",
          ],
        },
        idealFor:
          "Adults looking to enhance lip shape, definition, symmetry, or hydration while maintaining natural-looking results. Lip filler can be customized for those seeking subtle volume, improved lip contours, a more defined cupid's bow, or restoration of volume changes over time.",
        recovery:
          "Lip filler requires minimal downtime, and most clients can return to their daily activities shortly after treatment. Mild swelling, bruising, redness, or tenderness may occur and typically improves within a few days. To support optimal healing, avoid strenuous exercise, excessive heat exposure, alcohol consumption, and pressure or massage of the treated area unless directed by your provider. Personalized aftercare instructions will be provided following your treatment.",
      }),
    },
    {
      name: "NCTF 135 Mesotherapy (Chanel Injection)",
      slug: "nctf-135-mesotherapy",
      shortDescription:
        'Deeply hydrate, brighten, and rejuvenate the skin with the renowned NCTF 135 "Chanel Injection."',
      price: "From $399",
      image: "/images/treatments/mesotherapy-main.png",
      order: 3,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          title: "NCTF 135 Mesotherapy (Chanel Injection)",
          content:
            "Restore your skin's natural glow with a revitalizing blend of hyaluronic acid, vitamins, and nutrients that deeply hydrates, improves texture, and enhances overall skin radiance.",
          image: "/images/treatments/mesotherapy-main.png",
        },
        about: {
          content:
            "NCTF 135 Mesotherapy is an injectable skin rejuvenation treatment that delivers a blend of hyaluronic acid, vitamins, amino acids, minerals, and nutrients directly into the skin to improve hydration, texture, and radiance.\n\nUnlike traditional dermal fillers that restore volume, NCTF 135 works within the skin to enhance overall skin quality, support collagen production, and promote a smoother, brighter, more refreshed complexion. Results develop gradually for a natural-looking glow and improved skin vitality.",
        },
        benefits: {
          items: [
            "Deeply hydrates and revitalizes the skin",
            "Improves skin texture, tone, and overall radiance",
            "Supports collagen production and skin elasticity",
            "Helps reduce the appearance of fine lines and signs of fatigue",
            "Promotes a smoother, healthier-looking complexion",
            "Natural-looking glow with gradual improvement over time",
          ],
        },
        idealFor:
          "Adults looking to improve skin hydration, texture, and radiance. NCTF 135 Mesotherapy is ideal for dull, dehydrated skin, early signs of aging, uneven skin quality, or anyone seeking a refreshed, glowing complexion with a natural-looking result.",
        recovery:
          "NCTF 135 Mesotherapy requires minimal downtime. Mild redness, small bumps, swelling, or sensitivity at injection sites may occur and typically improves within a few hours to a couple of days. Avoid makeup for approximately 12 hours and follow your provider's aftercare instructions to support optimal results.",
      }),
    },
  ],

  "facials-skin-health": [
    {
      name: "Purifying Pore Refinement Hydrafacial",
      slug: "purifying-facial",
      shortDescription:
        "Deep cleansing facial with customized LED light therapy to clarify, refresh, and revitalize congested skin.",
      price: "$169",
      image: "/images/treatments/hydrafacial-main.png",
      popular: true,
      order: 1,
      bookingUrl:
        "https://www.fresha.com/en-GB/a/lumina-medi-spa-mississauga-42-village-centre-place-d6pg69mk/booking?offerItems=sv%3A24705991",
      sections: buildSections({
        hero: {
          content:
            "Deep cleansing facial with customized LED light therapy to clarify, refresh, and revitalize congested skin.",
          image: "/images/treatments/hydrafacial-main.png",
        },
        about: {
          content:
            "The Purifying Deep Clean Facial is a medical-grade treatment designed to deeply cleanse, exfoliate, and purify the skin. Customized LED light therapy is included to target concerns such as acne, congestion, inflammation, and dullness while supporting healthier-looking skin.\n\nThis facial is ideal for acne-prone, oily, or congested skin types and includes professional extractions to help remove buildup and impurities. LED therapy is customized based on your skin concerns, including calming inflammation, supporting skin healing, and improving overall skin clarity.",
        },
        idealFor:
          "Acne-prone, oily, or congested skin needing a deeper cleanse and targeted care. Perfect for those looking to improve skin clarity, reduce buildup, and support a more balanced complexion.",
        recovery:
          "No downtime required. Mild redness or sensitivity may occur after extractions and typically resolves within a few hours. Most clients can return to normal activities immediately following treatment.",
      }),
    },
    {
      name: "Hydra Glow Rejuvenating Hydrafacial",
      slug: "hydra-glow-facial",
      shortDescription:
        "An advanced hydrating facial combining deep cleansing, exfoliation, nourishment, and customized LED light therapy.",
      price: "$169",
      image: "/images/treatments/hydrafacial-main.png",
      order: 2,
      bookingUrl: `${FRESHA_MAIN}?service=s%3A21556191`,
      sections: buildSections({
        hero: {
          content:
            "An advanced hydrating facial combining deep cleansing, exfoliation, nourishment, and customized LED light therapy to restore skin hydration, smoothness, and radiance.",
          image: "/images/treatments/hydrafacial-main.png",
        },
        about: {
          content:
            "The Hydra Glow Rejuvenating Hydrafacial is a deeply nourishing treatment designed to cleanse, exfoliate, and hydrate the skin while supporting a healthy skin barrier. Customized LED light therapy is incorporated to help calm inflammation, support collagen production, and enhance overall skin quality.\n\nFinished with a hydrating, skin-nourishing cream enriched with advanced ingredients, this facial leaves the complexion feeling refreshed, smoother, and revitalized. Ideal whenever your skin needs gentle rejuvenation and hydration.",
        },
        benefits: {
          items: [
            "Deeply hydrates and replenishes the skin",
            "Gently exfoliates to improve texture and smoothness",
            "Supports a healthy skin barrier",
            "Helps calm the appearance of redness and inflammation",
            "Customized LED light therapy to target skin concerns",
            "Promotes a refreshed, radiant complexion",
            "Suitable for post-procedure skin maintenance",
            "No downtime required",
          ],
        },
        idealFor:
          "All skin types, especially those experiencing dehydration, dullness, sensitivity, or compromised skin barrier concerns. Perfect for clients seeking gentle rejuvenation, improved skin texture, or post-treatment skin support.",
        recovery:
          "No downtime required. Skin may appear slightly pink or feel mildly sensitive immediately after treatment, which typically resolves quickly. Avoid harsh exfoliants and follow your provider's recommended skincare routine to support optimal results.",
      }),
    },
    {
      name: "Signature Relaxation Facial",
      slug: "relaxation-facial",
      shortDescription:
        "Medical-grade skincare combined with a soothing face and neck massage for a deeply restorative treatment experience.",
      price: "$145",
      image: "/images/treatments/signature-relaxation-facial.png",
      order: 3,
      bookingUrl: `${FRESHA_MAIN}?service=s%3A21556106`,
      sections: buildSections({
        hero: {
          content:
            "Medical-grade skincare combined with a soothing face and neck massage for a deeply restorative treatment experience.",
          image: "/images/treatments/signature-relaxation-facial.png",
        },
        about: {
          content:
            "Our Signature Relaxation Facial combines professional-grade skincare with a therapeutic face and neck massage to hydrate, nourish, and revitalize the skin. This customized treatment is designed to address your skin's unique needs while providing a calming and restorative experience.\n\nSuitable for all skin types, this facial helps promote relaxation while leaving your skin feeling refreshed, hydrated, and renewed.",
        },
        benefits: {
          items: [
            "Deeply hydrates and nourishes the skin",
            "Customized skincare based on your skin type and concerns",
            "Soothing face and neck massage",
            "Helps relieve facial tension and promote relaxation",
            "Supports circulation and skin vitality",
            "Enhances skin smoothness and radiance",
            "No downtime required",
          ],
        },
        idealFor:
          "All skin types, especially those seeking hydration, relaxation, and a customized skincare experience. Perfect as a regular maintenance treatment or a moment of self-care.",
        recovery:
          "No downtime required. Mild redness may occur after massage or exfoliation and typically resolves quickly. Clients can return to their normal activities immediately after treatment.",
      }),
    },
    {
      name: "Glow & Go Facial",
      slug: "glow-and-go-facial",
      shortDescription:
        "An express facial designed to refresh, cleanse, and hydrate your skin when you're short on time.",
      price: "$95",
      image: "/images/treatments/signature-relaxation-facial.png",
      order: 4,
      bookingUrl: `${FRESHA_MAIN}?service=s%3A21760561`,
      sections: buildSections({
        hero: {
          content:
            "An express facial designed to refresh, cleanse, and hydrate your skin when you're short on time.",
          image: "/images/treatments/signature-relaxation-facial.png",
        },
        about: {
          content:
            "The Glow & Go Facial is a quick yet effective treatment designed to refresh your complexion in just 30 minutes. This express facial includes customized cleansing, gentle exfoliation, and targeted skincare to leave your skin feeling clean, hydrated, and revitalized.\n\nPerfect for busy schedules, a midday refresh, or before a special event, this treatment provides a convenient way to maintain healthy-looking skin with minimal downtime.",
        },
        benefits: {
          items: [
            "Quick 30-minute skin refresh",
            "Deep cleansing and gentle exfoliation",
            "Helps improve skin hydration and smoothness",
            "Customized to your skin type and concerns",
            "Leaves skin feeling refreshed and revitalized",
            "Perfect before special occasions",
            "No downtime required",
          ],
        },
        idealFor:
          "All skin types, especially those looking for a convenient maintenance facial, a quick skin refresh, or a boost before an event. Ideal for clients who want effective skincare results with minimal time commitment.",
        recovery:
          "No downtime required. Mild redness may occur after exfoliation and typically resolves quickly. Clients can return to normal activities immediately following treatment.",
      }),
    },
    {
      name: "Package of Any Facial (5 Sessions)",
      slug: "facial-package-5",
      shortDescription: "Save with a package of any facial — 5 sessions.",
      price: "$575",
      image: "/images/treatments/signature-relaxation-facial.png",
      order: 5,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: { content: "Package of any facial — 5 sessions for ongoing skin health." },
        about: {
          content:
            "Commit to consistent skin care with a package of five facial sessions. Choose from our medical-grade facial menu and enjoy savings while maintaining healthier, clearer, more radiant skin over time.",
        },
      }),
    },
    {
      name: "Package of Any Facial (3 Sessions)",
      slug: "facial-package-3",
      shortDescription: "Save with a package of any facial — 3 sessions.",
      price: "$375",
      image: "/images/treatments/signature-relaxation-facial.png",
      order: 6,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: { content: "Package of any facial — 3 sessions." },
        about: {
          content:
            "A three-session facial package designed for consistent results and better value. Ideal for building a skincare routine with customized medical-grade facials.",
        },
      }),
    },
    {
      name: "Package of Any Facial (2 Sessions)",
      slug: "facial-package-2",
      shortDescription: "Save with a package of any facial — 2 sessions.",
      price: "$270",
      image: "/images/treatments/signature-relaxation-facial.png",
      order: 7,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: { content: "Package of any facial — 2 sessions." },
        about: {
          content:
            "A two-session facial package for flexible maintenance and introductory value across our medical-grade facial menu.",
        },
      }),
    },
  ],

  "microneedling-skin-resurfacing": [
    {
      name: "Microneedling",
      slug: "microneedling",
      shortDescription:
        "Collagen-stimulating treatment to improve skin texture, minimize the appearance of pores, and reduce the appearance of scars and fine lines.",
      price: "From $199",
      image: "/images/treatments/microneedling-main.png",
      beforeImage: "/images/gallery/gallery-1.jpg",
      afterImage: "/images/treatments/microneedling.jpg",
      popular: true,
      order: 1,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Collagen-stimulating treatment to improve skin texture, minimize the appearance of pores, and reduce the appearance of scars and fine lines.",
          image: "/images/treatments/microneedling-main.png",
        },
        about: {
          content:
            "Microneedling is an advanced skin rejuvenation treatment that uses fine needles to create controlled micro-injuries in the skin, stimulating the body's natural healing response and supporting collagen and elastin production.\n\nTreatment can be customized for the face or face and neck to improve skin texture, refine the appearance of pores, soften fine lines, and reduce the appearance of acne scars and uneven skin tone. Results develop gradually over several weeks as collagen production increases, revealing smoother and more refreshed-looking skin.",
        },
        benefits: {
          items: [
            "Reduces the appearance of acne scars and textural irregularities",
            "Minimizes the appearance of enlarged pores",
            "Improves fine lines and uneven texture",
            "Enhances skin firmness and smoothness",
            "Stimulates collagen and elastin production",
            "Suitable for many skin types and concerns",
            "Minimal downtime",
            "Gradual, natural-looking improvement",
          ],
        },
        idealFor:
          "Clients looking to improve acne scarring, enlarged pores, uneven texture, fine lines, or overall skin quality. Ideal for those seeking smoother, firmer, and more refined-looking skin.",
        recovery:
          "Mild redness, sensitivity, and a warm or tight feeling may occur for 24–48 hours following treatment. Skin may experience mild dryness or flaking over the following days as it renews. Avoid direct sun exposure, harsh skincare products, and follow your provider's post-treatment recommendations to support optimal healing.",
      }),
    },
    {
      name: "BBL/IPL Photofacial",
      slug: "ipl-photofacial",
      shortDescription:
        "Advanced light-based treatments designed to improve sun damage, pigmentation, redness, acne, and overall skin clarity.",
      price: "From $149",
      image: "/images/treatments/led-therapy-facial.png",
      beforeImage: "/images/gallery/gallery-7.jpg",
      afterImage: "/images/treatments/ipl-photofacial.jpg",
      popular: true,
      order: 2,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          title: "IPL & BBL Photofacial",
          content:
            "Advanced light-based treatments designed to improve sun damage, pigmentation, redness, acne, and overall skin clarity.",
          image: "/images/treatments/led-therapy-facial.png",
        },
        about: {
          content:
            "IPL (Intense Pulsed Light) and BBL (BroadBand Light) Photofacials use controlled pulses of light energy to target pigmentation, sun damage, redness, visible blood vessels, and acne-related concerns. The light energy is absorbed by areas of excess pigment and vascular concerns while also helping reduce acne-causing bacteria and inflammation, promoting a clearer, healthier-looking complexion.",
        },
        benefits: {
          items: [
            "Reduces the appearance of sun damage and age spots",
            "Improves uneven pigmentation and skin tone",
            "Helps minimize redness and visible blood vessels",
            "Helps reduce active acne breakouts and calm acne-related inflammation",
            "Reduces the appearance of freckles and brown spots",
            "Enhances overall skin clarity and texture",
            "Stimulates a healthier-looking complexion",
            "Quick treatment with minimal downtime",
            "Gradual, natural-looking improvement",
          ],
        },
        idealFor:
          "Clients looking to improve sun damage, pigmentation, redness, visible capillaries, acne, or uneven skin tone. Ideal for those seeking a non-invasive treatment to restore clearer, healthier-looking skin.",
        recovery:
          "Minimal downtime required. Mild redness, warmth, or sensitivity may occur for a few hours following treatment. Pigmented areas may temporarily darken before naturally shedding over 1–2 weeks. Avoid sun exposure and follow your provider's recommended aftercare instructions to support optimal results.",
      }),
    },
  ],

  "laser-hair-removal": [
    {
      name: "Small Area Laser Hair Removal (Chin OR Upper Lip)",
      slug: "small-area",
      shortDescription:
        "Targeted laser hair reduction for unwanted facial hair, helping you achieve smoother skin with less frequent shaving or waxing.",
      price: "$55",
      hidePrice: false,
      image: "/images/treatments/laser-hair-removal.png",
      order: 1,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Targeted laser hair reduction for unwanted facial hair, helping you achieve smoother skin with less frequent shaving or waxing.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "Medical-grade laser hair removal uses focused light energy to target hair follicles and reduce unwanted hair growth over time. This quick treatment is designed for small facial areas such as the upper lip and chin, providing a convenient solution for smoother, longer-lasting results.\n\nMost clients require a series of treatments to achieve optimal hair reduction, as hair growth cycles vary. Treatments are quick, comfortable, and require minimal downtime.",
        },
        benefits: {
          items: [
            "Long-lasting reduction of unwanted facial hair",
            "Reduces the need for frequent shaving or waxing",
            "Helps minimize the appearance of ingrown hairs",
            "Quick treatment sessions",
            "Minimal discomfort",
            "No downtime required",
          ],
        },
        idealFor:
          "Clients looking to reduce unwanted hair on the chin or upper lip area. Ideal for those seeking smoother skin and a convenient alternative to regular shaving, waxing, or threading.",
        recovery:
          "No downtime required. Mild redness, warmth, or sensitivity may occur in the treated area for a few hours and typically resolves quickly. Avoid sun exposure and follow your provider's aftercare recommendations.",
      }),
    },
    {
      name: "Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
      slug: "medium-area",
      shortDescription:
        "Effective laser hair reduction for medium-sized areas, helping you achieve smoother skin with less maintenance.",
      price: "$88",
      hidePrice: false,
      image: "/images/treatments/laser-hair-removal.png",
      order: 2,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Effective laser hair reduction for medium-sized areas, helping you achieve smoother skin with less maintenance.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "Medical-grade laser hair removal uses targeted light energy to heat and disable hair follicles, helping reduce unwanted hair growth over time. Medium-area treatments are designed for zones such as the underarms, arms, half legs, abdomen, and bikini area, providing a convenient alternative to regular shaving, waxing, or other hair removal methods.\n\nMost clients require a series of treatments to achieve optimal hair reduction, as hair growth cycles vary. Treatments are efficient, comfortable, and require minimal downtime.",
        },
        benefits: {
          items: [
            "Long-lasting reduction of unwanted hair",
            "Smooths medium-sized treatment areas",
            "Reduces the need for shaving and waxing",
            "Helps minimize ingrown hairs",
            "Quick and convenient treatments",
            "Minimal discomfort",
            "No downtime required",
          ],
        },
        idealFor:
          "Clients looking to reduce unwanted hair on areas such as the underarms, arms, half legs, abdomen, or bikini line. Ideal for those seeking smoother skin and a longer-lasting alternative to traditional hair removal methods.",
        recovery:
          "No downtime required. Mild redness, warmth, or sensitivity may occur in the treated area for a few hours and typically resolves quickly. Avoid sun exposure before and after treatment and follow your provider's aftercare recommendations.",
      }),
    },
    {
      name: "Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
      slug: "large-area",
      shortDescription:
        "Advanced laser hair reduction for larger treatment areas, helping you achieve smoother skin with less ongoing maintenance.",
      price: "$150",
      hidePrice: false,
      image: "/images/treatments/laser-hair-removal.png",
      order: 3,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Advanced laser hair reduction for larger treatment areas, helping you achieve smoother skin with less ongoing maintenance.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "Medical-grade laser hair removal uses targeted light energy to heat and disable hair follicles, helping reduce unwanted hair growth over time. Large-area treatments are designed for zones such as the full legs, back, chest, and Brazilian area, providing an effective alternative to frequent shaving, waxing, or other temporary hair removal methods.\n\nMost clients require a series of treatments to achieve optimal hair reduction, as hair growth cycles vary. With advanced technology designed for comfort and efficiency, larger areas can be treated quickly with minimal downtime.",
        },
        benefits: {
          items: [
            "Long-lasting reduction of unwanted hair",
            "Smooths larger treatment areas efficiently",
            "Reduces the need for frequent shaving or waxing",
            "Helps minimize ingrown hairs",
            "Comfortable treatment with minimal downtime",
            "Saves time compared to traditional hair removal methods",
            "Gradual, natural-looking improvement",
          ],
        },
        idealFor:
          "Clients looking to reduce unwanted hair on larger areas such as the full legs, back, chest, or Brazilian area. Ideal for those seeking smoother skin and a convenient, long-term alternative to regular shaving or waxing.",
        recovery:
          "No downtime required. Mild redness, warmth, or sensitivity may occur in treated areas for a few hours and typically resolves quickly. Avoid sun exposure before and after treatment and follow your provider's aftercare recommendations.",
      }),
    },
    {
      name: "Full Body Laser Hair Removal",
      slug: "full-body",
      shortDescription:
        "Comprehensive laser hair reduction for multiple treatment areas in one convenient session.",
      price: "$325",
      hidePrice: false,
      image: "/images/treatments/laser-hair-removal.png",
      popular: true,
      order: 4,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Comprehensive laser hair reduction for multiple treatment areas in one convenient session.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "Our Full Body Laser Hair Removal package combines multiple treatment areas into one efficient session using advanced medical-grade laser technology. This treatment is designed to reduce unwanted hair growth across major body areas, helping you achieve smoother skin with less maintenance over time.\n\nThis package includes areas such as the arms, legs, underarms, bikini area, and other eligible treatment zones (back excluded). A series of treatments is recommended to achieve optimal hair reduction, as hair growth cycles vary between individuals.",
        },
        benefits: {
          items: [
            "Treats multiple areas in one convenient session",
            "Long-lasting reduction of unwanted hair",
            "Reduces the need for shaving and waxing",
            "Cost-effective option for multiple treatment zones",
            "Helps minimize ingrown hairs",
            "Saves time with an all-in-one treatment",
            "Smooth, low-maintenance results",
            "Minimal downtime required",
          ],
        },
        idealFor:
          "Clients looking to reduce unwanted hair across multiple body areas and simplify their grooming routine. Ideal for those seeking a convenient option for comprehensive hair reduction with fewer ongoing maintenance treatments.",
        recovery:
          "No downtime required. Mild redness, warmth, or sensitivity may occur in treated areas for a few hours and typically resolves quickly. Avoid sun exposure before and after treatment and follow your provider's aftercare recommendations.",
      }),
    },
    {
      name: "Package of 6: Small Area Laser Hair Removal (Chin OR Upper Lip)",
      slug: "small-area-package-6",
      shortDescription:
        "Six sessions of small-area laser hair removal for the chin or upper lip — save with a package.",
      price: "$350",
      image: "/images/treatments/laser-hair-removal.png",
      order: 5,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Six sessions of small-area laser hair removal for the chin or upper lip — ideal for consistent results and better value.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "This package includes six laser hair removal sessions for one small area — chin or upper lip. A series of treatments is recommended for optimal hair reduction, as hair growth cycles vary between individuals. Packages offer savings compared to booking individual sessions.",
        },
        benefits: {
          items: [
            "Six sessions for one small treatment area",
            "Better value than booking sessions individually",
            "Supports consistent hair reduction over time",
            "Quick, convenient treatment sessions",
            "Minimal discomfort",
            "No downtime required",
          ],
        },
        idealFor:
          "Clients committed to a full course of small-area laser hair removal on the chin or upper lip who want package savings.",
        recovery:
          "No downtime required. Mild redness or sensitivity may occur for a few hours after each session. Avoid sun exposure and follow your provider's aftercare recommendations.",
      }),
    },
    {
      name: "Package of 6: Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
      slug: "medium-area-package-6",
      shortDescription:
        "Six sessions for one medium area — underarms, full arms, half legs, abdomen, or bikini.",
      price: "$479",
      image: "/images/treatments/laser-hair-removal.png",
      order: 6,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Six sessions of medium-area laser hair removal — choose underarms, full arms, half legs, abdomen, or bikini.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "This package includes six laser hair removal sessions for one medium-sized area. Choose from underarms, full arms, half legs, abdomen, or bikini. A series of treatments is recommended for optimal hair reduction. Packages offer savings compared to individual sessions.",
        },
        benefits: {
          items: [
            "Six sessions for one medium treatment area",
            "Package savings vs. individual sessions",
            "Long-lasting reduction of unwanted hair",
            "Reduces shaving and waxing maintenance",
            "Minimal discomfort",
            "No downtime required",
          ],
        },
        idealFor:
          "Clients planning a full course of medium-area laser hair removal who want consistent treatment and package value.",
        recovery:
          "No downtime required. Mild redness or sensitivity may occur for a few hours after each session. Avoid sun exposure and follow aftercare guidance.",
      }),
    },
    {
      name: "Package of 6: Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
      slug: "large-area-package-6",
      shortDescription:
        "Six sessions for one large area — full legs, back, chest, or Brazilian.",
      price: "$599",
      image: "/images/treatments/laser-hair-removal.png",
      order: 7,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Six sessions of large-area laser hair removal — full legs, back, chest, or Brazilian.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "This package includes six laser hair removal sessions for one large treatment area such as full legs, back, chest, or Brazilian. Most clients need a series of treatments for optimal results. Packages provide savings compared to booking sessions individually.",
        },
        benefits: {
          items: [
            "Six sessions for one large treatment area",
            "Cost-effective package pricing",
            "Efficient treatment of larger zones",
            "Long-lasting hair reduction",
            "Comfortable treatment with minimal downtime",
            "Gradual, natural-looking improvement",
          ],
        },
        idealFor:
          "Clients committed to comprehensive large-area laser hair removal who want package savings and consistent results.",
        recovery:
          "No downtime required. Mild redness or sensitivity may occur for a few hours after each session. Avoid sun exposure before and after treatment.",
      }),
    },
    {
      name: "Package of 6: Full Body Laser Hair Removal",
      slug: "full-body-package-6",
      shortDescription:
        "Six full-body laser hair removal sessions for comprehensive, long-term results.",
      price: "$1200",
      image: "/images/treatments/laser-hair-removal.png",
      order: 8,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Six full-body laser hair removal sessions — comprehensive hair reduction across multiple areas with package savings.",
          image: "/images/treatments/laser-hair-removal.png",
        },
        about: {
          content:
            "This package includes six full-body laser hair removal sessions covering multiple treatment areas in each visit (back excluded). A series of treatments is recommended for optimal hair reduction. This package offers significant savings for clients seeking comprehensive, long-term results.",
        },
        benefits: {
          items: [
            "Six full-body treatment sessions",
            "Best value for multiple treatment zones",
            "Treats major body areas in one session",
            "Reduces ongoing shaving and waxing",
            "Convenient all-in-one appointments",
            "Minimal downtime",
          ],
        },
        idealFor:
          "Clients seeking comprehensive body-wide laser hair removal who want the best package value over a full treatment course.",
        recovery:
          "No downtime required. Mild redness or sensitivity may occur for a few hours after each session. Avoid sun exposure and follow your provider's aftercare recommendations.",
      }),
    },
  ],

  "body-sculpting-contouring": [
    {
      name: "Muscle Toning with HIFEM (Single Area)",
      slug: "body-sculpting-hifem",
      shortDescription:
        "Non-invasive electromagnetic muscle toning for one target area such as the abdomen, glutes, or arms.",
      price: "$149",
      hidePrice: false,
      image: "/images/treatments/hifem-muscle-toning.png",
      beforeImage: "/images/gallery/gallery-4.jpg",
      afterImage: "/images/treatments/hifem-muscle-toning.png",
      popular: true,
      order: 1,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Non-invasive HIFEM muscle toning for one target area — tone, strengthen, and define with zero downtime.",
          image: "/images/treatments/hifem-muscle-toning.png",
        },
        about: {
          content:
            "HIFEM (High-Intensity Focused Electromagnetic) technology stimulates intense muscle contractions in a single targeted area. These contractions help support muscle strengthening, definition, and improved muscle tone without surgery, needles, or downtime.\n\nChoose one area such as the abdomen, glutes, or arms to complement your fitness routine and body contouring goals.",
        },
        benefits: {
          items: [
            "Helps tone and strengthen targeted muscles",
            "Supports improved muscle definition",
            "Non-invasive with no downtime",
            "Quick and convenient treatment sessions",
            "Complements a healthy lifestyle and fitness routine",
          ],
        },
        idealFor:
          "Clients looking to enhance muscle tone and definition in one targeted area. Ideal for those seeking a non-invasive option to complement their fitness goals.",
        recovery:
          "No downtime required. Some clients may experience temporary muscle fatigue or soreness similar to the feeling after exercise, which typically resolves within a short period.",
      }),
    },
    {
      name: "Package of 4: Muscle Toning with HIFEM (Single Area)",
      slug: "hifem-single-area-package-4",
      shortDescription:
        "Four sessions of single-area HIFEM muscle toning — save with a package.",
      price: "$449",
      image: "/images/treatments/hifem-muscle-toning.png",
      order: 2,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Four sessions of HIFEM muscle toning for one target area — ideal for consistent results and package savings.",
          image: "/images/treatments/hifem-muscle-toning.png",
        },
        about: {
          content:
            "This package includes four HIFEM muscle toning sessions for one target area such as the abdomen, glutes, or arms. A series of treatments supports stronger, more defined-looking muscles over time. Packages offer savings compared to booking individual sessions.",
        },
        benefits: {
          items: [
            "Four sessions for one treatment area",
            "Package savings vs. individual sessions",
            "Supports consistent muscle toning results",
            "Non-invasive with no downtime",
            "Complements your fitness routine",
          ],
        },
        idealFor:
          "Clients committed to a full course of single-area HIFEM muscle toning who want package value and consistent results.",
        recovery:
          "No downtime required. Temporary muscle fatigue or soreness may occur after sessions and typically resolves quickly.",
      }),
    },
    {
      name: "Muscle Toning with HIFEM (Two Areas)",
      slug: "hifem-two-areas",
      shortDescription:
        "HIFEM muscle toning for two target areas in one session — e.g. abdomen and glutes.",
      price: "$199",
      image: "/images/treatments/hifem-muscle-toning.png",
      order: 3,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "HIFEM muscle toning for two target areas in one session — tone and strengthen multiple zones with zero downtime.",
          image: "/images/treatments/hifem-muscle-toning.png",
        },
        about: {
          content:
            "This treatment uses HIFEM technology to stimulate muscle contractions in two target areas during one session — for example, abdomen and glutes, or arms and abdomen. It supports muscle strengthening and definition across multiple zones without surgery or downtime.",
        },
        benefits: {
          items: [
            "Treats two areas in one session",
            "Helps tone and strengthen targeted muscles",
            "Supports improved muscle definition",
            "Non-invasive with no downtime",
            "Efficient option for multiple treatment zones",
          ],
        },
        idealFor:
          "Clients looking to tone and define two body areas in one visit. Ideal for those seeking efficient, non-invasive muscle toning.",
        recovery:
          "No downtime required. Temporary muscle fatigue or soreness may occur and typically resolves within a short period.",
      }),
    },
    {
      name: "Package of 4: Muscle Toning with HIFEM (Two Areas)",
      slug: "hifem-two-areas-package-4",
      shortDescription:
        "Four sessions of two-area HIFEM muscle toning — save with a package.",
      price: "$599",
      image: "/images/treatments/hifem-muscle-toning.png",
      order: 4,
      bookingUrl: FRESHA_MAIN,
      sections: buildSections({
        hero: {
          content:
            "Four sessions of two-area HIFEM muscle toning — comprehensive results with package savings.",
          image: "/images/treatments/hifem-muscle-toning.png",
        },
        about: {
          content:
            "This package includes four HIFEM sessions treating two target areas per visit. A series of treatments supports stronger, more defined-looking muscles over time. Packages offer savings compared to booking individual two-area sessions.",
        },
        benefits: {
          items: [
            "Four two-area treatment sessions",
            "Best value for multi-zone muscle toning",
            "Supports consistent results over time",
            "Non-invasive with no downtime",
            "Complements your body contouring goals",
          ],
        },
        idealFor:
          "Clients committed to a full course of two-area HIFEM muscle toning who want package savings and consistent results.",
        recovery:
          "No downtime required. Temporary muscle fatigue or soreness may occur after sessions and typically resolves quickly.",
      }),
    },
  ],
};

