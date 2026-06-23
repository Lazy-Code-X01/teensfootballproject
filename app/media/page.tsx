"use client";

import Image from "next/image";
import { highlights, galleryItems, newsItems } from "@/lib/mockMedia";
import { useModal } from "@/context/ModalContext";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function MediaPage() {
  const { openModal } = useModal();
  return (
    <main>

      {/* Section 1: Hero */}
      <section
        className="relative flex min-h-[50vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/media-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-8xl">
            MEDIA
          </h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
            Match highlights, behind the scenes, and the latest news from TFP.
          </p>
        </div>
      </section>

      {/* Section 2: Trending Highlights */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-white">TRENDING HIGHLIGHTS</h2>
          <p className="mt-2 mb-12 font-sans text-sm text-muted">Catch up on the best moments from the pitch</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.id} className="group relative cursor-pointer overflow-hidden rounded-2xl">

                {/* Thumbnail */}
                <div className="relative h-[200px] w-full">
                  <Image src={h.thumbnail} alt={h.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Duration badge */}
                <div className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 font-sans text-xs text-white">
                  {h.duration}
                </div>

                {/* Play button: visible on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title + date */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-sans text-xs font-semibold leading-snug text-white">{h.title}</p>
                  <p className="mt-1 font-sans text-[10px] text-muted">{formatDate(h.date)}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Photo Gallery */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-dark">PHOTO GALLERY</h2>
          <p className="mt-2 mb-12 font-sans text-sm text-muted">Moments captured from training, matches, and everything in between</p>

          <div className="columns-2 gap-4 md:columns-4">
            {galleryItems.map((item, i) => (
              <div key={item.id} className="group relative mb-4 cursor-pointer overflow-hidden rounded-2xl">
                <div
                  className="relative w-full"
                  style={{ height: ["260px","200px","320px","180px","280px","240px","200px","300px"][i % 8] }}
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                  />
                </div>
                {/* Caption on hover */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-sans text-xs text-white">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Latest News */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-white">LATEST NEWS</h2>
          <p className="mt-2 mb-12 font-sans text-sm text-muted">Stay updated with everything happening at TFP</p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {newsItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-2xl bg-[#0d0d0d]">

                {/* Image + category badge */}
                <div className="relative h-[200px] w-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 font-sans text-xs text-white">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-sans text-xs text-muted">{formatDate(item.date)}</p>
                  <h3 className="mt-2 font-display text-lg leading-tight text-white">{item.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{item.excerpt}</p>
                  <button className="mt-4 font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-light">
                    Read More
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Strip */}
      <section className="bg-primary py-16">
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <h2 className="font-display text-3xl leading-none text-white md:text-5xl">
            GOT A STORY TO SHARE?
          </h2>
          <p className="font-sans text-sm text-white/80">
            Send us your match photos and videos to be featured
          </p>
          <button
            onClick={() => openModal("submit-content")}
            className="mt-2 rounded-full bg-white px-8 py-3 font-sans text-sm font-semibold text-dark transition-colors hover:bg-white/90"
          >
            Submit Content
          </button>
        </div>
      </section>

    </main>
  );
}
