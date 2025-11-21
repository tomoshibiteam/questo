"use client";

import { useEffect, useMemo, useState } from "react";
import type { Quest, QuestStep } from "@/types";
import QuestMap from "./QuestMap";
import {
  PlayProgress,
  clearProgress,
  initProgress,
  loadProgress,
  saveProgress,
} from "@/lib/playProgress";

type Props = {
  quest: Quest;
  steps: QuestStep[];
};

type Feedback = {
  status: "idle" | "correct" | "wrong";
  message?: string;
};

const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, "");

export default function PlayClient({ quest, steps }: Props) {
  const [progress, setProgress] = useState<PlayProgress | null>(null);
  const [answerInput, setAnswerInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ status: "idle" });

  // 初回マウント時に localStorage から進行状況を復元する。
  useEffect(() => {
    const stored = loadProgress(quest.id);
    const initial = stored ?? initProgress(quest.id);
    // localStorage の内容を UI に同期するための一度きりの setState。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(initial);
    if (initial.currentStepIndex < steps.length) {
      const current = steps[initial.currentStepIndex];
      const storedAnswer = initial.answers[current?.id];
      setAnswerInput(storedAnswer ?? "");
    }
  }, [quest.id, steps]);

  // 状態が変わるたびに進行状況を保存。
  useEffect(() => {
    if (progress) saveProgress(quest.id, progress);
  }, [progress, quest.id]);

  const currentStep =
    progress && progress.currentStepIndex < steps.length
      ? steps[progress.currentStepIndex]
      : null;
  const isFinished =
    progress !== null && progress.currentStepIndex >= steps.length;

  const progressRatio = useMemo(() => {
    if (!progress) return 0;
    return Math.min(
      1,
      (progress.currentStepIndex ?? 0) / Math.max(steps.length, 1),
    );
  }, [progress, steps.length]);

  if (!progress) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm">
        ロード中...
      </div>
    );
  }

  const handleSubmit = () => {
    if (!currentStep) return;
    const correct = normalize(answerInput) === normalize(currentStep.answer);
    if (!correct) {
      setFeedback({ status: "wrong", message: "惜しい！もう一度チャレンジ" });
      return;
    }

    const nextIndex = progress.currentStepIndex + 1;
    const updated: PlayProgress = {
      ...progress,
      answers: { ...progress.answers, [currentStep.id]: answerInput },
      currentStepIndex: nextIndex,
      finishedAt:
        nextIndex >= steps.length ? new Date().toISOString() : undefined,
    };

    setFeedback({ status: "correct", message: "正解！次へ進もう" });
    setShowHint(false);
    setAnswerInput("");
    setProgress(updated);
  };

  const handleHint = () => {
    if (showHint) return;
    setShowHint(true);
    setProgress({
      ...progress,
      hintsUsed: progress.hintsUsed + 1,
    });
  };

  const handleRestart = () => {
    const fresh = initProgress(quest.id);
    clearProgress(quest.id);
    setShowHint(false);
    setAnswerInput("");
    setFeedback({ status: "idle" });
    setProgress(fresh);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="font-semibold text-emerald-700">
            {quest.title}
          </span>
          <button
            onClick={handleRestart}
            className="text-xs text-slate-500 underline decoration-dashed underline-offset-4"
          >
            最初からやり直す
          </button>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-slate-500">
          ステップ {Math.min(progress.currentStepIndex + 1, steps.length)} /{" "}
          {steps.length} ・ ヒント使用 {progress.hintsUsed} 回
        </div>
      </div>

      {isFinished ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-emerald-800">
            クリアおめでとう！
          </h2>
          <p className="mt-2 text-sm text-emerald-800">
            所要時間とヒント使用回数の目安を参考に、フィードバックを記録しよう。
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-emerald-900">
            <div className="rounded-xl bg-white/80 px-3 py-2">
              <div className="text-xs text-emerald-700">使用ヒント</div>
              <div className="text-lg font-semibold">
                {progress.hintsUsed} 回
              </div>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-2">
              <div className="text-xs text-emerald-700">回答数</div>
              <div className="text-lg font-semibold">
                {Object.keys(progress.answers).length} 問
              </div>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            もう一度プレイする
          </button>
        </div>
      ) : (
        currentStep && (
          <div className="space-y-4 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>STEP {currentStep.order}</span>
              <span className="text-emerald-700">現地のヒントを読み進めよう</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  ストーリー
                </div>
                <p className="mt-1 text-sm text-slate-800">
                  {currentStep.storyText}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  場所のヒント
                </div>
                <p className="mt-1 text-sm text-slate-800">
                  {currentStep.locationHint}
                </p>
              </div>
              <QuestMap
                lat={currentStep.lat}
                lng={currentStep.lng}
                hint={currentStep.locationHint}
                className="h-48 w-full rounded-xl"
              />
              <div>
                <div className="text-xs font-semibold text-slate-500">謎</div>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {currentStep.puzzleText}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                解答を入力
              </label>
              <input
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                placeholder="ここに答えを入力"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  回答する
                </button>
                <button
                  onClick={handleHint}
                  className="w-28 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200"
                >
                  ヒント
                </button>
              </div>
              {feedback.status === "correct" && (
                <p className="text-sm font-semibold text-emerald-700">
                  {feedback.message}
                </p>
              )}
              {feedback.status === "wrong" && (
                <p className="text-sm font-semibold text-red-600">
                  {feedback.message}
                </p>
              )}
              {showHint && (
                <p className="rounded-xl bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                  {currentStep.hintText}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
