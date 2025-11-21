import type { Quest, QuestStep } from "@/types";

// Supabase 未接続でもデモできるように用意したサンプルクエスト。
export const sampleQuests: Quest[] = [
  {
    id: "quest-nishikinohama-clean",
    title: "二色浜ビーチクリーン探偵ゲーム",
    slug: "nishikinohama-clean",
    city: "大阪・貝塚市",
    summary:
      "漂着ゴミの原因を探りながら浜を歩くエコ探偵ミッション。地元の歴史や海の環境を学びつつ謎を解こう。",
    theme: "environment",
    estimatedDurationMin: 60,
    estimatedDistanceKm: 2.5,
    difficulty: 2,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "quest-nakazakicho-mystery",
    title: "中崎町レトロ喫茶ミステリー",
    slug: "nakazakicho-mystery",
    city: "大阪・中崎町",
    summary:
      "路地裏の古書と喫茶文化をテーマにした街歩きクエスト。昭和レトロの雰囲気を味わいながら手がかりを探す。",
    theme: "tourism",
    estimatedDurationMin: 75,
    estimatedDistanceKm: 3.1,
    difficulty: 3,
    createdAt: "2024-01-12T00:00:00Z",
  },
];

export const sampleSteps: QuestStep[] = [
  {
    id: "step-1-beach",
    questId: "quest-nishikinohama-clean",
    order: 1,
    lat: 34.4681,
    lng: 135.3239,
    locationHint: "南海二色浜駅の改札を出て左手の案内板",
    storyText:
      "古い探偵ノートには『駅を出た旅人が最初に見る地図に、海を守る鍵が隠されている』とある。",
    puzzleText: "駅の案内板に大きく書かれた二色浜のアクティビティは？（ひらがなで入力）",
    answer: "すなはま",
    hintText: "サーフィンや潮干狩りのイラストを眺めてみよう。",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "step-2-beach",
    questId: "quest-nishikinohama-clean",
    order: 2,
    lat: 34.4659,
    lng: 135.3222,
    locationHint: "松林を抜けて海岸に出たら青いベンチを探す",
    storyText:
      "ベンチの裏に貼られた紙切れには『海をきれいにする日の合言葉』が書かれている。",
    puzzleText: "紙切れに書かれた曜日は？（カタカナ）",
    answer: "サタデー",
    hintText: "英語表記のポスターを探そう。",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "step-3-beach",
    questId: "quest-nishikinohama-clean",
    order: 3,
    lat: 34.4638,
    lng: 135.3183,
    locationHint: "ビーチクリーン集合場所の木製看板の前",
    storyText:
      "看板に刻まれたメッセージは『海は〇〇の鏡』。最後のピースを当てはめよう。",
    puzzleText: "〇〇に入る二文字は？（ひらがな）",
    answer: "こころ",
    hintText: "看板の上部に小さく刻まれている文字列。",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const sampleQuestById = (id: string) =>
  sampleQuests.find((q) => q.id === id || q.slug === id) || null;

export const sampleStepsByQuest = (questId: string) =>
  sampleSteps
    .filter((s) => s.questId === questId)
    .sort((a, b) => a.order - b.order);
