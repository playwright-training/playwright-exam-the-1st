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
    this.page             = page;
    this.currentInput     = page.getByTestId('pw-current');
    this.newInput         = page.getByTestId('pw-new');
    this.confirmInput     = page.getByTestId('pw-confirm');
    this.saveButton       = page.getByTestId('save-pw-btn');
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

  async changePassword(current: string, newPw: string, confirm: string) {
    await this.fillCurrentPassword(current);
    await this.fillNewPassword(newPw);
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