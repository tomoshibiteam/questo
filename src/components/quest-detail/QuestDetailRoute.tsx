import Image from "next/image";

type Props = {
  mapImage?: string;
  start: string;
  goal: string;
};

export default function QuestDetailRoute({
  mapImage = "/images/hero-map.svg",
  start,
  goal,
}: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">ルート概要</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <Image
          src={mapImage}
          alt="ルートマップ"
          width={1200}
          height={640}
          className="h-64 w-full object-cover"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">スタート地点：</span>
          {start}
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">ゴール地点：</span>
          {goal}
        </div>
      </div>
    </section>
  );
}
