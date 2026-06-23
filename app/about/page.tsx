import Link from "next/link";
import Image from "next/image";
import { Trophy, Handshake, GraduationCap, Globe, Check } from "lucide-react";

const values = [
  {
    icon: <Trophy className="h-8 w-8 text-primary" />,
    title: "Excellence",
    body: "We pursue the highest standards in training, coaching, and player development.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "Teamwork",
    body: "Football is a team sport. We build players who lift each other up on and off the pitch.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Education",
    body: "We balance football with academics because we develop whole human beings, not just athletes.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Community",
    body: "TFP is rooted in the community. We give back, we grow together, we rise together.",
  },
];

const steps = [
  {
    number: "01",
    title: "Grassroots",
    body: "Players join TFP at the foundation level, learning the basics of the game in a fun, supportive environment.",
  },
  {
    number: "02",
    title: "Training",
    body: "Structured coaching sessions with certified coaches build technical skills, fitness, and tactical awareness.",
  },
  {
    number: "03",
    title: "Matches",
    body: "Players compete in organised league fixtures, gaining real match experience and exposure.",
  },
  {
    number: "04",
    title: "Exposure",
    body: "Top performers get opportunities for trials, scouting, and representation at regional and national level.",
  },
];

const stats = [
  { value: "500+", label: "Players Developed" },
  { value: "20+",  label: "Active Teams" },
  { value: "3",    label: "Seasons Completed" },
  { value: "100+", label: "Matches Played" },
];

const bullets = [
  "Flexible training schedules around school hours",
  "Academic performance monitoring for all players",
  "Partnerships with local schools in Oyo State",
];

export default function AboutPage() {
  return (
    <main>

      {/* Section 1: Hero Banner */}
      <section
        className="relative flex min-h-[50vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/about-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-8xl">
            ABOUT TFP
          </h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
            From grassroots to the global stage. This is our journey.
          </p>
        </div>
      </section>

      {/* Section 2: Our Story */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            {/* Image */}
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
              <Image src="/about-2.png" alt="TFP players training" fill className="object-cover" />
            </div>

            {/* Text */}
            <div>
              <span className="inline-block rounded-full border border-[#888888] px-4 py-1 font-sans text-sm text-dark">
                Who We Are
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-dark md:text-5xl">
                BUILDING CHAMPIONS ON AND OFF THE PITCH
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                Teens Football Project (TFP) was founded with one mission — to give Nigerian teenagers
                a structured, professional pathway from grassroots football to global recognition. We
                believe every talented young player deserves the right environment, the right coaching,
                and the right opportunities to shine.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                What started as a small local league in Oyo State has grown into a movement. TFP now
                runs 3 active seasons, develops 500+ players annually, and has helped young talents
                earn trials with professional clubs.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Join the Movement
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Mission & Values */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <h2 className="font-display text-4xl leading-none text-white md:text-6xl">
              OUR MISSION & VALUES
            </h2>
            <p className="mt-4 font-sans text-sm text-muted">
              Everything we do is guided by these core principles
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-transparent bg-[#0d0d0d] p-8 text-center transition-all duration-300 hover:border-primary"
              >
                <div className="flex justify-center">{v.icon}</div>
                <h3 className="mt-4 font-display text-xl text-white">{v.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 4: The Journey (Timeline) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <h2 className="font-display text-4xl leading-none text-dark md:text-6xl">
              THE TFP JOURNEY
            </h2>
            <p className="mt-4 font-sans text-sm text-muted">
              Every player follows a proven pathway to excellence
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">

            {/* Horizontal connecting line: desktop */}
            <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gray-200 md:block" />

            {/* Vertical connecting line: mobile */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 md:hidden" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center">

                  {/* Circle marker */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm text-white">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="md:mt-6">
                    <h3 className="font-display text-xl text-dark">{step.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Section 5: Education + Football */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            {/* Text */}
            <div>
              <span className="inline-block rounded-full border border-white/30 px-4 py-1 font-sans text-sm text-white">
                Beyond The Pitch
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-white md:text-5xl">
                FOOTBALL AND EDUCATION, HAND IN HAND
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                At TFP, we understand that football alone cannot define a young person&apos;s future.
                That&apos;s why we work with schools and parents to ensure every player maintains their
                academic performance while pursuing their football dreams.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="font-sans text-sm text-white">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
              <Image src="/about-edu.png" alt="Football and education" fill className="object-cover" />
            </div>

          </div>
        </div>
      </section>

      {/* Section 6: Stats Bar */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl text-white md:text-7xl">{s.value}</p>
                <p className="mt-2 font-sans text-sm text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Match Day CTA */}
      <section
        className="relative flex min-h-[400px] items-center justify-center"
        style={{
          backgroundImage: "url('/about-match.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="font-display text-4xl leading-none text-white md:text-6xl">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/70 md:text-base">
            Join hundreds of young players already on their path to greatness.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Book a Trial
            </Link>
            <Link
              href="/about"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
