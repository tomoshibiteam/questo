"use client";

type BasicData = {
  title: string;
  subtitle: string;
  city: string;
  theme: string;
  summary: string;
  durationMin: number;
  distanceKm: number;
  recommendedPlayers: string;
  minAge: string;
};

type Props = {
  data: BasicData;
  onChange: (data: BasicData) => void;
};

export default function Step1Basic({ data, onChange }: Props) {
  const update = (key: string, value: string | number) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">タイトル</label>
          <input
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            サブタイトル
          </label>
          <input
            value={data.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">都市 / エリア</label>
          <input
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">テーマ</label>
          <select
            value={data.theme}
            onChange={(e) => update("theme", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="tourism">観光</option>
            <option value="social_issue">社会課題</option>
            <option value="environment">環境</option>
            <option value="education">教育</option>
            <option value="other">その他</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-800">概要</label>
        <textarea
          value={data.summary}
          onChange={(e) => update("summary", e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-slate-800">
            想定プレイ時間（分）
          </label>
          <input
            type="number"
            value={data.durationMin}
            onChange={(e) => update("durationMin", Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            想定歩行距離（km）
          </label>
          <input
            type="number"
            step="0.1"
            value={data.distanceKm}
            onChange={(e) => update("distanceKm", Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            推奨人数
          </label>
          <input
            value={data.recommendedPlayers}
            onChange={(e) => update("recommendedPlayers", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">対象年齢</label>
          <input
            value={data.minAge}
            onChange={(e) => update("minAge", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
