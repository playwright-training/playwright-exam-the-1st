import { Page, Locator } from '@playwright/test';

export class LoginPage {
/** タスク割当通知: 自分にタスクが割り当てられたとき */
readonly taskAssignmentToggle: Locator;
/** 期限リマインダー: 期限の1日前に通知 */
readonly deadlineReminderToggle: Locator;
/** コメント通知: 自分のタスクにコメントがついたとき */
readonly commentNotificationToggle: Locator;
/** 週次サマリー: 毎週月曜にサマリーメールを受け取る */
readonly weeklySummaryToggle: Locator;
/** メンション通知: コメントでメンションされたとき */
readonly mentionNotificationToggle: Locator;
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton   = page.getByTestId('login-btn');
    this.usernameError = page.locator('#username-error');
    this.passwordError = page.locator('#password-error');
    this.loginError    = page.locator('#login-error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsAdmin() {
    await this.login('admin', 'password');
  }
}
