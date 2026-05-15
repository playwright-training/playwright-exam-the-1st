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
  test('担当者フィルターで「田中」を選択すると絞り込まれ、担当者名・メモが取得できる', async ({ page }) => {
    const taskPage = new TaskPage(page);
    const totalCount = await taskPage.getTaskCount();
    await taskPage.filterByAssignee('田中');
    const filteredCount = await taskPage.getTaskCount();
    expect(filteredCount).toBeLessThan(totalCount);
    expect(await taskPage.getTaskAssignee(1)).toContain('田中');
    expect(await taskPage.getTaskMemo(1)).toContain('Node.js 18以上が必要');
  });
  test('担当者・メモ・ステータス（レビュー中）を設定してタスクを追加できる', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('レビュー確認タスク');
    await taskModal.selectStatus('review');
    await taskModal.selectAssignee('鈴木');
    await taskModal.fillMemo('レビュー用メモ');
    await taskModal.save();
    expect(await taskPage.getTaskStatus(7)).toBe('レビュー中');
    expect(await taskPage.getTaskMemo(7)).toContain('レビュー用メモ');
  });

  test('下書き保存するとステータスが「未着手」でタスクが追加される', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('下書きタスク');
    await taskModal.selectStatus('doing');
    await taskModal.saveDraft();
    expect(await taskPage.getTaskStatus(7)).toBe('未着手');
  });
});