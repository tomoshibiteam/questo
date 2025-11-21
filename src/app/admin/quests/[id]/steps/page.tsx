import { notFound } from "next/navigation";

export default async function AdminQuestStepsPlaceholder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.warn(`Admin quest steps placeholder invoked for id=${id}`);
  return notFound();
}
