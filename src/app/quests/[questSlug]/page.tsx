import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QuestDetailPageContent from "./QuestDetailPageContent";

export const dynamic = "force-dynamic";

export default async function QuestDetailPage({
  params,
}: {
  params: Promise<{ questSlug: string }>;
}) {
  const { questSlug } = await params;

  const quest = await prisma.quest.findUnique({
    where: { slug: questSlug, status: "published" },
    include: {
      steps: { orderBy: { order: "asc" } },
      missions: true,
      playSessions: true,
      creator: true,
    },
  });
  if (!quest) return notFound();

  const related = await prisma.quest.findMany({
    where: {
      slug: { not: quest.slug },
      status: "published",
      OR: [{ city: quest.city }, { theme: quest.theme }],
    },
    take: 2,
  });

  return <QuestDetailPageContent quest={quest} related={related} />;
}
