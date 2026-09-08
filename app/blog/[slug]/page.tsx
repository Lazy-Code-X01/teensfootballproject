import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { db } from "@/lib/db";

const categoryStyle: Record<string, string> = {
  "Announcement": "bg-primary/10 text-primary border-primary/20",
  "Match Report": "bg-amber-50 text-amber-700 border-amber-200",
  "Player News":  "bg-blue-50 text-blue-700 border-blue-200",
  "Club News":    "bg-purple-50 text-purple-700 border-purple-200",
  "General":      "bg-gray-100 text-gray-700 border-gray-200",
};

function readTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function AuthorAvatar({ author }: { author: string }) {
  const initial = author.trim()[0]?.toUpperCase() ?? "T";
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white shadow">
      {initial}
    </span>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await db.article.findUnique({ where: { slug: params.slug } });
  if (!article) return {};
  return { title: `${article.title} | TFP Blog`, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await db.article.findUnique({ where: { slug: params.slug } });

  if (!article || !article.published) notFound();

  const related = await db.article.findMany({
    where: { published: true, NOT: { slug: params.slug } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const paragraphs = article.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main>
      {/* Cover header */}
      <section className="relative flex min-h-[55vh] items-end justify-start pt-20">
        {article.image ? (
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-sans text-xs text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Blog
          </Link>

          <span className={`w-fit rounded-full border px-3 py-1 font-sans text-xs font-semibold ${categoryStyle[article.category] ?? categoryStyle["General"]}`}>
            {article.category}
          </span>

          <h1 className="mt-4 font-display text-4xl leading-tight text-white md:text-6xl lg:text-7xl">
            {article.title.toUpperCase()}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 font-sans text-sm text-white/70">
            <span className="flex items-center gap-2">
              <AuthorAvatar author={article.author} />
              <span>{article.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.date || article.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime(article.body)} min read
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Excerpt lead */}
          {article.excerpt && (
            <p className="mb-8 border-l-4 border-primary pl-5 font-sans text-base leading-relaxed text-dark/80 font-medium italic">
              {article.excerpt}
            </p>
          )}

          {/* Body paragraphs */}
          <div className="flex flex-col gap-5">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-base leading-[1.85] text-gray-700">
                  {p}
                </p>
              ))
            ) : (
              <p className="font-sans text-base leading-relaxed text-gray-400 italic">
                Full article content coming soon.
              </p>
            )}
          </div>

          {/* Category tag */}
          <div className="mt-12 flex items-center gap-2 border-t border-gray-100 pt-8">
            <Tag className="h-4 w-4 text-gray-400" />
            <span className="font-sans text-xs text-gray-400">Filed under:</span>
            <span className={`rounded-full border px-2.5 py-0.5 font-sans text-xs font-semibold ${categoryStyle[article.category] ?? categoryStyle["General"]}`}>
              {article.category}
            </span>
          </div>

          {/* Author card */}
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <AuthorAvatar author={article.author} />
            <div>
              <p className="font-sans text-sm font-semibold text-dark">{article.author}</p>
              <p className="mt-0.5 font-sans text-xs text-muted">Teens Football Project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-[#fafafa] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-display text-3xl text-dark">MORE ARTICLES</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-[180px] w-full overflow-hidden">
                    {r.image ? (
                      <Image src={r.image} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100">
                        <span className="font-display text-4xl text-gray-200">TFP</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className={`w-fit rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold ${categoryStyle[r.category] ?? categoryStyle["General"]}`}>
                      {r.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg leading-tight text-dark line-clamp-2 transition-colors group-hover:text-primary">
                      {r.title.toUpperCase()}
                    </h3>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-muted line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
