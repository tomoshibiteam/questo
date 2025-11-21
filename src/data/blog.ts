import type { BlogPostMeta } from "@/types/content";

// MDX の meta を手動で同期させる簡易メタデータ。
export const blogPosts: BlogPostMeta[] = [
  {
    slug: "tomoshinbi-launch",
    title: "TOMOSHIBI プラットフォーム始動",
    date: "2025-03-01",
    tags: ["product", "launch"],
    excerpt: "街歩き×社会課題ミッションの新プラットフォームを始動します。",
    readingTime: "3 min",
  },
  {
    slug: "creator-program",
    title: "クリエイタープログラム募集開始",
    date: "2025-03-15",
    tags: ["creators", "community"],
    excerpt: "謎解きと社会課題をつなぐクリエイターを全国で募集します。",
    readingTime: "2 min",
  },
];
