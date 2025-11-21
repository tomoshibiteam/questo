import { prisma } from "./prisma";

export async function getStats() {
  const [totalUsers, totalCreators, totalQuests, publishedQuests, playSessions, missions, cities] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "creator" } }),
      prisma.quest.count(),
      prisma.quest.count({ where: { status: "published" } }),
      prisma.playSession.count(),
      prisma.mission.count(),
      prisma.quest.groupBy({ by: ["city"], _count: true }),
    ]);

  return {
    totalUsers,
    totalCreators,
    totalQuests,
    publishedQuests,
    totalPlaySessions: playSessions,
    totalMissions: missions,
    totalCities: cities.length,
  };
}

export async function getPublishedQuests(limit?: number) {
  return prisma.quest.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getQuestBySlug(slug: string) {
  return prisma.quest.findUnique({
    where: { slug },
    include: {
      steps: { orderBy: { order: "asc" } },
      missions: true,
      playSessions: true,
      creator: true,
    },
  });
}

export async function getCreatorQuests(userId: string) {
  return prisma.quest.findMany({
    where: { creatorId: userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getCreatorApplication(userId: string) {
  return prisma.creatorApplication.findFirst({
    where: { userId },
  });
}

export async function getCreatorApplicationsAll() {
  return prisma.creatorApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}
