"use client";

import { IoCartOutline } from "react-icons/io5";
 
import { UseSiteContext } from "@/SiteContext/SiteContext";
import CartCount from "@/components/CartBottom/CartCount";

const Cart = () => {
  const { sideBarToggle } = UseSiteContext();

  return (
    <button
      onClick={() => sideBarToggle(false)}
      aria-label="Open cart"
      className="
        group
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white
        text-slate-700
        shadow-sm
        transition-all
        duration-200
        hover:border-orange-200
        hover:text-orange-500
        hover:shadow-md
      "
    >
      <IoCartOutline
        size={21}
        strokeWidth={1.8}
        className="transition-transform duration-200 group-hover:scale-105"
      />

      {/* Cart Count */}
      <span
        className="
          absolute
          -right-0.5
          -top-0.5
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-full
          bg-orange-500
          text-[9px]
          font-bold
          leading-none
          text-white
          shadow-sm
        "
      >
        <CartCount />
      </span>
    </button>
  );
};

export default Cart;