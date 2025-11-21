import StepManager from "@/components/StepManager";
import { fetchQuestById, fetchStepsByQuest } from "@/lib/questRepository";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function QuestStepsPage({ params }: Props) {
  const { id } = params;
  const quest = await fetchQuestById(id);
  if (!quest) return notFound();
  const steps = await fetchStepsByQuest(quest.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            ステップ編集: {quest.title}
          </h2>
          <p className="text-sm text-slate-600">
            並び順や緯度経度を調整し、保存すると Supabase に反映されます。
          </p>
        </div>
        <Link
          href={`/play/${quest.id}`}
          className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200"
        >
          プレイ画面で確認
        </Link>
      </div>

      <StepManager questId={quest.id} initialSteps={steps} />
    </div>
  );
}
