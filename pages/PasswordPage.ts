import { Page, Locator } from '@playwright/test';

export class LoginPage {
/** 表示名 */
readonly displayNameInput: Locator;

/** メールアドレス */
readonly emailInput: Locator;

/** 自己紹介 */
readonly bioTextArea: Locator; // または bioInput

/** 保存する */
readonly saveButton: Locator;

/** キャンセル */
readonly cancelButton: Locator;
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
