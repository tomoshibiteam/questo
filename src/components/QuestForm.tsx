"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Quest } from "@/types";
import { getSupabaseClient, isSupabaseEnabled } from "@/lib/supabaseClient";

type Props = {
  initialData?: Quest | null;
};

const themes: { value: Quest["theme"]; label: string }[] = [
  { value: "tourism", label: "観光" },
  { value: "social_issue", label: "社会課題" },
  { value: "environment", label: "環境" },
  { value: "other", label: "その他" },
];

export default function QuestForm({ initialData }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [city, setCity] = useState(initialData?.city ?? "");
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [theme, setTheme] = useState<Quest["theme"]>(
    initialData?.theme ?? "tourism",
  );
  const [duration, setDuration] = useState(
    initialData?.estimatedDurationMin ?? 60,
  );
  const [distance, setDistance] = useState(
    initialData?.estimatedDistanceKm ?? 2,
  );
  const [difficulty, setDifficulty] = useState(initialData?.difficulty ?? 2);
  const [status, setStatus] = useState<string>("");

  // Supabase 挿入/更新。未接続の場合はメッセージだけ表示。
  const handleSubmit = async () => {
    setStatus("");
    if (!isSupabaseEnabled) {
      setStatus("Supabase未設定のため保存はスキップしました（表示のみ）。");
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Supabase クライアントの初期化に失敗しました。");
      return;
    }

    const payload = {
      title,
      city,
      summary,
      theme,
      estimated_duration_min: Number(duration),
      estimated_distance_km: Number(distance),
      difficulty: Number(difficulty),
    };

    const { error } = initialData
      ? await supabase.from("quests").update(payload).eq("id", initialData.id)
      : await supabase.from("quests").insert(payload);

    if (error) {
      console.error(error);
      setStatus("保存時にエラーが発生しました。");
      return;
    }

    setStatus("保存しました。");
    router.push("/admin");
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
      <div>
        <label className="text-xs font-semibold text-slate-500">タイトル</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-500">都市</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">テーマ</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Quest["theme"])}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500">サマリー</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">
            所要時間 (分)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">
            距離 (km)
          </label>
          <input
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">
            難易度 (1-5)
          </label>
          <input
            type="number"
            min={1}
            max={5}
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          onClick={() => router.push("/admin")}
          className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200"
        >
          キャンセル
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          {initialData ? "更新する" : "作成する"}
        </button>
      </div>
      {status && (
        <p className="text-sm font-semibold text-emerald-700">{status}</p>
      )}
    </div>
  );
}
