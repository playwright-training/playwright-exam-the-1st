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
  // 実装したら test.fixme → test に書き換えてください
  // ────────────────────────────────────────────
  test.fixme('担当者フィルターで「田中」を選択すると絞り込まれ、担当者名・メモが取得できる', async ({ page }) => {
    const taskPage = new TaskPage(page);

    // 全件数を取得
    const totalCount = await taskPage.getTaskCount();

    // TODO: TaskPage.filterByAssignee('田中') を呼び出す
    // TODO: 絞り込み後の件数が全件より少ないことを確認する
    // TODO: TaskPage.getTaskAssignee(1) で担当者名が「田中」であることを確認する
    // TODO: TaskPage.getTaskMemo(1) でメモに「Node.js 18以上が必要」が含まれることを確認する
  });

  // ────────────────────────────────────────────
  // 課題2-2: 担当者・メモ・ステータス（レビュー中）を設定してタスク追加
  // TaskModal に selectAssignee / fillMemo を追加し、selectStatus の型に 'review' を追加して使う
  // ────────────────────────────────────────────
  test.fixme('担当者・メモ・ステータス（レビュー中）を設定してタスクを追加できる', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('レビュー確認タスク');

    // TODO: TaskModal.selectStatus('review') を呼び出す（型も修正すること）
    // TODO: TaskModal.selectAssignee('鈴木') を呼び出す
    // TODO: TaskModal.fillMemo('レビュー用メモ') を呼び出す
    await taskModal.save();

    // TODO: 追加されたタスクのステータスが「レビュー中」であることを確認する
    // TODO: 追加されたタスクのメモに「レビュー用メモ」が含まれることを確認する
    // ヒント: 追加後のタスクIDは 7 になる
  });

  // ────────────────────────────────────────────
  // 課題2-3: 下書き保存（TaskModal に saveDraft を追加して使う）
  // ────────────────────────────────────────────
  test.fixme('下書き保存するとステータスが「未着手」でタスクが追加される', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);

    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('下書きタスク');
    await taskModal.selectStatus('doing');

    // TODO: TaskModal.saveDraft() を呼び出す
    // 下書き保存ではステータスが強制的に「未着手」になる仕様

    // TODO: 追加されたタスクのステータスが「未着手」であることを確認する
    // ヒント: 追加後のタスクIDは 7 になる
  });

});
