import QuestForm from "@/components/QuestForm";

export default function NewQuestPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">新規クエスト</h2>
        <p className="text-sm text-slate-600">基本情報を入力して保存します。</p>
      </div>
      <QuestForm />
    </div>
  );
}
