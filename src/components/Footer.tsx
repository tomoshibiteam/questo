import Link from "next/link";

const columns = [
  {
    title: "Play",
    links: [
      { label: "Cities", href: "/cities" },
      { label: "Quests", href: "/quests" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Create & Partner",
    links: [
      { label: "Become a Creator", href: "/creators" },
      { label: "Become a Partner", href: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">TOMOSHIBI</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              街を歩くことが、ちょっとした冒険と、まちへのギフトになるように。
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-emerald-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-100 pt-4 text-sm text-slate-500">
          © {new Date().getFullYear()} TOMOSHIBI
        </div>
      </div>
    </footer>
  );
}
