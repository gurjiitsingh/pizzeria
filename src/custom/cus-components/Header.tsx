"use client";

import { useEffect, useState } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import dynamic from "next/dynamic";
import Navbar from "@/components/level-2/Navbar";
import Login from "../../components/buttons/Login";
import { LanguageSwitcher } from "../../languages/LanguageSwitcher";

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
        fixed top-0 z-50 w-full
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
          mx-auto flex max-w-7xl items-center justify-between
          px-5 py-3
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

          {/* Navigation */}
          <Navbar scrolled={scrolled} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {headerFlags.SHOW_LANGUAGE_SWITCHER && <LanguageSwitcher />}

          {headerFlags.SHOW_LOGIN_BUTTON && <Login />}
        </div>
      </div>
    </header>
  );
};

export default Header;