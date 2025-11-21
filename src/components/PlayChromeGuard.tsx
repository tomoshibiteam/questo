"use client";

import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
};

// /play 配下ではグローバルHeader/Footerを非表示にするガード。
export default function PlayChromeGuard({ children, header, footer }: Props) {
  const pathname = usePathname();
  const isPlay = pathname?.startsWith("/play");

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-white">
      {!isPlay && header}
      <main className={isPlay ? "min-h-screen" : "min-h-[70vh]"}>{children}</main>
      {!isPlay && footer}
    </div>
  );
}
