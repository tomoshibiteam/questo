import CountryCard from "@/components/cards/CountryCard";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";

export default async function CountriesPage() {
  const quests = await prisma.quest.findMany({ where: { status: "published" } });
  const cityCount = new Set(quests.map((q) => q.city)).size;
  const questCount = quests.length;
  const countries = [
    {
      slug: "japan",
      name: "日本",
      cityCount,
      questCount,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
      <SectionHeading
        eyebrow="Play"
        title="国から探す"
        description="TOMOSHIBI が展開する国をピックアップ。日本を中心に拡大中です。"
      />
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {countries.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
    </div>
  );
}
