import { Page, Locator } from '@playwright/test';

export class ReportPage {
  readonly page: Page;
  readonly periodFilter: Locator;
  readonly assigneeFilter: Locator;
  readonly exportButton: Locator;
  readonly statsGrid: Locator;
  readonly reportTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.periodFilter   = page.getByTestId('report-period');
    this.assigneeFilter = page.getByTestId('report-assignee');
    this.exportButton   = page.getByTestId('report-export-btn');
    this.statsGrid      = page.locator('#stats-grid');
    this.reportTable    = page.getByTestId('report-table');
  }

  async navigate() {
    await this.page.getByTestId('nav-report').click();
  }

  async filterByPeriod(period: 'week' | 'month' | 'all') {
    await this.periodFilter.selectOption(period);
  }

  async filterByAssignee(assignee: string) {
    await this.assigneeFilter.selectOption(assignee);
  }

  async getReportRowCount(): Promise<number> {
    return await this.reportTable.locator('tr').count();
  }

  getReportRowByTaskId(id: number): Locator {
    return this.page.getByTestId(`report-row-${id}`);
  }

  async getStatValues(): Promise<number[]> {
    const cards = this.statsGrid.locator('.stat-num');
    const count = await cards.count();
    const values: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await cards.nth(i).innerText();
      values.push(Number(text));
    }
    return values;
  }

  async exportReport() {
    await this.exportButton.click();
  }
}
