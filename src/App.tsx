import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Car, Coffee, Dumbbell, FlameKindling, Mail, MapPin, Music, Phone, Users, Waves } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────────────────
   Custom Cursor — visible only on non-touch devices via CSS
   ──────────────────────────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Bail out on touch devices — no need for mouse-tracking overhead
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isMagnetic = !!target.closest('.magnetic-card');
      const isClickable = !!target.closest('a, button');
      
      if (innerRef.current) {
        innerRef.current.style.opacity = isMagnetic ? '0' : '1';
        innerRef.current.style.transform = isClickable ? 'scale(1.5)' : 'scale(1)';
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{ transform: `translate3d(-100px, -100px, 0)` }}
    >
      <div 
        ref={innerRef}
        className="w-full h-full rounded-full bg-white transition-all duration-300 ease-out"
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Magnetic Card — hover effect on desktop, tap-safe on mobile
   ──────────────────────────────────────────────────────────── */
function MagneticCard({ image, title }: { image: string, title: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !cardRef.current || !btnRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left - 48;
    const y = e.clientY - rect.top - 48;
    
    btnRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    btnRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.opacity = '0';
  };

  return (
    <a 
      href="#classes"
      ref={cardRef}
      className={`magnetic-card block relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-[3/4] group border border-white/5 bg-white/5 transition-all duration-300 ease-out active:scale-[0.98] ${isTouchDevice ? 'cursor-pointer' : 'cursor-none'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110" 
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/20 to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 z-20 pointer-events-none">
        <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-center text-stroke transition-all duration-500 group-hover:text-white group-hover:scale-110">{title}</h3>
      </div>
      
      {/* Magnetic Button — desktop only */}
      {!isTouchDevice && (
        <div
          ref={btnRef}
          className="absolute top-0 left-0 w-24 h-24 bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-full flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 z-30 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        >
          <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">View</span>
        </div>
      )}
    </a>
  );
}

/* ────────────────────────────────────────────────────────────
   Mobile Menu Component
   ──────────────────────────────────────────────────────────── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 bg-[#09090b]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
        >
          {[
            { label: 'Facilities', href: '#facilities' },
            { label: 'Join Us', href: '#join' },
            { label: 'About', href: '#about' },
          ].map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={onClose}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-widest text-white/70 hover:text-white active:text-emerald-400 transition-colors duration-300"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#join"
            onClick={onClose}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 bg-emerald-500 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest active:scale-95 transition-all duration-300"
          >
            Book Free Trial
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────────
   Main App
   ──────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <CustomCursor />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      {/* Background Gradient — smaller on mobile */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-emerald-500 rounded-full blur-[100px] md:blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-500 rounded-full blur-[100px] md:blur-[150px] opacity-5 pointer-events-none" />
      
      {/* ═══════ Navbar ═══════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-2xl">
          <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-widest uppercase">Planet 5</div>
          
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-white/60">
            <a href="#facilities" className="hover:text-white transition-all duration-300 ease-out active:scale-95">Facilities</a>
            <a href="#join" className="hover:text-white transition-all duration-300 ease-out active:scale-95">Join Us</a>
          </div>
          
          {/* Desktop CTA */}
          <a href="#join" className="hidden md:inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300 ease-out active:scale-95">
            Book Free Trial
          </a>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className={`hamburger-btn md:hidden ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ═══════ Hero Section ═══════ */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-48 md:pb-24 px-4 sm:px-6 min-h-[100svh] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center w-full">
          {/* Text Content */}
          <div className="relative z-10">
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            >
              <a href="#join" className="w-full sm:w-auto bg-emerald-500 text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3">
                Book Free Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#facilities" className="w-full sm:w-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 text-center flex items-center justify-center">
                Explore Facility
              </a>
            </motion.div>
          </div>

          {/* Image & Floating Badges */}
          <div className="relative mt-4 sm:mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10 opacity-80 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
                alt="Elite Gym Facility"
                className="w-full h-full object-cover object-center grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </motion.div>

            {/* Spinning Circular Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-12 md:-left-12 z-30 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 animate-[spin_10s_linear_infinite]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-lg">
                <defs>
                  <path 
                    id="circlePath" 
                    d="M 50, 10 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80" 
                  />
                </defs>
                <text fontSize="9" fontFamily="Oswald, sans-serif" fontWeight="700" fill="#34d399" letterSpacing="2">
                  <textPath href="#circlePath" startOffset="0%">
                    PLANET 5 FITNESS • SINHAGAD ROAD PUNE
                  </textPath>
                </text>
              </svg>
              {/* Single glowing center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_4px_rgba(16,185,129,0.9)]" />
              </div>
            </motion.div>

            {/* Floating Badge 1 — 500+ Members */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 -right-2 sm:top-12 sm:-right-4 md:top-16 md:-right-12 z-20 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-3 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl flex items-center gap-3 sm:gap-4 md:gap-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-none mb-0.5 sm:mb-1">4.7★</div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold">852 Google Reviews</div>
              </div>
            </motion.div>

            {/* Floating Badge 2 — 30K Sq. Ft. */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-20 sm:bottom-24 md:bottom-32 -left-2 sm:-left-4 md:-left-12 z-20 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-3 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl flex items-center gap-3 sm:gap-4 md:gap-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight leading-none mb-0.5 sm:mb-1">30K</div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold">Sq. Ft. of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ Infinite Scrolling Marquee ═══════ */}
      <section className="w-full overflow-hidden bg-white/5 backdrop-blur-md border-y border-white/10 py-3 sm:py-4 md:py-6 relative z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-anton text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-stroke-heavy uppercase tracking-tighter inline-flex items-center shrink-0 px-6 sm:px-8">
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
            </span>
          ))}
        </div>
      </section>

      {/* ═══════ About Us Cinematic Collage ═══════ */}
      <section id="about" className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-[#09090b]">
        {/* Cinematic Radial Backlight */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-emerald-500/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          {/* Typography */}
          <div>
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
          </div>
          
          {/* Asymmetrical Collage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[350px] sm:h-[450px] md:h-[600px]">
            <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] h-full group">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" 
                alt="Training" 
                className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="grid grid-rows-2 gap-3 sm:gap-4 h-full">
              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] h-full group">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
                  alt="Weights" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] h-full group">
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
                  alt="Focus" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Elite Classes Grid ═══════ */}
      <section id="classes" className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Programs</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-white/50 max-w-xl text-base sm:text-lg font-light">
                From CrossFit to Zumba, our certified coaches run programs for every fitness level — beginner to advanced.
              </p>
            </div>
            <a href="#join" className="inline-block bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 shrink-0 text-center">
              Join Now
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          </div>
        </div>
      </section>

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

      {/* ═══════ Footer ═══════ */}
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
    </div>
  );
}
