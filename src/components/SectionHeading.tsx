type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
          {eyebrow}
        </p>
      )}
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {description && <p className="text-sm text-slate-600">{description}</p>}
    </div>
  );
}
