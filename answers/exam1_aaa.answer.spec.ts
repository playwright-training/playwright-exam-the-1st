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

  test('全期間・全担当者でレポートテーブルに6件表示される', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);
    await reportPage.filterByPeriod('all');

    // Act（操作なし — 初期状態の確認）

    // Assert
    const rowCount = await reportPage.getReportRowCount();
    expect(rowCount).toBe(6);
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

  test('期間「今週」で絞り込むとテーブルの件数が減る', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);
    await reportPage.filterByPeriod('all');
    const allCount = await reportPage.getReportRowCount();

    // Act
    await reportPage.filterByPeriod('week');

    // Assert
    const weekCount = await reportPage.getReportRowCount();
    expect(weekCount).toBeLessThan(allCount);
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

  test('期間「今週」＋担当者「佐藤」で絞り込める', async ({ page }) => {
    // Arrange
    const reportPage = new ReportPage(page);

    // Act
    await reportPage.filterByPeriod('week');
    await reportPage.filterByAssignee('佐藤');

    // Assert
    const rowCount = await reportPage.getReportRowCount();
    expect(rowCount).toBe(1);
  });

});
