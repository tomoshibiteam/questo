import QuestCard from "@/components/cards/QuestCard";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";
import { QuestTheme } from "@prisma/client";

export const dynamic = "force-dynamic"; // DB に依らずビルドを通す

type Props = {
  searchParams: Promise<{ city?: string; theme?: string }>;
};

export default async function QuestsPage({ searchParams }: Props) {
  const params = await searchParams;
  let quests: Awaited<ReturnType<typeof prisma.quest.findMany>> = [];
  let cities: { city: string; _count: number }[] = [];

  // DB接続がなくてもページが表示されるようフォールバック
  try {
    quests = await prisma.quest.findMany({
      where: {
        status: "published",
        ...(params.city ? { city: params.city } : {}),
        ...(params.theme ? { theme: params.theme as QuestTheme } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    cities = await prisma.quest.groupBy({ by: ["city"], _count: true });
  } catch (error) {
    console.warn("Failed to fetch quests, falling back to empty list", error);
    quests = [];
    cities = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
      <SectionHeading
        eyebrow="Play"
        title="クエスト一覧"
        description="都市やテーマで絞り込んでシティパズルトレイルを探そう。"
      />

      <form className="mt-4 grid gap-3 md:grid-cols-3">
        <select
          name="city"
          defaultValue={params.city ?? ""}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">すべての都市</option>
          {cities.map((city) => (
            <option key={city.city} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>
        <select
          name="theme"
          defaultValue={params.theme ?? ""}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">すべてのテーマ</option>
          <option value="tourism">観光</option>
          <option value="social_issue">社会課題</option>
          <option value="environment">環境</option>
          <option value="education">教育</option>
          <option value="other">その他</option>
        </select>
        <button
          type="submit"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          フィルタ
        </button>
      </form>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {quests.map((quest) => (
          <QuestCard key={quest.slug} quest={quest} />
        ))}
        {quests.length === 0 && (
          <p className="text-sm text-slate-600">
            条件に合うクエストがありません。公開中のクエストが追加されるまでお待ちください。
          </p>
        )}
      </div>
    </div>
  );
}
