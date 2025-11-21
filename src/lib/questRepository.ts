import type { Quest, QuestStep } from "@prisma/client";
import { prisma } from "./prisma";

// Prisma を唯一のデータ取得手段に統一する（Supabase フォールバックは廃止）

export async function fetchQuests(): Promise<Quest[]> {
  return prisma.quest.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchQuestById(idOrSlug: string): Promise<Quest | null> {
  return prisma.quest.findFirst({
    where: {
      status: "published",
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });
}

export async function fetchStepsByQuest(questId: string): Promise<QuestStep[]> {
  return prisma.questStep.findMany({
    where: { questId },
    orderBy: { order: "asc" },
  });
}
