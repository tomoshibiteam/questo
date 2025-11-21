import Link from "next/link";
import { fetchQuests } from "@/lib/questRepository";
import { logoutAdmin } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const quests = await fetchQuests();

  return (
    <div className="space-y-5">
      <form action={logoutAdmin} className="flex justify-end">
        <button className="text-xs font-semibold text-slate-500 underline underline-offset-4">
          ログアウト
        </button>
      </form>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">クエスト一覧</h2>
        <Link
          href="/admin/quests/new"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          新規クエスト
        </Link>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className="flex flex-col gap-2 rounded-xl bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {quest.title}
              </h3>
              <p className="text-xs text-slate-500">
                {quest.city} / {quest.theme} / {quest.durationMin}分
              </p>
            </div>
            <div className="flex gap-2 text-sm">
              <Link
                href={`/admin/quests/${quest.id}`}
                className="rounded-lg bg-white px-3 py-2 text-slate-800 ring-1 ring-slate-200"
              >
                編集
              </Link>
              <Link
                href={`/admin/quests/${quest.id}/steps`}
                className="rounded-lg bg-emerald-600 px-3 py-2 font-semibold text-white"
              >
                ステップ
              </Link>
            </div>
          </div>
        ))}
        {quests.length === 0 && (
          <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
            クエストがまだありません。Supabase を接続して新規作成してください。
          </p>
        )}
      </div>
    </div>
  );
}
