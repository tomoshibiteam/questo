/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for TOMOSHIBI...");
  const hashed = await hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      hashedPassword: hashed,
      role: "admin",
    },
  });

  const creator = await prisma.user.upsert({
    where: { email: "creator@example.com" },
    update: {},
    create: {
      email: "creator@example.com",
      name: "Creator",
      hashedPassword: hashed,
      role: "creator",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "User",
      hashedPassword: hashed,
      role: "user",
    },
  });

  const quest = await prisma.quest.upsert({
    where: { slug: "nishikinohama-clean" },
    update: {},
    create: {
      creatorId: creator.id,
      title: "二色浜ビーチクリーン探偵ゲーム",
      subtitle: "海ごみミステリーを解け",
      city: "大阪・貝塚",
      summary: "二色浜の漂着ごみの謎を追いながらビーチクリーンを体験するクエスト。",
      theme: "environment",
      durationMin: 70,
      distanceKm: 2.5,
      recommendedPlayers: "2-4",
      minAge: "10+",
      priceYen: 2000,
      status: "published",
      slug: "nishikinohama-clean",
      brand: "spr-detective-office",
    },
  });

  const step1 = await prisma.questStep.create({
    data: {
      questId: quest.id,
      order: 1,
      lat: 34.4681,
      lng: 135.3239,
      placeName: "二色浜駅前案内板",
      placeDescription: "スタート地点。浜へのルートを確認しよう。",
      storyText: "探偵ノートに記された最初の手がかりは駅前にある。",
      puzzleText: "案内板の右下にあるマスコットの色は？",
      answer: "みどり",
      answerType: "case_insensitive",
      hint1: "キャラクターをよく見てみよう。",
      hint2: "葉っぱの色。",
    },
  });

  const step2 = await prisma.questStep.create({
    data: {
      questId: quest.id,
      order: 2,
      lat: 34.4659,
      lng: 135.3222,
      placeName: "松林の小径",
      placeDescription: "浜へ向かう途中の松林。静かな小径だ。",
      storyText: "風に揺れる松の音が、次のヒントを教えてくれる。",
      puzzleText: "松林に設置された看板の数字は？",
      answer: "12",
      answerType: "exact",
      hint1: "看板の左下を確認。",
    },
  });

  await prisma.questStep.create({
    data: {
      questId: quest.id,
      order: 3,
      lat: 34.4638,
      lng: 135.3183,
      placeName: "ビーチクリーン集合場所",
      placeDescription: "最後のスポット。ミッションを完了しよう。",
      storyText: "海を守る鍵はここにある。最後の謎を解け。",
      puzzleText: "看板に書かれた「海は〇〇」の〇〇は？",
      answer: "こころ",
      answerType: "case_insensitive",
      hint1: "看板上部の刻印。",
    },
  });

  await prisma.mission.createMany({
    data: [
      {
        questId: quest.id,
        stepId: step2.id,
        type: "cleanup",
        title: "ビーチクリーンミッション",
        description: "目に見えるごみを10個拾い、写真で記録する。",
        impactPoints: 5,
      },
      {
        questId: quest.id,
        stepId: step1.id,
        type: "quiz",
        title: "海ごみクイズ",
        description: "漂着プラの割合を当てるクイズに挑戦。",
        impactPoints: 2,
      },
    ],
  });

  await prisma.playSession.create({
    data: {
      userId: user.id,
      questId: quest.id,
      status: "completed",
      paymentMethod: "mock",
      finishedAt: new Date(),
    },
  });

  console.log("Seed completed: nishikinohama-clean quest ready");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
