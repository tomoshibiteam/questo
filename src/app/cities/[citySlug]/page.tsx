import SectionHeading from "@/components/SectionHeading";
import QuestCard from "@/components/cards/QuestCard";
import Badge from "@/components/Badge";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

type CityPageProps = {
  params: {
    citySlug: string;
  };
};

export default async function CityDetailPage({ params }: CityPageProps) {
  const { citySlug } = params;
  const decoded = decodeURIComponent(citySlug).replace(/-/g, "・");

  const cityQuests = await prisma.quest.findMany({
    where: {
      status: "published",
      city: { contains: decoded },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!cityQuests.length) {
    // 該当都市が見つからない場合は404
    return notFound();
  }

  const cityName = cityQuests[0].city;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-50 to-white p-6 ring-1 ring-emerald-100">
        <p className="text-xs font-semibold text-emerald-700">Japan</p>
        <h1 className="text-3xl font-bold text-slate-900">{cityName}</h1>
        <p className="mt-2 text-sm text-slate-700">
          {cityName}のシティトレイル。公開中のクエストをチェックしよう。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge color="slate">シティトレイル</Badge>
          <Badge color="slate">冒険</Badge>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <Image
            src="/images/panel-city.svg"
            alt={`${cityName} illustration`}
            width={800}
            height={400}
            className="w-full"
          />
        </div>
      </div>

      <section className="mt-8 space-y-4">
        <SectionHeading
          eyebrow="Quests"
          title={`${cityName} のクエスト`}
          description="この街で遊べるシティパズルトレイル。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {cityQuests.map((quest) => <QuestCard key={quest.slug} quest={quest} />)}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Missions"
          title={`Why TOMOSHIBI in ${cityName}?`}
          description="この街で取り組みたい社会課題ミッションの例。"
        />
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>・海洋ごみや景観に関するクリーンアップ</li>
          <li>・商店街の空き店舗調査と活用アイデア</li>
          <li>・観光と住民の共生をテーマにしたエチケットクエスト</li>
        </ul>
      </section>
    </div>
  );
}
