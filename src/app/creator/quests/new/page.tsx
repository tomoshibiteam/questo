"use client";

import WizardLayout from "@/components/creator-wizard/WizardLayout";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CreatorQuestNewPage() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-slate-600">読み込み中...</p>
      </div>
    );
  }

  if (!user || (user.role !== "creator" && user.role !== "admin")) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">クリエイター専用ページ</h1>
        <p className="text-sm text-slate-600">
          ゲーム作成にはクリエイター承認が必要です。まずは申請を完了してください。
        </p>
        <Link
          href="/creator/apply"
          className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
        >
          クリエイター申請へ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-emerald-700">Quest Builder</p>
        <h1 className="text-3xl font-semibold text-slate-900">ゲーム作成ウィザード</h1>
        <p className="text-sm text-slate-600">
          ノーコードで街歩き×謎解きのQuestを組み立てます。5ステップを順に埋めてください。
        </p>
      </div>
      <WizardLayout />
    </div>
  );
}
