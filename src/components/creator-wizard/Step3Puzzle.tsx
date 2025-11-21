"use client";

import { useState } from "react";
import { StepPoint } from "./Step2Route";

type Props = {
  steps: StepPoint[];
  onChange: (steps: StepPoint[]) => void;
};

export default function Step3Puzzle({ steps, onChange }: Props) {
  const [selected, setSelected] = useState(steps[0]?.id);

  const current = steps.find((s) => s.id === selected) ?? steps[0];

  const update = (field: keyof StepPoint, value: string) => {
    if (!current) return;
    onChange(
      steps.map((s) => (s.id === current.id ? { ...s, [field]: value } : s)),
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800">ステップ一覧</h3>
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
              s.id === current?.id
                ? "bg-emerald-50 text-emerald-800"
                : "bg-slate-50 text-slate-700"
            }`}
          >
            STEP {s.order}: {s.name || "名称未設定"}
          </button>
        ))}
      </div>

      <div className="md:col-span-2 space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        {current ? (
          <>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>STEP {current.order}</span>
              <span className="text-xs text-slate-500">{current.name}</span>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">
                ストーリーテキスト
              </label>
              <textarea
                value={current.storyText}
                onChange={(e) => update("storyText", e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">
                謎の問題文
              </label>
              <textarea
                value={current.puzzleText}
                onChange={(e) => update("puzzleText", e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  答え
                </label>
                <input
                  value={current.answer}
                  onChange={(e) => update("answer", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  判定方法
                </label>
                <select
                  value={current.answerType}
                  onChange={(e) => update("answerType", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="exact">完全一致</option>
                  <option value="case_insensitive">大文字小文字無視</option>
                  <option value="number">数値</option>
                </select>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  ヒント1
                </label>
                <input
                  value={current.hint1}
                  onChange={(e) => update("hint1", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  ヒント2
                </label>
                <input
                  value={current.hint2}
                  onChange={(e) => update("hint2", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-600">ステップを追加してください。</p>
        )}
      </div>
    </div>
  );
}
