"use client";

import { useState } from "react";

type MissionState = {
  id: string;
  step: number | null;
  type: string;
  description: string;
  impact: number;
};

type Props = {
  missions: MissionState[];
  onChange: (missions: MissionState[]) => void;
  stepCount: number;
};

const templates = [
  { value: "cleanup", label: "ビーチクリーン" },
  { value: "shop_visit", label: "ローカル店舗訪問" },
  { value: "quiz", label: "学びクイズ" },
  { value: "ngo_info", label: "団体紹介を読む" },
  { value: "other", label: "その他" },
];

export default function Step4Missions({ missions, onChange, stepCount }: Props) {
  const [draft, setDraft] = useState<MissionState>({
    id: "m-initial",
    step: null,
    type: "cleanup",
    description: "",
    impact: 5,
  });

  const addMission = () => {
    onChange([
      ...missions,
      {
        ...draft,
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `m-${Date.now()}`,
      },
    ]);
    setDraft({
      id: "",
      step: null,
      type: "cleanup",
      description: "",
      impact: 5,
    });
  };

  const remove = (id: string) => {
    onChange(missions.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-600">
        任意のステップに社会課題ミッションを追加します。テンプレートを選び、説明やインパクトポイントを設定してください。
      </p>
      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label className="text-sm font-semibold text-slate-800">
            適用ステップ (任意)
          </label>
          <select
            value={draft.step ?? ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, step: e.target.value ? Number(e.target.value) : null }))
            }
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">指定なし</option>
            {Array.from({ length: stepCount }).map((_, i) => (
              <option key={i} value={i + 1}>
                STEP {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            ミッションタイプ
          </label>
          <select
            value={draft.type}
            onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            {templates.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            インパクトポイント
          </label>
          <input
            type="number"
            value={draft.impact}
            onChange={(e) => setDraft((d) => ({ ...d, impact: Number(e.target.value) }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={addMission}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
          >
            ミッションを追加
          </button>
        </div>
      </div>
      <textarea
        placeholder="ミッションの説明文"
        value={draft.description}
        onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
        rows={2}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
      />

      <div className="grid gap-3 md:grid-cols-2">
        {missions.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">{m.type}</p>
              <button
                type="button"
                onClick={() => remove(m.id)}
                className="text-xs text-slate-500 underline"
              >
                削除
              </button>
            </div>
            <p className="text-xs text-slate-500">
              ステップ: {m.step ? `STEP ${m.step}` : "指定なし"}
            </p>
            <p className="mt-1">{m.description}</p>
            <p className="text-xs text-emerald-700">インパクト: +{m.impact} pt</p>
          </div>
        ))}
        {missions.length === 0 && (
          <p className="text-sm text-slate-600">まだミッションがありません。</p>
        )}
      </div>
    </div>
  );
}
