import HeroSection from "@/components/home/HeroSection";
import ValueSection from "@/components/home/ValueSection";
import CitiesSection from "@/components/home/CitiesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ImpactSection from "@/components/home/ImpactSection";
import EventsSection from "@/components/home/EventsSection";
import ClosingCtaSection from "@/components/home/ClosingCtaSection";
import { getPublishedQuests, getStats } from "@/lib/queries";
import PageGrid from "@/components/PageGrid";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroSectionWrapper />
      <ValueSection />
      <CitiesSectionWrapper />
      <HowItWorksSection />
      <ImpactSectionWrapper />
      <EventsSection />
      <ClosingCtaSection />
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <PageGrid />
      </div>
    </div>
  );
}

async function HeroSectionWrapper() {
  const quests = await getPublishedQuests(4);
  const stats = await getStats();
  return <HeroSection featured={quests} stats={stats} />;
}

async function CitiesSectionWrapper() {
  const quests = await getPublishedQuests();
  const cityCounts = quests.reduce<Record<string, number>>((acc, q) => {
    acc[q.city] = (acc[q.city] || 0) + 1;
    return acc;
  }, {});
  const cities = Object.entries(cityCounts).map(([city, count]) => ({
    name: city,
    count,
  }));
  return <CitiesSection cities={cities} />;
}

async function ImpactSectionWrapper() {
  const stats = await getStats();
  return <ImpactSection stats={stats} />;
}
