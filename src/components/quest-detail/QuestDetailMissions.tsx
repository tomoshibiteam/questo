type Mission = {
  title: string;
  description: string;
  impact: string;
};

type Props = {
  missions: Mission[];
};

export default function QuestDetailMissions({ missions }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-900">
        このクエストで取り組む社会課題ミッション
      </h2>
      <p className="text-sm text-slate-600">
        TOMOSHIBIでは、クエストごとに地域の社会課題にまつわる“ミッション”が組み込まれています。以下のアクションに参加できます。
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {missions.map((mission) => (
          <div
            key={mission.title}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="text-xs font-semibold text-emerald-700">
              インパクト: {mission.impact}
            </div>
            <h3 className="mt-2 text-base font-semibold text-slate-900">
              {mission.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              {mission.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
