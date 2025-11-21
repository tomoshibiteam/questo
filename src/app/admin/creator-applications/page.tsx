import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function updateStatus(id: string, status: "approved" | "denied") {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }
  const app = await prisma.creatorApplication.update({
    where: { id },
    data: { status },
  });
  if (status === "approved") {
    await prisma.user.update({
      where: { id: app.userId },
      data: { role: "creator" },
    });
  }
  redirect("/admin/creator-applications");
}

export default async function AdminCreatorApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const apps = await prisma.creatorApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-4">
      <h1 className="text-3xl font-semibold text-slate-900">クリエイター申請一覧</h1>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">表示名</th>
              <th className="px-4 py-3">メール</th>
              <th className="px-4 py-3">エリア</th>
              <th className="px-4 py-3">課題</th>
              <th className="px-4 py-3">ステータス</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apps.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-3">{app.displayName}</td>
                <td className="px-4 py-3">{app.user.email}</td>
                <td className="px-4 py-3">{app.area}</td>
                <td className="px-4 py-3">{app.socialIssues}</td>
                <td className="px-4 py-3 font-semibold">{app.status}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 text-xs">
                    <form action={async () => updateStatus(app.id, "approved")}>
                      <button className="rounded-lg bg-emerald-600 px-3 py-1 font-semibold text-white">
                        承認
                      </button>
                    </form>
                    <form action={async () => updateStatus(app.id, "denied")}>
                      <button className="rounded-lg bg-slate-200 px-3 py-1 font-semibold text-slate-800">
                        却下
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-sm text-slate-600" colSpan={6}>
                  申請はまだありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
