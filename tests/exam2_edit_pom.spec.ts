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
    const taskPage = new TaskPage(page);
 
    // Arrange: 全件数を取得
    const totalCount = await taskPage.getTaskCount();
 
    // Act: 担当者「田中」でフィルター
    await taskPage.filterByAssignee('田中');
 
    // Assert: 絞り込み後の件数が全件より少ないことを確認
    const filteredCount = await taskPage.getTaskCount();
    expect(filteredCount).toBeLessThan(totalCount);
 
    // Assert: タスクID=1の担当者名に「田中」が含まれることを確認（絵文字付きテキスト）
    const assignee = await taskPage.getTaskAssignee(1);
    expect(assignee).toContain('田中');
 
    // Assert: タスクID=1のメモに「Node.js 18以上が必要」が含まれることを確認（絵文字付きテキスト）
    const memo = await taskPage.getTaskMemo(1);
    expect(memo).toContain('Node.js 18以上が必要');
  });

  // ────────────────────────────────────────────
  // 課題2-2: 担当者・メモ・ステータス（レビュー中）を設定してタスク追加
  // TaskModal に selectAssignee / fillMemo を追加し、selectStatus の型に 'review' を追加して使う
  // ────────────────────────────────────────────
  test('担当者・メモ・ステータス（レビュー中）を設定してタスクを追加できる', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);
 
    // Arrange: モーダルを開いてタスク情報を入力
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('レビュー確認タスク');
    await taskModal.selectStatus('review');
    await taskModal.selectAssignee('鈴木');
    await taskModal.fillMemo('レビュー用メモ');
 
    // Act: 保存
    await taskModal.save();
 
    // Assert: 追加されたタスク（ID=8）のステータスが「レビュー中」であることを確認
    const status = await taskPage.getTaskStatus(7);
    expect(status).toBe('レビュー中');
 
    // Assert: 追加されたタスクのメモに「レビュー用メモ」が含まれることを確認（絵文字付きテキスト）
    const memo = await taskPage.getTaskMemo(7);
    expect(memo).toContain('レビュー用メモ');
  });

  // ────────────────────────────────────────────
  // 課題2-3: 下書き保存（TaskModal に saveDraft を追加して使う）
  // ────────────────────────────────────────────
  test('下書き保存するとステータスが「未着手」でタスクが追加される', async ({ page }) => {
    const taskPage  = new TaskPage(page);
    const taskModal = new TaskModal(page);
 
    // Arrange: モーダルを開いてタイトルとステータスを入力
    await taskPage.addTaskButton.click();
    await taskModal.fillTitle('下書きタスク');
    await taskModal.selectStatus('doing');
 
    // Act: 下書き保存（ステータスは強制的に「未着手」になる仕様）
    await taskModal.saveDraft();
 
    // Assert: 追加されたタスク（ID=8）のステータスが「未着手」であることを確認
    const status = await taskPage.getTaskStatus(7);
    expect(status).toBe('未着手');
  });

});
