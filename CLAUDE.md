# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** project with JavaScript (no TypeScript) and Tailwind CSS v4.

**Key conventions:**
- All routes live under `app/` using the App Router file convention (`page.js`, `layout.js`, `loading.js`, etc.)
- `app/layout.js` is the root layout — it sets global fonts (Geist via `next/font/google`) and wraps all pages
- Styling is done exclusively with Tailwind CSS v4, configured via `@tailwindcss/postcss` (PostCSS plugin, not a Tailwind config file)
- No `src/` directory — route files sit directly under `app/`
- Path alias `@/*` maps to the project root

**Tailwind v4 note:** There is no `tailwind.config.js`. Configuration is handled through `postcss.config.mjs` and CSS `@theme` directives in `globals.css`.

---

## ツムツムアプリ 要件定義

### プロダクトビジョン

モダンで先進的なUI/UXを持つブラウザ上で動作するツムツム風パズルゲーム。スマートフォン・PC両対応のレスポンシブデザイン。Next.js App Router上でクライアントサイドのゲームロジックとして実装する。

---

### ゲームルール

- 盤面に丸いキャラクターアイコン（ツム）がランダムに配置される
- 同じ種類のツムを3個以上なぞって繋げると消去できる
- 消去したツムの上から新しいツムが落下して盤面を補充する
- 制限時間60秒以内にできるだけ多くのスコアを稼ぐ
- 一度に繋げる数が多いほど、スコア倍率が上がる
- フィーバーモード：短時間に一定数を消すと突入し、スコア2倍

---

### スコアリング

| 消去数 | 倍率 |
|--------|------|
| 3〜4個 | ×1 |
| 5〜8個 | ×2 |
| 9〜12個 | ×3 |
| 13個以上 | ×5 |

- コンボボーナス：連続消去のたびにコンボカウントが増加し、スコアに加算
- フィーバー中は全スコア×2

---

### ツムの種類

最低5種類のツムを用意する。各ツムはCSS/SVGで描画し、外部画像に依存しない。

| ツム名 | 色 | 特殊スキル |
|--------|-----|-----------|
| ハート | ピンク | なし（基本） |
| スター | イエロー | なし（基本） |
| ムーン | ブルー | なし（基本） |
| サン | オレンジ | なし（基本） |
| クラウン | パープル | スキル発動可能 |

スキルはフィーバーゲージを一定量満たすことで発動し、盤面のランダム範囲を一括消去する。

---

### 画面構成

```
┌─────────────────────────┐
│  スコア表示  残り時間   │  ← ヘッダーUI
│  コンボ数   フィーバーゲージ │
├─────────────────────────┤
│                         │
│   ゲーム盤面 (8×10グリッド)  │  ← メインエリア
│   (ツムをなぞって繋げる)    │
│                         │
├─────────────────────────┤
│  スキルボタン            │  ← フッターUI
└─────────────────────────┘
```

- 盤面サイズ：8列×10行（モバイルでは7列×9行）
- タッチ・マウス両対応のなぞり入力

---

### UI/UXデザイン方針

- **カラーテーマ：** ディープネイビー背景 + グラデーションのグロウエフェクト
- **アニメーション：** CSS keyframes / Web Animations API でなめらかな消去・落下エフェクト
- **フォント：** ゲームらしい丸みのある日本語フォント（Google Fonts: Zen Maru Gothic）
- **エフェクト：** ツム消去時のパーティクル、フィーバー時の画面演出（グロウ・バイブレーション）
- **サウンド：** Web Audio API による効果音（消去音・フィーバー音・タイムアップ音）
- **ハイスコア：** localStorage に保存・表示

---

### 技術実装方針

| 項目 | 方針 |
|------|------|
| ゲーム状態管理 | `useReducer` + `useContext` でグローバルなゲームステートを管理 |
| 盤面描画 | CSS Grid + absolute positioning、Canvasは使わない |
| なぞり検出 | `onPointerDown / onPointerMove / onPointerUp` で統一（タッチ・マウス共通） |
| 落下アニメーション | CSS `@keyframes` + `transform: translateY` |
| タイマー | `useRef` + `setInterval`、アンマウント時にクリア |
| ルーティング | `/`（ゲーム画面）、`/result`（リザルト画面）の2ページ |

### ディレクトリ構成（予定）

```
app/
  page.js          # ゲーム画面
  result/
    page.js        # リザルト画面
  layout.js        # フォント・グローバルスタイル
components/
  game/
    Board.js       # 盤面グリッド
    Tsum.js        # ツム1個のコンポーネント
    HUD.js         # スコア・タイマー・フィーバーゲージ
    SkillButton.js # スキルボタン
  ui/
    FeverOverlay.js  # フィーバー演出
    ResultModal.js   # ゲーム終了モーダル
lib/
  gameReducer.js   # ゲームロジック（純粋関数）
  tsumUtils.js     # 繋がり判定・消去ロジック
  scoring.js       # スコア計算
  constants.js     # ツム種類・盤面サイズ等の定数
```
