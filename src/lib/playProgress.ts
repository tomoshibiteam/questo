export type PlayProgress = {
  currentStepIndex: number;
  hintsUsed: number;
  answers: Record<string, string>;
  startedAt: string;
  finishedAt?: string;
};

const key = (questId: string) => `questo-progress:${questId}`;

export function loadProgress(questId: string): PlayProgress | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(key(questId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlayProgress;
  } catch (e) {
    console.warn("failed to parse progress", e);
    return null;
  }
}

export function saveProgress(questId: string, progress: PlayProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key(questId), JSON.stringify(progress));
}

export function clearProgress(questId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key(questId));
}

export function initProgress(_questId: string): PlayProgress {
  void _questId; // 型シグネチャを残しつつ未使用警告を抑止
  return {
    currentStepIndex: 0,
    hintsUsed: 0,
    answers: {},
    startedAt: new Date().toISOString(),
  };
}
