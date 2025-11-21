import QuestDetailHero from "@/components/quest-detail/QuestDetailHero";
import ParticipationCard from "@/components/quest-detail/ParticipationCard";
import QuestDetailHighlights from "@/components/quest-detail/QuestDetailHighlights";
import QuestDetailStoryline from "@/components/quest-detail/QuestDetailStoryline";
import QuestDetailStats from "@/components/quest-detail/QuestDetailStats";
import QuestDetailRoute from "@/components/quest-detail/QuestDetailRoute";
import QuestDetailPlaces from "@/components/quest-detail/QuestDetailPlaces";
import QuestDetailMissions from "@/components/quest-detail/QuestDetailMissions";
import QuestDetailReviews from "@/components/quest-detail/QuestDetailReviews";
import QuestDetailHowToPlay from "@/components/quest-detail/QuestDetailHowToPlay";
import QuestDetailCreator from "@/components/quest-detail/QuestDetailCreator";
import QuestDetailRelatedQuests from "@/components/quest-detail/QuestDetailRelatedQuests";
import { Quest, QuestStep, Mission, User, PlaySession } from "@prisma/client";
import { ClockIcon, MapIcon, BeakerIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

type Props = {
  quest: Quest & {
    steps: QuestStep[];
    missions: Mission[];
    playSessions: PlaySession[];
    creator: User | null;
  };
  related: Quest[];
};

export default function QuestDetailPageContent({ quest, related }: Props) {
  const breadcrumbs = ["日本", quest.city, quest.title].filter(Boolean);
  const gallery = [
    "/images/quest-photo-1.svg",
    "/images/quest-photo-2.svg",
    "/images/panel-quest.svg",
  ];

  const highlights = [
    quest.summary,
    "街を歩きながら謎を解き、ローカルな物語に没入",
    "社会課題ミッションに参加し、実際の行動につなげる",
  ];

  const storyline = [
    quest.summary,
    "地元のスポットを巡りながら手がかりを集め、物語を進めます。",
    "最後にはミッションを通して街に小さなインパクトを残しましょう。",
  ];

  const places = quest.steps.map((s) => ({
    name: s.placeName,
    description: s.placeDescription,
    image: "/images/quest-photo-1.svg",
  }));

  const missions = quest.missions.map((m) => ({
    title: m.title,
    description: m.description,
    impact: `+${m.impactPoints} pt`,
  }));

  const reviews: {
    name: string;
    rating: number;
    date: string;
    text: string;
  }[] = []; // 実データがないため空。今後レビュー機能追加時に置き換え。

  return (
    <div className="bg-white">
      <QuestDetailHero
        quest={quest}
        breadcrumbs={breadcrumbs}
        gallery={gallery}
        rating={{ score: 4.8, count: quest.playSessions.length }}
      />

      <div className="mx-auto max-w-7xl grid-cols-12 gap-6 px-4 pb-16 md:grid">
        <div className="md:col-span-8 space-y-10">
          <QuestDetailHighlights items={highlights} />
          <QuestDetailStoryline paragraphs={storyline} />
          <QuestDetailStats
            stats={[
              { label: "訪問スポット数", value: `${quest.steps.length}か所`, icon: MapIcon },
              { label: "所要時間", value: `${quest.durationMin}分 目安`, icon: ClockIcon },
              { label: "歩行距離", value: `${quest.distanceKm}km`, icon: BeakerIcon },
              { label: "社会課題ミッション", value: `${missions.length}件`, icon: ArchiveBoxIcon },
            ]}
          />
          <QuestDetailRoute
            start={quest.steps[0]?.placeName ?? "スタート地点未設定"}
            goal={quest.steps[quest.steps.length - 1]?.placeName ?? "ゴール未設定"}
          />
          <QuestDetailPlaces places={places} />
          <QuestDetailMissions missions={missions} />
          <QuestDetailReviews average={reviews.length ? 4.8 : 0} count={reviews.length} reviews={reviews} />
          <QuestDetailHowToPlay />
          <QuestDetailCreator
            name={
              quest.brand === "spr-detective-office"
                ? "SPR探偵事務所"
                : quest.creator?.name ?? "TOMOSHIBI クリエイター"
            }
            role="ローカルクリエイター / 企画"
            bio="地域の物語と社会課題を結びつけ、歩いて参加できる体験をデザインしています。"
          />
          <QuestDetailRelatedQuests quests={related} />
        </div>

        <div className="md:col-span-4 md:pt-2">
          <ParticipationCard quest={quest} />
        </div>
      </div>
    </div>
  );
}
