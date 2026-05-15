import { Page, Locator } from '@playwright/test';

export class PasswordPage {
  readonly page: Page;
  readonly currentInput: Locator;
  readonly newInput: Locator;
  readonly confirmInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly currentError: Locator;
  readonly currentWrongError: Locator;
  readonly newError: Locator;
  readonly confirmError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentInput     = page.getByPlaceholder('現在のパスワード');
    this.newInput         = page.getByPlaceholder('8文字以上');
    this.confirmInput     = page.getByPlaceholder('もう一度入力');
    this.saveButton       = page.getByRole('button', { name: '変更する' });
    this.cancelButton     = page.getByTestId('cancel-pw-btn');
    this.currentError     = page.locator('#pw-current-error');
    this.currentWrongError= page.locator('#pw-current-wrong');
    this.newError         = page.locator('#pw-new-error');
    this.confirmError     = page.locator('#pw-confirm-error');
  }

  async navigate() {
    await this.page.getByTestId('nav-password').click();
  }

  async fillCurrentPassword(password: string) {
    await this.currentInput.fill(password);
  }

  async fillNewPassword(password: string) {
    await this.newInput.fill(password);
  }

  async fillConfirmPassword(password: string) {
    await this.confirmInput.fill(password);
  }

  async changePassword(current: string, newPass: string, confirm: string) {
    await this.fillCurrentPassword(current);
    await this.fillNewPassword(newPass);
    await this.fillConfirmPassword(confirm);
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async isCurrentErrorVisible(): Promise<boolean> {
    return await this.currentError.isVisible();
  }

  async isCurrentWrongErrorVisible(): Promise<boolean> {
    return await this.currentWrongError.isVisible();
  }

  async isNewErrorVisible(): Promise<boolean> {
    return await this.newError.isVisible();
  }

  async isConfirmErrorVisible(): Promise<boolean> {
    return await this.confirmError.isVisible();
  }
}
