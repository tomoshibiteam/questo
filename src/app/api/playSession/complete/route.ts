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
  const sessionId = body?.sessionId as string | undefined;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  const playSession = await prisma.playSession.findUnique({
    where: { id: sessionId },
  });

  if (!playSession || playSession.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.playSession.update({
    where: { id: sessionId },
    data: { status: "completed", finishedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
