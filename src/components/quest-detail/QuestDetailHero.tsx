import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Quest } from "@prisma/client";

type Props = {
  quest: Quest;
  breadcrumbs: string[];
  gallery: string[];
  rating: {
    score: number;
    count: number;
  };
};

// ヒーローは大きなビジュアル＋右のギャラリー／パンくず／タイトルを表示。
export default function QuestDetailHero({
  quest,
  breadcrumbs,
  gallery,
  rating,
}: Props) {
  const [main, ...thumbs] = gallery;
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6">
        <div className="text-xs text-slate-500">
          {breadcrumbs.join(" / ")}
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div className="relative h-80 overflow-hidden rounded-2xl md:col-span-2">
            <Image
              src={main ?? "/images/hero-map.svg"}
              alt={quest.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-white md:hidden">
              <h1 className="text-xl font-semibold">{quest.title}</h1>
              <p className="mt-1 text-sm text-slate-100">{quest.summary}</p>
            </div>
          </div>
          <div className="flex gap-3 md:flex-col">
            {thumbs.slice(0, 3).map((src) => (
              <div
                key={src}
                className="relative h-24 w-full flex-1 overflow-hidden rounded-xl border border-slate-100"
              >
                <Image
                  src={src}
                  alt="サブギャラリー"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              {quest.title}
            </h1>
            <p className="max-w-3xl text-sm text-slate-600">{quest.summary}</p>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <StarIcon className="h-5 w-5 text-amber-400" />
              <span className="font-semibold">{rating.score.toFixed(1)}</span>
              <span className="text-slate-500">
                ({rating.count}件のレビュー)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
