"use client";

import Link from "next/link";
import { useModal } from "@/context/ModalContext";

const contactItems = [
  {
    label: "Oyo State, Nigeria",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "info@teensfootballproject.org",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "+234 800 000 0000",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.01 21 3 13.99 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
      </svg>
    ),
  },
];

export default function CTABanner() {
  const { openModal } = useModal();
  return (
    <section className="grid min-h-[500px] grid-cols-1 md:grid-cols-2">

      {/* Left column: dark */}
      <div className="flex flex-col justify-center bg-[#010101] p-12 md:p-16">

        {/* Pill label */}
        <span className="w-fit rounded-full border border-primary px-4 py-1 font-sans text-sm text-primary">
          Open Registration
        </span>

        {/* Heading */}
        <h2 className="mt-4 font-display text-4xl leading-none text-white md:text-6xl">
          WE INVITE YOU TO JOIN TFP
        </h2>

        {/* Body */}
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
          TFP&apos;s operational league, Afigio, is now open for registration. Be part of a movement shaping Nigeria&apos;s next generation of football stars.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => openModal("trial")}
            className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Register Now
          </button>
          <Link
            href="/about"
            className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
          >
            Learn More
          </Link>
        </div>

        {/* Contact info */}
        <ul className="mt-8 flex flex-col gap-3">
          {contactItems.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-muted">
              {item.icon}
              <span className="font-sans text-sm">{item.label}</span>
            </li>
          ))}
        </ul>

      </div>

      {/* Right column: image */}
      <div
        className="relative min-h-[300px] md:min-h-0"
        style={{
          backgroundImage: "url('/cta-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

    </section>
  );
}
