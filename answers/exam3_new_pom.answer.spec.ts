import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NotificationPage } from './pages/NotificationPage.answer';
import { PasswordPage } from './pages/PasswordPage.answer';

test.describe('③POM新規作成課題 【想定回答】', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
  });

  // ════════════════════════════════════════════
  // NotificationPage
  // ════════════════════════════════════════════
  test.describe('通知設定ページ', () => {

    test('通知設定ページに遷移できる', async ({ page }) => {
      // Arrange
      const notifPage = new NotificationPage(page);

      // Act
      await notifPage.navigate();

      // Assert
      await expect(page.getByTestId('nav-notification')).toHaveClass(/active/);
      await expect(notifPage.saveButton).toBeVisible();
    });

    test('デフォルトでタスク割当通知・期限リマインダー・メンション通知がONになっている', async ({ page }) => {
      // Arrange
      const notifPage = new NotificationPage(page);
      await notifPage.navigate();

      // Act（操作なし — 初期状態の確認）

      // Assert
      expect(await notifPage.isChecked(notifPage.notifAssign)).toBe(true);
      expect(await notifPage.isChecked(notifPage.notifDue)).toBe(true);
      expect(await notifPage.isChecked(notifPage.notifComment)).toBe(false);
      expect(await notifPage.isChecked(notifPage.notifWeekly)).toBe(false);
      expect(await notifPage.isChecked(notifPage.notifMention)).toBe(true);
    });

    test('コメント通知トグルをONにして保存できる', async ({ page }) => {
      // Arrange
      const notifPage = new NotificationPage(page);
      await notifPage.navigate();

      // Act
      await notifPage.toggle(notifPage.notifComment);
      await notifPage.save();

      // Assert
      expect(await notifPage.isChecked(notifPage.notifComment)).toBe(true);
      await expect(page.getByRole('status')).toHaveText('通知設定を保存しました');
    });

    test('リセットするとトグルが初期状態に戻る', async ({ page }) => {
      // Arrange
      const notifPage = new NotificationPage(page);
      await notifPage.navigate();
      await notifPage.toggle(notifPage.notifWeekly);
      expect(await notifPage.isChecked(notifPage.notifWeekly)).toBe(true);

      // Act
      await notifPage.reset();

      // Assert
      expect(await notifPage.isChecked(notifPage.notifWeekly)).toBe(false);
    });

    test('トグルをONにして保存後、ページを再表示しても設定が保持されている', async ({ page }) => {
      // Arrange
      const notifPage = new NotificationPage(page);
      await notifPage.navigate();
      await notifPage.toggle(notifPage.notifComment);
      await notifPage.save();

      // Act
      await page.getByTestId('nav-tasks').click();
      await notifPage.navigate();

      // Assert
      expect(await notifPage.isChecked(notifPage.notifComment)).toBe(true);
    });

  });

  // ════════════════════════════════════════════
  // PasswordPage
  // ════════════════════════════════════════════
  test.describe('パスワード変更ページ', () => {

    test('パスワード変更ページに遷移できる', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);

      // Act
      await pwPage.navigate();

      // Assert
      await expect(page.getByTestId('nav-password')).toHaveClass(/active/);
      await expect(pwPage.saveButton).toBeVisible();
    });

    test('正しい情報を入力してパスワードを変更できる', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);
      await pwPage.navigate();

      // Act
      await pwPage.changePassword('password', 'newPassword1', 'newPassword1');

      // Assert
      await expect(page.getByRole('status')).toHaveText('パスワードを変更しました');
      await expect(pwPage.currentInput).toHaveValue('');
      await expect(pwPage.newInput).toHaveValue('');
      await expect(pwPage.confirmInput).toHaveValue('');
    });

    test('何も入力せず変更ボタンを押すとエラーが表示される', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);
      await pwPage.navigate();

      // Act
      await pwPage.saveButton.click();

      // Assert
      expect(await pwPage.isCurrentErrorVisible()).toBe(true);
      expect(await pwPage.isNewErrorVisible()).toBe(true);
    });

    test('現在のパスワードが間違っているとエラーが表示される', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);
      await pwPage.navigate();

      // Act
      await pwPage.changePassword('wrongpass', 'newPassword1', 'newPassword1');

      // Assert
      expect(await pwPage.isCurrentWrongErrorVisible()).toBe(true);
    });

    test('新しいパスワードと確認用が一致しないとエラーが表示される', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);
      await pwPage.navigate();

      // Act
      await pwPage.changePassword('password', 'newPassword1', 'differentPass1');

      // Assert
      expect(await pwPage.isConfirmErrorVisible()).toBe(true);
    });

    test('新しいパスワードが8文字未満だとエラーが表示される', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);
      await pwPage.navigate();

      // Act
      await pwPage.fillCurrentPassword('password');
      await pwPage.fillNewPassword('abc');
      await pwPage.saveButton.click();

      // Assert
      expect(await pwPage.isNewErrorVisible()).toBe(true);
    });

    test('キャンセルボタンを押すと入力内容がクリアされる', async ({ page }) => {
      // Arrange
      const pwPage = new PasswordPage(page);
      await pwPage.navigate();
      await pwPage.fillCurrentPassword('password');

      // Act
      await pwPage.cancel();

      // Assert
      await expect(pwPage.currentInput).toHaveValue('');
    });

  });

});
