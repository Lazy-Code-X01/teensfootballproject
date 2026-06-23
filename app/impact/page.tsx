"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Target, Heart, GraduationCap, Users, Handshake } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const stats = [
  { value: "500+", label: "Players Developed" },
  { value: "20+",  label: "Active Teams" },
  { value: "3",    label: "Seasons Completed" },
  { value: "10+",  label: "Communities Reached" },
];

const timelineItems = [
  {
    year: "2023",
    side: "left",
    title: "THE BEGINNING",
    body: "TFP launched its first season in Oyo State with 6 teams and 120 players. A dream to give Nigerian teenagers a structured football pathway was born.",
    stat: "120 Players · 6 Teams · 1 Season",
  },
  {
    year: "2024",
    side: "right",
    title: "GROWING STRONGER",
    body: "Season 2 saw TFP double in size. New teams joined from across Oyo State, coaching staff expanded, and the first players began earning trials with professional clubs.",
    stat: "280 Players · 14 Teams · 2 Seasons",
  },
  {
    year: "2025",
    side: "left",
    title: "BUILDING A MOVEMENT",
    body: "Season 3 established TFP as a serious youth development platform. 500+ players, 20+ teams, and a clear pathway from grassroots to global exposure.",
    stat: "500+ Players · 20+ Teams · 3 Seasons",
  },
];

const sdgCards = [
  {
    icon: <Heart className="h-7 w-7 text-primary" />,
    number: "SDG 3",
    title: "Good Health & Wellbeing",
    body: "Promoting physical fitness, mental resilience, and healthy lifestyles through sport.",
  },
  {
    icon: <GraduationCap className="h-7 w-7 text-primary" />,
    number: "SDG 4",
    title: "Quality Education",
    body: "Ensuring football development never comes at the cost of academic achievement.",
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    number: "SDG 10",
    title: "Reduced Inequalities",
    body: "Opening doors for talented young people regardless of their background or economic status.",
  },
  {
    icon: <Handshake className="h-7 w-7 text-primary" />,
    number: "SDG 17",
    title: "Partnerships for Goals",
    body: "Building meaningful partnerships with sponsors, schools, and communities to multiply impact.",
  },
];

const futureGoals = [
  "Expand to all 6 geopolitical zones by 2027",
  "5,000+ players developed annually by 2028",
  "Formal pro club partnership pipeline by 2026",
];

const educationBullets = [
  "Flexible training schedules built around school hours",
  "Academic performance tracked for all registered players",
  "Active partnerships with schools across Oyo State",
];

function TimelineCard({ item }: { item: typeof timelineItems[0] }) {
  return (
    <div className="rounded-2xl bg-[#0d0d0d] p-8 max-w-md w-full">
      <h3 className="font-display text-2xl text-white">{item.title}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
      <p className="mt-4 font-sans text-sm font-semibold text-primary">{item.stat}</p>
    </div>
  );
}

export default function ImpactPage() {
  const { openModal } = useModal();
  return (
    <main>

      {/* Section 1: Hero */}
      <section
        className="relative flex min-h-[55vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/impact-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-8xl">
            CHANGING LIVES THROUGH FOOTBALL
          </h1>
        </div>
      </section>

      {/* Section 2: Impact Numbers */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center ${i < stats.length - 1 ? "md:border-r md:border-white/20" : ""}`}>
                <p className="font-display text-6xl text-white md:text-8xl">{s.value}</p>
                <p className="mt-2 font-sans text-sm text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Growth Story (Timeline) */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
              OUR GROWTH STORY
            </h2>
            <p className="mt-4 font-sans text-sm text-muted">
              From a small local league to a structured youth development platform
            </p>
          </div>

          <div className="relative mt-16">

            {/* Desktop center line */}
            <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-primary md:block" />

            {/* Mobile left line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary md:hidden" />

            {/* Desktop timeline */}
            <div className="hidden md:flex md:flex-col md:gap-16">
              {timelineItems.map((item) => {
                const isLeft = item.side === "left";
                return (
                  <div key={item.year} className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
                    <div className={`flex ${isLeft ? "justify-end" : ""}`}>
                      {isLeft && <TimelineCard item={item} />}
                    </div>
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white shrink-0">
                      {item.year}
                    </div>
                    <div>
                      {!isLeft && <TimelineCard item={item} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile timeline */}
            <div className="flex flex-col gap-10 md:hidden">
              {timelineItems.map((item) => (
                <div key={item.year} className="flex items-start gap-6 pl-2">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-white">
                    &apos;{item.year.slice(2)}
                  </div>
                  <TimelineCard item={item} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Community Image Break */}
      <section
        className="relative h-[450px] w-full"
        style={{
          backgroundImage: "url('/impact-community.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl leading-none text-white md:text-5xl">
              MORE THAN FOOTBALL
            </h2>
            <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-white/80">
              TFP brings families and communities together. Every match day is a celebration of youth, potential, and collective pride.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Education & Football */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            <div>
              <span className="inline-block rounded-full border border-[#888888] px-4 py-1 font-sans text-sm text-dark">
                Beyond The Pitch
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-dark md:text-5xl">
                FOOTBALL AND EDUCATION, HAND IN HAND
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                At TFP, we understand that football alone cannot define a young person&apos;s future. We work closely with schools and parents to ensure every player maintains strong academic performance alongside their football development.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {educationBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="font-sans text-sm text-dark">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-8 border-t border-gray-100 pt-8">
                <div>
                  <p className="font-display text-3xl text-primary">95%</p>
                  <p className="mt-1 font-sans text-xs text-muted">Players maintain school attendance</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-primary">12</p>
                  <p className="mt-1 font-sans text-xs text-muted">Partner schools</p>
                </div>
              </div>
            </div>

            <div className="relative h-[450px] overflow-hidden rounded-2xl">
              <Image src="/about-edu.png" alt="Football and education" fill className="object-cover" />
            </div>

          </div>
        </div>
      </section>

      {/* Section 6: Player Image Break */}
      <section
        className="relative flex h-[500px] items-center justify-center"
        style={{
          backgroundImage: "url('/impact-player.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="font-display text-4xl leading-none text-white md:text-6xl">
            EVERY PLAYER HAS A STORY
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/80">
            From shy beginners to confident athletes — TFP transforms young people both on and off the pitch.
          </p>
          <Link
            href="/stories"
            className="mt-8 inline-block rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
          >
            Read Player Stories
          </Link>
        </div>
      </section>

      {/* Section 7: SDG Alignment */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
              ALIGNED WITH GLOBAL GOALS
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-muted">
              TFP actively contributes to the United Nations Sustainable Development Goals
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {sdgCards.map((card) => (
              <div
                key={card.number}
                className="rounded-2xl border border-transparent bg-[#0d0d0d] p-8 text-center transition-all duration-300 hover:border-primary"
              >
                <div className="flex justify-center">{card.icon}</div>
                <p className="mt-3 font-display text-3xl text-primary">{card.number}</p>
                <h3 className="mt-2 font-sans text-sm font-bold text-white">{card.title}</h3>
                <p className="mt-3 font-sans text-xs leading-relaxed text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Future Vision */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image src="/impact-growth.png" alt="TFP growth" fill className="object-cover" />
            </div>

            <div>
              <span className="inline-block rounded-full border border-[#888888] px-4 py-1 font-sans text-sm text-dark">
                Looking Ahead
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-dark md:text-5xl">
                WHERE WE ARE GOING
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                TFP is just getting started. Our vision for the next 3 years is to expand across all 36 states of Nigeria, develop 5,000+ players annually, and establish formal partnerships with professional clubs to create a clear pathway from grassroots to professional football.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {futureGoals.map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="font-sans text-sm text-dark">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
            BE PART OF THE IMPACT
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/80">
            Whether you&apos;re a sponsor, a coach, or a parent — there&apos;s a place for you in the TFP movement.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sponsors"
              className="rounded-full bg-white px-6 py-3 font-sans text-sm font-semibold text-dark transition-colors hover:bg-white/90"
            >
              Partner With Us
            </Link>
            <button
              onClick={() => openModal("trial")}
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
            >
              Book a Trial
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
