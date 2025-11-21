import AdminLogin from "@/components/AdminLogin";
import { isAuthed } from "./actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authedPromise = isAuthed();

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Admin
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            クエスト管理
          </h1>
          <p className="text-sm text-slate-600">
          クエストの登録・編集、ステップの管理を行います。
        </p>
      </div>
        {/* サーバー側で判定 */}
        {(await authedPromise) ? children : <AdminLogin />}
      </section>
    </div>
  );
}
