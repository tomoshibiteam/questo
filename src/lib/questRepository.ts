import type { Quest, QuestStep } from "@prisma/client";
import { sampleQuests, sampleQuestById, sampleStepsByQuest } from "./sampleData";
import { isSupabaseEnabled, getSupabaseClient } from "./supabaseClient";

type QuestRow = {
  id: string;
  title: string;
  slug?: string | null;
  city?: string | null;
  summary?: string | null;
  theme?: string | null;
  estimated_duration_min?: number | null;
  estimated_distance_km?: number | null;
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
  slug: row.slug ?? "",
  city: row.city ?? "",
  summary: row.summary ?? "",
  theme: (row.theme as Quest["theme"]) ?? "other",
  durationMin: row.estimated_duration_min ?? 0,
  distanceKm: row.estimated_distance_km ?? 0,
  priceYen: 2000,
  createdAt: row.created_at ? new Date(row.created_at) : new Date(),
  updatedAt: row.created_at ? new Date(row.created_at) : new Date(),
  status: "published",
  creatorId: "",
  subtitle: null,
  recommendedPlayers: null,
  minAge: null,
  brand: null,
});

const mapStep = (row: QuestStepRow): QuestStep => ({
  id: row.id,
  questId: row.quest_id,
  order: row.order,
  lat: row.lat,
  lng: row.lng,
  placeName: row.location_hint,
  placeDescription: row.location_hint,
  storyText: row.story_text,
  puzzleText: row.puzzle_text,
  answer: row.answer,
  answerType: "exact",
  hint1: row.hint_text,
  hint2: null,
});

export async function fetchQuests(): Promise<Quest[]> {
  if (!isSupabaseEnabled) return sampleQuests as unknown as Quest[];
  const supabase = getSupabaseClient();
  if (!supabase) return sampleQuests as unknown as Quest[];
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) {
    console.error("Failed to fetch quests from Supabase", error);
    return sampleQuests as unknown as Quest[];
  }
  return data.map(mapQuest);
}

export async function fetchQuestById(id: string): Promise<Quest | null> {
  if (!isSupabaseEnabled) return (sampleQuestById(id) as unknown as Quest) ?? null;
  const supabase = getSupabaseClient();
  if (!supabase) return (sampleQuestById(id) as unknown as Quest) ?? null;
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .limit(1)
    .maybeSingle();
  if (error || !data) {
    console.error("Failed to fetch quest", error);
    return (sampleQuestById(id) as unknown as Quest) ?? null;
  }
  return mapQuest(data);
}

export async function fetchStepsByQuest(questId: string): Promise<QuestStep[]> {
  if (!isSupabaseEnabled) return (sampleStepsByQuest(questId) as unknown as QuestStep[]);
  const supabase = getSupabaseClient();
  if (!supabase) return (sampleStepsByQuest(questId) as unknown as QuestStep[]);
  const { data, error } = await supabase
    .from("quest_steps")
    .select("*")
    .eq("quest_id", questId)
    .order("order", { ascending: true });
  if (error || !data) {
    console.error("Failed to fetch steps", error);
    return (sampleStepsByQuest(questId) as unknown as QuestStep[]);
  }
  return data.map(mapStep);
}
