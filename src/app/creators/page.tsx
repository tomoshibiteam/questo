import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function CreatorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-8">
      <SectionHeading
        eyebrow="Creators"
        title="あなたの街の謎解きと社会課題ミッションを作りませんか？"
        description="City puzzle trail + Social Mission を制作するクリエイターを募集しています。"
      />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[
          { title: "クリエイターとは", text: "街を歩く物語とミッションを設計し、プレイヤーを案内する人。" },
          { title: "作れるもの", text: "シティパズルトレイル、社会課題ミッション（清掃、調査、文化保護など）。" },
          { title: "報酬イメージ", text: "クエスト売上シェア + インパクトボーナスを設計予定。" },
          { title: "募集している人", text: "謎解き好き / 地域NPO / 学生 / クリエイティブ好きな方。" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{item.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-3xl bg-emerald-50/70 p-6 shadow-sm ring-1 ring-emerald-100">
        <h3 className="text-lg font-bold text-emerald-900">応募フォーム（ダミー）</h3>
        <p className="text-sm text-emerald-900">送信処理は行いません。レイアウトのみです。</p>
        <form className="mt-4 grid gap-3 md:grid-cols-2">
          <input placeholder="お名前" className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm" />
          <input placeholder="メールアドレス" className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm" />
          <input placeholder="活動エリア" className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm md:col-span-2" />
          <textarea placeholder="やってみたいクエストや社会課題" rows={3} className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm md:col-span-2" />
          <button className="md:col-span-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">
            送信する（ダミー）
          </button>
        </form>
      </section>

      <div className="mt-6 text-sm text-slate-600">
        <Link className="text-emerald-700 underline underline-offset-4" href="/faq">
          よくある質問を見る →
        </Link>
      </div>
    </div>
  );
}
