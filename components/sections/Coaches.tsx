"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const coaches = [
  {
    image: "/coach-ibrahim.jpg",
    name: "Ibrahim Olanrewaju Akeem",
    role: "Head Coach — Dannaz FC",
    bio: "Experienced grassroots football coach driving development and discipline at Dannaz FC within the Afijio league.",
  },
  {
    image: "/coach-gbenga.jpg",
    name: "Adeleke Gbenga Olalekan",
    role: "Head Coach — Oguntoyinbo FC",
    bio: "Dedicated coach building a strong foundation at Oguntoyinbo FC, focused on player development and team discipline.",
  },
  {
    image: "/coach-abass.jpg",
    name: "Adeleke Abass Oluwatobi",
    role: "Head Coach — Moballers United",
    bio: "Passionate coach leading Moballers United with energy and commitment to nurturing grassroots football talent.",
  },
  {
    image: "/coach-okiki.jpg",
    name: "Okiki Peter Matthew",
    role: "Head Coach — Madux Vision FC",
    bio: "Tactical and driven, Okiki brings structure and vision to Madux Vision FC, developing players on and off the pitch.",
  },
  {
    image: "/coach-saheed.jpg",
    name: "Saheed Oyeladun",
    role: "Head Coach — T&A Legal FC",
    bio: "Dedicated coach leading T&A Legal FC with a focus on tactical development and building team cohesion.",
  },
];

export default function Coaches() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={ref} className="bg-white py-20 px-6 md:px-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr] md:items-start">

        {/* Left column */}
        <div className={`flex flex-col gap-5 ${fade} ${visible ? in_ : out}`}>
          <span className="w-fit rounded-full border border-[#888888] px-4 py-1 font-sans text-sm font-medium text-dark">
            Meet Our Coaches
          </span>
          <h2 className="font-display text-4xl leading-none text-dark md:text-6xl">
            ELITE COACHES, BUILDING FUTURE CHAMPIONS
          </h2>
          <p className="font-sans text-sm leading-relaxed text-muted">
            Experienced mentors dedicated to building skill, discipline, and
            confidence in every player.
          </p>
        </div>

        {/* Right column: flip cards — 2 cols, wraps into 3 rows for 5 coaches */}
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${fade} delay-200 ${visible ? in_ : out}`}>
          {coaches.map((coach) => (
            <div key={coach.name} className="group relative h-[280px] cursor-pointer overflow-hidden rounded-2xl">

              {/* Image */}
              <Image
                src={coach.image}
                alt={coach.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Default overlay: fades out on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0">
                <div className="absolute bottom-4 left-4">
                  <p className="font-sans text-sm font-bold text-white">{coach.name}</p>
                  <p className="font-sans text-xs text-muted">{coach.role}</p>
                </div>
              </div>

              {/* Bio drawer: slides up from bottom */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full rounded-b-2xl bg-primary p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
                <p className="font-sans text-sm font-bold text-white">{coach.name}</p>
                <p className="mt-0.5 font-sans text-xs text-white/70">{coach.role}</p>
                <div className="my-3 h-px w-8 bg-white/30" />
                <p className="font-sans text-xs leading-relaxed text-white">{coach.bio}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
