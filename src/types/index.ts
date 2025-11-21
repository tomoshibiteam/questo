// Questo の主要データ型。フロントでは camelCase で扱い、DBからは後でマッピングする。
export type QuestTheme = "tourism" | "social_issue" | "environment" | "other";

export type Quest = {
  id: string;
  title: string;
  slug?: string | null;
  city: string;
  summary: string;
  theme: QuestTheme;
  estimatedDurationMin: number;
  estimatedDistanceKm: number;
  difficulty: number; // 1-5
  createdAt?: string;
};

export type QuestStep = {
  id: string;
  questId: string;
  order: number;
  lat: number;
  lng: number;
  locationHint: string;
  storyText: string;
  puzzleText: string;
  answer: string;
  hintText: string;
  createdAt?: string;
};

export type PlaySession = {
  id: string;
  questId: string;
  startedAt: string;
  completedAt?: string;
  currentStep: number;
  hintsUsed: number;
};
