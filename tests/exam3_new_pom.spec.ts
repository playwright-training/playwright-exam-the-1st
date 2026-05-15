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
  // 課題3-1: 通知設定ページ
  // ════════════════════════════════════════════

  test('通知トグルの初期状態が正しい', async ({ page }) => {
    // Arrange
    const notificationPage = new NotificationPage(page);

    // Act
    await notificationPage.navigate();

    // Assert
    await expect(notificationPage.notifAssign).toBeChecked();
    await expect(notificationPage.notifDue).toBeChecked();
    await expect(notificationPage.notifComment).not.toBeChecked();
    await expect(notificationPage.notifMention).toBeChecked();
    await expect(notificationPage.notifWeekly).not.toBeChecked();
  });

  test('通知トグルを変更して保存できる', async ({ page }) => {
    // Arrange
    const notificationPage = new NotificationPage(page);
    await notificationPage.navigate();

    // Act
    await notificationPage.toggle(notificationPage.notifComment);
    await notificationPage.save();

    // Assert
    await expect(page.getByRole('status')).toHaveText('通知設定を保存しました');
    await expect(notificationPage.notifComment).toBeChecked();
  });

  test('通知設定をリセットすると初期状態に戻る', async ({ page }) => {
    // Arrange
    const notificationPage = new NotificationPage(page);
    await notificationPage.navigate();
    await notificationPage.toggle(notificationPage.notifComment);
    await notificationPage.save();

    // Act
    await notificationPage.reset();

    // Assert
    await expect(page.getByRole('status')).toHaveText('通知設定をリセットしました');
    await expect(notificationPage.notifComment).not.toBeChecked();
  });

  // ════════════════════════════════════════════
  // 課題3-2: パスワード変更成功
  // ════════════════════════════════════════════

  test('正しい情報を入力してパスワードを変更できる', async ({ page }) => {
    // Arrange
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();

    // Act
    await passwordPage.changePassword('password', 'newPassword1', 'newPassword1');

    // Assert
    await expect(page.getByRole('status')).toHaveText('パスワードを変更しました');
    await expect(passwordPage.currentInput).toHaveValue('');
    await expect(passwordPage.newInput).toHaveValue('');
    await expect(passwordPage.confirmInput).toHaveValue('');
  });

  // ════════════════════════════════════════════
  // 課題3-3: パスワード変更バリデーション
  // ════════════════════════════════════════════

  test('現在のパスワードが間違っているとエラーが表示される', async ({ page }) => {
    // Arrange
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();

    // Act
    await passwordPage.changePassword('wrongpass', 'newPassword1', 'newPassword1');

    // Assert
    expect(await passwordPage.isCurrentWrongErrorVisible()).toBe(true);
  });

  test('キャンセルボタンでフィールドがクリアされる', async ({ page }) => {
    // Arrange
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();
    await passwordPage.fillCurrentPassword('password');
    await passwordPage.fillNewPassword('newPassword1');

    // Act
    await passwordPage.cancel();

    // Assert
    await expect(passwordPage.currentInput).toHaveValue('');
    await expect(passwordPage.newInput).toHaveValue('');
  });

  test('新しいパスワードが短すぎるとエラーが表示される', async ({ page }) => {
    // Arrange
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();

    // Act
    await passwordPage.fillCurrentPassword('password');
    await passwordPage.fillNewPassword('abc');
    await passwordPage.saveButton.click();

    // Assert
    expect(await passwordPage.isNewErrorVisible()).toBe(true);
  });

});
