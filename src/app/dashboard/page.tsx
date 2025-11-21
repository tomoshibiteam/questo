import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { PlayStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

function formatDate(date?: Date | null) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const playSessions = await prisma.playSession.findMany({
    where: { userId: session.user.id },
    include: { quest: true },
    orderBy: { startedAt: "desc" },
  });

  // プレイ中は同一クエストを1件（最新の開始日時）だけ表示する
  const activeMap = new Map<string, typeof playSessions[number]>();
  const activeStatuses: PlayStatus[] = ["in_progress"];
  for (const s of playSessions) {
    if (activeStatuses.includes(s.status)) {
      const key = s.questId;
      const existing = activeMap.get(key);
      if (!existing || (existing.startedAt && s.startedAt && s.startedAt > existing.startedAt)) {
        activeMap.set(key, s);
      }
    }
  }
  const active = Array.from(activeMap.values());
  const completed = playSessions.filter((p) => p.status === "completed");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Dashboard
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              {session.user.name ?? session.user.email} さん
            </h1>
            <p className="mt-1 inline-flex items-center gap-2 text-sm text-slate-600">
              <span>これまでに遊んだクエストや購入済みのゲームを確認できます。</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {session.user.role}
              </span>
            </p>
          </div>
          <Link
            href="/quests"
            className="hidden rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 md:inline-flex"
          >
            クエスト一覧へ
          </Link>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Active
            </p>
            <h2 className="text-xl font-semibold text-slate-900">プレイ中 / 未完了のクエスト</h2>
          </div>
        </div>
        {active.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-600 shadow-sm">
            まだプレイ中のクエストはありません。クエスト一覧から新しく始めましょう。
            <div className="mt-3">
              <Link
                href="/quests"
                className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                クエスト一覧へ
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {active.map((session) => (
              <div
                key={session.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      プレイ中
                    </span>
                    <span>{formatDate(session.startedAt)} 開始</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {session.quest?.title ?? "不明なクエスト"}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {session.quest?.city ?? ""} / 所要 {session.quest?.durationMin}分 / 距離{" "}
                    {session.quest?.distanceKm}km
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/play/${session.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    続きから遊ぶ
                  </Link>
                  {session.quest?.slug && (
                    <Link
                      href={`/quests/${session.quest.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      クエスト詳細
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Completed
          </p>
          <h2 className="text-xl font-semibold text-slate-900">クリアしたクエスト</h2>
        </div>
        {completed.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-600 shadow-sm">
            まだクリアしたクエストはありません。
          </div>
        ) : (
          <div className="grid gap-4">
            {completed.map((session) => (
              <div
                key={session.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                      クリア済み
                    </span>
                    <span>{formatDate(session.finishedAt)} 完了</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {session.quest?.title ?? "不明なクエスト"}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {session.quest?.city ?? ""} / 所要 {session.quest?.durationMin}分 / 距離{" "}
                    {session.quest?.distanceKm}km
                  </p>
                </div>
                <div className="flex gap-2">
                  {session.quest?.slug && (
                    <Link
                      href={`/quests/${session.quest.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      クエスト詳細
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
