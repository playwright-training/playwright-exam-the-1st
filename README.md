# TaskFlow Playwright 実技試験

## リポジトリ構成

```
playwright-exam/
├── pages/                        # Page Object Models
│   ├── LoginPage.ts              # 【提供済み】触らない
│   ├── ReportPage.ts             # 【提供済み】触らない（課題①で使用）
│   ├── TaskPage.ts               # 【②編集課題】担当者・メモ・下書き対応
│   └── TaskModal.ts              # 【②編集課題】新フィールド・ボタン対応
│
├── tests/
│   ├── exam1_aaa.spec.ts         # 【①AAA課題】テストファイル（受験者が実装）
│   ├── exam2_edit_pom.spec.ts    # 【②編集課題】テストファイル（受験者が実装）
│   └── exam3_new_pom.spec.ts     # 【③作成課題】テストファイル（受験者が実装）
│
└── public/
    └── index.html                # テスト対象サイト
```

## セットアップ

```bash
npm install
npx playwright install chromium
```

## テスト対象サイト

試験用サイトは以下のURLでホストされています：

**URL**: https://playwright-exam-site.web.app

ローカルで確認する場合は `public/index.html` を配信してください：

```bash
cd public && python3 -m http.server 3000
# → http://localhost:3000 でアクセス
```

ローカルサーバーで実行する場合は環境変数を設定してください：

```bash
BASE_URL=http://localhost:3000 npx playwright test
```

## テスト実行

```bash
# 全テスト
npx playwright test

# 課題①のみ（AAA設計）
npx playwright test exam1

# 課題②のみ（POM編集）
npx playwright test exam2

# 課題③のみ（POM新規作成）
npx playwright test exam3

# UIモード（デバッグ用）
npx playwright test --ui
```

## テスト用アカウント

| 項目 | 値 |
|------|-----|
| ユーザー名 | `admin` |
| パスワード | `password` |

## 課題概要

### ① AAA設計課題（`exam1_aaa.spec.ts`）

提供済みの `ReportPage.ts` を使い、レポートページのテストを **AAAパターン**（Arrange-Act-Assert）で作成してください。POMの編集は不要です。

**ポイント**：
- `beforeEach` に共通のArrange処理をまとめる
- 1テストにつき操作の目的を1つに絞る
- Arrange / Act / Assert が明確に分離されている

### ② POM編集課題（`exam2_edit_pom.spec.ts`）

既存の `TaskPage.ts` と `TaskModal.ts` に、サイトの仕様（担当者フィルター・メモ欄・下書き保存・レビュー中ステータス）への対応を追加し、テストを完成させてください。

**ポイント**：
- POMファイル内の `TODO` コメントに従う
- テスト内で `page.getByTestId(...)` を直接使わず、POM経由で操作する

### ③ POM新規作成課題（`exam3_new_pom.spec.ts`）

`NotificationPage.ts` と `PasswordPage.ts` を **新規作成** し、テストを完成させてください。`LoginPage.ts` を参考にしてPOMの構造を理解した上で実装すること。

**ポイント**：
- `LoginPage.ts` と同じ構造（constructor でlocator初期化、メソッドで操作を分離）
- `changePassword(current, new, confirm)` のような複合操作メソッドを作る

## 試験の進め方

1. 試験開始前に招待されたリポジトリをクローンしてください
2. クローンしたディレクトリに移動してください
3. 自分の名前でブランチを作成してください（例: `exam/田中`）
4. 依存パッケージとブラウザをインストールしてください
5. テスト対象サイトにブラウザでアクセスし、画面の動きを確認してください
6. 課題①→②→③の順に実装してください。各テストファイルとPOMファイル内のTODOコメントが実装のガイドになっています
7. 全テストがパスすることを確認してください
8. 変更をコミットし、自分のブランチをプッシュして提出してください
