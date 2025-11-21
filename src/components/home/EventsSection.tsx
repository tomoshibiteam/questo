import EventCard from "@/components/cards/EventCard";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/data/events";

export default function EventsSection() {
  const [featured, ...rest] = events;
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16">
        <SectionHeading
          eyebrow="EVENTS"
          title="日時指定のイベントで遊ぶ"
          description="クリーンアップや街歩きイベントなど、特定の日にみんなで同じクエストを楽しめる企画を用意しています。一人では味わえない盛り上がりや、現地ガイドとの出会いが生まれます。"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured && (
            <div className="md:col-span-1">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 shadow-md">
                <div className="text-xs font-semibold text-emerald-800">
                  おすすめ
                </div>
                <EventCard event={featured} />
              </div>
            </div>
          )}
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            {rest.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
