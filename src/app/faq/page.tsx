import Accordion from "@/components/Accordion";
import { faqs } from "@/data/faq";
import { faqCategories } from "@/data/faqCategories";

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-8">
      <h1 className="text-3xl font-bold text-slate-900">FAQ</h1>
      <p className="mt-2 text-sm text-slate-700">
        プレイヤー・クリエイター・自治体/企業の皆さまから寄せられる質問をまとめました。
      </p>

      <div className="mt-6 space-y-6">
        {Object.entries(faqCategories).map(([key, label]) => {
          const items = faqs
            .filter((f) => f.category === key)
            .map((f) => ({ title: f.question, content: f.answer }));
          return (
            <div key={key}>
              <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
              <Accordion items={items} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
