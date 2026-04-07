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

  test('担当者フィルターで「田中」を選択するとタスクが絞り込まれる', async ({ page }) => {
    // Arrange
    const taskPage = new TaskPage(page);
    const totalCount = await taskPage.getTaskCount();
    expect(totalCount).toBeGreaterThan(1);

    // Act
    await taskPage.filterByAssignee('田中');

    // Assert
    const filteredCount = await taskPage.getTaskCount();
    expect(filteredCount).toBe(2);
    expect(filteredCount).toBeLessThan(totalCount);
  });

  test('タスクの担当者名を取得できる', async ({ page }) => {
    // Arrange
    const taskPage = new TaskPage(page);

    // Act（操作なし — 初期データの確認）

    // Assert
    const assignee = await taskPage.getTaskAssignee(1);
    expect(assignee).toContain('田中');
  });

  test('タスクのメモを取得できる', async ({ page }) => {
    // Arrange
    const taskPage = new TaskPage(page);

    // Act（操作なし — 初期データの確認）

    // Assert
    const memo = await taskPage.getTaskMemo(1);
    expect(memo).toContain('Node.js 18以上が必要');
  });

  test('ステータスを「レビュー中」に設定してタスクを追加できる', async ({ page }) => {
    // Arrange
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    // Act
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('レビュー待ちタスク');
    await taskModal.selectStatus('review');
    await taskModal.save();

    // Assert
    const statusText = await taskPage.getTaskStatus(7);
    expect(statusText).toBe('レビュー中');
  });

  test('担当者・メモを入力してタスクを追加できる', async ({ page }) => {
    // Arrange
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    // Act
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('担当者付きタスク');
    await taskModal.selectAssignee('鈴木');
    await taskModal.fillMemo('テスト用メモです');
    await taskModal.save();

    // Assert
    const memo = await taskPage.getTaskMemo(7);
    expect(memo).toContain('テスト用メモです');
  });

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

  test('タスク名を空のまま保存するとエラーが表示される', async ({ page }) => {
    // Arrange
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    // Act
    await taskPage.addTaskButton.click();
    await taskModal.save();

    // Assert
    expect(await taskModal.isTitleErrorVisible()).toBe(true);
  });

});
