# Planet 5 Fitness Club Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully rebrand the Nexus demo gym site to Planet 5 Fitness Club with real client info, updated sections, and a contact-based CTA replacing pricing tiers.

**Architecture:** All changes are confined to `src/App.tsx` — a single-file React app. We replace text content, update section structures, swap the trainers section for an amenities grid, and replace the pricing section with a contact CTA block. No new files, no architectural changes.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Framer Motion (motion/react), Lucide React icons

---

### Task 1: Navbar & Mobile Menu — rebrand to Planet 5

**Files:**
- Modify: `src/App.tsx` (Navbar section ~line 202–228, MobileMenu component ~line 121–175)

- [ ] **Step 1: Update navbar logo and links**

In the `<nav>` section (around line 204), change:
```tsx
// BEFORE
<div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-widest uppercase">Nexus</div>
// nav links
<a href="#classes" ...>The Experience</a>
<a href="#pricing" ...>Membership</a>
// CTA
<a href="#pricing" ...>Join Now</a>
```
```tsx
// AFTER
<div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-widest uppercase">Planet 5</div>
// nav links
<a href="#facilities" className="hover:text-white transition-all duration-300 ease-out active:scale-95">Facilities</a>
<a href="#join" className="hover:text-white transition-all duration-300 ease-out active:scale-95">Join Us</a>
// CTA
<a href="#join" className="hidden md:inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300 ease-out active:scale-95">
  Book Free Trial
</a>
```

- [ ] **Step 2: Update MobileMenu links**

In `MobileMenu` component, change the links array (around line 142):
```tsx
// BEFORE
{ label: 'The Experience', href: '#classes' },
{ label: 'Membership', href: '#pricing' },
{ label: 'About', href: '#about' },
```
```tsx
// AFTER
{ label: 'Facilities', href: '#facilities' },
{ label: 'Join Us', href: '#join' },
{ label: 'About', href: '#about' },
```

And update the mobile CTA button (around line 160):
```tsx
// BEFORE
<motion.a href="#pricing" ...>Join Now</motion.a>
```
```tsx
// AFTER
<motion.a href="#join" onClick={onClose} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-4 bg-emerald-500 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest active:scale-95 transition-all duration-300">
  Book Free Trial
</motion.a>
```

- [ ] **Step 3: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: update navbar and mobile menu to Planet 5"
```

---

### Task 2: Hero Section — headline, badges, CTAs, spinning text

**Files:**
- Modify: `src/App.tsx` (Hero section ~line 231–345)

- [ ] **Step 1: Update hero headline and subtext**

Replace (around line 236–252):
```tsx
// BEFORE
<motion.h1 ...>
  Forge <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Your</span> <br />
  Legacy
</motion.h1>
<motion.p ...>
  Step into the ultimate arena. Unrivaled equipment, elite coaching, and a community of relentless achievers.
</motion.p>
```
```tsx
// AFTER
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  className="font-display text-[3.2rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-[130px] font-bold uppercase tracking-tighter"
>
  Where <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Fitness</span> <br />
  Meets Lifestyle
</motion.h1>
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
  className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl text-white/50 max-w-md font-light leading-relaxed"
>
  Step into 30,000 Sq. Ft. of pure fitness excellence — Sinhagad Road's biggest and most advanced fitness club. Built for beginners and pros alike.
</motion.p>
```

- [ ] **Step 2: Update hero CTA buttons**

Replace (around line 253–265):
```tsx
// BEFORE
<a href="#pricing" ...>Start Trial <ArrowRight .../></a>
<a href="#about" ...>View Facility</a>
```
```tsx
// AFTER
<a href="#join" className="w-full sm:w-auto bg-emerald-500 text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3">
  Book Free Trial <ArrowRight className="w-5 h-5" />
</a>
<a href="#facilities" className="w-full sm:w-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 text-center flex items-center justify-center">
  Explore Facility
</a>
```

- [ ] **Step 3: Update spinning badge text**

Replace (around line 300–304):
```tsx
// BEFORE
NEXUS FITNESS • UNLEASH YOUR POTENTIAL
```
```tsx
// AFTER
PLANET 5 FITNESS • SINHAGAD ROAD PUNE
```

- [ ] **Step 4: Update floating badges**

Badge 1 (top-right, ~line 312–326) — replace content:
```tsx
// BEFORE
<div className="font-display font-bold text-xl sm:text-2xl md:text-3xl ...">500+</div>
<div className="text-[8px] ... text-white/50 ...">Elite Members</div>
```
```tsx
// AFTER
<div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-none mb-0.5 sm:mb-1">4.7★</div>
<div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold">852 Google Reviews</div>
```

Badge 2 (bottom-left, ~line 328–342) — replace icon and content:
```tsx
// BEFORE (uses Activity icon)
<Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
<div ...>24/7</div>
<div ...>Unrestricted Access</div>
```
```tsx
// AFTER (uses Users icon — already imported)
<Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
<div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-none mb-0.5 sm:mb-1">30K</div>
<div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold">Sq. Ft. of Excellence</div>
```

- [ ] **Step 5: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: update hero section for Planet 5"
```

---

### Task 3: Marquee — update scrolling text

**Files:**
- Modify: `src/App.tsx` (Marquee section ~line 348–361)

- [ ] **Step 1: Replace marquee text content**

Find the marquee span (around line 351) and replace:
```tsx
// BEFORE
ELITE COACHING
<span ...> • </span>
STATE OF THE ART
<span ...> • </span>
24/7 ACCESS
<span ...> • </span>
```
```tsx
// AFTER
YOGA & ZUMBA
<span className="mx-4 sm:mx-6 text-emerald-400 not-italic"> • </span>
CROSSFIT & HIIT
<span className="mx-4 sm:mx-6 text-emerald-400 not-italic"> • </span>
PERSONAL TRAINING
<span className="mx-4 sm:mx-6 text-emerald-400 not-italic"> • </span>
STEAM ROOM
<span className="mx-4 sm:mx-6 text-emerald-400 not-italic"> • </span>
CAFÉ & LOUNGE
<span className="mx-4 sm:mx-6 text-emerald-400 not-italic"> • </span>
30,000 SQ FT
<span className="mx-4 sm:mx-6 text-emerald-400 not-italic"> • </span>
```

- [ ] **Step 2: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: update marquee text for Planet 5 services"
```

---

### Task 4: About Section — rebrand copy and link targets

**Files:**
- Modify: `src/App.tsx` (About section ~line 364–417)

- [ ] **Step 1: Update about headline and body copy**

Replace (around line 371–381):
```tsx
// BEFORE
<h2 ...>
  Redefining <br />
  <span ...>Human</span> <br />
  Potential
</h2>
<p ...>
  We don't just build bodies; we forge iron-clad mindsets...
</p>
<a href="#classes" ...>Discover Our Ethos</a>
```
```tsx
// AFTER
<h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8">
  Pune's Biggest <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Fitness</span> <br />
  Destination
</h2>
<p className="text-white/50 text-base sm:text-lg font-light leading-relaxed mb-6 md:mb-8">
  Planet 5 is more than a gym — it's a 30,000 sq. ft. fitness destination on Sinhagad Road, Pune. Whether you're a first-timer or a seasoned athlete, our state-of-the-art equipment, expert trainers, and vibrant community are here to push you further. More than just a gym — it's a destination for strength, energy, and transformation.
</p>
<a href="#facilities" className="inline-block bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 text-center">
  Explore Our Facility
</a>
```

- [ ] **Step 2: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: update about section for Planet 5"
```

---

### Task 5: Programs Section — update classes cards

**Files:**
- Modify: `src/App.tsx` (Classes section ~line 420–451)

- [ ] **Step 1: Update section heading and subtext**

Replace (around line 424–430):
```tsx
// BEFORE
<h2 ...>
  Elite <span ...>Classes</span>
</h2>
<p ...>Push your limits with our specialized training programs...</p>
<a href="#pricing" ...>View All Classes</a>
```
```tsx
// AFTER
<h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter">
  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Programs</span>
</h2>
<p className="mt-4 sm:mt-6 text-white/50 max-w-xl text-base sm:text-lg font-light">
  From CrossFit to Zumba, our certified coaches run programs for every fitness level — beginner to advanced.
</p>
```

Also update the "View All Classes" link to point to `#join`:
```tsx
<a href="#join" className="inline-block bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 shrink-0 text-center">
  Join Now
</a>
```

- [ ] **Step 2: Update MagneticCard entries**

Replace the three cards (around line 436–449):
```tsx
// BEFORE
<MagneticCard image="...strength..." title="Strength" />
<MagneticCard image="...conditioning..." title="Conditioning" />
<MagneticCard image="...combat..." title="Combat" />
```
```tsx
// AFTER
<MagneticCard
  image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
  title="Strength"
/>
<MagneticCard
  image="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1470&auto=format&fit=crop"
  title="Yoga & Zumba"
/>
<MagneticCard
  image="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1470&auto=format&fit=crop"
  title="Kickboxing"
/>
```

- [ ] **Step 3: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: update programs section for Planet 5"
```

---

### Task 6: Replace Trainers Section with Amenities Grid

**Files:**
- Modify: `src/App.tsx` (Trainers section ~line 453–490)
- Add import for additional Lucide icons at top of file

- [ ] **Step 1: Add required Lucide icon imports**

At the top of the file (line 2), expand the lucide-react import:
```tsx
// BEFORE
import { Activity, ArrowRight, Check, Users } from 'lucide-react';
```
```tsx
// AFTER
import { ArrowRight, Car, Check, Coffee, Dumbbell, FlameKindling, Music, Users, Waves } from 'lucide-react';
```

- [ ] **Step 2: Replace the entire trainers section**

Replace from `{/* ═══════ Master Trainers Roster ═══════ */}` to the closing `</section>` tag (lines ~453–490) with:

```tsx
{/* ═══════ World-Class Amenities ═══════ */}
<section id="facilities" className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto">
    <div className="mb-10 md:mb-16 text-center">
      <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter">
        World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Amenities</span>
      </h2>
      <p className="mt-4 sm:mt-6 text-white/50 max-w-2xl mx-auto text-base sm:text-lg font-light">
        Everything you need under one roof — Pune's most complete fitness facility.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {[
        { icon: <Dumbbell className="w-6 h-6 md:w-8 md:h-8" />, title: 'State-of-the-Art Equipment', desc: 'The latest machines and free weights for every muscle group.' },
        { icon: <Music className="w-6 h-6 md:w-8 md:h-8" />, title: 'Yoga & Zumba Studio', desc: 'Dedicated studios for yoga, Zumba, aerobics, and dance fitness.' },
        { icon: <FlameKindling className="w-6 h-6 md:w-8 md:h-8" />, title: 'CrossFit & HIIT Zone', desc: 'Functional training rigs and open floor for high-intensity workouts.' },
        { icon: <Waves className="w-6 h-6 md:w-8 md:h-8" />, title: 'Steam Room & Sauna', desc: 'Recover and relax in our premium steam and relaxation zones.' },
        { icon: <Coffee className="w-6 h-6 md:w-8 md:h-8" />, title: 'Café & Lounge', desc: 'Fuel up post-workout at our in-house café and lounge area.' },
        { icon: <Car className="w-6 h-6 md:w-8 md:h-8" />, title: 'Ample Parking', desc: 'Convenient, spacious parking available for all members.' },
      ].map((amenity, i) => (
        <div key={i} className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
            {amenity.icon}
          </div>
          <div>
            <h4 className="font-display text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider mb-1 sm:mb-2">{amenity.title}</h4>
            <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">{amenity.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: replace trainers with amenities grid for Planet 5"
```

---

### Task 7: Replace Pricing Section with Contact CTA

**Files:**
- Modify: `src/App.tsx` (Pricing section ~line 492–578)
- Add MapPin and Phone icons to import (already have Check — add Mail, MapPin, Phone)

- [ ] **Step 1: Expand Lucide imports further**

Update the import line (already modified in Task 6) to also include Mail, MapPin, Phone:
```tsx
// BEFORE (from Task 6)
import { ArrowRight, Car, Check, Coffee, Dumbbell, FlameKindling, Music, Users, Waves } from 'lucide-react';
```
```tsx
// AFTER
import { ArrowRight, Car, Check, Coffee, Dumbbell, FlameKindling, Mail, MapPin, Music, Phone, Users, Waves } from 'lucide-react';
```

- [ ] **Step 2: Replace entire pricing section**

Replace from `{/* ═══════ Pricing Section ═══════ */}` to its closing `</section>` tag (lines ~492–578) with:

```tsx
{/* ═══════ Start Your Journey — Contact CTA ═══════ */}
<section id="join" className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6">
  {/* Cinematic Radial Backlight */}
  <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-500/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

  <div className="max-w-4xl mx-auto relative z-10 text-center">
    {/* Badge */}
    <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6 md:mb-8">
      Free Trial Available
    </div>

    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter mb-6 md:mb-8">
      Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Transform?</span>
    </h2>

    <p className="text-white/50 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14">
      Visit us at Sinhagad Road or get in touch — our team will help you find the right program and get you started with a free trial session.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 mb-12 md:mb-16">
      <a
        href="tel:+919766025075"
        className="bg-emerald-500 text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3"
      >
        <Phone className="w-5 h-5" /> Call Us Now
      </a>
      <a
        href="https://wa.me/919766025075"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp Us
      </a>
    </div>

    {/* Contact Detail Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3 hover:border-emerald-500/30 transition-all duration-300">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
          <Phone className="w-5 h-5" />
        </div>
        <a href="tel:+919766025075" className="text-white/70 text-sm font-light hover:text-emerald-400 transition-colors">+91 97660 25075</a>
      </div>
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3 hover:border-emerald-500/30 transition-all duration-300">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
          <Mail className="w-5 h-5" />
        </div>
        <a href="mailto:Planet55fitness@gmail.com" className="text-white/70 text-sm font-light hover:text-emerald-400 transition-colors break-all">Planet55fitness@gmail.com</a>
      </div>
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3 hover:border-emerald-500/30 transition-all duration-300">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
          <MapPin className="w-5 h-5" />
        </div>
        <p className="text-white/70 text-sm font-light text-center leading-relaxed">2nd Floor, Dhareshwar Banquet Hall, Sinhgad Rd, Pune 411068</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: replace pricing with contact CTA section for Planet 5"
```

---

### Task 8: Footer — update branding and add contact info

**Files:**
- Modify: `src/App.tsx` (Footer ~line 580–586)

- [ ] **Step 1: Replace footer content**

Replace the entire footer (around line 581–586):
```tsx
// BEFORE
<footer className="relative border-t border-white/10 py-8 sm:py-10 md:py-12 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs sm:text-sm">
    <div className="font-display font-bold text-lg sm:text-xl tracking-widest uppercase">Nexus</div>
    <p>© {new Date().getFullYear()} Nexus Fitness. All rights reserved.</p>
  </div>
</footer>
```
```tsx
// AFTER
<footer className="relative border-t border-white/10 py-8 sm:py-10 md:py-12 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
    <div>
      <div className="font-display font-bold text-lg sm:text-xl tracking-widest uppercase text-white mb-1">Planet 5 Fitness</div>
      <p className="text-white/30 text-xs">Where Fitness Meets Lifestyle</p>
    </div>
    <div className="flex flex-col items-start sm:items-end gap-1 text-white/30 text-xs">
      <p>2nd Floor, Dhareshwar Banquet Hall, Sinhgad Rd, Pune 411068</p>
      <p>+91 97660 25075 · Planet55fitness@gmail.com</p>
      <p className="mt-2">© {new Date().getFullYear()} Planet 5 Fitness Club. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**
```bash
git add src/App.tsx
git commit -m "rebrand: update footer for Planet 5 Fitness Club"
```

---

### Task 9: Final cleanup — remove unused imports

**Files:**
- Modify: `src/App.tsx` (line 2)

- [ ] **Step 1: Verify and clean up imports**

After all tasks, the final import line should be:
```tsx
import { ArrowRight, Car, Check, Coffee, Dumbbell, FlameKindling, Mail, MapPin, Music, Phone, Users, Waves } from 'lucide-react';
```

The `Activity` icon is no longer used (replaced by `Users` in hero badge). Ensure it's not in the import.

- [ ] **Step 2: Run the dev server and verify visually**
```bash
npm run dev
```
Open `http://localhost:5173` and check:
- Navbar shows "Planet 5", links say "Facilities" / "Join Us", CTA says "Book Free Trial"
- Hero headline: "Where Fitness Meets Lifestyle", badges show 4.7★ and 30K
- Marquee shows Planet 5 services
- About section: "Pune's Biggest Fitness Destination"
- Programs: Strength / Yoga & Zumba / Kickboxing
- Amenities: 6 icon cards load correctly
- Contact section: Call and WhatsApp buttons work, 3 contact cards show
- Footer: Planet 5 branding with address

- [ ] **Step 3: Final commit**
```bash
git add src/App.tsx
git commit -m "rebrand: finalize Planet 5 Fitness Club demo — remove unused imports"
```
