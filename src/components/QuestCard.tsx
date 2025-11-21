import type { Quest } from "@/types";
import Link from "next/link";

const themeLabels: Record<Quest["theme"], string> = {
  tourism: "観光",
  social_issue: "社会課題",
  environment: "環境",
  other: "その他",
};

type Props = {
  quest: Quest;
  href?: string;
};

export default function QuestCard({ quest, href }: Props) {
  const card = (
    <div className="group relative h-full rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {themeLabels[quest.theme] ?? "クエスト"}
        </span>
        <span className="text-xs text-slate-500">
          難易度 {quest.difficulty}/5
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-tight text-slate-900">
        {quest.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{quest.summary}</p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
        <span>📍 {quest.city}</span>
        <span>🕒 {quest.estimatedDurationMin}分</span>
        <span>🚶 {quest.estimatedDistanceKm}km</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}
