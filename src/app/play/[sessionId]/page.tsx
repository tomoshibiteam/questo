import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import PlaySessionClient from "@/components/play/PlaySessionClient";

export const dynamic = "force-dynamic";

export default async function PlayPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

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

  // アクセス権がない場合はエラーメッセージを表示
  if (!userId || (playSession.userId && playSession.userId !== userId)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-white">
        <p className="text-center text-sm text-slate-200">
          このプレイセッションにアクセスするにはログインが必要です。
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href="/login"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
          >
            ログイン
          </Link>
          <Link
            href="/quests"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            クエスト一覧へ
          </Link>
        </div>
      </div>
    );
  }

  // セッション完了などの場合は案内表示
  if (playSession.status !== "in_progress") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 text-white">
        <p className="text-center text-sm text-slate-200">
          このセッションは終了しています。クエスト詳細へ戻ってください。
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/quests/${playSession.quest.slug}`}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
          >
            クエスト詳細へ
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            ダッシュボードへ
          </Link>
        </div>
      </div>
    );
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
