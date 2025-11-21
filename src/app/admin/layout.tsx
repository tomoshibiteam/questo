import AdminLogin from "@/components/AdminLogin";
import { isAuthed } from "./actions";

type Props = {
  children: React.ReactNode;
};

// 管理画面のレイアウト。サーバー側で認可判定を行い、未認証なら簡易ログインフォームを表示。
export default async function AdminLayout({
  children,
}: Props) {
  const authed = await isAuthed();

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
        {authed ? children : <AdminLogin />}
      </section>
    </div>
  );
}
