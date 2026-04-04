import { motion } from 'motion/react';
import { Activity, ArrowRight, Check, Users } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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

function MagneticCard({ image, title }: { image: string, title: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !btnRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate relative X and Y inside the card
    // Subtract 48 (half of the 96px width/height of the button) to center it on the cursor
    const x = e.clientX - rect.left - 48;
    const y = e.clientY - rect.top - 48;
    
    // Apply coordinates directly using vanilla JS style transform
    btnRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    btnRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.opacity = '0';
  };

  return (
    <a 
      href="#pricing"
      ref={cardRef}
      className="magnetic-card block relative overflow-hidden rounded-[2rem] aspect-[3/4] group border border-white/5 bg-white/5 cursor-none transition-all duration-300 ease-out active:scale-95"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/20 to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center p-6 z-20 pointer-events-none">
        <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-center text-stroke transition-all duration-500 group-hover:text-white group-hover:scale-110">{title}</h3>
      </div>
      
      {/* True Magnetic Button */}
      <div
        ref={btnRef}
        className="absolute top-0 left-0 w-24 h-24 bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-full flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 z-30 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
      >
        <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">View</span>
      </div>
    </a>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-white selection:bg-emerald-500/30 overflow-hidden cursor-none">
      <CustomCursor />
      
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-5 pointer-events-none" />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="font-display font-bold text-3xl tracking-widest uppercase">Nexus</div>
          <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-white/60">
            <a href="#classes" className="hover:text-white transition-all duration-300 ease-out active:scale-95">The Experience</a>
            <a href="#pricing" className="hover:text-white transition-all duration-300 ease-out active:scale-95">Membership</a>
          </div>
          <a href="#pricing" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300 ease-out active:scale-95">
            Join Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Text Content */}
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-7xl md:text-8xl lg:text-[130px] font-bold uppercase leading-[0.85] tracking-tighter"
            >
              Forge <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Your</span> <br />
              Legacy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 text-lg md:text-xl text-white/50 max-w-md font-light leading-relaxed"
            >
              Step into the ultimate arena. Unrivaled equipment, elite coaching, and a community of relentless achievers.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col sm:flex-row items-center gap-6"
            >
              <a href="#pricing" className="w-full sm:w-auto bg-emerald-500 text-black px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3">
                Start Trial <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#about" className="w-full sm:w-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 text-center flex items-center justify-center">
                View Facility
              </a>
            </motion.div>
          </div>

          {/* Image & Floating Badges */}
          <div className="relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10 opacity-80 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
                alt="Elite Gym Facility"
                className="w-full h-full object-cover object-center grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Spinning Circular Badge (SVG Path) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 z-30 w-32 h-32 md:w-40 md:h-40 animate-[spin_10s_linear_infinite]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-lg">
                <defs>
                  <path 
                    id="circlePath" 
                    d="M 50, 10 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80" 
                  />
                </defs>
                <text className="text-[10.5px] font-display font-bold uppercase tracking-[0.16em] fill-emerald-400">
                  <textPath href="#circlePath" startOffset="0%">
                    NEXUS FITNESS • UNLEASH YOUR POTENTIAL • 
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              </div>
            </motion.div>

            {/* Floating Badge 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-16 -right-4 md:-right-12 z-20 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center gap-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-3xl tracking-tight leading-none mb-1">500+</div>
                <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Elite Members</div>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-32 -left-4 md:-left-12 z-20 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center gap-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-3xl tracking-tight leading-none mb-1">24/7</div>
                <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Unrestricted Access</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Marquee */}
      <section className="w-full overflow-hidden bg-white/5 backdrop-blur-md border-y border-white/10 py-6 flex whitespace-nowrap relative z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center px-4">
              <span className="font-anton text-6xl md:text-8xl text-stroke-heavy uppercase tracking-tighter">
                ELITE COACHING • STATE OF THE ART FACILITY • 24/7 ACCESS •&nbsp;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Cinematic Collage */}
      <section id="about" className="relative py-32 px-6 bg-[#09090b]">
        {/* Cinematic Radial Backlight */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Typography */}
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Human</span> <br />
              Potential
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-8">
              We don't just build bodies; we forge iron-clad mindsets. Nexus is a sanctuary for the relentless, a proving ground where excuses die and legends are born. Our philosophy is simple: absolute dedication yields absolute results.
            </p>
            <a href="#classes" className="inline-block bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 text-center">
              Discover Our Ethos
            </a>
          </div>
          
          {/* Asymmetrical Collage */}
          <div className="grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
            <div className="relative overflow-hidden rounded-[2rem] h-full group">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" 
                alt="Training" 
                className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="relative overflow-hidden rounded-[2rem] h-full group">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
                  alt="Weights" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative overflow-hidden rounded-[2rem] h-full group">
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
                  alt="Focus" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Classes Grid */}
      <section id="classes" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
                Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Classes</span>
              </h2>
              <p className="mt-6 text-white/50 max-w-xl text-lg font-light">
                Push your limits with our specialized training programs designed for maximum performance and results.
              </p>
            </div>
            <a href="#pricing" className="inline-block bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95 shrink-0 text-center">
              View All Classes
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MagneticCard 
              image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
              title="Strength" 
            />
            <MagneticCard 
              image="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1469&auto=format&fit=crop" 
              title="Conditioning" 
            />
            <MagneticCard 
              image="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1470&auto=format&fit=crop" 
              title="Combat" 
            />
          </div>
        </div>
      </section>

      {/* Master Trainers Roster */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Trainers</span>
            </h2>
            <p className="mt-6 text-white/50 max-w-2xl mx-auto text-lg font-light">
              Learn from the best. Our elite roster of trainers brings decades of professional experience to forge your ultimate physique.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Marcus Vance', role: 'Head of Strength', image: 'https://images.unsplash.com/photo-1567013127542-490d732e6b2a?q=80&w=1470&auto=format&fit=crop' },
              { name: 'Elena Rostova', role: 'Combat Specialist', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop' },
              { name: 'David Chen', role: 'Conditioning Coach', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop' },
              { name: 'Sarah Jenkins', role: 'Mobility Expert', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' }
            ].map((trainer, i) => (
              <div key={i} className="relative overflow-hidden rounded-[2rem] group bg-white/[0.02] backdrop-blur-xl border border-white/10 p-4 flex flex-col transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-2 pb-2">
                  <h4 className="font-display text-2xl font-bold uppercase tracking-wider">{trainer.name}</h4>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">{trainer.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 px-6">
        {/* Cinematic Radial Backlight */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter">
              Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Tier</span>
            </h2>
            <p className="mt-8 text-white/50 max-w-2xl mx-auto text-lg font-light">
              No hidden fees. No compromises. Choose the membership that aligns with your ambition.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Tier 1 */}
            <div className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]">
              <div className="font-display text-2xl uppercase tracking-widest text-white/40 mb-4">Initiate</div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="font-display text-7xl font-bold tracking-tighter">$99</span>
                <span className="text-white/40 font-medium">/mo</span>
              </div>
              <ul className="space-y-5 mb-12">
                {['Full facility access', 'Locker room amenities', '1 Group class per week', 'Standard support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/70 font-light">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95">
                Select Initiate
              </button>
            </div>

            {/* Tier 2 (Popular) */}
            <div className="group relative bg-white/[0.02] backdrop-blur-xl border border-emerald-500/40 rounded-[2.5rem] p-12 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500 hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.4)] lg:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                Most Popular
              </div>
              <div className="font-display text-2xl uppercase tracking-widest text-emerald-400 mb-4">Ascend</div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="font-display text-8xl font-bold tracking-tighter">$189</span>
                <span className="text-white/40 font-medium">/mo</span>
              </div>
              <ul className="space-y-5 mb-12">
                {['24/7 Priority access', 'Premium recovery lounge', 'Unlimited group classes', '1 PT session per month', 'Nutrition consultation'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/90 font-light">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-emerald-500 text-black py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Select Ascend
              </button>
            </div>

            {/* Tier 3 */}
            <div className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]">
              <div className="font-display text-2xl uppercase tracking-widest text-white/40 mb-4">Apex</div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="font-display text-7xl font-bold tracking-tighter">$349</span>
                <span className="text-white/40 font-medium">/mo</span>
              </div>
              <ul className="space-y-5 mb-12">
                {['Everything in Ascend', 'Unlimited PT sessions', 'Private locker & laundry', 'Guest passes (4/mo)', 'Exclusive events access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/70 font-light">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 ease-out active:scale-95">
                Select Apex
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
