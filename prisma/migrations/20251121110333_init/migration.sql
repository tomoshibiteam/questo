-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'creator', 'admin');

-- CreateEnum
CREATE TYPE "CreatorApplicationStatus" AS ENUM ('pending', 'approved', 'denied');

-- CreateEnum
CREATE TYPE "QuestStatus" AS ENUM ('draft', 'pending_review', 'published', 'archived', 'rejected');

-- CreateEnum
CREATE TYPE "QuestTheme" AS ENUM ('tourism', 'social_issue', 'environment', 'education', 'other');

-- CreateEnum
CREATE TYPE "AnswerType" AS ENUM ('exact', 'case_insensitive', 'number');

-- CreateEnum
CREATE TYPE "MissionType" AS ENUM ('cleanup', 'shop_visit', 'quiz', 'ngo_info', 'other');

-- CreateEnum
CREATE TYPE "PlayStatus" AS ENUM ('in_progress', 'completed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "concept" TEXT NOT NULL,
    "socialIssues" TEXT NOT NULL,
    "status" "CreatorApplicationStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreatorApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "city" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "theme" "QuestTheme" NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL,
    "recommendedPlayers" TEXT,
    "minAge" TEXT,
    "brand" TEXT,
    "status" "QuestStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestStep" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "placeName" TEXT NOT NULL,
    "placeDescription" TEXT NOT NULL,
    "storyText" TEXT NOT NULL,
    "puzzleText" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "answerType" "AnswerType" NOT NULL DEFAULT 'exact',
    "hint1" TEXT,
    "hint2" TEXT,

    CONSTRAINT "QuestStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "stepId" TEXT,
    "type" "MissionType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impactPoints" INTEGER NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaySession" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "questId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" "PlayStatus" NOT NULL DEFAULT 'in_progress',

    CONSTRAINT "PlaySession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_slug_key" ON "Quest"("slug");

-- AddForeignKey
ALTER TABLE "CreatorApplication" ADD CONSTRAINT "CreatorApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "QuestStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaySession" ADD CONSTRAINT "PlaySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaySession" ADD CONSTRAINT "PlaySession_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
