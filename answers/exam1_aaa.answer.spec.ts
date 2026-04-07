import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ReportPage } from '../pages/ReportPage';

test.describe('①AAA設計課題：レポートページ 【想定回答】', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange共通：ログイン＋レポートページ遷移
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
    const reportPage = new ReportPage(page);
    await reportPage.navigate();
  });

  test('担当者「田中」で絞り込むとテーブルが2件になる', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);
    await reportPage.filterByPeriod('all');

    // Act
    await reportPage.filterByAssignee('田中');

    // Assert
    const rowCount = await reportPage.getReportRowCount();
    expect(rowCount).toBe(2);
  });

  test('集計カードの「総タスク数」がテーブルの行数と一致する', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);
    await reportPage.filterByPeriod('all');

    // Act（操作なし — 表示内容の整合性確認）

    // Assert
    const stats = await reportPage.getStatValues();
    const rowCount = await reportPage.getReportRowCount();
    expect(stats[0]).toBe(rowCount);
  });

  test('エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);

    // Act
    await reportPage.exportReport();

    // Assert
    await expect(page.getByRole('status')).toHaveText('エクスポートしました（CSV）');
  });

});
