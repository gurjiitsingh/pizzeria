"use client";

import Link from "next/link";
import React from "react";
import { useLanguage } from "@/store/LanguageContext";
import { Cinzel, Lato, Roboto, Abel } from "next/font/google";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

// =========================================================
// Fonts
// =========================================================

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
});

const fonts = {
  Cinzel: cinzel,
  Abel: abel,
  Lato: lato,
  Roboto: roboto,
};

const fontTitle =
  fonts[process.env.NEXT_PUBLIC_FONT_TITLE as keyof typeof fonts] || cinzel;

const fontDescription =
  fonts[process.env.NEXT_PUBLIC_FONT_DESCRIPTION as keyof typeof fonts] || lato;

const fontPrice =
  fonts[process.env.NEXT_PUBLIC_FONT_PRICE as keyof typeof fonts] || roboto;

// =========================================================
// Types
// =========================================================

type FooterLink = {
  href: string;
  name: string;
};

type Props = {
  outlet?: any;
};

// =========================================================
// Component
// =========================================================

export default function Footer({ outlet }: Props) {
  const { TEXT, BRANDING } = useLanguage();

  // =======================================================
  // Branding fallbacks
  // =======================================================

  const fallbackBrand = {
    brand_name:
      outlet?.outletName ||
      BRANDING?.brand_name ||
      "",

    poweredBy:
      BRANDING?.poweredBy ||
      "Powered by",

    poweredByUrl:
      BRANDING?.poweredByUrl ||
      "https://www.gstadeveloper.com",

    copyright: {
      prefix:
        BRANDING?.copyright?.prefix ||
        "Copyright ©",

      suffix:
        BRANDING?.copyright?.suffix ||
        "All Rights Reserved by",

      company:
        outlet?.outletName ||
        BRANDING?.copyright?.company ||
        "",
    },
  };

  // =======================================================
  // Text fallbacks
  // =======================================================

  const fallbackText = {
    logo_alt:
      TEXT?.logo_alt ||
      "Restaurant Logo",

    sections: {
      links: {
        title:
          BRANDING?.sections?.links?.title ||
          "Explore",

        items:
          BRANDING?.sections?.links?.items ||
          [
            {
              name: "Home",
              href: "/",
            },
            {
              name: "Menu",
              href: "/menu",
            },
            {
              name: "About Us",
              href: "/about",
            },
            {
              name: "Contact",
              href: "/contact",
            },
            {
              name: "Table Reservation",
              href: "/reservation",
            },
            {
              name: "Allergens",
              href: "/allergene",
            },
          ],
      },

      company: {
        title:
          BRANDING?.sections?.company?.title ||
          "Company",

        items:
          BRANDING?.sections?.company?.items ||
          [
            {
              name: "Privacy Policy",
              href: "/privacy",
            },
            {
              name: "Terms of Service",
              href: "#",
            },
          ],
      },

      social: {
        title:
          BRANDING?.sections?.social?.title ||
          "Follow Us",
      },
    },
  };

  // =======================================================
  // Company name
  // =======================================================

  const companyName =
    outlet?.web
      ? new URL(
          outlet.web.startsWith("http")
            ? outlet.web
            : `https://${outlet.web}`
        ).hostname
      : outlet?.outletName ||
        fallbackBrand.brand_name;

  // =======================================================
  // Render
  // =======================================================

  return (
    <footer className="relative mt-20 overflow-hidden rounded-t-[3rem] bg-[#2b2e4a] text-white">
      {/* ===================================================
          Decorative background
      =================================================== */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ea9244]/20 blur-3xl" />

      <div className="pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[#ffe5d2]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[18%] top-10 h-24 w-24 rounded-full border border-white/5" />

      {/* ===================================================
          Main Footer
      =================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 lg:px-10 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* =================================================
              Brand
          ================================================= */}

          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10">
                  <img
                    src={outlet?.logo || "/logo.png"}
                    alt={fallbackText.logo_alt}
                    className="h-12 w-12 object-contain"
                  />
                </div>

                <div>
                  <div
                    className={`${fontPrice.className} text-xl font-bold tracking-tight text-white`}
                  >
                    {fallbackBrand.brand_name}
                  </div>

                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    Fresh food · Happy mood
                  </div>
                </div>
              </div>
            </Link>

            <p
              className={`${fontDescription.className} mt-6 max-w-sm text-sm leading-6 text-white/60`}
            >
              Fresh ingredients, delicious flavors, and memorable
              meals made for every occasion. Order your favorite food
              and enjoy it your way.
            </p>

            {/* CTA */}
            <Link
              href="/menu"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#ea9244] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#f09b4d]"
            >
              Order Your Favorites

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition group-hover:translate-x-1">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>

          {/* =================================================
              Explore
          ================================================= */}

          <div>
            <FooterHeading>
              {fallbackText.sections.links.title}
            </FooterHeading>

            <ul className="space-y-3">
              {fallbackText.sections.links.items.map(
                (item: FooterLink, idx: number) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className={`${fontDescription.className} group inline-flex items-center gap-1.5 text-sm text-white/60 transition duration-200 hover:text-[#ea9244]`}
                    >
                      <span>{item.name}</span>

                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* =================================================
              Company
          ================================================= */}

          <div>
            <FooterHeading>
              {fallbackText.sections.company.title}
            </FooterHeading>

            <ul className="space-y-3">
              {fallbackText.sections.company.items.map(
                (item: FooterLink, idx: number) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      rel="noopener noreferrer"
                      className={`${fontDescription.className} group inline-flex items-center gap-1.5 text-sm text-white/60 transition duration-200 hover:text-[#ea9244]`}
                    >
                      <span>{item.name}</span>

                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* =================================================
              Social
          ================================================= */}

          <div>
            <FooterHeading>
              {fallbackText.sections.social.title}
            </FooterHeading>

            <p
              className={`${fontDescription.className} max-w-[220px] text-sm leading-6 text-white/50`}
            >
              Stay connected for new dishes, special offers,
              and delicious updates.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <SocialButton
                icon={<Instagram size={17} />}
                label="Instagram"
              />

              <SocialButton
                icon={<Facebook size={17} />}
                label="Facebook"
              />

              <SocialButton
                icon={<MessageCircle size={17} />}
                label="Contact"
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            Divider
        =================================================== */}

        <div className="my-10 h-px bg-white/10" />

        {/* ===================================================
            Bottom
        =================================================== */}

        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p
            className={`${fontDescription.className} text-xs text-white/40`}
          >
            {fallbackBrand.poweredBy}{" "}
            <a
              href={fallbackBrand.poweredByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/60 transition hover:text-[#ea9244]"
            >
              {new URL(fallbackBrand.poweredByUrl).hostname}
            </a>
          </p>

          <p
            className={`${fontDescription.className} text-xs text-white/40`}
          >
            {fallbackBrand.copyright.prefix}{" "}
            {new Date().getFullYear()}{" "}
            {fallbackBrand.copyright.suffix}{" "}
            <span className="font-semibold text-white/60">
              {companyName}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// =========================================================
// Footer Heading
// =========================================================

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3
      className={`${fontTitle.className} mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white`}
    >
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ea9244] align-middle" />

      {children}
    </h3>
  );
}

// =========================================================
// Social Button
// =========================================================

function SocialButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition duration-200 hover:border-[#ea9244]/40 hover:bg-[#ea9244] hover:text-white"
    >
      {icon}
    </button>
  );
}
 
