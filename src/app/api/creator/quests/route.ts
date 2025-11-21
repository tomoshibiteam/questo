import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";
import { AnswerType, MissionType, QuestStatus, QuestTheme } from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !["creator", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "権限がありません" }, { status: 401 });
  }

  const body = await req.json();
  const { basic, steps, missions, status } = body as {
    basic: {
      title: string;
      subtitle?: string;
      city: string;
      theme: string;
      summary: string;
      durationMin: number;
      distanceKm: number;
      recommendedPlayers?: string;
      minAge?: string;
      brand?: string | null;
    };
    steps: Array<{
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
    }>;
    missions: Array<{
      id: string;
      step: number | null;
      type: string;
      description: string;
      impact: number;
      title?: string;
    }>;
    status: QuestStatus;
  };

  if (!basic?.title || !basic?.city || !basic?.summary) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  const baseSlug = slugify(basic.title);
  const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;

  const quest = await prisma.quest.create({
    data: {
      creatorId: session.user.id,
      title: basic.title,
      subtitle: basic.subtitle ?? "",
      city: basic.city,
      summary: basic.summary,
      theme: (basic.theme as QuestTheme) ?? "other",
      durationMin: Number(basic.durationMin),
      distanceKm: Number(basic.distanceKm),
      recommendedPlayers: basic.recommendedPlayers,
      minAge: basic.minAge,
      status: status === "pending_review" ? "pending_review" : "draft",
      slug,
      brand: basic.brand,
    },
  });

  // ステップを作成し、IDの対応表を保持する
  const stepIdMap: Record<string, string> = {};
  for (const s of steps.sort((a, b) => a.order - b.order)) {
    const created = await prisma.questStep.create({
      data: {
        questId: quest.id,
        order: s.order,
        lat: s.lat,
        lng: s.lng,
        placeName: s.name,
        placeDescription: s.description,
        storyText: s.storyText ?? "",
        puzzleText: s.puzzleText ?? "",
        answer: s.answer ?? "",
        answerType: (s.answerType as AnswerType) ?? "exact",
        hint1: s.hint1,
        hint2: s.hint2,
      },
    });
    stepIdMap[s.id] = created.id;
  }

  for (const m of missions) {
    await prisma.mission.create({
      data: {
        questId: quest.id,
        stepId: m.step ? stepIdMap[steps.find((s) => s.order === m.step)?.id ?? ""] : null,
        type: (m.type as MissionType) ?? "other",
        title: m.title ?? m.type,
        description: m.description,
        impactPoints: Number(m.impact ?? 0),
      },
    });
  }

  return NextResponse.json({ id: quest.id, slug: quest.slug, status: quest.status });
}
