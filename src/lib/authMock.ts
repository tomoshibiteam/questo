import { UserProfile, UserRole } from "@/types/content";

// 簡易的なモック認証。環境変数 NEXT_PUBLIC_MOCK_ROLE を使ってロールを切り替え可能。
const roleFromEnv = (process.env.NEXT_PUBLIC_MOCK_ROLE as UserRole) || "creator";

const mockUsers: Record<UserRole, UserProfile> = {
  user: {
    id: "user-1",
    name: "一般ユーザー",
    email: "user@example.com",
    role: "user",
  },
  creator: {
    id: "creator-1",
    name: "クリエイター山田",
    email: "creator@example.com",
    role: "creator",
  },
  admin: {
    id: "admin-1",
    name: "Admin佐藤",
    email: "admin@example.com",
    role: "admin",
  },
};

export function getCurrentUser(): UserProfile {
  return mockUsers[roleFromEnv] ?? mockUsers.user;
}

export function isCreator(user: UserProfile) {
  return user.role === "creator" || user.role === "admin";
}

export function isAdmin(user: UserProfile) {
  return user.role === "admin";
}
