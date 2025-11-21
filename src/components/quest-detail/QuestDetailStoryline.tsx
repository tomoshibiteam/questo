type Props = {
  paragraphs: string[];
};

export default function QuestDetailStoryline({ paragraphs }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-900">ストーリー</h2>
      <div className="space-y-3 text-base leading-relaxed text-slate-700">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </section>
  );
}
