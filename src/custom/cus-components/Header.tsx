"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { UseSiteContext } from "@/SiteContext/SiteContext";
import Navbar from "@/components/level-2/Navbar";
import Login from "../../components/buttons/Login";
import { LanguageSwitcher } from "../../languages/LanguageSwitcher";
import Cart from "./cart";


export const headerFlags = {
  SHOW_LANGUAGE_SWITCHER:
    process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SWITCHER === "1",

  SHOW_LOGIN_BUTTON:
    process.env.NEXT_PUBLIC_SHOW_LOGIN_BUTTON === "1",
};

const FaBars = dynamic(
  () => import("react-icons/fa6").then((mod) => mod.FaBars),
  {
    ssr: false,
  }
);

const Header = () => {
  const { bargerMenuToggle } = UseSiteContext();

  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasMounted) return null;

  return (
    <header
      className={`
        fixed top-0 z-20 w-full
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "bg-white/95 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-md"
            : "bg-transparent shadow-none"
        }
      `}
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl items-center justify-between
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* Left */}
        <div className="flex items-center">
          {/* Mobile Menu */}
          <button
            onClick={() => bargerMenuToggle(false)}
            className={`
              mr-2 rounded-xl p-2.5
              transition-all duration-200
              lg:hidden
              ${
                scrolled
                  ? "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                  : "text-slate-600 hover:bg-white/70 hover:text-orange-500"
              }
            `}
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl
                bg-orange-500
                text-white
                shadow-lg shadow-orange-200
              "
            >
              <ShoppingBag size={22} strokeWidth={2.2} />
            </div>

            <div>
              <div className="text-xl font-black tracking-tight text-slate-900">
                Pizzeria
              </div>

              <div className="hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:block">
                Fresh food · Happy mood
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="ml-8">
            <Navbar scrolled={scrolled} />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language */}
          {/* {headerFlags.SHOW_LANGUAGE_SWITCHER && <LanguageSwitcher />} */}

          {/* Cart */}
          <Cart />

          {/* Login */}
          {headerFlags.SHOW_LOGIN_BUTTON && <Login />}

          {/* Order Now */}
          <Link
            href="/#order_now"
            className="
              hidden items-center gap-2
              rounded-full
              bg-orange-500
              px-6 py-3
              text-sm font-bold
              text-white
              shadow-lg shadow-orange-200
              transition
              hover:bg-orange-600
              hover:shadow-orange-300
              sm:flex
            "
          >
            Order Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
 
