import Link from "next/link";

const quickLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/league" },
  { label: "Coaches",  href: "/coaches" },
  { label: "Contact",  href: "/contact" },
];

const facilityLinks = [
  { label: "League",   href: "/league" },
  { label: "Schedule", href: "/schedule" },
  { label: "Media",    href: "/media" },
  { label: "Impact",   href: "/impact" },
];

const moreLinks = [
  { label: "Join Now",   href: "/contact" },
  { label: "Facebook",   href: "#" },
  { label: "Instagram",  href: "#" },
  { label: "Help Center", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-dark">

      {/* Part 1: Big static tagline */}
      <div className="px-6 pt-16 pb-12 text-center md:px-16">
        <p className="mb-4 font-sans text-sm text-muted">
          Every kick brings you closer to greatness. Train with TFP.
        </p>
        <h2 className="font-display text-[clamp(3.5rem,12vw,9rem)] font-bold leading-none tracking-tight text-white">
          PLAY. RISE. REPEAT.
        </h2>
      </div>

      {/* Part 2: Main footer grid */}
      <div className="px-6 pb-16 md:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-display text-2xl text-primary">
              TFP
            </Link>
            <p className="font-sans text-sm leading-relaxed text-muted max-w-[260px]">
              Empowering the next generation of footballers across Nigeria through
              training, teamwork, and passion.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-sm font-semibold text-white">Club</p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-sm font-semibold text-white">More</p>
            <ul className="flex flex-col gap-2">
              {facilityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-sm font-semibold text-white">Connect</p>
            <ul className="flex flex-col gap-2">
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 text-center">
        <p className="font-sans text-xs text-muted">
          © 2025 Teens Football Project. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
