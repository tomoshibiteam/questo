import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function applyAction(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const userId = session.user.id;
  const existing = await prisma.creatorApplication.findFirst({
    where: { userId },
  });
  if (existing) return;
  const displayName = formData.get("displayName")?.toString() ?? "";
  const bio = formData.get("bio")?.toString() ?? "";
  const area = formData.get("area")?.toString() ?? "";
  const socialIssues = formData.get("socialIssues")?.toString() ?? "";
  const concept = formData.get("concept")?.toString() ?? "";
  await prisma.creatorApplication.create({
    data: {
      userId,
      displayName,
      bio,
      area,
      socialIssues,
      concept,
      status: "pending",
    },
  });
  redirect("/creator/apply");
}

export default async function CreatorApplyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role === "creator" || session.user.role === "admin") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm">
          <h1 className="text-2xl font-semibold text-emerald-900">
            すでにクリエイター承認済みです
          </h1>
          <p className="mt-2 text-sm text-emerald-900">
            ダッシュボードでゲーム作成を始めましょう。
          </p>
        </div>
      </div>
    );
  }

  const existing = await prisma.creatorApplication.findFirst({
    where: { userId: session.user.id },
  });

  if (existing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">
          クリエイター申請状況
        </h1>
        <p className="text-sm text-slate-600">
          ステータス:{" "}
          <span className="font-semibold text-slate-900">{existing.status}</span>
        </p>
        <p className="text-sm text-slate-600">
          申請を受け付けました。審査には数日かかる場合があります。
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">
        クリエイター申請
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        TOMOSHIBIで街歩き×社会課題のクエストを作成するための申請フォームです。
      </p>

      <form
        className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        action={applyAction}
      >
        <div>
          <label className="text-sm font-semibold text-slate-800">表示名</label>
          <input
            name="displayName"
            required
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            自己紹介 / 団体紹介
          </label>
          <textarea
            name="bio"
            required
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-800">活動地域</label>
            <input
              name="area"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-800">
              取り組みたい社会課題
            </label>
            <input
              name="socialIssues"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">
            どのようなクエストを作りたいか
          </label>
          <textarea
            name="concept"
            required
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          申請を送信する
        </button>
      </form>
    </div>
  );
}
