import QuestCard from "@/components/cards/QuestCard";
import { Quest } from "@/types/content";

type Props = {
  quests: Quest[];
};

export default function QuestDetailRelatedQuests({ quests }: Props) {
  if (quests.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        このクエストに似たトモシビ
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {quests.map((quest) => (
          <QuestCard key={quest.slug} quest={quest} />
        ))}
      </div>
    </section>
  );
}
