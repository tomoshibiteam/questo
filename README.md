# Questo Web プロトタイプ

街歩き × 謎解きアプリ「Questo」の動くモック (Web 版) です。  
プレイヤーはスマホブラウザでクエストを選び、ストーリーと謎を順に解き進めます。クリエイター / 運営は管理画面からクエストとステップを登録できます。

## 主要機能
- プレイヤー: クエスト一覧 → 詳細 → プレイ (ストーリー / 謎 / マップ / ヒント / 解答)。
- 進行状態: クエストごとに現在ステップとヒント使用数を localStorage に保存。
- 管理: `/admin` 配下で一覧・新規作成・編集、ステップ編集。簡易パスワードゲート (`ADMIN_PASSWORD`)。
- データ: Supabase 接続があれば CRUD、ない場合はダミーデータでデモ表示。
- マップ: Leaflet + OpenStreetMap でステップの位置をピン表示。

## 技術スタック
- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS (v4) でモバイルファースト UI
- supabase-js (PostgREST) / local ダミーデータ
- react-leaflet + Leaflet

## セットアップ
```bash
npm install
npm run dev
# http://localhost:3000
```

### 環境変数 (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ADMIN_PASSWORD=your-password
```

### Supabase テーブル例 (SQL)
```sql
create table quests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  city text,
  summary text,
  theme text,
  estimated_duration_min int,
  estimated_distance_km float,
  difficulty int,
  created_at timestamp with time zone default now()
);

create table quest_steps (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid references quests(id) on delete cascade,
  "order" int,
  lat float,
  lng float,
  location_hint text,
  story_text text,
  puzzle_text text,
  answer text,
  hint_text text,
  created_at timestamp with time zone default now()
);
```

## デモデータ
- 「二色浜ビーチクリーン探偵ゲーム」を同梱。Supabase 未設定でもプレイ確認できます。

## ディレクトリ
- `src/app` … App Router (`/` プレイヤー, `/quests/[id]`, `/play/[id]`, `/admin/*`)
- `components` … UI パーツ (カード、フォーム、マップ、進行 UI)
- `lib` … Supabase クライアント、リポジトリ、localStorage ユーティリティ、ダミーデータ
- `types` … 型定義

## 想定ワークフロー
1. ダミーデータで一覧・プレイの UX を確認
2. Supabase を用意し環境変数を設定 → CRUD/管理画面で登録・更新
3. Vercel へデプロイして運用をイメージ

