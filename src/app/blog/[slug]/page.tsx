import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  if (!meta) return notFound();

  const mdxModule = await import(`@/content/blog/posts/${slug}.mdx`);
  const Post = mdxModule.default;
  const mdxMeta = (mdxModule as { meta?: typeof meta }).meta ?? meta;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-12 pt-8">
      <p className="text-xs text-emerald-700">{mdxMeta.date}</p>
      <h1 className="text-3xl font-bold text-slate-900">{mdxMeta.title}</h1>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-700">
        {mdxMeta.tags?.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-50 px-3 py-1 font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="prose prose-sm prose-emerald mt-6 max-w-none">
        <Post />
      </div>
    </div>
  );
}
