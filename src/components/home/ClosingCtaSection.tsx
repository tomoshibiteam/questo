import Image from "next/image";
import Link from "next/link";

export default function ClosingCtaSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg">
            <p className="text-xs font-semibold text-emerald-700">Creators</p>
            <h3 className="text-2xl font-semibold text-slate-900">
              あなたの街に TOMOSHIBI を
            </h3>
            <p className="text-sm text-slate-600">
              TOMOSHIBIのシティトレイルプラットフォーム上で、
              あなたの街の物語やお気に入りのルートを一つのクエストにしてみませんか。
              シンプルな管理画面から、スポットや謎、ストーリーを組み合わせて投稿できます。
              SPR探偵事務所ブランドとのコラボレーションも順次開放予定です。
            </p>
            <div className="overflow-hidden rounded-2xl border border-emerald-100 shadow-sm">
              <Image
                src="/images/quest-photo-2.svg"
                alt="Creators"
                width={800}
                height={600}
                className="w-full"
              />
            </div>
            <Link
              href="/creators"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              クリエイター募集要項へ
            </Link>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <p className="text-xs font-semibold text-slate-700">Partners</p>
            <h3 className="text-2xl font-semibold text-slate-900">
              地域課題をゲームにする
            </h3>
            <p className="text-sm text-slate-600">
              自治体・企業・団体向けに、シティトレイルを活用した回遊施策やプロモーションを企画します。
              観光コンテンツとしての導入から、SPR探偵事務所ブランドと連携した社会課題ミッション型のクエストまで、
              目的に合わせたプランをご提案します。
            </p>
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <Image
                src="/images/panel-city.svg"
                alt="Partners"
                width={800}
                height={400}
                className="w-full"
              />
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              パートナーとして相談する
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
