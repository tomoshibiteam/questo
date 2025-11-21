import {
  PuzzlePieceIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const cards = [
  {
    title: "街を歩きながら謎を解く",
    text: "地図とヒントを頼りにスポットを巡り、物語と謎を進めます。",
    icon: PuzzlePieceIcon,
  },
  {
    title: "LINE感覚でミッション進行",
    text: "スマホで手順を確認しながら、チャット感覚で進められます。",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    title: "社会課題ミッションに参加",
    text: "清掃や調査など、地域の課題に関わるアクションを実際に体験。",
    icon: HeartIcon,
  },
  {
    title: "遊んだ記録とインパクトが残る",
    text: "クリア履歴やインパクトポイントが貯まり、振り返りも簡単。",
    icon: ChartBarIcon,
  },
];

export default function QuestDetailHowToPlay() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        TOMOSHIBIの遊び方
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600">{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
