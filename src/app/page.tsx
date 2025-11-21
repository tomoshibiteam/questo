import HeroSection from "@/components/home/HeroSection";
import ValueSection from "@/components/home/ValueSection";
import CitiesSection from "@/components/home/CitiesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ImpactSection from "@/components/home/ImpactSection";
import EventsSection from "@/components/home/EventsSection";
import ClosingCtaSection from "@/components/home/ClosingCtaSection";
import { getPublishedQuests, getStats } from "@/lib/queries";
import PageGrid from "@/components/PageGrid";

export const dynamic = "force-dynamic";

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
  type Stats = Awaited<ReturnType<typeof getStats>>;
  const emptyStats: Stats = {
    totalUsers: 0,
    totalCreators: 0,
    totalQuests: 0,
    publishedQuests: 0,
    totalPlaySessions: 0,
    totalMissions: 0,
    totalCities: 0,
  };
  let quests = [] as Awaited<ReturnType<typeof getPublishedQuests>>;
  let stats: Stats = emptyStats;
  try {
    quests = await getPublishedQuests(4);
    stats = await getStats();
  } catch (error) {
    console.warn("Failed to fetch hero data", error);
  }
  return <HeroSection featured={quests} stats={stats} />;
}

async function CitiesSectionWrapper() {
  let cities: { name: string; count: number }[] = [];
  try {
    const quests = await getPublishedQuests();
    const cityCounts = quests.reduce<Record<string, number>>((acc, q) => {
      acc[q.city] = (acc[q.city] || 0) + 1;
      return acc;
    }, {});
    cities = Object.entries(cityCounts).map(([city, count]) => ({
      name: city,
      count,
    }));
  } catch (error) {
    console.warn("Failed to fetch cities for home", error);
  }
  return <CitiesSection cities={cities} />;
}

async function ImpactSectionWrapper() {
  type Stats = Awaited<ReturnType<typeof getStats>>;
  let stats: Stats = {
    totalUsers: 0,
    totalCreators: 0,
    totalQuests: 0,
    publishedQuests: 0,
    totalPlaySessions: 0,
    totalMissions: 0,
    totalCities: 0,
  };
  try {
    stats = await getStats();
  } catch (error) {
    console.warn("Failed to fetch impact stats", error);
  }
  return <ImpactSection stats={stats} />;
}
