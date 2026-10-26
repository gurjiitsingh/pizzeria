"use client";

import React from "react";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

interface ScheduleItem {
  day: string;
  time: string;
  isOpen: boolean;
}

interface ContactInfoProps {
  outlet: any;
  schedule: ScheduleItem[] | string[];
}

export default function ContactInfo({
  outlet,
  schedule,
}: ContactInfoProps) {
  return (
    <div className=" max-w-7xl mx-auto py-5">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-950/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
          Visítanos & Contáctanos
        </div>

        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Location &{" "}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Opening Hours
          </span>
        </h2>

        <p className="mt-2 font-serif italic text-sm text-amber-200/70 sm:text-base">
          El auténtico sabor italiano, listo para servirte
        </p>
      </div>

      {/* Main Grid: Outlet details on left, Schedule card on right */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Store Information Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-amber-500/25 bg-[#121318]/80 p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              {outlet?.name || "Pizzeria Milano Segle"}
            </h3>

            <p className="mt-1 text-sm text-stone-400">
              Fresh artisanal pizza crafted every day with authentic Italian tradition.
            </p>

            <div className="mt-8 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Address
                  </h4>

                  <p className="mt-0.5 text-sm leading-relaxed text-stone-300">
                    {outlet?.address ||
                      "C/ del Segle XX, 9, 08041 Barcelona"}
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Phone size={20} />
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Telephone
                  </h4>

                  <p className="mt-0.5 text-sm font-semibold text-stone-200">
                    {outlet?.phone ||
                      "+34 931 416 841 / 670 569 090"}
                  </p>
                </div>
              </div>

              {/* Email */}
              {outlet?.email && (
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Mail size={20} />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Email
                    </h4>

                    <p className="mt-0.5 text-sm text-stone-300">
                      {outlet.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="mt-8 border-t border-amber-500/15 pt-6">
            <a
              href={`https://wa.me/${
                outlet?.whatsapp || "34931416841"
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 px-6 py-3.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)]"
            >
              <MessageCircle size={18} />
              <span>Haz Tu Pedido Por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right: Schedule Card */}
        <div className="rounded-3xl border border-amber-500/25 bg-[#121318]/80 p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
              <Clock size={19} />
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Opening Schedule
              </h3>

              <p className="text-xs text-stone-400">
                Horario de apertura y servicio a domicilio
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-amber-500/10">
            {Array.isArray(schedule) && schedule.length > 0 ? (
              schedule.map((item, idx) => {
                const isObj =
                  typeof item === "object" && item !== null;

                const dayName = isObj
                  ? item.day
                  : item.split(":")[0];

                // Preserve colons inside times, e.g. 12:30.
                const timeString = isObj
                  ? item.time
                  : item
                      .substring(item.indexOf(":") + 1)
                      .trim();

                const isClosed = isObj
                  ? !item.isOpen
                  : timeString
                      .toLowerCase()
                      .includes("closed");

                // The wrapper sends slots as:
                // "Monday: 09:00 - 14:00, 17:00 - 22:00"
                const timeSlots = isClosed
                  ? []
                  : timeString
                      .split(",")
                      .map((slot) => slot.trim())
                      .filter(Boolean);

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3.5 text-sm transition hover:bg-amber-500/5 px-2 rounded-lg"
                  >
                    <span className="font-medium text-stone-300">
                      {dayName}
                    </span>

                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        isClosed
                          ? "rounded-md border border-red-500/30 bg-red-950/40 px-2 py-0.5 text-red-400"
                          : "text-amber-300"
                      }`}
                    >
                      {isClosed ? (
                        timeString
                      ) : (
                        <span className="flex flex-col items-end gap-1">
                          {timeSlots.map((slot, slotIndex) => (
                            <span key={slotIndex}>
                              {slot}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="py-6 text-center text-sm text-stone-500">
                No schedule available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 