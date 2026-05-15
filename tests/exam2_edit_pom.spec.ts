import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TaskPage } from '../pages/TaskPage';
import { TaskModal } from '../pages/TaskModal';

test.describe('②POM編集課題', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
  });

  // ────────────────────────────────────────────
  // 課題2-1: 担当者フィルター・担当者名取得・メモ取得
  // TaskPage に filterByAssignee / getTaskAssignee / getTaskMemo を追加して使う
  //
  // ※ test.fixme() はテストを「未実装」としてスキップする機能です。
  //   実装が完了したら test.fixme → test に書き換えてテストを有効にしてください。
  // ────────────────────────────────────────────
  test('担当者フィルターで「田中」を選択すると絞り込まれ、担当者名・メモが取得できる', async ({ page }) => {
    // Arrange
    const taskPage = new TaskPage(page);
    const totalCount = await taskPage.getTaskCount();

    // Act
    await taskPage.filterByAssignee('田中');
    const filteredCount = await taskPage.getTaskCount();
    const assignee = await taskPage.getTaskAssignee(1);
    const memo = await taskPage.getTaskMemo(1);

    // Assert
    expect(filteredCount).toBeLessThan(totalCount);
    expect(assignee).toContain('田中');
    expect(memo).toContain('Node.js 18以上が必要');
  });

  // ────────────────────────────────────────────
  // 課題2-2: 担当者・メモ・ステータス（レビュー中）を設定してタスク追加
  // TaskModal に selectAssignee / fillMemo を追加し、selectStatus の型に 'review' を追加して使う
  // ────────────────────────────────────────────
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
    const status = await taskPage.getTaskStatus(7);
    const memo = await taskPage.getTaskMemo(7);
    expect(status).toContain('レビュー中');
    expect(memo).toContain('レビュー用メモ');
  });

  // ────────────────────────────────────────────
  // 課題2-3: 下書き保存（TaskModal に saveDraft を追加して使う）
  // ────────────────────────────────────────────
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
    expect(status).toContain('未着手');
  });

});
