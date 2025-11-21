"use client";

import { useState } from "react";
import StepHeader from "./StepHeader";
import Step1Basic from "./Step1Basic";
import Step2Route from "./Step2Route";
import Step3Puzzle from "./Step3Puzzle";
import Step4Missions from "./Step4Missions";
import Step5Preview from "./Step5Preview";
import { QuestStatus } from "@/types/content";

export default function WizardLayout() {
  const stepsTitle = ["基本情報", "ルート", "謎とストーリー", "ミッション", "プレビュー"];
  const [current, setCurrent] = useState(0);
  const [basic, setBasic] = useState({
    title: "",
    subtitle: "",
    city: "",
    theme: "tourism",
    summary: "",
    durationMin: 60,
    distanceKm: 3,
    recommendedPlayers: "2-4",
    minAge: "10+",
  });
  const [route, setRoute] = useState<
    {
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
    }[]
  >([]);
  const [missions, setMissions] = useState<
    { id: string; step: number | null; type: string; description: string; impact: number }[]
  >([]);
  const [status, setStatus] = useState<QuestStatus>("draft");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const toStep = (dir: -1 | 1) => {
    setCurrent((c) => Math.min(Math.max(c + dir, 0), stepsTitle.length - 1));
  };

  return (
    <div className="space-y-4">
      <StepHeader current={current} total={stepsTitle.length} titles={stepsTitle} />

      {current === 0 && <Step1Basic data={basic} onChange={setBasic} />}
      {current === 1 && <Step2Route points={route} onChange={setRoute} />}
      {current === 2 && (
        <Step3Puzzle
          steps={route.map((p) => ({
            id: p.id,
            order: p.order,
            name: p.name,
            storyText: p.storyText ?? "",
            puzzleText: p.puzzleText ?? "",
            answer: p.answer ?? "",
            answerType: p.answerType ?? "exact",
            hint1: p.hint1 ?? "",
            hint2: p.hint2 ?? "",
          }))}
          onChange={(updated) =>
            setRoute(
              route.map((p) => {
                const match = updated.find((u) => u.id === p.id);
                return match ? { ...p, ...match } : p;
              }),
            )
          }
        />
      )}
      {current === 3 && (
        <Step4Missions missions={missions} onChange={setMissions} stepCount={route.length} />
      )}
      {current === 4 && (
        <Step5Preview
          basic={basic}
          steps={route}
          missions={missions}
          onSubmit={async (submitStatus) => {
            setSaving(true);
            setMessage(null);
            setStatus(submitStatus);
            const res = await fetch("/api/creator/quests", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                basic,
                steps: route,
                missions,
                status: submitStatus,
              }),
            });
            if (res.ok) {
              setMessage(
                submitStatus === "pending_review"
                  ? "審査に出しました。"
                  : "下書きとして保存しました。",
              );
            } else {
              const data = await res.json();
              setMessage(data.error ?? "保存に失敗しました。");
            }
            setSaving(false);
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => toStep(-1)}
          className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 disabled:opacity-40"
          disabled={current === 0}
        >
          戻る
        </button>
        <div className="text-xs text-slate-500">
          ステータス: {status} {saving && "(保存中...)"}
          {message && <span className="ml-2 text-emerald-700">{message}</span>}
        </div>
        <button
          type="button"
          onClick={() => toStep(1)}
          className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-40"
          disabled={current === stepsTitle.length - 1}
        >
          次へ
        </button>
      </div>
    </div>
  );
}
