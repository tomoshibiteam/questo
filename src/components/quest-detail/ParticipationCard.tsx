"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Quest } from "@prisma/client";

type Props = {
  quest: Quest;
  priceLabel?: string;
};

// 参加カードはstickyで右に配置し、モバイルでは上部に表示される。
export default function ParticipationCard({
  quest,
  priceLabel = "¥2,000 / チーム（税込）",
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePlay = () => {
    if (!session?.user?.id) {
      // 未ログインはログインページへ
      signIn(undefined, { callbackUrl: `/checkout/${quest.id}` });
    } else {
      router.push(`/checkout/${quest.id}`);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md md:sticky md:top-24">
      <div className="text-xs font-semibold text-emerald-700">参加する</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">
        {priceLabel}
      </div>
      <p className="text-xs text-slate-500">推奨人数：2〜4人</p>
      <p className="text-xs text-slate-500">
        所要時間：{quest.durationMin}分 目安
      </p>
      <div className="mt-4 space-y-2">
        <button
          onClick={handlePlay}
          className="block w-full rounded-full bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          このクエストで遊ぶ
        </button>
        <Link
          href="/partners"
          className="block w-full rounded-full border border-emerald-200 px-4 py-3 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          友だちにギフトとして送る（準備中）
        </Link>
      </div>
      <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
        ※オンライン決済は準備中です。現地イベントでは主催者の案内に従ってください。
      </div>
    </div>
  );
}
