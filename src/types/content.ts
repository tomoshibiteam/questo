export type Country = {
  slug: string;
  name: string;
  cityCount: number;
  questCount: number;
};

export type City = {
  slug: string;
  name: string;
  countrySlug: string;
  description: string;
  questSlugs: string[];
  socialIssueTags: string[];
};

export type QuestTheme =
  | "tourism"
  | "social_issue"
  | "environment"
  | "education";

export type QuestBrand = "spr-detective-office" | null;

export type Quest = {
  slug: string;
  title: string;
  citySlug: string;
  theme: QuestTheme;
  brand: QuestBrand;
  summary: string;
  durationMin: number;
  distanceKm: number;
  difficulty: number;
  socialIssues: string[];
  highlights?: string[];
  story?: string;
  missions?: string[];
  storyLong?: string[];
  places?: {
    name: string;
    description: string;
    image: string;
  }[];
  missionsDetail?: {
    title: string;
    description: string;
    impact: string;
  }[];
};

export type Event = {
  slug: string;
  title: string;
  date: string;
  citySlug: string;
  summary: string;
  detail: string;
};

export type FAQItem = {
  category: "player" | "creator" | "partner";
  question: string;
  answer: string;
};

export type Career = {
  slug: string;
  title: string;
  team: string;
  type: string;
  location: string;
  summary: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime?: string;
};

// --- Creator/Admin/Quest building ---
export type UserRole = "user" | "creator" | "admin";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type CreatorApplicationStatus = "pending" | "approved" | "denied";

export type CreatorApplication = {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  area: string;
  concept: string;
  socialIssues: string;
  status: CreatorApplicationStatus;
  createdAt: string;
};

export type QuestStatus = "draft" | "pending_review" | "published" | "rejected";

export type EditableQuest = {
  id: string;
  title: string;
  city: string;
  status: QuestStatus;
  updatedAt: string;
};
