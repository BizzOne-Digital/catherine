const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../public/images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

function makeSVG(label, bg = "#15110D", accent = "#D6B56D") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="${bg}"/>
  <rect x="0" y="0" width="800" height="600" fill="url(#grad)" opacity="0.4"/>
  <defs>
    <radialGradient id="grad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <line x1="380" y1="260" x2="420" y2="260" stroke="${accent}" stroke-width="1" opacity="0.6"/>
  <line x1="400" y1="240" x2="400" y2="280" stroke="${accent}" stroke-width="1" opacity="0.4"/>
  <text x="400" y="320" font-family="serif" font-size="18" fill="${accent}" text-anchor="middle" opacity="0.7">${label}</text>
  <text x="400" y="345" font-family="sans-serif" font-size="11" fill="${accent}" text-anchor="middle" opacity="0.4" letter-spacing="4">LUMINA MEDI SPA</text>
</svg>`;
}

const placeholders = [
  ["placeholder-service", "Treatment", "#15110D"],
  ["placeholder-product", "Product", "#15110D"],
  ["placeholder-blog", "Article", "#15110D"],
  ["placeholder-gallery", "Gallery", "#0E0B08"],
  ["hero-bg", "Lumina Medi Spa", "#080604"],
];

placeholders.forEach(([name, label, bg]) => {
  const file = path.join(imagesDir, `${name}.svg`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, makeSVG(label, bg));
    console.log(`Created: ${name}.svg`);
  }
});

console.log("✓ Placeholder images ready.");
console.log("→ Place your logo.png in public/images/logo.png");
