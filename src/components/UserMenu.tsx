'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function Avatar({ name, email }: { name?: string | null; email?: string | null }) {
  const initial = (name || email || "?").slice(0, 1).toUpperCase();
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
      {initial}
    </div>
  );
}

export default function UserMenu({ compact = false }: { compact?: boolean }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-800"
      >
        ログイン
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm"
      >
        <Avatar name={user.name} email={user.email} />
        {!compact && (
          <div className="flex items-center gap-2">
            <span>{user.name ?? user.email}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              {user.role}
            </span>
          </div>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
          <MenuLink href="/dashboard" label="ダッシュボード" />
          {(user.role === "creator" || user.role === "admin") && (
            <MenuLink href="/creator/dashboard" label="クリエイターダッシュボード" />
          )}
          {user.role === "admin" && <MenuLink href="/admin" label="管理画面" />}
          <button
            onClick={() => signOut()}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}
