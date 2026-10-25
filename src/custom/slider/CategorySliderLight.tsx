
"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { Sparkles } from "lucide-react";

// Category type definition
export type CategoryType = {
  id: string;
  name: string;
  desc?: string;
  productDesc?: string;
  slug?: string;
  image?: string;
  isFeatured?: boolean | string;
  sortOrder?: number;
  disablePickupDiscount?: boolean;
};

export default function CategorySliderLight() {
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  const [displayCategory, setDisplayCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    productCategoryIdG,
    setProductCategoryIdG,
    setDisablePickupCatDiscountIds,
    settings,
  } = UseSiteContext();

  // Handle selected category
  useEffect(() => {
    if (!productCategoryIdG) {
      setDisplayCategory(settings.display_category?.toString() ?? null);
    } else {
      setDisplayCategory(productCategoryIdG);
    }
  }, [settings, productCategoryIdG]);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const categories: CategoryType[] = await res.json();

        categories.sort(
          (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0)
        );

        const featured = categories.filter(
          (category) => category.isFeatured !== "no"
        );

        setCategoryData(featured);

        const disablePickupCategoryIds = categories
          .filter((category) => category.disablePickupDiscount === true)
          .map((category) => category.id);

        setDisablePickupCatDiscountIds(disablePickupCategoryIds);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchData();
  }, [setDisablePickupCatDiscountIds]);

  // Scroll handler
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount =
      direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;

    scrollRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="order_now"
      className="relative isolate my-8 scroll-mt-24 overflow-hidden bg-[#0c0d10] py-8 text-amber-50 sm:my-10 sm:py-10"
    >
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.12),transparent_60%)]" />

      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-950/40 px-3 py-1.5 text-xs font-semibold tracking-wider text-amber-300">
              <Sparkles size={14} />
              FRESH FROM OUR KITCHEN
            </div>

            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Menu
              </span>
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Discover handcrafted favorites made with fresh ingredients and
              authentic Italian inspiration.
            </p>
          </div>

          {/* Desktop scroll controls */}
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll categories left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-[#17171b] text-amber-300 transition hover:border-amber-400 hover:bg-amber-500 hover:text-black"
            >
              <FaChevronLeft size={14} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll categories right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-[#17171b] text-amber-300 transition hover:border-amber-400 hover:bg-amber-500 hover:text-black"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Category cards */}
        <div className="relative">
          {/* Mobile-friendly side controls */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll categories left"
            className="absolute -left-2 top-[38%] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-[#121318]/95 text-amber-300 shadow-lg backdrop-blur-sm transition hover:bg-amber-500 hover:text-black sm:hidden"
          >
            <FaChevronLeft size={12} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll categories right"
            className="absolute -right-2 top-[38%] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-[#121318]/95 text-amber-300 shadow-lg backdrop-blur-sm transition hover:bg-amber-500 hover:text-black sm:hidden"
          >
            <FaChevronRight size={12} />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-4 pt-1 sm:gap-5"
          >
            {categoryData.length > 0 ? (
              categoryData.map((category) => {
                const isActive = displayCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className="w-[132px] shrink-0 snap-start sm:w-[155px]"
                  >
                    <button
                      type="button"
                      onClick={() => setProductCategoryIdG(category.id)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d10] ${
                        isActive
                          ? "border-amber-400 bg-[#211a10] shadow-[0_0_22px_rgba(245,158,11,0.15)]"
                          : "border-white/10 bg-[#14151a] hover:border-amber-500/50 hover:bg-[#1b1916]"
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-[100px] w-full overflow-hidden bg-[#202127] sm:h-[118px]">
                        <img
                          src={category.image || "/com.jpg"}
                          alt={category.name || "Category"}
                          loading="lazy"
                          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                            isActive
                              ? "scale-[1.02]"
                              : "opacity-85 group-hover:opacity-100"
                          }`}
                        />

                        {/* Image shading */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" />

                        {/* Active badge */}
                        {isActive && (
                          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-amber-200/50 bg-amber-400 text-black shadow-lg">
                            <Sparkles size={12} />
                          </div>
                        )}
                      </div>

                      {/* Category name */}
                      <div className="flex min-h-[58px] w-full items-center justify-center px-2 py-3 sm:min-h-[64px]">
                        <span
                          className={`line-clamp-2 text-center text-sm font-bold leading-snug transition-colors sm:text-[15px] ${
                            isActive
                              ? "text-amber-300"
                              : "text-slate-200 group-hover:text-amber-200"
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>

                      {/* Active underline */}
                      <div
                        className={`h-1 w-full transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-amber-600 via-amber-300 to-orange-500"
                            : "bg-transparent"
                        }`}
                      />
                    </button>
                  </div>
                );
              })
            ) : (
              /* Skeleton loader */
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-[132px] shrink-0 animate-pulse sm:w-[155px]"
                >
                  <div className="h-[100px] rounded-t-2xl bg-white/10 sm:h-[118px]" />
                  <div className="flex h-[58px] items-center justify-center rounded-b-2xl border border-white/10 bg-white/5 px-3">
                    <div className="h-3 w-3/4 rounded-full bg-white/10" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-2 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
          <span className="font-serif text-xs italic tracking-wide text-amber-300/70">
            La pasión está en cada bocado
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-amber-500/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
