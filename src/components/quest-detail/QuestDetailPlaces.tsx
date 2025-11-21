import Image from "next/image";

type Place = {
  name: string;
  description: string;
  image: string;
};

type Props = {
  places: Place[];
};

export default function QuestDetailPlaces({ places }: Props) {
  if (places.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">立ち寄るスポット</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {places.map((place) => (
          <div
            key={place.name}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            <Image
              src={place.image}
              alt={place.name}
              width={800}
              height={400}
              className="h-40 w-full object-cover"
            />
            <div className="space-y-1 p-4">
              <h3 className="text-base font-semibold text-slate-900">
                {place.name}
              </h3>
              <p className="text-sm text-slate-600">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
