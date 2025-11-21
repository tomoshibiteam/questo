import Image from "next/image";

type Props = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

export default function QuestDetailCreator({
  name,
  role,
  bio,
  avatar = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
}: Props) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        このクエストを作った人
      </h2>
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{bio}</p>
    </section>
  );
}
