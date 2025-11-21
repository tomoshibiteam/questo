import SectionHeading from "@/components/SectionHeading";

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-8">
      <SectionHeading
        eyebrow="Partners"
        title="Why partner with TOMOSHIBI?"
        description="観光×社会課題ミッションの常設・イベントコンテンツで地域を盛り上げます。"
      />

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          "観光協会・自治体向けの着地型コンテンツ",
          "企業CSRやチームビルディングでの活用",
          "教育機関の探究学習プログラム",
        ].map((text) => (
          <div
            key={text}
            className="rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm text-slate-700 shadow-sm"
          >
            {text}
          </div>
        ))}
      </div>

      <section className="mt-8 space-y-3 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">導入パターン</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>・1日イベント（清掃×謎解きなど）</li>
          <li>・常設クエスト（観光と社会課題ミッションをセット）</li>
          <li>・コラボ企画（SPR探偵事務所コラボなど）</li>
        </ul>
      </section>

      <section className="mt-8 rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-lg font-bold text-slate-900">お問い合わせ（ダミー）</h3>
        <p className="text-sm text-slate-600">
          フォームはレイアウトのみです。将来の外部フォーム/CRM連携を想定しています。
        </p>
        <form className="mt-4 grid gap-3 md:grid-cols-2">
          <input placeholder="ご担当者名" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
          <input placeholder="メールアドレス" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
          <input placeholder="組織名" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm md:col-span-2" />
          <textarea placeholder="相談したい内容" rows={3} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm md:col-span-2" />
          <button className="md:col-span-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">
            送信する（ダミー）
          </button>
        </form>
      </section>
    </div>
  );
}
