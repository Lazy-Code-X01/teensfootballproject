const partners = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
  { id: 5, name: "Partner 5" },
  { id: 6, name: "Partner 6" },
];

function LogoSlot({ name }: { name: string }) {
  return (
    <div className="mx-4 flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5">
      <span className="font-sans text-xs text-gray-300">{name}</span>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted">
          Trusted Partners
        </p>
        <h2 className="mt-2 font-display text-3xl leading-none text-dark md:text-4xl">
          OUR PARTNERS
        </h2>
      </div>

      {/* Marquee track */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((p, i) => (
            <LogoSlot key={i} name={p.name} />
          ))}
        </div>
      </div>

      <p className="mt-8 text-center font-sans text-xs text-muted">
        Interested in partnering with TFP?{" "}
        <a href="/sponsors#tiers" className="text-primary underline-offset-2 hover:underline">
          View sponsorship tiers
        </a>
      </p>
    </section>
  );
}
