import Badge from "@/components/Badge";
import Link from "next/link";

type CityStat = {
  name: string;
  count: number;
};

export default function CityCard({ city }: { city: CityStat }) {
  const highlight =
    city.name.includes("大阪") || city.name.includes("貝塚")
      ? "二色浜エリアを舞台にしたクエストがあります。"
      : city.count > 0
        ? `${city.name}で公開中のシティトレイルがあります。`
        : "公開準備中のシティトレイルです。";

  return (
    <Link
      href={`/cities/${encodeURIComponent(city.name.replace(/\s+/g, "-"))}`}
      className="flex flex-col rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>都市</span>
        <span>{city.count} クエスト</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{city.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{highlight}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge color="slate">シティトレイル</Badge>
        {city.count > 0 && <Badge color="slate">公開中</Badge>}
      </div>
    </Link>
  );
}
