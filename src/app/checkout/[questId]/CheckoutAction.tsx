"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutAction({
  questId,
  priceYen,
}: {
  questId: string;
  priceYen: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questId }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "購入に失敗しました");
      }
      const data = (await res.json()) as { sessionId: string };
      router.push(`/play/${data.sessionId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "購入に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
      <div className="text-xs font-semibold text-emerald-700">決済サマリー（模擬）</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">
        ¥{priceYen.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ チーム（税込）</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">決済方法: モック（テスト用）</p>
      <div className="mt-4 space-y-2 text-xs text-slate-600">
        <p>・このボタンは模擬決済です。料金は発生しません。</p>
        <p>・購入後にプレイセッションが作成され、プレイ画面へ遷移します。</p>
      </div>
      {error && (
        <div className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "処理中..." : "この内容で購入する（模擬）"}
      </button>
    </div>
  );
}
