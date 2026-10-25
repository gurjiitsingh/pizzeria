"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ProductCardPrductOfMonth from "./ProductCardPOM";
 

export default function BestOfMonth() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products/featured", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch featured products");
        }

        const products = await res.json();
        setFeaturedProducts(products);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      const scrollAmount =
        direction === "left"
          ? -clientWidth / 1.5
          : clientWidth / 1.5;

      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mx-auto w-full border-t border-amber-500/15">
      <div className="relative overflow-hidden bg-[#0c0d10] py-14 selection:bg-amber-500 selection:text-black md:py-20">
        
        {/* Dark Vignette / Radial Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#181410] via-[#0c0d10] to-[#060709] opacity-95" />

        {/* Ambient Gold Glow Orbs */}
        <div className="pointer-events-none absolute -left-36 -top-20 h-96 w-96 rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-36 -bottom-24 h-96 w-96 rounded-full bg-orange-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          
          {/* Header */}
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/40 bg-gradient-to-tr from-amber-600 to-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.35)] md:h-10 md:w-10">
                  <FaStar className="text-sm md:text-base text-black" />
                </span>

                <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Trending{" "}
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]">
                    Dishes
                  </span>
                </h2>
              </div>

              <p className="mt-2.5 font-serif italic text-sm tracking-wide text-amber-200/70 sm:text-base">
                The most ordered dishes of the last 30 days
              </p>
            </div>

            {/* Badge */}
            <div className="hidden rounded-full border border-amber-500/30 bg-[#16141a]/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md sm:block">
              Customer favourites
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-1 top-[56%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/30 bg-[#141419]/90 text-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] sm:left-2"
          >
            <FaChevronLeft size={13} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-1 top-[56%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/30 bg-[#141419]/90 text-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] sm:right-2"
          >
            <FaChevronRight size={13} />
          </button>

          {/* Carousel Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-1 pb-4 pt-1"
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, i) => (
                <div
                  key={product.id ?? `${product.name}-${i}`}
                  className="snap-center"
                >
                  <ProductCardPrductOfMonth product={product} />
                </div>
              ))
            ) : (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[260px] flex-shrink-0 animate-pulse rounded-2xl border border-amber-500/15 bg-[#141318]/70 p-6 shadow-lg backdrop-blur-sm"
                >
                  <div className="mb-4 h-44 w-full rounded-xl bg-amber-950/20" />
                  <div className="mb-4 h-4 w-3/4 rounded-full bg-amber-500/15" />
                  <div className="mb-3 h-3 w-1/2 rounded-full bg-amber-500/10" />
                  <div className="mb-2 h-3 w-full rounded-full bg-amber-500/10" />
                  <div className="h-3 w-2/3 rounded-full bg-amber-500/10" />
                </div>
              ))
            )}
          </div>

          {/* Bottom Accent */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
            <div className="h-1 w-2 rounded-full bg-amber-400" />
            <p className="font-serif italic text-xs tracking-wider text-amber-200/60">
              Loved by our customers
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}