import Link from "next/link";
import Badge from "@/components/Badge";
import type { Quest } from "@prisma/client";

const themeLabels: Record<string, string> = {
  tourism: "観光",
  social_issue: "社会課題",
  environment: "環境",
  education: "教育",
  other: "その他",
};

export default function QuestCard({ quest }: { quest: Quest }) {
  return (
    <Link
      href={`/quests/${quest.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm ring-1 ring-transparent transition hover:-translate-y-0.5 hover:ring-emerald-100"
    >
      <div className="flex items-center gap-2">
        <Badge color="emerald">{themeLabels[quest.theme] ?? "クエスト"}</Badge>
        {quest.brand === "spr-detective-office" && (
          <Badge color="amber">SPR探偵事務所</Badge>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-emerald-800">
        {quest.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
        {quest.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
        <span>📍 {quest.city}</span>
        <span>🕒 {quest.durationMin}分</span>
        <span>🚶 {quest.distanceKm}km</span>
      </div>
    </Link>
  );
}
