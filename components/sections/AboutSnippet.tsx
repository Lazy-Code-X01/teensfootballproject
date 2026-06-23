"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSnippet() {
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
    <section ref={ref} className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top: image + mission statement */}
        <div className={`flex flex-col md:flex-row items-center gap-10 lg:gap-14 ${fade} ${visible ? in_ : out}`}>
          {/* Small portrait image */}
          <div className="w-full max-w-[280px] shrink-0">
            <Image
              src="/about-1.png"
              alt="TFP players training"
              width={280}
              height={340}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* Mission statement */}
          <p className="font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
            <span className="text-dark">
              At TFP, we build confident players, strong teamwork, and lifelong discipline
            </span>
            <span className="text-muted">
              {" "}through professional coaching and passion for the game.
            </span>
          </p>
        </div>

        {/* Divider */}
        <hr className={`my-12 border-gray-200 ${fade} delay-150 ${visible ? "opacity-100" : "opacity-0"}`} />

      </div>

      {/* Bottom: 3-column grid */}
      <div className={`px-6 md:px-16 ${fade} delay-300 ${visible ? in_ : out}`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.5fr_1fr] md:items-start">

          {/* [A] Left: pill top, body + button pushed to bottom */}
          <div className="order-1 flex flex-col items-start md:col-start-1" style={{minHeight: '280px'}}>
            <span className="w-fit rounded-full border border-[#888888] px-4 py-1 text-sm font-medium text-dark">
              About Us
            </span>
            <div className="mt-auto flex flex-col gap-4">
              <p className="font-sans text-sm leading-relaxed text-muted">
                We are shaping Nigeria&apos;s next generation of footballers with
                dedication, structure, and values that go beyond the pitch.
              </p>
              <Link
                href="/contact"
                className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* [B] Center: large image: dominant, explicit height */}
          <div className="order-3 md:order-2 md:col-start-2">
            <Image
              src="/about-2.png"
              alt="TFP team together"
              width={500}
              height={600}
              className="h-[280px] w-full rounded-2xl object-cover"
            />
          </div>

          {/* [C] Right: muted text top, image pushed to bottom */}
          <div className="order-4 md:order-3 flex flex-col md:col-start-3" style={{minHeight: '280px'}}>
            <p className="font-sans text-sm leading-relaxed text-muted">
              Our mission is to nurture young talent with skilled coaching and a
              spirit of sportsmanship.
            </p>
            <div className="mt-auto">
              <Image
                src="/about-3.png"
                alt="TFP coaching session"
                width={360}
                height={160}
                className="h-[160px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
