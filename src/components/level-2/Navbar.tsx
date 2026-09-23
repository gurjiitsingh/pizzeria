import Link from "next/link";
import React from "react";
import { useLanguage } from "@/store/LanguageContext";

interface NavbarProps {
  scrolled?: boolean;
}

function Navbar({ scrolled = false }: NavbarProps) {
  const { BRANDING } = useLanguage();

  return (
    <nav>
      <ul className="hidden items-center gap-8 lg:flex">
        {BRANDING.menu.map(
          (item: { link: string; name: string }) => (
            <li key={item.name}>
              <Link
                href={item.link}
                className={`
                  relative
                  py-2
                  text-sm
                  font-semibold
                  tracking-[-0.01em]
                  transition-all
                  duration-200

                  ${
                    scrolled
                      ? "text-slate-600 hover:text-orange-500"
                      : "text-slate-600 hover:text-orange-500"
                  }

                  after:absolute
                  after:bottom-0
                  after:left-0
                  after:h-[2px]
                  after:w-0
                  after:rounded-full
                  after:bg-orange-500
                  after:transition-all
                  after:duration-200
                  hover:after:w-full
                `}
              >
                {item.name}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

export default Navbar;