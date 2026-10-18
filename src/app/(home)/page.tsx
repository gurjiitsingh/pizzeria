// app/page.tsx

import { Suspense } from "react";
//import AOSInit from "@/components/AOSInit";

import HeroSectionCustom from "@/custom/cus-components/HeroSectionCustom";
import CategorySliderLight from "@/components/level-1/CategorySliderLight";
import Products from "@/components/level-1/Products";
import BestOfMonth from "@/custom/cus-components/BestOfMonth";
import ContactInfoWrapper from "@/components/ContactInfoWrapper";
import ProductsWrapper from "@/components/ProductsWrapper";

export default function Page() {
  return (
    <main className="min-h-screen font-sans text-stone-200 bg-[radial-gradient(ellipse_at_top,_#121316_0%,_#090a0c_45%,_#000000_100%)]">

      {/* ✅ Client-only animation init */}
      {/* <AOSInit /> */}

      {/* Sections */}
      <HeroSectionCustom />

      <CategorySliderLight />

      <Suspense fallback={<div className="py-12 text-center text-sm text-amber-200/50">Loading products...</div>}>
        <ProductsWrapper />
      </Suspense>

      <BestOfMonth />

      {/* ✅ Server async component with streaming */}
      <Suspense fallback={<div className="h-40" />}>
        <ContactInfoWrapper />
      </Suspense>

    </main>
  );
}