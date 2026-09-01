import Image from "next/image";

const partners = [
  { id: 1, name: "The Oguntoyinbo Foundation", logo: "/oguntoyinbo-foundation.webp" },
  { id: 2, name: "7Eleven Foundation",         logo: "/7eleven-foundation.webp"     },
  { id: 3, name: "Madux Vision FC",            logo: "/madux-badge.webp"            },
  { id: 4, name: "Dannaz FC",                  logo: "/dannaz-badge.webp"           },
  { id: 5, name: "T&A Legal",                  logo: "/ta-legal-logo.png"           },
  { id: 6, name: "MBU Moballers United",        logo: "/partner-new.jpeg"            },
];

function LogoSlot({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="mx-4 flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5">
      {logo ? (
        <Image src={logo} alt={name} width={120} height={48} className="max-h-10 w-auto object-contain" />
      ) : (
        <span className="font-sans text-xs font-semibold text-gray-400">{name}</span>
      )}
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
          {[...partners, ...partners].filter(p => p.logo).map((p, i) => (
            <LogoSlot key={i} name={p.name} logo={p.logo} />
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
