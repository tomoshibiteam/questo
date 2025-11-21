export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 pb-12 pt-12">
      <h1 className="text-2xl font-bold text-slate-900">パスワードをお忘れの場合</h1>
      <p className="mt-2 text-sm text-slate-700">
        登録済みのメールアドレスを入力してください。リセット用リンクを送る想定のUIです（ダミー）。
      </p>
      <form className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm">
        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <button className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">
          リセットリンクを送信（ダミー）
        </button>
      </form>
      <div className="mt-4 text-sm text-emerald-700">
        <a href="/login" className="underline underline-offset-4">
          ログイン画面へ戻る
        </a>
      </div>
    </div>
  );
}
