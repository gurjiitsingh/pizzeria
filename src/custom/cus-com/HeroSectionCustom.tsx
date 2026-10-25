
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Truck,
  Leaf,
  CreditCard,
  Sparkles,
  Clock,
  Star,
} from "lucide-react";

interface FeatureItemProps {
  icon: React.ReactNode;
  label: string;
}

interface FoodItem {
  name: string;
  image: string;
  description: string;
}

const foodItems: FoodItem[] = [
  {
    name: "Meal Deals",
    image: "/images/meal-deals.jpg",
    description: "Meal Deals",
  },
  {
    name: "Ensalada",
    image: "/images/ensalada.jpg",
    description: "Ensalada",
  },
  {
    name: "Burgers",
    image: "/images/hamburguesa.jpg",
    description: "Juicy gourmet burger",
  },
  {
    name: "Salads",
    image: "/images/calzone.jpg",
    description: "Fresh garden salad",
  },
];

const FeatureItem = ({ icon, label }: FeatureItemProps) => (
  <div className="group flex items-center gap-2.5 sm:gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/[0.07] text-amber-400 transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-500/15">
      {icon}
    </div>

    <span className="text-xs font-medium text-amber-100/90 sm:text-sm">
      {label}
    </span>
  </div>
);

function FoodGallery() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      {/* Subtle golden ambient glow */}
      <div className="pointer-events-none absolute inset-10 rounded-full bg-amber-500/[0.09] blur-3xl" />

      <div className="relative grid grid-cols-2 gap-3 sm:gap-5">
        {foodItems.map((food, index) => (
          <div
            key={food.name}
            className={`group relative ${index === 0
              ? "rotate-[-3deg]"
              : index === 1
                ? "rotate-[2deg] translate-y-4"
                : index === 2
                  ? "rotate-[2deg] -translate-y-1"
                  : "rotate-[-2deg] translate-y-3"
              }`}
          >
            <div className="relative aspect-[1.08/1] overflow-hidden rounded-2xl border border-amber-500/50 bg-[#171519] p-1 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:z-10 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:border-amber-400 group-hover:shadow-[0_12px_35px_rgba(245,158,11,0.16)] sm:rounded-3xl sm:p-1.5">
              <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-[20px]">
                <Image
                  src={food.image}
                  alt={food.description}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Image readability gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

                {/* Food label */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-black/70 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                    <Sparkles
                      size={12}
                      className="text-amber-400"
                    />
                    {food.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute -right-1 -top-2 h-10 w-10 rounded-tr-2xl border-r border-t border-amber-500/40 sm:-right-3 sm:-top-3 sm:h-14 sm:w-14" />

      <div className="pointer-events-none absolute -bottom-2 -left-1 h-10 w-10 rounded-bl-2xl border-b border-l border-amber-500/40 sm:-bottom-3 sm:-left-3 sm:h-14 sm:w-14" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0c0d10] pb-12 pt-8 text-amber-50 selection:bg-amber-500 selection:text-black sm:pb-16 sm:pt-24">
      {/* Background atmosphere — no large background image */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-500/[0.045] blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-orange-500/[0.04] blur-[120px]" />

      {/* Decorative Italian corner accents */}
      <div className="pointer-events-none absolute left-3 top-3 z-20 h-10 w-10 border-l border-t border-amber-500/30 sm:left-5 sm:top-5 sm:h-14 sm:w-14" />

      <div className="pointer-events-none absolute right-3 top-3 z-20 h-10 w-10 border-r border-t border-amber-500/30 sm:right-5 sm:top-5 sm:h-14 sm:w-14" />

      <div className="pointer-events-none absolute bottom-3 left-3 z-20 h-10 w-10 border-b border-l border-amber-500/30 sm:bottom-5 sm:left-5 sm:h-14 sm:w-14" />

      <div className="pointer-events-none absolute bottom-3 right-3 z-20 h-10 w-10 border-b border-r border-amber-500/30 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-8 pt-4 sm:gap-12 lg:min-h-[590px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="relative z-10 min-w-0">
            {/* Italian heritage badge */}
            <div className="mt-9 mb-5 inline-flex flex-col items-center rounded-2xl border border-amber-500/30 bg-[#141215]/90 px-5 py-2.5 shadow-lg backdrop-blur-md sm:mb-6 sm:px-6">
              <span className=" font-serif text-xs italic tracking-wider text-amber-200 sm:text-sm">
                El auténtico sabor italiano
              </span>

              <div className="mt-1 flex h-1 w-16 overflow-hidden rounded-full">
                <span className="w-1/3 bg-[#008C45]" />
                <span className="w-1/3 bg-[#F4F5F0]" />
                <span className="w-1/3 bg-[#CD212A]" />
              </div>
            </div>

            {/* Tagline pill */}
            <div className="mb-4 hidden md:inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-950/50 px-3 py-1.5 text-[11px] font-medium text-amber-300 backdrop-blur-md sm:text-xs">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                ✓
              </span>

              Delicious food, delivered fresh
            </div>

            {/* Main headline */}
            <h1 className="font-serif text-[clamp(2.65rem,8vw,5.25rem)] font-extrabold leading-[0.98] tracking-tight text-white sm:text-[clamp(3.2rem,6vw,5.25rem)]">
              Pizzeria
              <br />

              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(245,158,11,0.18)]">
                Milano Segle
              </span>
            </h1>

            {/* Italian motto */}
            <p className="mt-3 font-serif text-base italic tracking-wide text-amber-300/90 sm:text-lg">
              Masa fina y fresca cada día
            </p>

            {/* Description */}
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base">
              Fresh ingredients, bold flavors, and your favorite meals
              delivered straight to your door. Order something delicious
              today.
            </p>

            {/* CTA buttons */}
            <div className="relative z-20 mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Link
                href="/#order_now"
                prefetch={false}

                className="relative z-30 group inline-flex min-h-10 touch-manipulation cursor-pointer select-none items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 px-5 py-2 text-sm font-bold text-black shadow-[0_0_25px_rgba(245,158,11,0.22)] transition-all duration-200 active:scale-95 sm:px-7 sm:text-base"
              >
                <span>Order Now</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/15">
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>

              <Link
                href="/menu"
                prefetch={false}
                className="relative z-30 inline-flex min-h-11 touch-manipulation cursor-pointer select-none items-center justify-center rounded-full border border-amber-500/40 bg-[#121318]/80 px-5 py-2 text-sm font-semibold text-amber-100 backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-amber-400 hover:bg-amber-950/50 sm:px-5 sm:text-base"
              >
                Menú Explorar
              </Link>
            </div>

            {/* MOBILE FOOD GALLERY
                Immediately below the buttons */}
            <div className="mt-8 lg:hidden">
              <FoodGallery />
            </div>

            {/* Feature icons */}
            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-amber-500/20 pt-5 sm:mt-10 sm:gap-4 sm:pt-6">
              <FeatureItem
                icon={<Truck size={20} />}
                label="Fast Delivery"
              />

              <FeatureItem
                icon={<Leaf size={20} />}
                label="Fresh Food"
              />

              <FeatureItem
                icon={<CreditCard size={20} />}
                label="Secure Pay"
              />
            </div>
          </div>

          {/* RIGHT COLUMN — DESKTOP FOOD GALLERY */}
          <div className="relative hidden min-w-0 items-center justify-center py-8 lg:flex">
            <FoodGallery />

            {/* Floating freshness badge */}
            <div className="absolute -left-1 top-8 z-20 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-[#121318]/95 px-4 py-3 shadow-xl backdrop-blur-md xl:-left-5">
              <Sparkles
                size={17}
                className="text-amber-400"
              />

              <span className="text-xs font-bold text-white">
                Fresh &amp; Tasty
              </span>
            </div>

            {/* Floating delivery badge */}
            <div className="absolute -right-1 bottom-10 z-20 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-[#121318]/95 px-4 py-3 shadow-xl backdrop-blur-md xl:-right-5">
              <Clock
                size={17}
                className="text-green-400"
              />

              <span className="text-xs font-bold text-white">
                Quick Delivery
              </span>
            </div>

            {/* Decorative rating badge */}
            <div className="absolute bottom-0 left-2 z-20 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-[#121318]/95 px-3 py-2 shadow-xl backdrop-blur-md">
              <Star
                size={17}
                fill="currentColor"
                className="text-amber-400"
              />

              <span className="text-xs font-semibold text-amber-100">
                Made with love
              </span>
            </div>
          </div>
        </div>

        {/* Bottom category bar — desktop */}
        <div className="relative mt-12 hidden items-center justify-between rounded-2xl border border-amber-500/25 bg-[#141318]/90 px-6 py-4 shadow-xl backdrop-blur-md lg:flex xl:px-8">
          <div className="flex flex-col">
            <span className="font-serif text-sm font-semibold uppercase tracking-widest text-amber-400">
              What are you craving?
            </span>

            <span className="mt-1 text-xs text-stone-300">
              Handcrafted Italian specialties
            </span>
          </div>

          <div className="flex items-center gap-1 xl:gap-2">
            {[
              { emoji: "🍕", label: "Pizza" },
              { emoji: "🍝", label: "Pasta" },
              { emoji: "🍔", label: "Burgers" },
              { emoji: "🥗", label: "Salads" },
              { emoji: "🍰", label: "Postres" },
            ].map((item) => (
              <Link
                key={item.label}
                href="/menu"
                className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-xs font-medium text-stone-200 transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-950/40 hover:text-amber-200"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
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
