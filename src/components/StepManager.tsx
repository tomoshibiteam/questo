"use client";

import { useMemo, useState } from "react";
import type { QuestStep } from "@/types";
import { getSupabaseClient, isSupabaseEnabled } from "@/lib/supabaseClient";

type Props = {
  questId: string;
  initialSteps: QuestStep[];
};

export default function StepManager({ questId, initialSteps }: Props) {
  const [steps, setSteps] = useState<QuestStep[]>(() =>
    [...initialSteps].sort((a, b) => a.order - b.order),
  );
  const [status, setStatus] = useState<string>("");

  const nextOrder = useMemo(
    () => (steps.length ? Math.max(...steps.map((s) => s.order)) + 1 : 1),
    [steps],
  );

  const addStep = () => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `local-${Date.now()}`;
    setSteps([
      ...steps,
      {
        id,
        questId,
        order: nextOrder,
        lat: 0,
        lng: 0,
        locationHint: "",
        storyText: "",
        puzzleText: "",
        answer: "",
        hintText: "",
      },
    ]);
  };

  const handleChange = (
    id: string,
    key: keyof QuestStep,
    value: string | number,
  ) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, [key]: value } : step)),
    );
  };

  const removeStep = async (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
    if (!isSupabaseEnabled) {
      setStatus("Supabase未設定のため削除はローカルのみ反映されます。");
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.from("quest_steps").delete().eq("id", id);
  };

  // Supabaseに並び順も含めて一括 upsert。ダミーモードでは保存しない。
  const save = async () => {
    setStatus("");
    if (!isSupabaseEnabled) {
      setStatus("Supabase未設定のため保存はスキップしました（表示のみ）。");
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus("Supabase クライアント初期化に失敗しました。");
      return;
    }
    const payload = steps.map((step) => ({
      id: step.id,
      quest_id: questId,
      order: Number(step.order),
      lat: Number(step.lat),
      lng: Number(step.lng),
      location_hint: step.locationHint,
      story_text: step.storyText,
      puzzle_text: step.puzzleText,
      answer: step.answer,
      hint_text: step.hintText,
    }));

    const { error } = await supabase.from("quest_steps").upsert(payload);
    if (error) {
      console.error(error);
      setStatus("保存時にエラーが発生しました。");
      return;
    }
    setStatus("ステップを保存しました。");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          ステップ一覧
        </h3>
        <button
          onClick={addStep}
          className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          追加
        </button>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="space-y-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <label className="text-xs font-semibold text-slate-500">
                  並び順
                </label>
                <input
                  type="number"
                  value={step.order}
                  onChange={(e) =>
                    handleChange(step.id, "order", Number(e.target.value))
                  }
                  className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm"
                />
              </div>
              <button
                onClick={() => removeStep(step.id)}
                className="text-xs font-semibold text-red-600"
              >
                削除
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  緯度
                </label>
                <input
                  type="number"
                  value={step.lat}
                  onChange={(e) =>
                    handleChange(step.id, "lat", Number(e.target.value))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  経度
                </label>
                <input
                  type="number"
                  value={step.lng}
                  onChange={(e) =>
                    handleChange(step.id, "lng", Number(e.target.value))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500">
                ロケーションヒント
              </label>
              <input
                value={step.locationHint}
                onChange={(e) =>
                  handleChange(step.id, "locationHint", e.target.value)
                }
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                ストーリーテキスト
              </label>
              <textarea
                value={step.storyText}
                onChange={(e) =>
                  handleChange(step.id, "storyText", e.target.value)
                }
                rows={2}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                謎の問題文
              </label>
              <textarea
                value={step.puzzleText}
                onChange={(e) =>
                  handleChange(step.id, "puzzleText", e.target.value)
                }
                rows={2}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  正解
                </label>
                <input
                  value={step.answer}
                  onChange={(e) =>
                    handleChange(step.id, "answer", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  ヒントテキスト
                </label>
                <input
                  value={step.hintText}
                  onChange={(e) =>
                    handleChange(step.id, "hintText", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          並び順を保存
        </button>
      </div>
      {status && (
        <p className="text-sm font-semibold text-emerald-700">{status}</p>
      )}
    </div>
  );
}
