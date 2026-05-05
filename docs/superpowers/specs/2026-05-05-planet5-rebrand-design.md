# Planet 5 Fitness Club — Full Rebrand Design Spec

**Date:** 2026-05-05  
**Project:** Nexus Gym demo → Planet 5 Fitness Club client demo  
**Scope:** Full rebrand of existing single-page React/Tailwind site. No architecture changes — edit `src/App.tsx` and `src/index.css` only.

---

## Client Info

| Field | Value |
|-------|-------|
| Name | Planet 5 Fitness Club |
| Owner | Ramesh Pasalkar |
| Phone | +91 97660 25075 |
| Email | Planet55fitness@gmail.com |
| Address | 2nd Floor, Dhareshwar Banquet Hall, Sinhgad Rd, Wadgaon Budruk, Dhayari Phata, Pune, Maharashtra 411068 |
| Google Rating | 4.7★ · 852 Reviews |
| Size | 30,000 Sq. Ft. |
| Hours | Open · Closes 11 PM |
| Tagline | Where Fitness Meets Lifestyle |

---

## Section-by-Section Changes

### 1. Navbar
- Logo text: `Planet 5` (same display font, same style)
- Nav links: "The Experience" → "Facilities" | "Membership" → "Join Us"
- Desktop CTA: "Book Free Trial"
- Mobile menu links: "Facilities", "Join Us" + "Book Free Trial" button

### 2. Hero Section
- Headline (3 lines): `Where / Fitness / Meets Lifestyle` — "Fitness" in emerald gradient
- Subtext: "Step into 30,000 Sq. Ft. of pure fitness excellence — Sinhagad Road's biggest and most advanced fitness club. Built for beginners and pros alike."
- CTA buttons: "Book Free Trial" (primary) + "Explore Facility" (secondary, links to #facilities)
- Spinning badge text: `PLANET 5 FITNESS • SINHAGAD ROAD PUNE`
- Floating badge 1 (top-right): `4.7★` / `852 Google Reviews`
- Floating badge 2 (bottom-left): `30K` / `Sq. Ft. of Excellence`
- Hero image: keep existing Unsplash gym image (or swap to a more relevant one)

### 3. Marquee
- Updated text loop: `YOGA & ZUMBA • CROSSFIT • PERSONAL TRAINING • STEAM ROOM • CAFÉ & LOUNGE • 30,000 SQ FT •`

### 4. About Section
- Headline: `Pune's Biggest / Fitness / Destination` — "Fitness" in emerald gradient
- Body: "Planet 5 is more than a gym — it's a 30,000 sq. ft. fitness destination on Sinhagad Road, Pune. Whether you're a first-timer or a seasoned athlete, our state-of-the-art equipment, expert trainers, and vibrant community are here to push you further."
- Button: "Explore Our Facility" → `#facilities`
- Collage images: keep existing (generic gym imagery works fine for demo)

### 5. Classes Section → "Our Programs"
- Section heading: `Our Programs`
- 3 MagneticCard entries:
  1. Title: `Strength` — image: existing strength image
  2. Title: `Yoga & Zumba` — new Unsplash yoga image
  3. Title: `Kickboxing` — existing combat image
- Section subtext: "From CrossFit to Zumba, our certified coaches run programs for every fitness level."

### 6. Trainers Section → "World-Class Amenities" (`id="facilities"`)
- Section heading: `World-Class Amenities`
- Subtext: "Everything you need under one roof — Pune's most complete fitness facility."
- 6 amenity cards in a 2×3 or 3×2 grid (responsive: 2 cols mobile, 3 cols desktop):
  1. 🏋️ **State-of-the-Art Equipment** — "The latest machines and free weights for every muscle group."
  2. 🧘 **Yoga & Zumba Studio** — "Dedicated studios for yoga, Zumba, aerobics, and dance fitness."
  3. 💪 **CrossFit & HIIT Zone** — "Functional training rigs and open floor for high-intensity workouts."
  4. 🧖 **Steam Room & Sauna** — "Recover and relax in our premium steam and relaxation zones."
  5. ☕ **Café & Lounge** — "Fuel up post-workout at our in-house café and lounge area."
  6. 🚗 **Ample Parking** — "Convenient, spacious parking available for all members."
- Card style: same glassmorphism card style as trainer cards (border, backdrop-blur, hover emerald glow) but icon-based instead of image

### 7. Pricing Section → "Start Your Journey" (`id="join"`)
- Remove all pricing tiers
- Full-width CTA block, centered:
  - Badge: "Free Trial Available"
  - Headline: `Ready to Transform?`
  - Subtext: "Visit us at Sinhagad Road or get in touch — our team will help you find the right program."
  - Two primary buttons:
    - "Call Us Now" → `tel:+919766025075`
    - "WhatsApp Us" → `https://wa.me/919766025075`
  - Contact detail cards below buttons (3 cards in a row, stacked on mobile):
    - 📞 +91 97660 25075
    - ✉️ Planet55fitness@gmail.com
    - 📍 2nd Floor, Dhareshwar Banquet Hall, Sinhgad Rd, Pune 411068

### 8. Footer
- Logo: `Planet 5 Fitness`
- Left: logo + tagline "Where Fitness Meets Lifestyle"
- Right: address, phone, email (small text, white/30)
- Bottom: `© 2026 Planet 5 Fitness Club. All rights reserved.`

---

## What Does NOT Change
- Overall color scheme: black (`#09090b`) + emerald green
- Typography: Oswald/display font + font weights
- Animations: motion/react entrance animations, marquee, magnetic cards, custom cursor
- Layout structure and component architecture
- Mobile responsiveness patterns

---

## Files to Edit
- `src/App.tsx` — all content and section changes
- No CSS changes needed unless a new icon style requires it
