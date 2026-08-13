# Treatment Images Mapping

This document shows where each treatment image is used in the application.

## Image File Names and Locations

All images are located in: `/public/images/treatments/`

### ✅ Injectables & Wrinkle Relaxers (2 images)
- **botox.jpg** → Used in:
  - `/services/injectables-wrinkle-relaxers` (category page)
  - `/services/injectables-wrinkle-relaxers/botox` (detail page)
  
- **dysport.jpg** → Used in:
  - `/services/injectables-wrinkle-relaxers` (category page)
  - `/services/injectables-wrinkle-relaxers/dysport-nuceiva` (detail page)

### ✅ Dermal Fillers & Skin Boosters (3 images)
- **dermal-fillers.jpg** → Used in:
  - `/services/dermal-fillers-skin-boosters` (category page)
  - `/services/dermal-fillers-skin-boosters/dermal-fillers` (detail page)
  
- **lip-filler.jpg** → Used in:
  - `/services/dermal-fillers-skin-boosters` (category page)
  - Related treatments section
  
- **skin-boosters.jpg** → Used in:
  - `/services/dermal-fillers-skin-boosters` (category page)
  - Related treatments section

### ✅ Facials & Skin Health (3 images)
- **purifying-facial.jpg** → Used in:
  - `/services/facials-skin-health` (category page)
  
- **relaxation-facial.jpg** → Used in:
  - `/services/facials-skin-health` (category page)
  
- **chemical-peel.jpg** → Used in:
  - `/services/facials-skin-health` (category page)

### ✅ Microneedling & Skin Resurfacing (2 images)
- **microneedling.jpg** → Used in:
  - `/services/microneedling-skin-resurfacing` (category page)
  - `/services/microneedling-skin-resurfacing/microneedling` (detail page)
  
- **ipl-photofacial.jpg** → Used in:
  - `/services/microneedling-skin-resurfacing` (category page)
  - `/services/microneedling-skin-resurfacing/ipl-photofacial` (detail page)

### ✅ Laser Hair Removal (3 images)
- **laser-face.jpg** → Used in:
  - `/services/laser-hair-removal` (category page for small area)
  
- **laser-legs.jpg** → Used in:
  - `/services/laser-hair-removal` (category page for large area)
  
- **laser-full-body.jpg** → Used in:
  - `/services/laser-hair-removal` (category page for full body)

### ✅ Body Sculpting & Contouring (1 image)
- **emsculpt.jpg** → Used in:
  - `/services/body-sculpting-contouring` (category page)

## Image Requirements

- **Format**: JPG (converted from PNG)
- **Aspect Ratio**: 16:10 (recommended)
- **Color Scheme**: Warm beige (#FAF4EB) and gold (#C4972F)
- **Style**: Professional medical spa aesthetic

## Total Images
- ✅ 14 treatment images (all uploaded and mapped)
- All images are correctly named and placed
- All images are referenced in the code with correct paths

## Notes
- All image paths in the code use: `/images/treatments/[filename].jpg`
- Images are optimized using Next.js Image component
- Lazy loading is enabled for better performance
