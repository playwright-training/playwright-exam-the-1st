import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ReportPage } from '../pages/ReportPage';

test.describe('①AAA設計課題：レポートページ', () => {

  // ────────────────────────────────────────────
  // Arrange共通：ログイン＋レポートページ遷移（実装済み）
  // ────────────────────────────────────────────
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
    const reportPage = new ReportPage(page);
    await reportPage.navigate();
  });

  // ────────────────────────────────────────────
  // 課題1-1: 担当者フィルター
  //
  // ※ test.fixme() はテストを「未実装」としてスキップする機能です。
  //   実装が完了したら test.fixme → test に書き換えてテストを有効にしてください。
  // ────────────────────────────────────────────
  test.fixme('担当者「田中」で絞り込むとテーブルが2件になる', async ({ page }) => {
    // TODO: 日付フィルターをクリアして全期間にした上で、担当者「田中」でフィルターする
    // ヒント: clearDateFilter() で日付フィルターをクリアできる
    // テーブルの行数が2件であることを確認する
  });

  // ────────────────────────────────────────────
  // 課題1-2: 集計カードの件数
  // ────────────────────────────────────────────
  test.fixme('集計カードの「総タスク数」がテーブルの行数と一致する', async ({ page }) => {
    // TODO: 日付フィルターをクリアして全期間にする
    // ヒント: clearDateFilter() で日付フィルターをクリアできる
    // getStatValues() で集計カードの数値を取得する
    // 最初の値（総タスク数）がテーブル行数と一致することを確認する
  });

  // ────────────────────────────────────────────
  // 課題1-3: エクスポートボタン
  // ────────────────────────────────────────────
  test.fixme('エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
    // TODO: exportReport() を呼び出す
    // トーストに「エクスポートしました（CSV）」と表示されることを確認する
    // ヒント: page.getByRole('status') でトースト要素を取得できる
  });

});
