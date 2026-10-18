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
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-950/30 text-amber-400 shadow-inner backdrop-blur-sm transition-all duration-300 group-hover:border-amber-400 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]">
      {icon}
    </div>
    <span className="text-xs sm:text-sm font-medium tracking-wide text-amber-100/80">
      {label}
    </span>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0c0d10] text-amber-50 pt-10 pb-16 selection:bg-amber-500 selection:text-black">
      {/* Dark Marble / Vignette Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1912] via-[#0d0e12] to-[#060709] opacity-90" 
      />

      {/* Decorative Gold & Ember Glow Background Orbs */}
      <div className="pointer-events-none absolute top-1/4 right-[10%] h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-amber-600/20 to-orange-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full bg-amber-700/15 blur-[120px]" />

      {/* Italian Filigree Corner Accents */}
      <div className="pointer-events-none absolute top-4 left-4 h-16 w-16 border-t-2 border-l-2 border-amber-500/30" />
      <div className="pointer-events-none absolute top-4 right-4 h-16 w-16 border-t-2 border-r-2 border-amber-500/30" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-16 w-16 border-b-2 border-l-2 border-amber-500/30" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 border-b-2 border-r-2 border-amber-500/30" />

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Main Grid: Left copy, Right visual */}
        <div className="grid min-h-[640px] items-center gap-12 lg:grid-cols-[1fr_1.1fr] pt-4">
          
          {/* Left Column */}
          <div className="relative z-10 max-w-xl text-left">
            
            {/* Top Italian Heritage Badge */}
            <div className="mb-6 inline-flex flex-col items-center rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1c1611]/90 to-[#0e0d0c]/90 px-6 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <span className="font-serif italic text-xs tracking-wider text-amber-200/90">
                El auténtico sabor italiano
              </span>
              {/* Italian Flag Strip */}
              <div className="mt-1 flex h-1 w-16 overflow-hidden rounded-full">
                <span className="w-1/3 bg-[#008C45]" />
                <span className="w-1/3 bg-[#F4F5F0]" />
                <span className="w-1/3 bg-[#CD212A]" />
              </div>
            </div>

            {/* Small Top Tagline Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-950/30 px-3.5 py-1 text-xs font-medium text-amber-300">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-black">
                ✓
              </span>
              Delicious food, delivered fresh
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[clamp(2.8rem,5.5vw,5.2rem)] font-extrabold leading-[0.98] tracking-tight text-white drop-shadow-sm">
              Pizzeria <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                Milano Segle
              </span>
            </h1>

            {/* Sub-headline / Italian motto */}
            <p className="mt-2 font-serif italic text-base text-amber-300/80 tracking-wide">
              Masa fina y fresca cada día
            </p>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300/80 font-normal max-w-lg">
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
                className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-[#151419]/70 px-8 py-3.5 text-base font-semibold text-amber-200 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-950/40 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
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

          {/* Right Column: Pizza Hero Display */}
          <div className="relative flex items-center justify-center">
            
            {/* Glowing Golden Ring Backdrops */}
            <div className="absolute h-[340px] w-[340px] sm:h-[480px] sm:w-[480px] rounded-full border border-amber-500/20 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent shadow-[inset_0_0_60px_rgba(245,158,11,0.15)]" />
            <div className="absolute h-[290px] w-[290px] sm:h-[420px] sm:w-[420px] rounded-full border border-amber-400/15" />

            {/* Pizza Image with Deep Warm Drop Shadow */}
            <div className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] transition-transform duration-700 hover:rotate-1 hover:scale-105">
              <Image
                src="/images/hero-15.jpg" // replace with your pizza image path
                alt="La Nova Milano Artisanal Pizza"
                width={700}
                height={700}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] filter"
              />
            </div>

            {/* Floating Badge 1: Fresh & Tasty */}
            <div className="absolute left-2 top-8 z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-[#121318]/90 px-4 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-xs font-bold tracking-wide text-white">Fresh & Tasty</span>
            </div>

            {/* Floating Badge 2: Quick Delivery */}
            <div className="absolute right-2 top-10 z-20 hidden md:flex items-center gap-2.5 rounded-2xl border border-amber-500/30 bg-[#121318]/90 px-4 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-950/60 text-green-400 border border-green-500/30">
                <Clock size={15} />
              </div>
              <span className="text-xs font-bold text-white">Quick delivery</span>
            </div>

            {/* Floating Badge 3: Customer Ratings */}
            <div className="absolute -bottom-4 left-4 z-20 flex items-center gap-3.5 rounded-2xl border border-amber-500/30 bg-[#121318]/95 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
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
                <p className="text-[11px] font-medium text-slate-400">2,000+ happy customers</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Vintage Cravings Category Bar */}
        <div className="relative mt-12 hidden lg:flex items-center justify-between rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#17151b]/90 via-[#131317]/90 to-[#17151b]/90 px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
          
          <div className="flex flex-col">
            <span className="font-serif text-sm font-semibold tracking-widest uppercase text-amber-400">
              What are you craving?
            </span>
            <span className="text-xs text-stone-400">Handcrafted Italian specialties</span>
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
                className="flex items-center gap-2 rounded-xl border border-transparent px-3.5 py-1.5 text-xs font-medium text-stone-300 transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-950/30 hover:text-amber-200"
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