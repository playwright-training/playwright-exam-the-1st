import { Page, Locator } from '@playwright/test';

export class TaskModal {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly statusSelect: Locator;
  readonly prioritySelect: Locator;
  readonly assigneeSelect: Locator;
  readonly dueInput: Locator;
  readonly memoInput: Locator;
  readonly saveButton: Locator;
  readonly draftButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly titleError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput     = page.getByTestId('task-title-input');
    this.statusSelect   = page.getByTestId('task-status-input');
    this.prioritySelect = page.getByTestId('task-priority-input');
    this.assigneeSelect = page.getByTestId('task-assignee-input');
    this.dueInput       = page.getByTestId('task-due-input');
    this.memoInput      = page.getByTestId('task-memo-input');
    this.saveButton     = page.getByTestId('modal-save');
    this.draftButton    = page.getByTestId('modal-draft');
    this.cancelButton   = page.locator('#modal-cancel');
    this.closeButton    = page.locator('#modal-close');
    this.titleError     = page.locator('#task-title-error');
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async selectStatus(status: 'todo' | 'doing' | 'review' | 'done') {
    await this.statusSelect.selectOption(status);
  }

  async selectPriority(priority: 'high' | 'medium' | 'low') {
    await this.prioritySelect.selectOption(priority);
  }

  async selectAssignee(assignee: string) {
    await this.assigneeSelect.selectOption(assignee);
  }

  async fillDue(due: string) {
    await this.dueInput.fill(due);
  }

  async fillMemo(memo: string) {
    await this.memoInput.fill(memo);
  }

  async save() {
    await this.saveButton.click();
  }

  async saveDraft() {
    await this.draftButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async isTitleErrorVisible(): Promise<boolean> {
    return await this.titleError.isVisible();
  }
}
