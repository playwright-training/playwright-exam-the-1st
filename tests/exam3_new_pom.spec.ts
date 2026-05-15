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
  // 作成するファイル: pages/NotificationPage.ts
  // 参考: LoginPage.ts の構造を真似て作成すること
  //
  // 注意: トグルの <input type="checkbox"> は CSS で非表示になっています。
  // クリックには locator.evaluate(el => el.click()) を使ってください。
  //
  // 必要なPOM要素:
  //   Locator: notifAssign, notifDue, notifComment, notifMention, notifWeekly,
  //            saveButton, resetButton
  //   メソッド: navigate(), toggle(), save(), reset(), isChecked()
  // ════════════════════════════════════════════
  // ※ test.fixme() はテストを「未実装」としてスキップする機能です。
  //   実装が完了したら test.fixme → test に書き換えてテストを有効にしてください。
  test('通知トグルの初期状態を確認し、変更・保存・リセットできる', async ({ page }) => {
    // Arrange
    const notificationPage = new NotificationPage(page);
    await notificationPage.navigate();

    // Assert: 初期状態を確認
    await expect(notificationPage.notifAssign).toBeChecked();
    await expect(notificationPage.notifDue).toBeChecked();
    await expect(notificationPage.notifComment).not.toBeChecked();
    await expect(notificationPage.notifMention).toBeChecked();
    await expect(notificationPage.notifWeekly).not.toBeChecked();

    // Act: notif-comment をONにして保存
    await notificationPage.toggle(notificationPage.notifComment);
    await notificationPage.save();

    // Assert: トースト確認
    await expect(page.getByRole('status')).toHaveText('通知設定を保存しました');

    // Act: リセット
    await notificationPage.reset();

    // Assert: notif-comment がOFFに戻る
    await expect(notificationPage.notifComment).not.toBeChecked();
  });

  // ════════════════════════════════════════════
  // 課題3-2: パスワード変更成功（PasswordPage を新規作成して使う）
  // 作成するファイル: pages/PasswordPage.ts
  //
  // 必要なPOM要素:
  //   Locator: currentInput, newInput, confirmInput, saveButton, cancelButton,
  //            currentError, currentWrongError, newError, confirmError
  //   メソッド: navigate(), changePassword(), fillCurrentPassword(),
  //            fillNewPassword(), fillConfirmPassword(), cancel(),
  //            isCurrentErrorVisible(), isCurrentWrongErrorVisible(),
  //            isNewErrorVisible(), isConfirmErrorVisible()
  // ════════════════════════════════════════════
  test('正しい情報を入力してパスワードを変更できる', async ({ page }) => {
    // Arrange
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();

    // Act
    await passwordPage.changePassword('password', 'newPassword1', 'newPassword1');

    // Assert: トースト確認
    await expect(page.getByRole('status')).toHaveText('パスワードを変更しました');

    // Assert: フィールドがクリアされている
    await expect(passwordPage.currentInput).toHaveValue('');
    await expect(passwordPage.newInput).toHaveValue('');
    await expect(passwordPage.confirmInput).toHaveValue('');
  });

  // ════════════════════════════════════════════
  // 課題3-3: パスワード変更バリデーション
  // ════════════════════════════════════════════
  test('パスワード変更のバリデーションエラーが正しく表示される', async ({ page }) => {
    // Arrange
    const passwordPage = new PasswordPage(page);
    await passwordPage.navigate();

    // Act & Assert: 現在のパスワードが間違っている場合
    await passwordPage.changePassword('wrongpass', 'newPassword1', 'newPassword1');
    expect(await passwordPage.isCurrentWrongErrorVisible()).toBe(true);

    // Act: キャンセルでフィールドをクリア
    await passwordPage.cancel();

    // Assert: フィールドがクリアされている
    await expect(passwordPage.currentInput).toHaveValue('');

    // Act & Assert: 新しいパスワードが短すぎる場合
    await passwordPage.fillCurrentPassword('password');
    await passwordPage.fillNewPassword('abc');
    await passwordPage.saveButton.click();
    expect(await passwordPage.isNewErrorVisible()).toBe(true);
  });

});
