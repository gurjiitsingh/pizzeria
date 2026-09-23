"use client";

import {
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";

export default function ContactInfo({
  outlet,
  schedule,
}: any) {
  if (!outlet) return null;

  return (
    <section className="relative overflow-hidden bg-[#fffaf5] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
      {/* =====================================================
          Decorative Background
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#ffe5d2]/70 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />

      {/* =====================================================
          Content
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ===================================================
            Section Heading
        ==================================================== */}

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#ea9244]">
            <span className="h-px w-8 bg-[#ea9244]" />

            Get in touch

            <span className="h-px w-8 bg-[#ea9244]" />
          </div>

          <h2 className="text-3xl font-black tracking-[-0.035em] text-[#2b2e4a] sm:text-4xl md:text-5xl">
            We would love to
            <span className="text-[#ea9244]"> hear from you.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Visit us, give us a call, or simply send us an email.
            We are always happy to help and make your experience
            delicious.
          </p>
        </div>

        {/* ===================================================
            Information Cards
        ==================================================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* =================================================
              Address
          ================================================== */}

          <ContactCard
            icon={<FaMapMarkedAlt />}
            title="Address"
          >
            <div className="space-y-1 text-sm leading-6 text-slate-500">
              {outlet.outletName && (
                <p className="font-semibold text-[#2b2e4a]">
                  {outlet.outletName}
                </p>
              )}

              {outlet.addressLine1 && (
                <p>{outlet.addressLine1}</p>
              )}

              {outlet.addressLine2 && (
                <p>{outlet.addressLine2}</p>
              )}

              {outlet.city && <p>{outlet.city}</p>}
            </div>

            {outlet.addressLine1 && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  [
                    outlet.addressLine1,
                    outlet.addressLine2,
                    outlet.city,
                  ]
                    .filter(Boolean)
                    .join(", ")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#ea9244] transition hover:gap-2.5"
              >
                Get Directions
                <span>→</span>
              </a>
            )}
          </ContactCard>

          {/* =================================================
              Phone
          ================================================== */}

          <ContactCard
            icon={<FaPhoneAlt />}
            title="Phone"
          >
            <div className="space-y-2 text-sm text-slate-500">
              {outlet.phone ? (
                <a
                  href={`tel:${outlet.phone}`}
                  className="block transition hover:text-[#ea9244]"
                >
                  {outlet.phone}
                </a>
              ) : (
                <p>-</p>
              )}

              {outlet.phone2 && (
                <a
                  href={`tel:${outlet.phone2}`}
                  className="block transition hover:text-[#ea9244]"
                >
                  {outlet.phone2}
                </a>
              )}
            </div>

            {outlet.phone && (
              <a
                href={`tel:${outlet.phone}`}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#ea9244] transition hover:gap-2.5"
              >
                Call us
                <span>→</span>
              </a>
            )}
          </ContactCard>

          {/* =================================================
              Email
          ================================================== */}

          <ContactCard
            icon={<FaEnvelope />}
            title="Email"
          >
            {outlet.email ? (
              <>
                <a
                  href={`mailto:${outlet.email}`}
                  className="break-all text-sm leading-6 text-slate-500 transition hover:text-[#ea9244]"
                >
                  {outlet.email}
                </a>

                <a
                  href={`mailto:${outlet.email}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#ea9244] transition hover:gap-2.5"
                >
                  Send a message
                  <span>→</span>
                </a>
              </>
            ) : (
              <p className="text-sm text-slate-500">-</p>
            )}
          </ContactCard>

          {/* =================================================
              Opening Hours
          ================================================== */}

          <ContactCard
            icon={<FaCalendarAlt />}
            title="Opening Hours"
          >
            <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1 text-sm text-slate-500">
              {schedule && schedule.length > 0 ? (
                schedule.map((line: string, i: number) => (
                  <p
                    key={i}
                    className="leading-5"
                  >
                    {line}
                  </p>
                ))
              ) : (
                <p>No schedule available</p>
              )}
            </div>
          </ContactCard>
        </div>
      </div>
    </section>
  );
}

// =========================================================
// Contact Card
// =========================================================

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex min-h-[260px] flex-col rounded-[2rem] border border-slate-100 bg-white p-7 shadow-[0_10px_40px_rgba(43,46,74,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-[0_18px_50px_rgba(43,46,74,0.09)]">
      {/* Top accent */}
      <div className="absolute left-7 right-7 top-0 h-1 rounded-b-full bg-[#ea9244] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1e7] text-[#ea9244] transition-all duration-300 group-hover:bg-[#ea9244] group-hover:text-white">
        <span className="text-lg">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-4 text-sm font-black uppercase tracking-[0.13em] text-[#2b2e4a]">
        {title}
      </h3>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
 
