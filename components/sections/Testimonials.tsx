"use client";

import { useState } from "react";

type Segment = { text: string; muted: boolean };

const testimonials = [
  {
    segments: [
      { text: '"IT DID NOT JUST CHANGE HIS GAME.', muted: false },
      { text: ' IT CHANGED OUR HOME."', muted: true },
    ] as Segment[],
    name: "Parent of an ATFL Player",
    role: "Afijio Community",
    initials: "AP",
  },
  {
    segments: [
      { text: '"MY COACH WAS THE FIRST TO SAY', muted: false },
      { text: ' I HAD SOMETHING WORTH DEVELOPING."', muted: true },
    ] as Segment[],
    name: "Rising Players Program Participant",
    role: "Age 15",
    initials: "RP",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[index];

  return (
    <section className="bg-dark overflow-hidden py-16 px-6 md:px-16">

      {/* Decorative quote mark: top left */}
      <div
        aria-hidden
        className="font-display leading-none text-white/10 select-none"
        style={{ fontSize: "clamp(8rem, 20vw, 18rem)", lineHeight: 1 }}
      >
        &ldquo;
      </div>

      {/* Quote: left-aligned, massive */}
      <h2
        key={index}
        className="animate-fade-up mt-[-5rem] font-display leading-tight text-white"
        style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
      >
        {t.segments.map((seg, i) => (
          <span key={i} className={seg.muted ? "text-white/30" : "text-white"}>
            {seg.text}
          </span>
        ))}
      </h2>

      {/* Bottom row */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6">

        {/* Left: pill label */}
        <span className="rounded-full border border-white/20 px-4 py-1.5 font-sans text-sm text-white/50">
          Testimonials
        </span>

        {/* Center: avatar + name */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <span className="font-sans text-sm font-bold text-white">{t.initials}</span>
          </div>
          <div>
            <p className="font-sans text-sm font-bold text-white">{t.name}</p>
            <p className="font-sans text-xs text-muted">{t.role}</p>
          </div>
        </div>

        {/* Right: nav arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 hover:border-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
