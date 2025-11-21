"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "questo-admin";

type LoginState = {
  error?: string;
};

export async function loginAdmin(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState | void> {
  "use server";
  const password = formData.get("password")?.toString() ?? "";
  const expected =
    process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

  if (!expected) {
    return { error: "ADMIN_PASSWORD が設定されていません。" };
  }
  if (password !== expected) {
    return { error: "パスワードが違います。" };
  }

  cookies().set(ADMIN_COOKIE, "true", {
    path: "/admin",
    httpOnly: true,
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  "use server";
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function isAuthed(): Promise<boolean> {
  return cookies().get(ADMIN_COOKIE)?.value === "true";
}
