import Link from "next/link";
import type { Event } from "@/types/content";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="flex flex-col rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
          {event.citySlug ?? "Online"}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
          {event.date}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        {event.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
        {event.summary}
      </p>
    </Link>
  );
}
