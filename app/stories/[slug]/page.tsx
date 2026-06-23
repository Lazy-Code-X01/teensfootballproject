import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/lib/mockStories";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) notFound();

  const paragraphs = story.story.split("\n\n");

  return (
    <main>

      {/* Hero */}
      <section
        className="relative flex min-h-[60vh] items-end justify-center pt-20"
        style={{
          backgroundImage: `url('${story.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-5xl leading-none text-white md:text-7xl">
              {story.name.toUpperCase()}
            </h1>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-white/80">
              <span className="font-sans text-sm">Age: {story.age}</span>
              <span className="font-sans text-sm">Team: {story.team}</span>
              <span className="font-sans text-sm">Program: {story.program}</span>
            </div>
            <p className="mt-2 font-sans text-xs text-muted">{formatDate(story.date)}</p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">

          {/* Excerpt */}
          <p className="mb-10 border-l-4 border-primary pl-6 font-sans text-lg font-medium leading-relaxed text-dark">
            {story.excerpt}
          </p>

          {/* Story paragraphs */}
          {paragraphs.map((para, i) => (
            <p key={i} className="mb-6 font-sans text-base leading-relaxed text-gray-700">
              {para}
            </p>
          ))}

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-3 border-t border-gray-100 pt-8">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary px-4 py-1 font-sans text-sm text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* Back CTA */}
      <section className="bg-dark py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/stories"
            className="inline-block rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
          >
            Back to Stories
          </Link>
          <h2 className="mt-8 font-display text-3xl leading-none text-white">
            DISCOVER MORE STORIES
          </h2>
        </div>
      </section>

    </main>
  );
}
