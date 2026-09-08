"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  date: string;
  createdAt: string;
};

const CATEGORIES = ["All", "Announcement", "Match Report", "Player News", "Club News", "General"];

const categoryStyle: Record<string, string> = {
  "Announcement": "bg-primary/15 text-primary border-primary/25",
  "Match Report": "bg-amber-500/15 text-amber-600 border-amber-400/25",
  "Player News":  "bg-blue-500/15 text-blue-600 border-blue-400/25",
  "Club News":    "bg-purple-500/15 text-purple-600 border-purple-400/25",
  "General":      "bg-gray-200 text-gray-700 border-gray-300",
};

function readTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function AuthorDot({ author }: { author: string }) {
  const initial = author.trim()[0]?.toUpperCase() ?? "T";
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary font-sans text-[10px] font-bold text-white">
      {initial}
    </span>
  );
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => { setArticles(data); setLoading(false); });
  }, []);

  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);
  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <main>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[46vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/about-1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-8xl">
            ARTICLES &amp; UPDATES
          </h1>
          <p className="mt-4 max-w-xl mx-auto font-sans text-sm leading-relaxed text-white/60">
            News, match reports, player stories and insights from the Afijio Teens Football League.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-200 border ${
                  active === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <section className="bg-white py-32 text-center">
          <p className="font-sans text-sm text-muted animate-pulse">Loading articles...</p>
        </section>
      ) : filtered.length === 0 ? (
        <section className="bg-white py-32 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-200" />
          <p className="font-sans text-base font-semibold text-dark">No articles yet</p>
          <p className="mt-2 font-sans text-sm text-muted">Check back soon for updates.</p>
        </section>
      ) : (
        <>
          {/* Featured Article */}
          {featured && (
            <section className="bg-white py-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                  Featured Article
                </p>
                <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 items-center gap-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-[300px] w-full overflow-hidden md:h-[440px]">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100">
                        <BookOpen className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center bg-white p-8 md:p-12">
                    <span className={`w-fit rounded-full border px-3 py-1 font-sans text-xs font-semibold ${categoryStyle[featured.category] ?? categoryStyle["General"]}`}>
                      {featured.category}
                    </span>
                    <h2 className="mt-4 font-display text-3xl leading-tight text-dark md:text-4xl lg:text-5xl">
                      {featured.title.toUpperCase()}
                    </h2>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-400 font-sans">
                      <span className="flex items-center gap-1.5">
                        <AuthorDot author={featured.author} />
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(featured.date || featured.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {readTime(featured.body)} min read
                      </span>
                    </div>
                    <div className="mt-8 flex items-center gap-2 font-sans text-sm font-semibold text-primary transition-all duration-200 group-hover:gap-3">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Article Grid */}
          {rest.length > 0 && (
            <section className="bg-[#fafafa] py-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-8 font-display text-3xl text-dark">MORE ARTICLES</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Card image */}
                      <div className="relative h-[200px] w-full overflow-hidden">
                        {article.image ? (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gray-100">
                            <BookOpen className="h-10 w-10 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>

                      {/* Card content */}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <span className={`rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold ${categoryStyle[article.category] ?? categoryStyle["General"]}`}>
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 font-sans text-[10px] text-gray-400">
                            <Clock className="h-2.5 w-2.5" />
                            {readTime(article.body)} min
                          </span>
                        </div>
                        <h3 className="font-display text-xl leading-tight text-dark line-clamp-2 transition-colors group-hover:text-primary">
                          {article.title.toUpperCase()}
                        </h3>
                        <p className="mt-2 flex-1 font-sans text-xs leading-relaxed text-muted line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                          <span className="flex items-center gap-1.5 font-sans text-[11px] text-gray-400">
                            <AuthorDot author={article.author} />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1 font-sans text-[11px] text-gray-400">
                            <Calendar className="h-2.5 w-2.5" />
                            {formatDate(article.date || article.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Footer CTA */}
      <section className="bg-dark py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
            STAY IN THE LOOP
          </h2>
          <p className="mt-4 font-sans text-sm text-muted">
            Follow TFP for the latest news, match reports, and league updates.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
