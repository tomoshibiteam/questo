"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdmin } from "@/app/admin/actions";

const initialState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "認証中..." : "入室する"}
    </button>
  );
}

export default function AdminLogin() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm"
    >
      <div>
        <p className="text-sm font-semibold text-slate-800">
          管理用パスワードを入力
        </p>
        <p className="text-xs text-slate-500">
          `.env` の ADMIN_PASSWORD と照合します。ブラウザにはクッキーで保存します。
        </p>
      </div>
      <input
        type="password"
        name="password"
        required
        placeholder="ADMIN_PASSWORD"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-inner outline-none ring-emerald-200 focus:ring"
      />
      {state?.error && (
        <p className="text-sm font-semibold text-red-600">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
