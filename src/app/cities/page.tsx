import CityCard from "@/components/cards/CityCard";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";

export default async function CitiesPage() {
  const cityGroups = await prisma.quest.groupBy({
    by: ["city"],
    where: { status: "published" },
    _count: true,
  });
  const cities = cityGroups.map((c) => ({ name: c.city, count: c._count }));

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
      <SectionHeading
        eyebrow="Play"
        title="都市からクエストを探す"
        description="気になる都市を選んでクエスト一覧へ。"
      />
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {cities.map((city) => (
          <CityCard key={city.name} city={city} />
        ))}
        {cities.length === 0 && (
          <p className="text-sm text-slate-600">
            公開中のクエストがまだありません。
          </p>
        )}
      </div>
    </div>
  );
}
