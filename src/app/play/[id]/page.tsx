import { redirect } from "next/navigation";

export default async function LegacyPlayRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  // 旧パスはセッションIDに対応していないためトップへ戻す
  redirect("/");
}
