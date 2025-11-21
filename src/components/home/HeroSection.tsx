import Image from "next/image";
import Link from "next/link";
import QuestCard from "@/components/cards/QuestCard";
import Badge from "@/components/Badge";
import { Quest } from "@prisma/client";

type Props = {
  featured: Quest[];
  stats: {
    totalQuests: number;
    totalCities: number;
    totalUsers: number;
  };
};

// Heroは「価値訴求＋主要CTA＋右側のビジュアル/クエストハイライト」を担う。
export default function HeroSection({ featured, stats }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-24 pt-16 md:grid-cols-12 md:gap-14">
        <div className="relative z-10 space-y-6 md:col-span-6">
          <Badge>City Puzzle Trail Platform</Badge>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              <span className="block">街を冒険に。</span>
              <span className="block">
                謎を解きながら、まちを歩き尽くすシティトレイルTOMOSHIBI
              </span>
            </h1>
            <div className="space-y-2 text-base leading-relaxed text-slate-600">
              <p>
                TOMOSHIBIは、スマホひとつで遊べるシティトレイル型の謎解きゲーム・プラットフォームです。
              </p>
              <p>
                クエストを選んで歩き出せば、地図アプリでは出会えない路地やお店、景色に物語と仕掛けが重なっていきます。
              </p>
              <p>
                一部のクエストや「SPR探偵事務所」ブランドでは、地域の歴史や環境問題などをモチーフにしたミッションも登場し、楽しみながらその街のファンになっていく体験を届けます。
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cities"
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
            >
              クエストで遊んでみる
            </Link>
            <Link
              href="/creators"
              className="rounded-full border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              クリエイターとして作ってみる
            </Link>
            <Link
              href="/partners"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              パートナーとして相談する
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <StatCard
              label="公開中のクエスト"
              value={`${stats.totalQuests}件`}
            />
            <StatCard
              label="登録プレイヤー"
              value={`${stats.totalUsers}人`}
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-4 md:col-span-6">
          <div className="overflow-hidden rounded-3xl bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/hero-map.svg"
                alt="TOMOSHIBI map"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>おすすめクエスト</span>
              <span className="text-xs text-slate-500">スワイプして見る</span>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {featured.length > 0 ? (
                featured.map((quest) => (
                  <div key={quest.slug} className="min-w-[240px] flex-1">
                    <QuestCard quest={quest} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">
                  公開中のクエストはまだありません。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 shadow-md ring-1 ring-emerald-100">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
