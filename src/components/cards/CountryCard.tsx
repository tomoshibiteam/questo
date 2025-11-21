import Link from "next/link";
import type { Country } from "@/types/content";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/cities?country=${country.slug}`}
      className="flex flex-col rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-900">{country.name}</h3>
      <p className="mt-2 text-sm text-slate-600">
        都市 {country.cityCount} / クエスト {country.questCount}
      </p>
      <p className="mt-1 text-xs text-slate-500">クリックで都市一覧を表示</p>
    </Link>
  );
}
