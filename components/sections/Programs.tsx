"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

const programs = [
  { image: "/program-1.webp", label: "Grassroots Program",       sublabel: "Ages 10 - 13" },
  { image: "/program-2.webp", label: "Rising Players Program",   sublabel: "Ages 14 - 16" },
  { image: "/program-3.webp", label: "Elite & Exposure Program", sublabel: "Ages 17 - 19" },
];

export default function Programs() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fade = "transition-all duration-700 ease-out";
  const in_ = "opacity-100 translate-y-0";
  const out = "opacity-0 translate-y-8";

  return (
    <section id="programs" ref={ref} className="bg-dark py-20 px-6 md:px-16 scroll-mt-16">

      {/* Header row */}
      <div
        className={`mb-12 flex flex-col gap-6 md:flex-row md:items-start md:gap-16 ${fade} ${visible ? in_ : out}`}
      >
        <h2 className="font-display text-5xl leading-none text-white md:text-7xl shrink-0">
          OUR PROGRAMS
        </h2>
        <p className="max-w-xs font-sans text-sm leading-relaxed text-muted md:pt-2 md:ml-auto md:text-right">
          Comprehensive training programs crafted for every age, skill level,
          and ambition on the journey to football excellence.
        </p>
      </div>

      {/* Program cards */}
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-3 ${fade} delay-200 ${visible ? in_ : out}`}
      >
        {programs.map((program) => (
          <div
            key={program.label}
            className="group relative h-[320px] cursor-pointer overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105"
          >
            {/* Background image */}
            <Image
              src={program.image}
              alt={program.label}
              fill
              className="object-cover"
            />

            {/* Green tint overlay: appears on hover */}
            <div className="absolute inset-0 bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Dark gradient: bottom up */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Text: bottom left */}
            <div className="absolute bottom-0 left-0 p-5">
              <p className="font-display text-xl leading-none text-white">
                {program.label}
              </p>
              <p className="mt-1 font-sans text-xs text-muted">
                {program.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className={`mt-10 flex justify-center ${fade} delay-300 ${visible ? in_ : out}`}
      >
        <button
          onClick={() => openModal("trial")}
          className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold font-sans text-white transition-all duration-300 hover:bg-white/20"
        >
          Book a Trial
        </button>
      </div>

    </section>
  );
}
