import Link from "next/link";

const stats = [
  { value: "500+", label: "Players" },
  { value: "20+",  label: "Teams" },
  { value: "3",    label: "Seasons" },
  { value: "100+", label: "Matches Played" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/home-test-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0">
        {/* Left-heavy gradient: dark for text, fades into players on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(1,1,1,0.92) 0%, rgba(1,1,1,0.75) 40%, rgba(1,1,1,0.2) 70%, rgba(1,1,1,0.05) 100%)",
          }}
        />
        {/* Bottom fade into page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-end pt-20 lg:pt-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-8">

            {/* Left column */}
            <div className="max-w-2xl pb-8 lg:pb-12">

              {/* Headline */}
              <h1 className="animate-fade-up delay-100 font-display leading-[0.9] tracking-wide mb-4">
                <span className="block text-white text-[clamp(4rem,10vw,8rem)]">TRAIN.</span>
                <span className="block text-white text-[clamp(4rem,10vw,8rem)]">GROW.</span>
                <span className="block text-primary text-[clamp(4rem,10vw,8rem)]">SUCCEED.</span>
              </h1>

              {/* Subtext */}
              <p className="animate-fade-up delay-200 max-w-md text-base md:text-lg font-sans text-white/65 mb-6 leading-relaxed">
                Developing future football stars from grassroots to the global
                stage. Join the movement.
              </p>

              {/* CTAs */}
              <div className="animate-fade-up delay-300 flex flex-wrap items-center gap-4">
                <Link
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-sans font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                >
                  View Programs
                </Link>
                <Link
                  href="/league"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-sans font-semibold text-white transition-all duration-300 hover:bg-white/20"
                >
                  View Fixtures
                </Link>
              </div>
            </div>

            {/* Right column: Next Match card (desktop only) */}
            {/* <div className="animate-fade-up delay-500 hidden lg:block shrink-0 self-end mb-24">
              <div className="w-72 rounded-xl border border-white/10 bg-dark-card/90 p-6 backdrop-blur-md">
                <div className="mb-5 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary-light">
                    Next Match
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-xs font-bold text-primary-light">LFC</span>
                    </div>
                    <p className="text-sm font-semibold text-white text-center leading-tight">Lagos FC</p>
                  </div>
                  <span className="font-display text-2xl tracking-widest text-accent">VS</span>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                      <span className="text-xs font-bold text-accent">ABJ</span>
                    </div>
                    <p className="text-sm font-semibold text-white text-center leading-tight">Abuja Stars</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted">
                  <span>Sat, 22 Jun 2026</span>
                  <span>3:00 PM WAT</span>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex divide-x divide-white/10 overflow-x-auto scrollbar-hide">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-[110px] flex-1 flex-col items-center justify-center px-4 py-3 text-center"
              >
                <p className="text-base font-bold leading-none text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 whitespace-nowrap text-[11px] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
