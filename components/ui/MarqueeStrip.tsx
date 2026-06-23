const TEXT =
  "PLAY. RISE. REPEAT.     PLAY. RISE. REPEAT.     PLAY. RISE. REPEAT.     PLAY. RISE. REPEAT.     PLAY. RISE. REPEAT.     PLAY. RISE. REPEAT.    ";

export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden bg-primary py-5">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="font-display text-3xl text-white md:text-5xl">{TEXT}</span>
        <span className="font-display text-3xl text-white md:text-5xl" aria-hidden>{TEXT}</span>
      </div>
    </div>
  );
}
