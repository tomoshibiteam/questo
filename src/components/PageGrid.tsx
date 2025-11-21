import Link from "next/link";

export default function PageGrid() {
  const placeholders = {
    questId: "cmi8rnr0b0004okgc82owdhfc",
    questSlug: "nishikinohama-clean",
    citySlug: encodeURIComponent("大阪・貝塚"),
    eventSlug: "nishikinohama-cleanup-day",
    sessionId: "sample-session",
    id: "sample-id",
    slug: "sample-post",
  };

  const routes = [
    "/",
    "/about",
    "/admin",
    "/admin/creator-applications",
    "/admin/quests/new",
    "/admin/quests/[id]",
    "/admin/quests/[id]/steps",
    "/blog",
    "/blog/[slug]",
    "/careers",
    "/checkout/[questId]",
    "/cities",
    "/cities/[citySlug]",
    "/countries",
    "/creator/apply",
    "/creator/dashboard",
    "/creator/quests/new",
    "/creators",
    "/dashboard",
    "/events",
    "/events/[eventSlug]",
    "/faq",
    "/forgot-password",
    "/login",
    "/partners",
    "/play/[id]",
    "/play/[sessionId]",
    "/privacy-policy",
    "/quests",
    "/quests/[questSlug]",
    "/signup",
    "/terms",
  ];

  return (
    <div className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2 md:grid-cols-3">
      {routes.map((r) => (
        <Link
          key={r}
          href={
            r
              .replace("[questId]", placeholders.questId)
              .replace("[citySlug]", placeholders.citySlug)
              .replace("[eventSlug]", placeholders.eventSlug)
              .replace("[questSlug]", placeholders.questSlug)
              .replace("[sessionId]", placeholders.sessionId)
              .replace("[id]", placeholders.id)
              .replace("[slug]", placeholders.slug)
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-700"
        >
          {r}
        </Link>
      ))}
    </div>
  );
}
