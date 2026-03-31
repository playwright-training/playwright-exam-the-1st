# TaskFlow Playwright 実技試験

## リポジトリ構成

```
taskflow-playwright-exam/
├── README.md
├── package.json
├── playwright.config.ts
│
├── pages/                        # Page Object Models
│   ├── LoginPage.ts              # 【提供済み】触らない
│   ├── TaskPage.ts               # 【①編集課題】担当者・メモ・下書き対応
│   └── TaskModal.ts              # 【①編集課題】新フィールド・ボタン対応
│
├── tests/
│   ├── exam1_edit_pom.spec.ts    # 【①編集課題】テストファイル（受験者が実装）
│   └── exam2_new_pom.spec.ts     # 【②作成課題】テストファイル（受験者が実装）
│
└── answers/                      # 想定回答（試験後に公開）
    ├── pages/
    │   ├── TaskPage.answer.ts
    │   ├── TaskModal.answer.ts
    │   ├── NotificationPage.answer.ts
    │   └── PasswordPage.answer.ts
    ├── exam1_edit_pom.answer.spec.ts
    └── exam2_new_pom.answer.spec.ts
```

## セットアップ

```bash
npm install
npx playwright install chromium
```

## 試験サイトの起動

試験用サイト（HTMLファイル）をブラウザで開くか、ローカルサーバーで配信してください。

```bash
# 例：VS Code Live Server / Python簡易サーバー
python -m http.server 3000
# → http://localhost:3000 でアクセス
```

## テスト実行

```bash
# 全テスト
npx playwright test

# 課題①のみ
npx playwright test exam1

# 課題②のみ
npx playwright test exam2

# UIモード（デバッグ用）
npx playwright test --ui
```

## テスト用アカウント

| 項目 | 値 |
|------|-----|
| URL | http://localhost:3000 |
| ユーザー名 | admin |
| パスワード | password |

## 課題概要

### ① POM編集課題（`exam1_edit_pom.spec.ts`）
既存の `TaskPage.ts` と `TaskModal.ts` にサイトの仕様変更（担当者フィルター・メモ欄・下書き保存・レビュー中ステータス）への対応を加え、テストを完成させる。

### ② POM新規作成課題（`exam2_new_pom.spec.ts`）
`NotificationPage.ts` と `PasswordPage.ts` を新規作成し、テストを完成させる。`LoginPage.ts` を参考にしてPOMの構造を理解した上で実装すること。
