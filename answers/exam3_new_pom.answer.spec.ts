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

  // ── テスト1: NotificationPage の主要POM要素を網羅 ──
  // 使用: navigate, notifAssign, notifDue, notifComment, notifMention, notifWeekly,
  //       isChecked, toggle, save, reset, saveButton, resetButton
  test('通知トグルの初期状態を確認し、変更・保存・リセットできる', async ({ page }) => {
    // Arrange
    const notifPage = new NotificationPage(page);
    await notifPage.navigate();

    // Assert（初期状態 — 5つのトグルlocatorを全て使用）
    expect(await notifPage.isChecked(notifPage.notifAssign)).toBe(true);
    expect(await notifPage.isChecked(notifPage.notifDue)).toBe(true);
    expect(await notifPage.isChecked(notifPage.notifComment)).toBe(false);
    expect(await notifPage.isChecked(notifPage.notifMention)).toBe(true);
    expect(await notifPage.isChecked(notifPage.notifWeekly)).toBe(false);

    // Act — トグルをONにして保存
    await notifPage.toggle(notifPage.notifComment);
    await notifPage.save();

    // Assert
    await expect(page.getByRole('status')).toHaveText('通知設定を保存しました');

    // Act — リセットで初期状態に戻る
    await notifPage.reset();

    // Assert
    expect(await notifPage.isChecked(notifPage.notifComment)).toBe(false);
  });

  // ── テスト2: PasswordPage の正常系 ──
  // 使用: navigate, changePassword, currentInput, newInput, confirmInput, saveButton
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

  // ── テスト3: PasswordPage のバリデーション ──
  // 使用: navigate, fillCurrentPassword, fillNewPassword, cancel, cancelButton,
  //       isCurrentWrongErrorVisible, isNewErrorVisible, isConfirmErrorVisible
  test('パスワード変更のバリデーションエラーが正しく表示される', async ({ page }) => {
    // Arrange
    const pwPage = new PasswordPage(page);
    await pwPage.navigate();

    // Act — 現在のパスワードが間違っている場合
    await pwPage.changePassword('wrongpass', 'newPassword1', 'newPassword1');

    // Assert
    expect(await pwPage.isCurrentWrongErrorVisible()).toBe(true);

    // Act — キャンセルで入力をクリア
    await pwPage.cancel();

    // Assert
    await expect(pwPage.currentInput).toHaveValue('');

    // Act — 新しいパスワードが短すぎる場合
    await pwPage.fillCurrentPassword('password');
    await pwPage.fillNewPassword('abc');
    await pwPage.saveButton.click();

    // Assert
    expect(await pwPage.isNewErrorVisible()).toBe(true);
  });

});
