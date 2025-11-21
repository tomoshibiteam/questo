'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import UserMenu from "./UserMenu";

const navItems = [
  { label: "Play", href: "/cities" },
  { label: "Quests", href: "/quests" },
  { label: "Events", href: "/events" },
  { label: "Creators", href: "/creators" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          TOMOSHIBI
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition hover:text-emerald-700 ${
                pathname.startsWith(item.href) ? "text-emerald-700" : "text-slate-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <UserMenu />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <UserMenu compact />
          <button
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6 text-slate-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-slate-800" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-100 pt-2">
              <UserMenu compact />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
