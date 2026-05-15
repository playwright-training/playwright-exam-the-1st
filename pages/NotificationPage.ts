import { Page, Locator } from '@playwright/test';
 
export class NotificationPage {
  readonly page: Page;
  readonly notifAssign: Locator;
  readonly notifDue: Locator;
  readonly notifComment: Locator;
  readonly notifMention: Locator;
  readonly notifWeekly: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;
 
  constructor(page: Page) {
    this.page         = page;
    this.notifAssign  = page.getByTestId('notif-assign');
    this.notifDue     = page.getByTestId('notif-due');
    this.notifComment = page.getByTestId('notif-comment');
    this.notifMention = page.getByTestId('notif-mention');
    this.notifWeekly  = page.getByTestId('notif-weekly');
    this.saveButton   = page.getByTestId('save-notif-btn');
    this.resetButton  = page.getByTestId('reset-notif-btn');
  }
 
  async navigate() {
    await this.page.getByTestId('nav-notification').click();
  }
 
  // CSSで非表示のcheckboxはevaluateでクリックする
  async toggle(locator: Locator) {
    await locator.evaluate((el: HTMLInputElement) => el.click());
  }
 
  async save() {
    await this.saveButton.click();
  }
 
  async reset() {
    await this.resetButton.click();
  }
 
  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }
}