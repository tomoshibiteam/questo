"use client";

import { QuestStatus } from "@/types/content";
import { StepPoint } from "./Step2Route";

type BasicData = {
  title: string;
  subtitle: string;
  city: string;
  theme: string;
  summary: string;
  durationMin: number;
  distanceKm: number;
};

type StepData = StepPoint;

type MissionData = {
  id: string;
  step: number | null;
  type: string;
  description: string;
  impact: number;
};

type Props = {
  basic: BasicData;
  steps: StepData[];
  missions: MissionData[];
  onSubmit: (status: QuestStatus) => Promise<void>;
};

export default function Step5Preview({
  basic,
  steps,
  missions,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">概要サマリー</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <SummaryItem label="タイトル" value={basic.title} />
        <SummaryItem label="都市" value={basic.city} />
        <SummaryItem label="時間" value={`${basic.durationMin}分`} />
        <SummaryItem label="距離" value={`${basic.distanceKm}km`} />
        <SummaryItem label="ステップ数" value={`${steps.length}ステップ`} />
        <SummaryItem label="ミッション数" value={`${missions.length}件`} />
      </div>
      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
        <div className="font-semibold text-slate-900">プレビュー（抜粋）</div>
        {steps.slice(0, 3).map((s) => (
          <div key={s.id} className="mt-2 rounded-lg bg-white p-3 shadow-sm">
            <p className="text-xs text-slate-500">STEP {s.order}</p>
            <p className="font-semibold text-slate-900">{s.name}</p>
            <p className="text-xs text-slate-600">{s.storyText}</p>
            <p className="text-sm text-slate-800">Q. {s.puzzleText}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onSubmit("draft")}
          className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800"
        >
          下書きとして保存
        </button>
        <button
          type="button"
          onClick={() => onSubmit("pending_review")}
          className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
        >
          審査に出す
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}
