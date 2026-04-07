import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TaskPage } from './pages/TaskPage.answer';
import { TaskModal } from './pages/TaskModal.answer';

test.describe('②POM編集課題 【想定回答】', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
  });

  // ── テスト1: filterByAssignee / getTaskAssignee / getTaskMemo を使用 ──
  test('担当者フィルターで「田中」を選択すると絞り込まれ、担当者名・メモが取得できる', async ({ page }) => {
    // Arrange
    const taskPage = new TaskPage(page);
    const totalCount = await taskPage.getTaskCount();

    // Act
    await taskPage.filterByAssignee('田中');

    // Assert
    const filteredCount = await taskPage.getTaskCount();
    expect(filteredCount).toBeLessThan(totalCount);

    const assignee = await taskPage.getTaskAssignee(1);
    expect(assignee).toContain('田中');

    const memo = await taskPage.getTaskMemo(1);
    expect(memo).toContain('Node.js 18以上が必要');
  });

  // ── テスト2: selectStatus('review') / selectAssignee / fillMemo を使用 ──
  test('担当者・メモ・ステータス（レビュー中）を設定してタスクを追加できる', async ({ page }) => {
    // Arrange
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    // Act
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('レビュー確認タスク');
    await taskModal.selectStatus('review');
    await taskModal.selectAssignee('鈴木');
    await taskModal.fillMemo('レビュー用メモ');
    await taskModal.save();

    // Assert
    const statusText = await taskPage.getTaskStatus(7);
    expect(statusText).toBe('レビュー中');

    const memo = await taskPage.getTaskMemo(7);
    expect(memo).toContain('レビュー用メモ');
  });

  // ── テスト3: saveDraft を使用 ──
  test('下書き保存するとステータスが「未着手」でタスクが追加される', async ({ page }) => {
    // Arrange
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    // Act
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('下書きタスク');
    await taskModal.selectStatus('doing');
    await taskModal.saveDraft();

    // Assert
    const status = await taskPage.getTaskStatus(7);
    expect(status).toBe('未着手');
  });

});
