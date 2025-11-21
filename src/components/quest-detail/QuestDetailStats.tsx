type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
};

type Props = {
  stats: Stat[];
};

export default function QuestDetailStats({ stats }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-600 shadow-inner">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-base font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
