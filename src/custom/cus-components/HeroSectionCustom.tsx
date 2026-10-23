import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Star, 
  ChevronRight, 
  Truck, 
  Leaf, 
  CreditCard 
} from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  label: string;
}

const FeatureItem = ({ icon, label }: FeatureItemProps) => (
  <div className="flex flex-col items-center gap-2 text-center group">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-black/60 text-amber-400 shadow-inner backdrop-blur-md transition-all duration-300 group-hover:border-amber-400 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
      {icon}
    </div>
    <span className="text-xs sm:text-sm font-medium tracking-wide text-amber-100/90">
      {label}
    </span>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0c0d10] text-amber-50 pt-10 pb-16 selection:bg-amber-500 selection:text-black">
      {/* ================= RIGHT-ALIGNED BACKGROUND IMAGE LAYER (70% WIDTH) ================= */}
      <div className="pointer-events-none absolute right-0 top-60 md:top-0 bottom-0 z-0 w-full sm:w-[85%] lg:w-[70%] overflow-hidden">
    
        <Image
          src="/images/hero-15.jpg"
          alt="Artisanal Italian Pizza Background"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover object-center lg:object-[center_center]"
        />

        {/* 1. Ultra-light dark tint to maintain natural photo vibrancy */}
        <div className="absolute inset-0 bg-[#0c0d10]/15" />

        {/* 2. Left-Edge Feather: Melts seamlessly into the left black text column */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d10] via-[#0c0d10]/70 via-25% to-transparent" />

        {/* 3. Top & Bottom Smooth Blends */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10]/75 via-transparent via-15% to-[#0c0d10] to-95%" />

        {/* 4. Warm Hearth Glow Overlay over Pizza */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(245,158,11,0.18)_0%,transparent_65%)] mix-blend-screen" />
      </div>

      {/* Decorative Italian Corner Filigrees */}
      <div className="pointer-events-none absolute top-4 left-4 h-16 w-16 border-t-2 border-l-2 border-amber-500/30 z-20" />
      <div className="pointer-events-none absolute top-4 right-4 h-16 w-16 border-t-2 border-r-2 border-amber-500/30 z-20" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-16 w-16 border-b-2 border-l-2 border-amber-500/30 z-20" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 border-b-2 border-r-2 border-amber-500/30 z-20" />

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Main Grid: Left copy (clear background), Right visual showcase (over image) */}
        <div className="grid min-h-[640px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] pt-4">
          
          {/* Left Column (Positioned in the solid dark region) */}
          <div className="relative z-10 max-w-xl text-left">
            
            {/* Top Italian Heritage Badge */}
            <div className="mb-6 inline-flex flex-col items-center rounded-2xl border border-amber-500/30 bg-[#141215]/90 px-6 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <span className="font-serif italic text-xs tracking-wider text-amber-200/90">
                El auténtico sabor italiano
              </span>
              <div className="mt-1 flex h-1 w-16 overflow-hidden rounded-full">
                <span className="w-1/3 bg-[#008C45]" />
                <span className="w-1/3 bg-[#F4F5F0]" />
                <span className="w-1/3 bg-[#CD212A]" />
              </div>
            </div>

            {/* Small Top Tagline Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-950/60 px-3.5 py-1 text-xs font-medium text-amber-300 backdrop-blur-md">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-black">
                ✓
              </span>
              Delicious food, delivered fresh
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[clamp(2.8rem,5.5vw,5.2rem)] font-extrabold leading-[0.98] tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              Pizzeria <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]">
                Milano Segle
              </span>
            </h1>

            {/* Sub-headline / Italian motto */}
            <p className="mt-2 font-serif italic text-base text-amber-300/90 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Masa fina y fresca cada día
            </p>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-200 font-normal max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Fresh ingredients, bold flavors, and your favorite meals delivered straight to your door. Order something delicious today.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#order_now"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 px-8 py-3.5 text-base font-bold text-black shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(245,158,11,0.65)]"
              >
                <span>Order Now</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </span>
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-[#121318]/90 px-8 py-3.5 text-base font-semibold text-amber-200 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-950/60 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                Menú Explorar
              </Link>
            </div>

            {/* Feature Icons Section */}
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-amber-500/20 pt-6">
              <FeatureItem icon={<Truck size={20} />} label="Fast Delivery" />
              <FeatureItem icon={<Leaf size={20} />} label="Fresh Food" />
              <FeatureItem icon={<CreditCard size={20} />} label="Secure Pay" />
            </div>
          </div>

          {/* Right Column: Floating Atmosphere Cards overlaid directly on the bright Pizza image */}
          <div className="relative flex min-h-[420px] lg:min-h-[520px] items-center justify-center">
            
            {/* Ambient Gold Radial Highlight */}
            <div className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[460px] sm:w-[460px] rounded-full border border-amber-400/20 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18)_0%,transparent_70%)] shadow-[0_0_60px_rgba(245,158,11,0.12)] blur-sm" />
            <div className="pointer-events-none absolute h-[260px] w-[260px] sm:h-[380px] sm:w-[380px] rounded-full border border-amber-400/15" />

            {/* Floating Badge 1: Fresh & Tasty */}
            <div className="absolute left-4 top-10 z-20 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-[#121318]/90 px-4 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.85)] backdrop-blur-md transition-transform hover:-translate-y-1">
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-xs font-bold tracking-wide text-white">Fresh & Tasty</span>
            </div>

            {/* Floating Badge 2: Quick Delivery */}
            <div className="absolute right-4 top-16 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-amber-500/30 bg-[#121318]/90 px-4 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.85)] backdrop-blur-md transition-transform hover:-translate-y-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-950/60 text-green-400 border border-green-500/30">
                <Clock size={15} />
              </div>
              <span className="text-xs font-bold text-white">Quick delivery</span>
            </div>

            {/* Floating Badge 3: Customer Ratings */}
            <div className="absolute bottom-10 left-6 z-20 flex items-center gap-3.5 rounded-2xl border border-amber-500/30 bg-[#121318]/95 px-5 py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md transition-transform hover:-translate-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Star size={18} fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-white">4.9 / 5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-300">2,000+ happy customers</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Vintage Cravings Category Bar */}
        <div className="relative mt-12 hidden lg:flex items-center justify-between rounded-2xl border border-amber-500/30 bg-[#141318]/90 px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <div className="flex flex-col">
            <span className="font-serif text-sm font-semibold tracking-widest uppercase text-amber-400">
              What are you craving?
            </span>
            <span className="text-xs text-stone-300">Handcrafted Italian specialties</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { emoji: '🍕', label: 'Pizza' },
              { emoji: '🍝', label: 'Pasta' },
              { emoji: '🍔', label: 'Burgers' },
              { emoji: '🥗', label: 'Salads' },
              { emoji: '🍰', label: 'Postres' },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="flex items-center gap-2 rounded-xl border border-transparent px-3.5 py-1.5 text-xs font-medium text-stone-200 transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-950/40 hover:text-amber-200"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <Link
            href="/menu"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 transition hover:text-amber-100"
          >
            <span>View all</span>
            <ChevronRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}