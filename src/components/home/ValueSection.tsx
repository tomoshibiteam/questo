import {
  SparklesIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import SectionHeading from "@/components/SectionHeading";
import { cx } from "@/lib/cx";

const items = [
  {
    title: "遊ぶ – いつもの街がステージになる",
    text: "行き先は、地図ではなくクエストから選ぶ。チェックポイントを巡りながら謎を解いていくうちに、「知っているはずの街」が少しずつ違って見えてきます。旅行先でも、地元でも、気軽に始められる街歩きゲームです。",
    icon: SparklesIcon,
    emphasis: false,
  },
  {
    title: "作る – だれでも街のストーリーテラーに",
    text: "クリエイターや団体は、IPに縛られずオリジナルのシティトレイルを投稿できます。好きなルート・スポット・エピソードを組み合わせて、「自分だけが知っている街の楽しみ方」をクエストとして公開できます。",
    icon: WrenchScrewdriverIcon,
    emphasis: false,
  },
  {
    title: "SPR探偵事務所 – 物語に“問い”を仕込むブランド",
    text: "TOMOSHIBI発のオリジナルブランド。探偵もののストーリーをベースに、街にまつわる歴史や環境、産業などの“謎”を追いかけます。プレイ後には、その街をもっと深く知りたくなるような余韻が残るシリーズです。",
    icon: ShieldCheckIcon,
    emphasis: true,
  },
  {
    title: "社会課題ミッション – 行動したくなる仕掛けを",
    text: "ビーチクリーンや商店街めぐりなど、街のためのアクションをクエストの一部として体験できる仕組みです。SPR探偵事務所をはじめとした一部のクエストで選べるオプションとして設計し、「楽しい」がそのまま「参加してみたい」に変わる導線をつくります。",
    icon: GlobeAltIcon,
    emphasis: false,
  },
];

export default function ValueSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16">
        <SectionHeading
          eyebrow="VALUE"
          title="遊ぶ・作る・ブランドで広がるシティトレイルプラットフォーム"
          description="TOMOSHIBIの上では、誰もが街を舞台にしたシティトレイルを作り、遊ぶことができます。普通の観光ルートも、物語と謎解きが加わるだけで、忘れられない冒険に変わります。さらにSPR探偵事務所ブランドなど、世界観や社会テーマに特化したクエストも展開していきます。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className={cx(
                "flex gap-3 rounded-2xl border bg-white p-5 shadow-sm md:p-6",
                item.emphasis ? "border-emerald-200" : "border-slate-100",
              )}
            >
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
