export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-8">
      <h1 className="text-3xl font-bold text-slate-900">TOMOSHIBIとは</h1>
      <p className="mt-3 text-sm text-slate-700">
        TOMOSHIBI は、Questo 型の city puzzle trail に地域の社会課題ミッションを組み込む、日本発のプラットフォームです。
        街を歩き、物語を追い、ミッションに参加することで、楽しみながら社会を少し良くします。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: "ミッション", text: "街と人をつなぎ、社会課題に光を当てる体験を届ける。" },
          { title: "ビジョン", text: "街歩きが社会貢献につながる当たり前を作る。" },
          { title: "チーム", text: "プロダクト・クリエイター・地域コーディネーターで運営（ダミー）。" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/60 p-5 shadow-sm">
        <h3 className="text-lg font-bold text-amber-900">SPR探偵事務所について</h3>
        <p className="mt-2 text-sm text-amber-900">
          ミステリー仕立てのブランドコラボで、街の物語性を高める演出を提供します。
        </p>
      </div>
    </div>
  );
}
