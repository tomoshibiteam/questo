import { events } from "@/data/events";
import SectionHeading from "@/components/SectionHeading";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function EventDetailPage({
  params,
}: {
  params: { eventSlug: string };
}) {
  const { eventSlug } = params;
  const event = events.find((e) => e.slug === eventSlug);
  if (!event) return notFound();
  const cityLabel = event.citySlug ? event.citySlug : "Online";

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-8">
      <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
        <p className="text-xs font-semibold text-emerald-700">TOMOSHIBI Event</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{event.title}</h1>
        <p className="text-sm text-slate-600">
          {event.date} / {cityLabel}
        </p>
        <p className="mt-3 text-sm text-slate-700">{event.summary}</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <Image
            src="/images/hero-map.svg"
            alt="Event hero"
            width={900}
            height={520}
            className="w-full"
          />
        </div>
      </div>

      <section className="mt-8 space-y-3 rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm">
        <SectionHeading
          eyebrow="Detail"
          title="イベント詳細"
          description="集合場所や流れなど。"
        />
        <p className="text-sm text-slate-700 whitespace-pre-line">{event.detail}</p>
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          申込は現在準備中です。外部チケット連携予定。
        </div>
      </section>

      <section className="mt-8">
        <SectionHeading
          eyebrow="Flow"
          title="TOMOSHIBIアプリを使ったイベントの流れ"
        />
        <ol className="mt-3 space-y-2 text-sm text-slate-700">
          <li>1. 集合場所でチェックイン</li>
          <li>2. クエストのストーリーと社会課題ミッションを共有</li>
          <li>3. チームに分かれて街を歩き、謎とミッションを進行</li>
          <li>4. 成果シェアと振り返り、次のアクションを提案</li>
        </ol>
      </section>
    </div>
  );
}
