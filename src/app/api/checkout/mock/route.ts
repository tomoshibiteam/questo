import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const questId = body?.questId as string | undefined;
  if (!questId) {
    return NextResponse.json({ error: "questId is required" }, { status: 400 });
  }

  const quest = await prisma.quest.findFirst({
    where: { id: questId, status: "published" },
  });
  if (!quest) {
    return NextResponse.json({ error: "Quest not found" }, { status: 404 });
  }

  const playSession = await prisma.playSession.create({
    data: {
      userId: session.user.id,
      questId: quest.id,
      status: "in_progress",
      paymentMethod: "mock",
    },
  });

  return NextResponse.json({ sessionId: playSession.id });
}
