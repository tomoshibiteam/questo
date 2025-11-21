import { careers } from "@/data/careers";

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-8">
      <h1 className="text-3xl font-bold text-slate-900">Careers</h1>
      <p className="mt-2 text-sm text-slate-700">
        TOMOSHIBI を一緒に育てる仲間を募集しています（ダミー掲載）。
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {careers.map((role) => (
          <div
            key={role.slug}
            className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm"
          >
            <p className="text-xs text-emerald-700">{role.team}</p>
            <h3 className="text-lg font-semibold text-slate-900">
              {role.title}
            </h3>
            <p className="text-xs text-slate-500">{role.type}</p>
            <p className="mt-2 text-sm text-slate-700">{role.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
