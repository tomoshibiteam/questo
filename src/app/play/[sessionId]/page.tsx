import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import PlaySessionClient from "@/components/play/PlaySessionClient";

type Props = { params: Promise<{ sessionId: string }> };

export default async function PlayPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { sessionId } = await params;
  if (!sessionId) return notFound();

  const playSession = await prisma.playSession.findUnique({
    where: { id: sessionId },
    include: {
      quest: {
        include: {
          steps: { orderBy: { order: "asc" } },
          missions: true,
        },
      },
    },
  });

  if (!playSession) return notFound();
  if (playSession.userId && playSession.userId !== session.user.id) {
    redirect("/quests");
  }
  if (playSession.status !== "in_progress") {
    redirect(`/quests/${playSession.quest.slug}`);
  }

  return (
    <div className="h-screen bg-slate-900">
      <PlaySessionClient
        sessionId={playSession.id}
        quest={{
          id: playSession.quest.id,
          slug: playSession.quest.slug,
          title: playSession.quest.title,
          city: playSession.quest.city,
          durationMin: playSession.quest.durationMin,
          distanceKm: playSession.quest.distanceKm,
          steps: playSession.quest.steps,
          missions: playSession.quest.missions,
        }}
      />
    </div>
  );
}
