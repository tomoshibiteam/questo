import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;
  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { error: "メールと6文字以上のパスワードが必要です。" },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "既に登録済みのメールです。" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((v) => v.trim()) ?? [];
  const role = adminEmails.includes(email) ? "admin" : "user";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role,
    },
  });

  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
