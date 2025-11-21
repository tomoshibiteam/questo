import QuestForm from "@/components/QuestForm";
import { fetchQuestById } from "@/lib/questRepository";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditQuestPage({ params }: Props) {
  const { id } = await params;
  const quest = await fetchQuestById(id);
  if (!quest) return notFound();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          クエストを編集
        </h2>
        <p className="text-sm text-slate-600">{quest.title}</p>
      </div>
      <QuestForm initialData={quest} />
    </div>
  );
}
