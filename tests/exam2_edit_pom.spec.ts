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
  // 課題2-1: 担当者フィルター（TaskPage に追加）
  // ────────────────────────────────────────────
  test('担当者フィルターで「田中」を選択するとタスクが絞り込まれる', async ({ page }) => {
    const taskPage = new TaskPage(page);

    // 全件表示を確認
    const totalCount = await taskPage.getTaskCount();
    expect(totalCount).toBeGreaterThan(1);

    // TODO: TaskPage.filterByAssignee('田中') を呼び出す
    // 田中のタスクのみに絞られることを確認する
    // ヒント: 担当者「田中」のタスクはデフォルトデータに2件含まれる
  });

  // ────────────────────────────────────────────
  // 課題2-2: 担当者取得メソッド（TaskPage に追加）
  // ────────────────────────────────────────────
  test('タスクの担当者名を取得できる', async ({ page }) => {
    const taskPage = new TaskPage(page);

    // TODO: TaskPage.getTaskAssignee(1) を呼び出し、「田中」であることを確認する
  });

  // ────────────────────────────────────────────
  // 課題2-3: メモ取得メソッド（TaskPage に追加）
  // ────────────────────────────────────────────
  test('タスクのメモを取得できる', async ({ page }) => {
    const taskPage = new TaskPage(page);

    // TODO: タスクID=1 のメモが「Node.js 18以上が必要」であることを確認する
  });

  // ────────────────────────────────────────────
  // 課題2-4: レビュー中ステータス（TaskModal に修正）
  // ────────────────────────────────────────────
  test('ステータスを「レビュー中」に設定してタスクを追加できる', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('レビュー待ちタスク');

    // TODO: TaskModal.selectStatus('review') を呼び出す（型も修正すること）
    await taskModal.save();

    // 追加されたタスクのステータスが「レビュー中」であることを確認
    // ヒント: 追加後は先頭に表示される
    const statusText = await taskPage.getTaskStatus(/* 追加されたタスクのID */7);
    expect(statusText).toBe('レビュー中');
  });

  // ────────────────────────────────────────────
  // 課題2-5: 担当者・メモ付きでタスクを追加（TaskModal に追加）
  // ────────────────────────────────────────────
  test('担当者・メモを入力してタスクを追加できる', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('担当者付きタスク');

    // TODO: selectAssignee('鈴木') を呼び出す
    // TODO: fillMemo('テスト用メモです') を呼び出す
    await taskModal.save();

    // 追加されたタスクのメモが表示されていることを確認
    // TODO: getTaskMemo で内容を確認する
  });

  // ────────────────────────────────────────────
  // 課題2-6: 下書き保存（TaskModal に追加）
  // ────────────────────────────────────────────
  test('下書き保存するとステータスが「未着手」でタスクが追加される', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('下書きタスク');
    await taskModal.selectStatus('doing');

    // TODO: TaskModal.saveDraft() を呼び出す
    // 下書き保存ではステータスが強制的に「未着手」になる仕様

    // 追加されたタスクのステータスが「未着手」であることを確認
    // TODO: getTaskStatus で確認する
  });

  // ────────────────────────────────────────────
  // 課題2-7: バリデーション（既存の確認）
  // ────────────────────────────────────────────
  test('タスク名を空のまま保存するとエラーが表示される', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    await taskPage.addTaskButton.click();
    await taskModal.save();

    expect(await taskModal.isTitleErrorVisible()).toBe(true);
  });

});
