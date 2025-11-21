import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";
import PlayChromeGuard from "@/components/PlayChromeGuard";

export const metadata: Metadata = {
  title: "TOMOSHIBI | 街を歩いて謎を解くシティトレイルゲーム・プラットフォーム",
  description:
    "TOMOSHIBIは、街歩きと謎解きを組み合わせたシティトレイルゲームのプラットフォームです。プレイヤーはスマホひとつでクエストを選び、街を探検しながら物語を楽しめます。SPR探偵事務所ブランドなど、一部のクエストでは地域の課題に触れる社会貢献ミッションも体験できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className="antialiased bg-white text-slate-900"
      >
        <SessionProvider>
          <PlayChromeGuard header={<Header />} footer={<Footer />}>
            {children}
          </PlayChromeGuard>
        </SessionProvider>
      </body>
    </html>
  );
}
