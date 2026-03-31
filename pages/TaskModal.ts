import { Page, Locator } from '@playwright/test';

export class TaskModal {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly statusSelect: Locator;
  readonly prioritySelect: Locator;
  // TODO: 担当者セレクトのlocatorを追加する
  readonly dueInput: Locator;
  // TODO: メモテキストエリアのlocatorを追加する
  readonly saveButton: Locator;
  // TODO: 下書き保存ボタンのlocatorを追加する
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly titleError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput    = page.getByTestId('task-title-input');
    this.statusSelect  = page.getByTestId('task-status-input');
    this.prioritySelect= page.getByTestId('task-priority-input');
    // TODO: task-assignee-input の locator を追加する
    this.dueInput      = page.getByTestId('task-due-input');
    // TODO: task-memo-input の locator を追加する
    this.saveButton    = page.getByTestId('modal-save');
    // TODO: modal-draft の locator を追加する
    this.cancelButton  = page.locator('#modal-cancel');
    this.closeButton   = page.locator('#modal-close');
    this.titleError    = page.locator('#task-title-error');
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async selectStatus(status: 'todo' | 'doing' | 'done') {
    await this.statusSelect.selectOption(status);
  }

  // TODO: 'review' を含むようにステータスの型を修正する
  // selectStatus(status: 'todo' | 'doing' | 'review' | 'done')

  async selectPriority(priority: 'high' | 'medium' | 'low') {
    await this.prioritySelect.selectOption(priority);
  }

  // TODO: 担当者を選択するメソッドを追加する
  // selectAssignee(assignee: string): Promise<void>

  async fillDue(due: string) {
    await this.dueInput.fill(due);
  }

  // TODO: メモを入力するメソッドを追加する
  // fillMemo(memo: string): Promise<void>

  async save() {
    await this.saveButton.click();
  }

  // TODO: 下書き保存するメソッドを追加する
  // saveDraft(): Promise<void>

  async cancel() {
    await this.cancelButton.click();
  }

  async isTitleErrorVisible(): Promise<boolean> {
    return await this.titleError.isVisible();
  }
}
