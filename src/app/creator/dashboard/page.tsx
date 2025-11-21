import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function CreatorDashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || (user.role !== "creator" && user.role !== "admin")) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">
          クリエイターダッシュボード
        </h1>
        <p className="text-sm text-slate-600">
          クリエイター承認が必要です。まずは申請をしてください。
        </p>
        <Link
          href="/creator/apply"
          className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
        >
          クリエイター申請へ
        </Link>
      </div>
    );
  }

  const quests = await prisma.quest.findMany({
    where: { creatorId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-emerald-700">
          {user.role === "admin" ? "管理者" : "クリエイター"}ステータス
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          {user.name ?? user.email} さん、こんにちは
        </h1>
        <p className="text-sm text-slate-600">
          ゲームを作成し、街歩きクエストを公開しましょう。
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/creator/quests/new"
          className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          ゲームを作成する
        </Link>
        <button className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800">
          下書きをインポート
        </button>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            下書き
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            審査中
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            公開中
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {quests.map((q) => (
            <div
              key={q.id}
              className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{q.title}</p>
                <p className="text-xs text-slate-500">
                  {q.city} / {q.status} / 最終更新 {q.updatedAt.toISOString().slice(0, 10)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/creator/quests/${q.id}/edit`}
                  className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-800 ring-1 ring-slate-200"
                >
                  編集
                </Link>
                <button className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">
                  審査に出す
                </button>
              </div>
            </div>
          ))}
          {quests.length === 0 && (
            <p className="text-sm text-slate-600">まだクエストがありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}
