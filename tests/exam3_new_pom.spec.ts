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
  test.fixme('通知トグルの初期状態を確認し、変更・保存・リセットできる', async ({ page }) => {
    // TODO: NotificationPage を new して navigate() で通知設定ページに遷移する

    // TODO: 初期状態を確認する（5つのトグルlocatorを全て使用）
    // notif-assign: ON(true)
    // notif-due: ON(true)
    // notif-comment: OFF(false)
    // notif-mention: ON(true)
    // notif-weekly: OFF(false)

    // TODO: notif-comment トグルをONにして保存する
    // トーストに「通知設定を保存しました」が表示されることを確認する
    // ヒント: page.getByRole('status') でトースト要素を取得できる

    // TODO: リセットボタンをクリックする
    // notif-comment が再びOFF(false)になっていることを確認する
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
  test.fixme('正しい情報を入力してパスワードを変更できる', async ({ page }) => {
    // TODO: PasswordPage を new して navigate() でパスワード変更ページに遷移する

    // TODO: changePassword('password', 'newPassword1', 'newPassword1') を呼び出す
    // トーストに「パスワードを変更しました」が表示されることを確認する

    // TODO: 変更後、入力フィールドがクリアされていることを確認する
    // currentInput, newInput, confirmInput がそれぞれ空であること
  });

  // ════════════════════════════════════════════
  // 課題3-3: パスワード変更バリデーション
  // ════════════════════════════════════════════
  test.fixme('パスワード変更のバリデーションエラーが正しく表示される', async ({ page }) => {
    // TODO: PasswordPage を new して navigate() でパスワード変更ページに遷移する

    // TODO: 現在のパスワードが間違っている場合のエラーを確認する
    // changePassword('wrongpass', 'newPassword1', 'newPassword1') を呼び出す
    // isCurrentWrongErrorVisible() が true であることを確認する

    // TODO: cancel() でフィールドをクリアする
    // currentInput が空になっていることを確認する

    // TODO: 新しいパスワードが短すぎる場合のエラーを確認する
    // fillCurrentPassword('password') を呼び出す
    // fillNewPassword('abc') を呼び出す
    // 保存ボタンをクリックする
    // isNewErrorVisible() が true であることを確認する
  });

});
