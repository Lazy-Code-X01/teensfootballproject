"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Certified Coaches",
    description:
      "All our coaches are licensed professionals with international coaching certifications and years of youth development experience.",
  },
  {
    title: "Modern Training Grounds",
    description:
      "Our pitch facilities are maintained to professional standards, giving players the best environment to develop their game.",
  },
  {
    title: "Proven Achievements",
    description:
      "Our players have gone on to represent state teams, national youth squads, and earn professional trials abroad.",
  },
  {
    title: "Community & Growth",
    description:
      "TFP is more than football. We build character, discipline, and a sense of belonging that extends beyond the pitch.",
  },
];

export default function AcademyFeatures() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">

        {/* Left column */}
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-4xl leading-none text-dark md:text-6xl">
            STEP INSIDE OUR ACADEMY
          </h2>
          <p className="font-sans text-sm leading-relaxed text-muted">
            Experience our cutting-edge facilities designed to nurture talent,
            improve performance and help every player reach their potential.
          </p>
          <Image
            src="/academy.png"
            alt="TFP Academy facilities"
            width={600}
            height={300}
            className="h-[300px] w-full rounded-2xl object-cover"
          />
        </div>

        {/* Right column: accordion */}
        <div className="flex flex-col">
          <div className="divide-y divide-gray-200">
            {features.map((feature, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={feature.title}>
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span
                      className={`font-sans text-sm font-semibold transition-colors duration-200 ${
                        isOpen ? "text-primary" : "text-dark"
                      }`}
                    >
                      {feature.title}
                    </span>
                    <span
                      className={`ml-4 shrink-0 text-lg transition-transform duration-300 ${
                        isOpen ? "rotate-90 text-primary" : "text-dark"
                      }`}
                    >
                      ↗
                    </span>
                  </button>

                  {/* Expandable description */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "max-h-40 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="font-sans text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Get in Touch
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
