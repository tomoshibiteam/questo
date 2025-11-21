import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    title: "1. クエストを選ぶ",
    text: "遊びたい街とテーマを選んで、気になるクエストを一本選択。所要時間や距離、雰囲気を見ながら、今日の“冒険”を決めます。",
    image: "/images/quest-photo-1.svg",
  },
  {
    title: "2. 街を歩いて謎を解く",
    text: "指定されたスタート地点から、ヒントを頼りに次のスポットへ。建物や風景の中に仕込まれた手がかりを見つけて、謎を解き進めます。",
    image: "/images/panel-quest.svg",
  },
  {
    title: "3. ストーリーやミッションで街をもっと知る",
    text: "クエストごとに用意されたエピソードや追加ミッションを通して、その街の歴史や文化、時には抱えている課題にも触れられます。SPR探偵事務所など一部のクエストでは、実際のアクションにつながるミッションも体験できます。",
    image: "/images/quest-photo-2.svg",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="3ステップで、街がゲームになる"
          description="はじめてでもすぐに遊べるシンプルな流れ。1時間くらいの散歩から、ちょっとした小旅行まで、気分に合わせて楽しめます。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                {i + 1}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600">{step.text}</p>
              <div className="relative mt-auto h-40 overflow-hidden rounded-xl border border-slate-100">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
