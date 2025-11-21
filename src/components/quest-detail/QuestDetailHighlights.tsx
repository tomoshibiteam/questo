import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  items: string[];
};

export default function QuestDetailHighlights({ items }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        このクエストでできること
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <CheckCircleIcon className="mt-1 h-5 w-5 text-emerald-600" />
            <p className="text-sm text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
