"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, LightBulbIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Mission, QuestStep } from "@prisma/client";

const PlayMap = dynamic(() => import("./PlayMap"), { ssr: false });

type QuestData = {
  id: string;
  slug: string;
  title: string;
  city: string;
  durationMin: number;
  distanceKm: number;
  steps: QuestStep[];
  missions: Mission[];
};

type Props = {
  sessionId: string;
  quest: QuestData;
};

export default function PlaySessionClient({ sessionId, quest }: Props) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);

  const steps = quest.steps;
  const currentStep = steps[activeStepIndex];
  const missionsForStep = useMemo(
    () => quest.missions.filter((m) => m.stepId === currentStep?.id),
    [quest.missions, currentStep?.id],
  );

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setCurrentPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const distanceText = useMemo(() => {
    if (!currentPosition || !currentStep) return null;
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(currentPosition[0]);
    const φ2 = toRad(currentStep.lat);
    const Δφ = toRad(currentStep.lat - currentPosition[0]);
    const Δλ = toRad(currentStep.lng - currentPosition[1]);
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = Math.round(R * c);
    return d >= 1000 ? `目的地まで 約 ${(d / 1000).toFixed(1)} km` : `目的地まで 約 ${d} m`;
  }, [currentPosition, currentStep]);

  const normalize = (val: string) => val.trim();

  const checkAnswer = (input: string, step: QuestStep) => {
    const normalizedInput = normalize(input);
    const normalizedAnswer = normalize(step.answer);
    switch (step.answerType) {
      case "case_insensitive":
        return normalizedInput.toLowerCase() === normalizedAnswer.toLowerCase();
      case "number":
        return Number(normalizedInput) === Number(normalizedAnswer);
      default:
        return normalizedInput === normalizedAnswer;
    }
  };

  const handleSubmit = async () => {
    if (!currentStep) return;
    if (!answer.trim()) {
      setFeedback("回答を入力してください。");
      return;
    }
    if (checkAnswer(answer, currentStep)) {
      const nextIndex = activeStepIndex + 1;
      setCompletedSteps((prev) => (prev.includes(activeStepIndex) ? prev : [...prev, activeStepIndex]));
      setFeedback("正解！次のステップへ進もう。");
      setHintLevel(0);
      setAnswer("");

      if (nextIndex >= steps.length) {
        await completeSession();
        setIsCompleted(true);
      } else {
        setActiveStepIndex(nextIndex);
      }
    } else {
      setFeedback("答えが違うようです。もう一度周りを見てみましょう。");
    }
  };

  const handleHint = () => setHintLevel((prev) => Math.min(2, prev + 1));

  const completeSession = async () => {
    try {
      const res = await fetch("/api/playSession/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text || "完了処理に失敗しました");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "完了処理に失敗しました");
    }
  };

  const bottomSheetContent = (
    <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 pb-6 pt-2">
      <div className="mx-auto mt-1 mb-1 h-1 w-10 rounded-full bg-slate-300 md:hidden" />

      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
            STEP {activeStepIndex + 1} / {steps.length}
          </span>
          <h2 className="text-lg font-semibold text-slate-900">{currentStep?.placeName}</h2>
          <p className="text-xs text-slate-500">{quest.city}</p>
          {distanceText && (
            <p className="inline-flex items-center gap-1 text-[11px] text-emerald-700">
              <MapPinIcon className="h-4 w-4" />
              {distanceText}
            </p>
          )}
        </div>
        <div className="hidden md:flex flex-wrap gap-2">
          {steps.map((step, idx) => {
            const completed = completedSteps.includes(idx);
            const isActive = idx === activeStepIndex;
            return (
              <span
                key={step.id}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : completed
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-700"
                }`}
              >
                {idx + 1}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-500">ストーリー</p>
        <p className="text-sm text-slate-800 whitespace-pre-line">{currentStep?.storyText}</p>
        {currentStep?.placeDescription && (
          <p className="text-sm text-slate-600">{currentStep.placeDescription}</p>
        )}
      </div>

      <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/90 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-emerald-700">謎</p>
          <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-emerald-700">
            回答して次へ
          </span>
        </div>
        <p className="text-base font-semibold text-slate-900">{currentStep?.puzzleText}</p>
        <div className="space-y-2">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="答えを入力"
            className="w-full rounded-xl border border-emerald-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <div className="space-y-2">
            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.99]"
            >
              この答えで確定
            </button>
            <button
              onClick={handleHint}
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-emerald-100 bg-white py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
            >
              <LightBulbIcon className="h-4 w-4" />
              ヒントを見る
            </button>
          </div>
          {feedback && <p className="text-xs text-emerald-700">{feedback}</p>}
          {hintLevel > 0 && currentStep?.hint1 && (
            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              Hint 1: {currentStep.hint1}
            </div>
          )}
          {hintLevel > 1 && currentStep?.hint2 && (
            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              Hint 2: {currentStep.hint2}
            </div>
          )}
        </div>
      </div>

      {missionsForStep.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500">ミッション</p>
          {missionsForStep.map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50 p-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{m.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{m.description}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                +{m.impactPoints} pt
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen w-full bg-slate-900 text-white md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-slate-900/80 to-transparent px-4 pt-3 pb-2">
        <Link
          href={`/quests/${quest.slug}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1 px-3 text-center">
          <p className="truncate text-sm font-semibold text-white">{quest.title}</p>
          <p className="text-[11px] text-slate-200">{quest.city}</p>
        </div>
        <span className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow">
          {activeStepIndex + 1} / {steps.length}
        </span>
      </div>

      {/* Desktop left panel */}
      <div className="hidden h-screen overflow-y-auto bg-white text-slate-900 md:block">
        <div className="pt-14">{bottomSheetContent}</div>
      </div>

      {/* Map area */}
      <div className="relative flex h-screen flex-col md:h-screen">
        <div className="absolute inset-0 z-0">
          <PlayMap
            steps={steps}
            activeStepIndex={activeStepIndex}
            completedStepIndexes={completedSteps}
            currentPosition={currentPosition ?? undefined}
            mapKey={sessionId}
          />
        </div>
        <div className="relative z-10 h-14 md:hidden" />
      </div>

      {/* Mobile bottom sheet */}
      <div className="md:hidden">
        <div className="fixed bottom-0 left-0 right-0 z-30 max-h-[55vh] min-h-[32vh] rounded-t-3xl border-t border-slate-200 bg-white text-slate-900 shadow-2xl">
          {bottomSheetContent}
        </div>
      </div>

      {/* Complete modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-xl font-semibold">クエストクリア！</h3>
            <p className="mt-2 text-sm text-slate-600">
              おつかれさまでした。この街は少し違って見えてきましたか？
            </p>
            {error && (
              <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
                完了処理に失敗しました: {error}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/quests/${quest.slug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                クエスト詳細に戻る
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                マイページへ
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
