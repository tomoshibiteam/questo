"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("パスワードが一致しません。");
      return;
    }
    if (form.password.length < 6) {
      setError("パスワードは6文字以上で入力してください。");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "登録に失敗しました");
      setLoading(false);
      return;
    }
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-12 pt-12">
      <h1 className="text-2xl font-bold text-slate-900">新規登録</h1>
      <p className="mt-2 text-sm text-slate-700">
        メールとパスワードでアカウントを作成します。
      </p>
      <form
        className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm"
        onSubmit={submit}
      >
        <input
          type="text"
          placeholder="お名前"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="パスワード（6文字以上）"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="パスワード（確認用）"
          value={form.confirm}
          onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "登録中..." : "登録する"}
        </button>
      </form>
      <div className="mt-4 text-sm text-emerald-700">
        <a href="/login" className="underline underline-offset-4">
          すでにアカウントをお持ちの方はこちら
        </a>
      </div>
    </div>
  );
}
