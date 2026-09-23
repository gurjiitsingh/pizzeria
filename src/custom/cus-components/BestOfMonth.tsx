"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Chicle } from "next/font/google";
import ProductCardPrductOfMonth from "../../components/level-2/ProductCardPOM";

const chicle = Chicle({ subsets: ["latin"], weight: "400" });

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div
        className="
          bg-[#FFE5D2]
          rounded-3xl
          py-8 md:py-12
          my-12
          relative
          overflow-hidden
        "
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-left mb-10">
            <div
              className={`
                ${chicle.className}
                text-3xl md:text-4xl
                text-[#2B2E4A]
                uppercase
                flex items-center
                gap-3
              `}
            >
              <FaStar className="text-[#EA9244]" />
              Trending Foods
            </div>

            <p className="text-[#6B6870] text-sm mt-2">
              The most ordered dishes of the last 30 days
            </p>
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="
              absolute
              left-3
              top-[45%]
              z-10
              bg-white
              text-[#EA9244]
              p-3
              rounded-full
              shadow-md
              hover:bg-[#EA9244]
              hover:text-white
              transition
            "
          >
            <FaChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="
              absolute
              right-3
              top-[45%]
              z-10
              bg-white
              text-[#EA9244]
              p-3
              rounded-full
              shadow-md
              hover:bg-[#EA9244]
              hover:text-white
              transition
            "
          >
            <FaChevronRight />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-6
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              scrollbar-hide
            "
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
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="
                    min-w-[260px]
                    flex-shrink-0
                    bg-white/70
                    rounded-2xl
                    p-6
                    animate-pulse
                  "
                >
                  <div className="h-4 bg-[#E8D5C5] rounded w-3/4 mb-3" />
                  <div className="h-3 bg-[#E8D5C5] rounded w-1/2 mb-2" />
                  <div className="h-3 bg-[#E8D5C5] rounded w-full mb-1" />
                  <div className="h-3 bg-[#E8D5C5] rounded w-2/3" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
 
