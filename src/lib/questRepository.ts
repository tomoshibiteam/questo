import type { Quest, QuestStep } from "@prisma/client";
import { isSupabaseEnabled, getSupabaseClient } from "./supabaseClient";
import {
  sampleQuests,
  sampleQuestById,
  sampleStepsByQuest,
} from "./sampleData";

type QuestRow = {
  id: string;
  title: string;
  slug?: string | null;
  city?: string | null;
  summary?: string | null;
  theme?: string | null;
  estimated_duration_min?: number | null;
  estimated_distance_km?: number | null;
  difficulty?: number | null;
  created_at?: string | null;
};

type QuestStepRow = {
  id: string;
  quest_id: string;
  order: number;
  lat: number;
  lng: number;
  location_hint: string;
  story_text: string;
  puzzle_text: string;
  answer: string;
  hint_text: string;
  created_at?: string | null;
};

const mapQuest = (row: QuestRow): Quest => ({
  id: row.id,
  title: row.title,
  slug: row.slug ?? undefined,
  city: row.city ?? "",
  summary: row.summary ?? "",
  theme: (row.theme as Quest["theme"]) ?? "other",
  estimatedDurationMin: row.estimated_duration_min ?? 0,
  estimatedDistanceKm: row.estimated_distance_km ?? 0,
  difficulty: row.difficulty ?? 1,
  createdAt: row.created_at ?? undefined,
});

const mapStep = (row: QuestStepRow): QuestStep => ({
  id: row.id,
  questId: row.quest_id,
  order: row.order,
  lat: row.lat,
  lng: row.lng,
  locationHint: row.location_hint,
  storyText: row.story_text,
  puzzleText: row.puzzle_text,
  answer: row.answer,
  hintText: row.hint_text,
  createdAt: row.created_at ?? undefined,
});

export async function fetchQuests(): Promise<Quest[]> {
  if (!isSupabaseEnabled) return sampleQuests;
  const supabase = getSupabaseClient();
  if (!supabase) return sampleQuests;
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) {
    console.error("Failed to fetch quests from Supabase", error);
    return sampleQuests;
  }
  return data.map(mapQuest);
}

export async function fetchQuestById(id: string): Promise<Quest | null> {
  if (!isSupabaseEnabled) return sampleQuestById(id);
  const supabase = getSupabaseClient();
  if (!supabase) return sampleQuestById(id);
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .limit(1)
    .maybeSingle();
  if (error || !data) {
    console.error("Failed to fetch quest", error);
    return sampleQuestById(id);
  }
  return mapQuest(data);
}

export async function fetchStepsByQuest(questId: string): Promise<QuestStep[]> {
  if (!isSupabaseEnabled) return sampleStepsByQuest(questId);
  const supabase = getSupabaseClient();
  if (!supabase) return sampleStepsByQuest(questId);
  const { data, error } = await supabase
    .from("quest_steps")
    .select("*")
    .eq("quest_id", questId)
    .order("order", { ascending: true });
  if (error || !data) {
    console.error("Failed to fetch steps", error);
    return sampleStepsByQuest(questId);
  }
  return data.map(mapStep);
}
