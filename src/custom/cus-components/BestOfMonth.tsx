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
    <section className="mx-auto w-full">
      <div
        className="
          relative
          overflow-hidden
          bg-[#e3532b]
          py-12
          md:py-16
        "
      >
        {/* Decorative background */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-[-120px]
            h-80
            w-80
            rounded-full
            bg-[#CDE9E1]/70
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-[-140px]
            h-96
            w-96
            rounded-full
            bg-[#F3C969]/20
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          {/* =====================================================
              Header
          ===================================================== */}

          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="text-left">
              <div
                className={`
                  ${chicle.className}
                  flex
                  items-center
                  gap-3
                  text-3xl
                  uppercase
                  leading-none
                  text-[#16332F]
                  md:text-4xl
                `}
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F3C969]
                    text-[#16332F]
                    shadow-sm
                    md:h-10
                    md:w-10
                  "
                >
                  <FaStar className="text-sm md:text-base" />
                </span>

                Trending Foods
              </div>

              <p className="mt-3 text-sm text-[#667A75]">
                The most ordered dishes of the last 30 days
              </p>
            </div>

            {/* Small label */}

            <div
              className="
                hidden
                rounded-full
                border
                border-[#168A78]/15
                bg-white/70
                px-4
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#168A78]
                sm:block
              "
            >
              Customer favourites
            </div>
          </div>

          {/* =====================================================
              Left Arrow
          ===================================================== */}

          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="
              absolute
              left-2
              top-[53%]
              z-10
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#168A78]/10
              bg-white
              text-[#168A78]
              shadow-lg
              shadow-[#16332F]/10
              transition-all
              duration-200
              hover:-translate-x-0.5
              hover:bg-[#168A78]
              hover:text-white
              sm:left-3
            "
          >
            <FaChevronLeft size={14} />
          </button>

          {/* =====================================================
              Right Arrow
          ===================================================== */}

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="
              absolute
              right-2
              top-[53%]
              z-10
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#168A78]/10
              bg-white
              text-[#168A78]
              shadow-lg
              shadow-[#16332F]/10
              transition-all
              duration-200
              hover:translate-x-0.5
              hover:bg-[#168A78]
              hover:text-white
              sm:right-3
            "
          >
            <FaChevronRight size={14} />
          </button>

          {/* =====================================================
              Slider
          ===================================================== */}

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
              px-1
              pb-3
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
                    animate-pulse
                    rounded-3xl
                    border
                    border-white/70
                    bg-white/80
                    p-6
                    shadow-sm
                  "
                >
                  <div
                    className="
                      mb-4
                      h-4
                      w-3/4
                      rounded-full
                      bg-[#D5E5E0]
                    "
                  />

                  <div
                    className="
                      mb-3
                      h-3
                      w-1/2
                      rounded-full
                      bg-[#D5E5E0]
                    "
                  />

                  <div
                    className="
                      mb-2
                      h-3
                      w-full
                      rounded-full
                      bg-[#D5E5E0]
                    "
                  />

                  <div
                    className="
                      h-3
                      w-2/3
                      rounded-full
                      bg-[#D5E5E0]
                    "
                  />
                </div>
              ))
            )}
          </div>

          {/* =====================================================
              Bottom accent
          ===================================================== */}

          <div className="mt-7 flex items-center gap-3">
            <div className="h-1 w-10 rounded-full bg-[#168A78]" />

            <div className="h-1 w-2 rounded-full bg-[#F3C969]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#667A75]">
              Loved by our customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}