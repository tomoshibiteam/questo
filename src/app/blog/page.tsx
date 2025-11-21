import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-8">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 text-sm text-slate-700">
        TOMOSHIBI のニュースやケーススタディをお届けします（ダミーデータ）。
      </p>
      <div className="mt-5 space-y-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{post.date}</span>
              <span>{post.readingTime ?? "3 min"}</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {post.title}
            </h2>
            <p className="mt-1 text-sm text-slate-700">{post.excerpt}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-700">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-3 py-1 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
