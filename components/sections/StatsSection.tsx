const stats = [
  { value: "105",   label: "Players",       description: "Young athletes in the programme" },
  { value: "20+",   label: "Teams",         description: "Clubs competing across Oyo State" },
  { value: "3",     label: "Seasons",       description: "Completed seasons since 2023" },
  { value: "100+",  label: "Matches",       description: "Fixtures played across all seasons" },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-dark py-20 md:py-28">

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(27,138,62,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl leading-none text-white md:text-6xl">
            IMPACT IN FIGURES
          </h2>
          <p className="mt-3 font-sans text-sm text-muted">
            Real results from real investment in Nigeria&apos;s teenage talent.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center justify-center px-6 py-10 text-center transition-colors duration-300 hover:bg-primary/[0.07]"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-500 group-hover:w-3/4" />

              <p className="font-display text-5xl leading-none text-white md:text-7xl">
                {stat.value}
              </p>
              <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-widest text-primary">
                {stat.label}
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-muted">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
