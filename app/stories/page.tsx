"use client";

import Link from "next/link";
import Image from "next/image";
import { stories } from "@/lib/mockStories";
import { useModal } from "@/context/ModalContext";

export default function StoriesPage() {
  const { openModal } = useModal();
  const featured = stories[0];
  const rest = stories.slice(1);

  return (
    <main>

      {/* Hero */}
      <section
        className="relative flex min-h-[50vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/impact-player.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-8xl">
            AFIJIO PLAYER STORIES
          </h1>
        </div>
      </section>

      {/* Featured Story */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

            {/* Image */}
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <Image src={featured.image} alt={featured.name} fill className="object-cover" />
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-primary px-4 py-2 font-sans text-sm text-white">
                  Featured Story
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block rounded-full border border-primary px-4 py-1 font-sans text-sm text-primary">
                {featured.category}
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-dark md:text-5xl">
                FROM THE STREETS TO THE PITCH
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                <span className="font-sans text-sm text-muted">Age: <span className="text-dark font-semibold">{featured.age}</span></span>
                <span className="font-sans text-sm text-muted">Team: <span className="text-dark font-semibold">{featured.team}</span></span>
                <span className="font-sans text-sm text-muted">Program: <span className="text-dark font-semibold">{featured.program}</span></span>
              </div>
              <Link
                href={`/stories/${featured.slug}`}
                className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Read Adewale&apos;s Story
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 font-display text-4xl leading-none text-white">MORE STORIES</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {rest.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group overflow-hidden rounded-2xl border border-transparent bg-[#0d0d0d] transition-all duration-300 hover:border-primary"
              >
                <div className="relative h-[250px] w-full">
                  <Image src={story.image} alt={story.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-8">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 font-sans text-xs text-white">
                    {story.category}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-white">{story.name}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{story.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <span className="font-sans text-xs text-muted">Age: {story.age}</span>
                    <span className="font-sans text-xs text-muted">Team: {story.team}</span>
                    <span className="font-sans text-xs text-muted">{story.program}</span>
                  </div>
                  <span className="mt-4 inline-block font-sans text-sm font-semibold text-primary transition-colors group-hover:text-primary-light">
                    Read Story
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-white">
            GOT A STORY TO TELL?
          </h2>
          <p className="mt-4 font-sans text-sm text-white/80">
            Every TFP player has a journey worth sharing. Reach out and let us tell yours.
          </p>
          <button
            onClick={() => openModal("share-story")}
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-sans text-sm font-semibold text-dark transition-colors hover:bg-white/90"
          >
            Share Your Story
          </button>
        </div>
      </section>

    </main>
  );
}
