import SectionHeading from "@/components/SectionHeading";
import { ShieldCheckIcon, UsersIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

type Props = {
  stats: {
    totalUsers: number;
    totalQuests: number;
    totalPlaySessions: number;
    totalMissions: number;
    totalCities: number;
  };
};

export default function ImpactSection({ stats }: Props) {
  const items = [
    { label: "公開クエスト", value: `${stats.totalQuests}件`, icon: ShieldCheckIcon },
    { label: "登録ユーザー", value: `${stats.totalUsers}人`, icon: UsersIcon },
    { label: "参加都市", value: `${stats.totalCities}都市`, icon: GlobeAltIcon },
  ];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16">
        <SectionHeading
          eyebrow="IMPACT"
          title="TOMOSHIBIのひろがり"
          description="プレイヤー・クリエイター・街の数が増えるほど、シティトレイルとしての世界は広がっていきます。数字はまだ小さいですが、一つひとつのクエストに、しっかりとした物語とローカルの熱量を込めて育てていきます。"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
