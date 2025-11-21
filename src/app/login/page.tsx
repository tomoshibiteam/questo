import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-600">読み込み中...</div>}>
      <LoginForm />
    </Suspense>
  );
}
