"use client";
// import { fetchProductByBaseProductId } from "@/app/(universal)/action/productsaddon/dbOperation";
// import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";

import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
 
import { formatCurrencyNumber } from "@/utils/formatCurrency";
 
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

import {
 
  Info,
  Flame,
  Utensils,
  Leaf,
  CircleHelp,
} from "lucide-react";
import { FaFireAlt, FaHeart, FaLeaf, FaSmile } from "react-icons/fa";

export default function ProductCardPrductOfMonth({
  product,
 
}: {
  product: ProductType;
  
}) {

  const {  settings } = UseSiteContext();
 


  //common code start

  //const priceRegular = product.price?.toString().replace (/\./g, ",") ?? "0,00";
  // const priceRegular = formatCurrencyNumber(
  //   product.price ?? 0,
  //   (settings.currency || "EUR") as string,
  //   (settings.locale || "de-DE") as string
  // );

  const priceRegular = formatCurrencyNumber(
  product.price ?? 0,       // numeric value
    (settings.currency ) as string,
      (settings.locale ) as string
);

  let priceDiscounted;
  let priceTarget = product.price ?? 0;
  if (product.discountPrice && product.discountPrice > 0) {
    priceTarget = product.discountPrice;
    // priceDiscounted = product.discountPrice.toString().replace (/\./g, ",");
    priceDiscounted = formatCurrencyNumber(
      product.discountPrice,
      (settings.currency ) as string,
      (settings.locale ) as string
    );
  }

  const cartProduct: cartProductType = {
    id: product.id,
    quantity: 1,
    currentStock:product.currentStock!,
    price: priceTarget,
    name: product.name,
    image: product.image,
    categoryId: product.categoryId,
    productCat: product.productCat!,
    taxRate: product.taxRate,
    taxType: product.taxType,
    
  };

  const isCartDisabled = (() => {
    if (product.categoryId !== "2vvuGl0pgbvvyEPc7o83") return false;
    const berlinTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Berlin",
    });
    const berlinHour = new Date(berlinTime).getHours();
    return !(berlinHour >= 11 && berlinHour < 16);
  })();

  //common code end

return (
  <div
    key={product.id}
    className="w-[240px] flex-shrink-0 snap-center sm:min-w-[280px] md:min-w-[300px]"
  >
    {/* Product Card */}
    <div className="relative rounded-2xl border border-amber-500/25 bg-[#141318] px-3 pt-3 pb-0 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgba(245,158,11,0.10)]">
      {/* Product Name */}
      <button className="w-full text-left">
        <h3
          className={`${lato.className} mb-0 w-full text-xl font-bold text-amber-100 sm:text-lg`}
        >
          {product.name}
        </h3>

        {/* Food Indicators */}
        <div className="mb-1 flex items-center gap-2 text-xs text-amber-400">
          <FaFireAlt />
          <FaLeaf className="text-green-400" />
          <span>🌶️</span>
        </div>

        {/* Product Description */}
        <p className="mb-0 h-[60px] w-full text-xs leading-snug text-slate-300 sm:text-[13px]">
          {product.productDesc || "Leckeres Gericht des Monats"}
        </p>

        {/* Price */}
        <div className="flex w-full justify-end">
          {product.discountPrice !== undefined &&
          product.discountPrice > 0 ? (
            <div className="flex items-center gap-1 text-base font-bold text-amber-400">
              <div className="text-sm text-slate-500 line-through">
                {priceRegular}
              </div>

              <div className="text-md font-bold text-amber-400">
                {priceDiscounted}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-base font-bold text-amber-400">
              {priceRegular}
            </div>
          )}
        </div>
      </button>
    </div>

    {/* Reactions */}
    <div className="flex items-center gap-3 px-2 mt-[-1px] text-xs sm:text-sm">
      <span className="flex items-center gap-1 rounded-b-lg border border-t-0 border-amber-500/20 bg-[#141318] p-1 text-amber-100/80">
        <FaHeart className="text-amber-500" />
        41
      </span>

      <span className="flex items-center gap-1 rounded-b-lg border border-t-0 border-amber-500/20 bg-[#141318] p-1 text-amber-100/80">
        <FaSmile className="text-amber-500" />
        13
      </span>
    </div>
  </div>
);

}

//bg-[#FF8989]
//bg-amber-400
