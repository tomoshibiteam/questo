import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/cards/EventCard";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
      <SectionHeading
        eyebrow="Events"
        title="TOMOSHIBI イベント"
        description="日時指定で参加できる街歩き×社会課題イベント。"
      />
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
