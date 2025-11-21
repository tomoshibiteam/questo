"use client";

import { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

export type StepPoint = {
  id: string;
  order: number;
  lat: number;
  lng: number;
  name: string;
  description: string;
  storyText?: string;
  puzzleText?: string;
  answer?: string;
  answerType?: string;
  hint1?: string;
  hint2?: string;
};

type Props = {
  points: StepPoint[];
  onChange: (points: StepPoint[]) => void;
};

export default function Step2Route({ points, onChange }: Props) {
  const [draft, setDraft] = useState({
    lat: "",
    lng: "",
    name: "",
    description: "",
  });

  const addPoint = () => {
    if (!draft.lat || !draft.lng) return;
    const newPoint: StepPoint = {
      id: `p-${Date.now()}`,
      order: points.length + 1,
      lat: Number(draft.lat),
      lng: Number(draft.lng),
      name: draft.name || `スポット ${points.length + 1}`,
      description: draft.description,
    };
    onChange([...points, newPoint]);
    setDraft({ lat: "", lng: "", name: "", description: "" });
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = points.findIndex((p) => p.id === id);
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= points.length) return;
    const reordered = [...points];
    [reordered[idx], reordered[targetIdx]] = [
      reordered[targetIdx],
      reordered[idx],
    ];
    reordered.forEach((p, i) => (p.order = i + 1));
    onChange([...reordered]);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="text-sm text-slate-600">
        マッププレースホルダ（実装時はLeaflet/OSMに差し替え）。クリックでピン追加の代わりに、緯度経度の手入力でデモしています。
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <input
          placeholder="緯度"
          value={draft.lat}
          onChange={(e) => setDraft((d) => ({ ...d, lat: e.target.value }))}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="経度"
          value={draft.lng}
          onChange={(e) => setDraft((d) => ({ ...d, lng: e.target.value }))}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="スポット名"
          value={draft.name}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={addPoint}
          className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
        >
          スポットを追加
        </button>
      </div>
      <textarea
        placeholder="場所の説明"
        value={draft.description}
        onChange={(e) =>
          setDraft((d) => ({ ...d, description: e.target.value }))
        }
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        rows={2}
      />
      <div className="space-y-2">
        {points.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-semibold">
                  STEP {p.order}: {p.name}
                </p>
                <p className="text-xs text-slate-500">
                  {p.lat}, {p.lng}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => move(p.id, -1)}
                className="rounded-full bg-white px-2 py-1 text-xs ring-1 ring-slate-200"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(p.id, 1)}
                className="rounded-full bg-white px-2 py-1 text-xs ring-1 ring-slate-200"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
        {points.length === 0 && (
          <p className="text-sm text-slate-600">
            まだステップがありません。緯度経度を入力して追加してください。
          </p>
        )}
      </div>
    </div>
  );
}
