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
  test('担当者「田中」で絞り込むとテーブルが2件になる', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);
    await page.getByTestId('report-period').selectOption('all');

    // Act
    await reportPage.filterByAssignee('田中');
    const count = await reportPage.getReportRowCount();

    // Assert
    expect(count).toBe(2);
  });

  // ────────────────────────────────────────────
  // 課題1-2: 集計カードの件数
  // ────────────────────────────────────────────
  test('集計カードの「総タスク数」がテーブルの行数と一致する', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);
    await page.getByTestId('report-period').selectOption('all');

    // Act
    const statValues = await reportPage.getStatValues();
    const rowCount = await reportPage.getReportRowCount();

    // Assert
    expect(statValues[0]).toBe(rowCount);
  });

  // ────────────────────────────────────────────
  // 課題1-3: エクスポートボタン
  // ────────────────────────────────────────────
  test('エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);

    // Act
    await reportPage.exportReport();

    // Assert
    await expect(page.getByRole('status')).toHaveText('エクスポートしました（CSV）');
  });

});
