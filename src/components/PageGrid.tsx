import Link from "next/link";

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

export default function PageGrid() {
  return (
    <div className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2 md:grid-cols-3">
      {routes.map((r) => (
        <Link
          key={r}
          href={
            r
              .replace("[questId]", "sample-quest")
              .replace("[citySlug]", "sample-city")
              .replace("[eventSlug]", "sample-event")
              .replace("[questSlug]", "sample-quest")
              .replace("[sessionId]", "sample-session")
              .replace("[id]", "sample-id")
              .replace("[slug]", "sample-slug")
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-700"
        >
          {r}
        </Link>
      ))}
    </div>
  );
}
