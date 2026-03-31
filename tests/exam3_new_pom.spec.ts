import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
// TODO: 作成したPOMをインポートする
// import { NotificationPage } from '../pages/NotificationPage';
// import { PasswordPage } from '../pages/PasswordPage';

test.describe('③POM新規作成課題', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsAdmin();
  });

  // ════════════════════════════════════════════
  // NotificationPage
  // 作成するファイル: pages/NotificationPage.ts
  // 参考: LoginPage.ts の構造を真似て作成すること
  // ════════════════════════════════════════════

  test.describe('通知設定ページ', () => {

    // 課題3-1: ページへの遷移
    test('通知設定ページに遷移できる', async ({ page }) => {
      // TODO: NotificationPage を new して navigate() を呼び出す
      // ナビゲーションの nav-notification をクリックする想定
      await expect(page.getByTestId('nav-notification')).toBeVisible();
    });

    // 課題3-2: トグルの初期状態確認
    test('デフォルトでタスク割当通知・期限リマインダー・メンション通知がONになっている', async ({ page }) => {
      // TODO: NotificationPage に移動し、各トグルのisChecked()を確認する
      // notif-assign: true
      // notif-due: true
      // notif-comment: false
      // notif-mention: true
    });

    // 課題3-3: トグルのON/OFF操作
    test('コメント通知トグルをONにして保存できる', async ({ page }) => {
      // TODO: NotificationPage に移動する
      // notif-comment トグルをクリックしてONにする
      // 保存ボタンをクリックする
      // トーストに「通知設定を保存しました」が表示されることを確認する
    });

    // 課題3-4: リセット操作
    test('リセットするとトグルが初期状態に戻る', async ({ page }) => {
      // TODO: NotificationPage に移動する
      // notif-weekly トグルをクリックしてONにする（初期値はOFF）
      // リセットボタンをクリックする
      // notif-weekly が再びOFFになっていることを確認する
    });

    // 課題3-5: 保存→再表示の状態維持
    test('トグルをONにして保存後、ページを再表示しても設定が保持されている', async ({ page }) => {
      // TODO: NotificationPage に移動する
      // notif-comment をONにして保存する
      // 別のページに移動してからまた通知設定に戻る
      // notif-comment がONのままであることを確認する
    });

  });

  // ════════════════════════════════════════════
  // PasswordPage
  // 作成するファイル: pages/PasswordPage.ts
  // ════════════════════════════════════════════

  test.describe('パスワード変更ページ', () => {

    // 課題3-6: ページへの遷移
    test('パスワード変更ページに遷移できる', async ({ page }) => {
      // TODO: PasswordPage を new して navigate() を呼び出す
      await expect(page.getByTestId('nav-password')).toBeVisible();
    });

    // 課題3-7: 正常系：パスワード変更成功
    test('正しい情報を入力してパスワードを変更できる', async ({ page }) => {
      // TODO: PasswordPage に移動する
      // 現在のパスワード: 'password'
      // 新しいパスワード: 'newPassword1'
      // 確認パスワード: 'newPassword1'
      // 変更ボタンをクリックする
      // トーストに「パスワードを変更しました」が表示されることを確認する
    });

    // 課題3-8: バリデーション：空欄送信
    test('何も入力せず変更ボタンを押すとエラーが表示される', async ({ page }) => {
      // TODO: PasswordPage に移動する
      // 変更ボタンをクリックする
      // 「現在のパスワードを入力してください」エラーが表示されることを確認する
    });

    // 課題3-9: バリデーション：現在のパスワードが誤り
    test('現在のパスワードが間違っているとエラーが表示される', async ({ page }) => {
      // TODO: PasswordPage に移動する
      // 現在のパスワードに 'wrongpass' を入力する
      // 新しいパスワードに 'newPassword1' を入力する
      // 確認パスワードに 'newPassword1' を入力する
      // 変更ボタンをクリックする
      // 「現在のパスワードが正しくありません」エラーが表示されることを確認する
    });

    // 課題3-10: バリデーション：パスワード不一致
    test('新しいパスワードと確認用が一致しないとエラーが表示される', async ({ page }) => {
      // TODO: PasswordPage に移動する
      // 現在のパスワード: 'password'
      // 新しいパスワード: 'newPassword1'
      // 確認パスワード: 'differentPass1'（意図的に不一致）
      // 変更ボタンをクリックする
      // 「パスワードが一致しません」エラーが表示されることを確認する
    });

    // 課題3-11: バリデーション：8文字未満
    test('新しいパスワードが8文字未満だとエラーが表示される', async ({ page }) => {
      // TODO: PasswordPage に移動する
      // 現在のパスワード: 'password'
      // 新しいパスワード: 'abc'（7文字未満）
      // 変更ボタンをクリックする
      // 「8文字以上で入力してください」エラーが表示されることを確認する
    });

    // 課題3-12: キャンセルで入力がリセットされる
    test('キャンセルボタンを押すと入力内容がクリアされる', async ({ page }) => {
      // TODO: PasswordPage に移動する
      // 現在のパスワードに 'password' を入力する
      // キャンセルボタンをクリックする
      // 入力フィールドが空になっていることを確認する
    });

  });

});
