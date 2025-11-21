import SectionHeading from "@/components/SectionHeading";
import CityCard from "@/components/cards/CityCard";

type CityStat = {
  name: string;
  count: number;
};

export default function CitiesSection({ cities }: { cities: CityStat[] }) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16">
        <SectionHeading
          eyebrow="CITIES"
          title="どの街で、冒険する？"
          description="現在公開中のシティトレイルはまだ少ないですが、順次ひろがっていきます。まずはパイロットエリアから、実験的なクエストをお届けします。"
        />
        <div className="mt-6 grid gap-4 overflow-x-auto pb-2 md:auto-rows-fr md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-full flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
            {cities.length > 0 ? (
              cities.map((city) => (
                <div key={city.name} className="min-w-[240px] flex-1">
                  <CityCard city={city} />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">
                公開中のクエストはまだありません。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
