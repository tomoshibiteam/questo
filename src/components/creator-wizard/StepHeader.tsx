type Props = {
  current: number;
  total: number;
  titles: string[];
};

export default function StepHeader({ current, total, titles }: Props) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>
          STEP {current + 1} / {total}
        </span>
      </div>
      <div className="flex gap-2">
        {titles.map((title, idx) => (
          <div
            key={title}
            className={`flex-1 rounded-full px-2 py-1 text-center text-[11px] font-semibold ${
              idx === current
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {idx + 1}. {title}
          </div>
        ))}
      </div>
    </div>
  );
}
