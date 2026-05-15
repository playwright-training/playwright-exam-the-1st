import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NotificationPage } from '../pages/NotificationPage';
import { PasswordPage } from '../pages/PasswordPage';

test.describe('③POM新規作成課題', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
  });

  // ════════════════════════════════════════════
  // 課題3-1: 通知設定ページ（NotificationPage を新規作成して使う）
  // ════════════════════════════════════════════
  test('通知トグルの初期状態を確認し、変更・保存・リセットできる', async ({ page }) => {
    // Arrange: 通知設定ページに遷移
    const notifPage = new NotificationPage(page);
    await notifPage.navigate();
 
    // Assert: 初期状態を確認（5つのトグル）
    expect(await notifPage.isChecked(notifPage.notifAssign)).toBe(true);
    expect(await notifPage.isChecked(notifPage.notifDue)).toBe(true);
    expect(await notifPage.isChecked(notifPage.notifComment)).toBe(false);
    expect(await notifPage.isChecked(notifPage.notifMention)).toBe(true);
    expect(await notifPage.isChecked(notifPage.notifWeekly)).toBe(false);
 
    // Act: notif-comment をONにして保存
    await notifPage.toggle(notifPage.notifComment);
    await notifPage.save();
 
    // Assert: トーストに「通知設定を保存しました」が表示される
    await expect(page.getByRole('status')).toHaveText('通知設定を保存しました');
 
    // Act: リセットボタンをクリック
    await notifPage.reset();
 
    // Assert: notif-comment が再びOFFになっている
    expect(await notifPage.isChecked(notifPage.notifComment)).toBe(false);
  });

  // ════════════════════════════════════════════
  // 課題3-2: パスワード変更成功（PasswordPage を新規作成して使う）
  // ════════════════════════════════════════════
  test('正しい情報を入力してパスワードを変更できる', async ({ page }) => {
    // Arrange: パスワード変更ページに遷移
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();
 
    // Act: パスワードを変更
    await passwordPage.changePassword('password', 'newPassword1', 'newPassword1');
 
    // Assert: トーストに「パスワードを変更しました」が表示される
    await expect(page.getByRole('status')).toHaveText('パスワードを変更しました');
 
    // Assert: 変更後、入力フィールドがクリアされている
    await expect(passwordPage.currentInput).toHaveValue('');
    await expect(passwordPage.newInput).toHaveValue('');
    await expect(passwordPage.confirmInput).toHaveValue('');
  });

  // ════════════════════════════════════════════
  // 課題3-3: パスワード変更バリデーション
  // ════════════════════════════════════════════
  test('パスワード変更のバリデーションエラーが正しく表示される', async ({ page }) => {
    // Arrange: パスワード変更ページに遷移
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();
 
    // Act: 現在のパスワードが間違っている場合
    await passwordPage.changePassword('wrongpass', 'newPassword1', 'newPassword1');
 
    // Assert: 現在のパスワードが間違っているエラーが表示される
    expect(await passwordPage.isCurrentWrongErrorVisible()).toBe(true);
 
    // Act: キャンセルでフィールドをクリア
    await passwordPage.cancel();
 
    // Assert: currentInput が空になっている
    await expect(passwordPage.currentInput).toHaveValue('');
 
    // Act: 新しいパスワードが短すぎる場合
    await passwordPage.fillCurrentPassword('password');
    await passwordPage.fillNewPassword('abc');
    await passwordPage.saveButton.click();
 
    // Assert: 新しいパスワードのエラーが表示される
    expect(await passwordPage.isNewErrorVisible()).toBe(true);
  });
  
});
