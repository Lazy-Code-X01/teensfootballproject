"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const fundingItems = [
  {
    amount: "₦200k",
    title: "Funds a full month of coaching",
    body: "Covers certified coach salaries, training materials, and session equipment for all active squads across one month.",
  },
  {
    amount: "₦500k",
    title: "Kits an entire team for a season",
    body: "Jerseys, shorts, boots, and match day gear for 20 players — many of whom couldn't afford it otherwise.",
  },
  {
    amount: "₦1M+",
    title: "Runs a full league season",
    body: "Venue bookings, referee fees, logistics, media coverage, and end-of-season awards for all 6 competing teams.",
  },
];

const tiers = [
  {
    level: "BRONZE",
    levelColor: "text-[#cd7f32]",
    title: "Community Partner",
    impact: "Your contribution covers match day logistics for one full round of fixtures — keeping the league running for all 6 teams.",
    benefits: [
      "Logo on TFP website Sponsors page",
      "Social media feature post",
      "Certificate of partnership",
    ],
    featured: false,
    cta: "Start Here",
  },
  {
    level: "SILVER",
    levelColor: "text-primary",
    title: "Growth Partner",
    impact: "Your partnership funds coaching certifications and training equipment for an entire squad. Players see your logo every training session.",
    benefits: [
      "Everything in Bronze",
      "Logo printed on team jerseys",
      "Named in all match day materials",
      "Quarterly impact report",
    ],
    featured: true,
    cta: "Most Impactful",
  },
  {
    level: "GOLD",
    levelColor: "text-[#d4af37]",
    title: "Champion Partner",
    impact: "The highest level of involvement. Your brand is woven into everything TFP does — from jersey to press to player development programs.",
    benefits: [
      "Everything in Silver",
      "Homepage logo placement",
      "Featured in all press and news content",
      "Annual partnership event invitation",
      "Direct input into program development",
    ],
    featured: false,
    cta: "Go All In",
  },
];

const slots = [
  { tier: "Bronze", filled: 2, total: 4 },
  { tier: "Silver", filled: 1, total: 2 },
  { tier: "Gold",   filled: 0, total: 2 },
];

export default function SponsorsPage() {
  const { openModal } = useModal();
  return (
    <main>

      {/* Hero */}
      <section
        className="relative flex min-h-[55vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/sponsors-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-7xl">
            INVEST IN A PLAYER.
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="#tiers"
              className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              View Partnership Tiers
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Story */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            <div className="relative h-[480px] overflow-hidden rounded-2xl">
              <Image src="/about-2.png" alt="TFP players in training" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-sans text-xs text-white/60">Oyo State, Nigeria — 2026 Season</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-4xl leading-none text-dark md:text-5xl">
                TALENT IS EVERYWHERE. OPPORTUNITY IS NOT.
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                Across Oyo State, there are hundreds of teenagers with the skill, drive, and hunger to make it in football. Most will never get the chance — not because they aren&apos;t good enough, but because no one invested in the infrastructure around them.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                TFP exists to close that gap. Since our first season, we&apos;ve developed 500+ players, run 100+ matches, and helped young talents earn trials with professional clubs. Every one of those outcomes had a cost. Sponsors like you made them possible.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                {[["500+", "Players"], ["100+", "Matches"], ["3", "Seasons"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl text-primary">{v}</p>
                    <p className="mt-1 font-sans text-xs text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What Your Support Funds */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
            WHAT YOUR MONEY ACTUALLY DOES
          </h2>
          <p className="mt-3 font-sans text-sm text-muted">
            No vague promises. Here&apos;s exactly where every naira goes.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {fundingItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8">
                <p className="font-display text-4xl text-primary">{item.amount}</p>
                <h3 className="mt-3 font-display text-xl text-white">{item.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section id="tiers" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl leading-none text-dark md:text-5xl">
              PARTNERSHIP TIERS
            </h2>
            <p className="mt-4 font-sans text-sm text-muted">
              Choose how deeply you want to be involved
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.level}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  tier.featured
                    ? "scale-[1.03] border-2 border-primary shadow-xl shadow-primary/10"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {tier.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 font-sans text-xs text-white">
                    Most Impactful
                  </span>
                )}

                <p className={`font-sans text-xs font-bold uppercase tracking-widest ${tier.levelColor}`}>
                  {tier.level}
                </p>
                <h3 className="mt-2 font-display text-2xl text-dark">{tier.title}</h3>

                <p className="mt-4 font-sans text-sm leading-relaxed text-muted border-l-2 border-primary pl-4 italic">
                  &ldquo;{tier.impact}&rdquo;
                </p>

                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="font-sans text-sm text-muted">{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openModal("secure-slot", { tier: tier.level })}
                  className={`mt-8 block w-full rounded-full px-6 py-3 text-center font-sans text-sm font-semibold transition-all duration-300 ${
                    tier.featured
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "border border-dark text-dark hover:bg-dark hover:text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slots Remaining */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            <div>
              <span className="inline-block rounded-full border border-primary px-4 py-1 font-sans text-sm text-primary">
                2026 Season
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-white md:text-5xl">
                PARTNERSHIP SLOTS ARE LIMITED
              </h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                We deliberately limit the number of partners per tier to ensure every sponsor gets meaningful visibility and a real relationship with TFP — not just a logo on a page.
              </p>
              <button
                onClick={() => openModal("secure-slot")}
                className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Secure Your Slot
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {slots.map((slot) => {
                const pct = Math.round((slot.filled / slot.total) * 100);
                const remaining = slot.total - slot.filled;
                return (
                  <div key={slot.tier} className="rounded-2xl bg-[#0d0d0d] p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-display text-lg text-white">{slot.tier} Partner</p>
                      <p className="font-sans text-xs text-muted">
                        <span className="text-primary font-semibold">{remaining} slot{remaining !== 1 ? "s" : ""}</span> remaining
                      </p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-2 font-sans text-xs text-muted">{slot.filled} of {slot.total} slots filled</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative py-24 text-center"
        style={{
          backgroundImage: "url('/sponsors-future.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl leading-none text-white md:text-6xl">
            READY TO MAKE AN IMPACT?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Contact Us About Sponsorship
          </Link>
        </div>
      </section>

    </main>
  );
}
