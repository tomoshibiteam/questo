import { notFound } from "next/navigation";

export default async function AdminQuestPlaceholder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 管理画面個別編集は現在未対応。ビルドエラー回避用のプレースホルダー。
  const { id } = await params;
  console.warn(`Admin quest page placeholder invoked for id=${id}`);
  return notFound();
}
