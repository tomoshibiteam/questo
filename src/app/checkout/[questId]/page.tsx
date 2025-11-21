import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import CheckoutAction from "./CheckoutAction";

type Props = {
  params: { questId: string };
};

export default async function CheckoutPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const questKey = params.questId;
  if (!questKey) return notFound();

  // id でも slug でもヒットするように緩和
  const quest = await prisma.quest.findFirst({
    where: {
      status: "published",
      OR: [{ id: questKey }, { slug: questKey }],
    },
  });
  if (!quest) return notFound();

  return (
    <div className="mx-auto max-w-5xl grid-cols-1 gap-8 px-4 pb-16 pt-10 md:grid md:grid-cols-3">
      <div className="space-y-3 md:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Checkout
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">{quest.title}</h1>
        <p className="text-sm text-slate-600">
          {quest.city} / 所要時間 {quest.durationMin}分 / 距離 {quest.distanceKm}km
        </p>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          {quest.summary}
        </p>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          この決済は模擬フローです。完了するとプレイセッションが作成され、プレイ画面へ遷移します。料金は発生しません。
        </div>
      </div>
      <CheckoutAction questId={quest.id} priceYen={quest.priceYen ?? 2000} />
    </div>
  );
}
