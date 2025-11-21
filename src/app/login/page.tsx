"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    });
    if (res?.error) {
      setError("メールまたはパスワードが違います。");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-12 pt-12">
      <h1 className="text-2xl font-bold text-slate-900">ログイン</h1>
      <p className="mt-2 text-sm text-slate-700">
        メールアドレスとパスワードを入力してください。認証はダミーで、UIのみの実装です。
      </p>
      <form
        className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm"
        onSubmit={onSubmit}
      >
        <input
          type="email"
          placeholder="メールアドレス"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white"
        >
          ログイン
        </button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm text-emerald-700">
        <a href="/signup" className="underline underline-offset-4">
          新規登録はこちら
        </a>
        <a href="/forgot-password" className="underline underline-offset-4">
          パスワードをお忘れの場合
        </a>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-600">読み込み中...</div>}>
      <LoginForm />
    </Suspense>
  );
}
