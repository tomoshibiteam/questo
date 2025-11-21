import { StarIcon } from "@heroicons/react/24/solid";

type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

type Props = {
  average: number;
  count: number;
  reviews: Review[];
};

export default function QuestDetailReviews({
  average,
  count,
  reviews,
}: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">レビュー</h2>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:w-1/3">
          <div className="text-4xl font-semibold text-slate-900">
            {average.toFixed(1)}
          </div>
          <div className="mt-1 flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${i < Math.round(average) ? "text-amber-400" : "text-slate-200"}`}
              />
            ))}
          </div>
          <div className="text-sm text-slate-600">全{count}件のレビュー</div>
          <div className="mt-3 space-y-1 text-xs text-slate-500">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <span className="w-6 text-right">{num}★</span>
                <div className="h-2 flex-1 rounded-full bg-slate-100">
                  <div className="h-2 w-1/2 rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid flex-1 gap-3 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.date}`}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span className="font-semibold">{review.name}</span>
                <span className="text-xs text-slate-500">{review.date}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "text-amber-400" : "text-slate-200"}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-slate-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
        もっと見る
      </button>
    </section>
  );
}
