import { Page, Locator, expect } from "@playwright/test";

export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountsTable: Locator;
  readonly accountLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountsTable = page.locator("table#accountTable");
    this.accountLinks = page.locator('a[href*="activity.htm"]');

  }

  async expectAtLeastOneAccount() {
    await expect(this.accountsTable).toBeVisible();
    await expect(this.accountLinks.first()).toBeVisible();
  }

  async getAllAccountIds(): Promise<string[]> {
    const ids = await this.accountLinks.allTextContents();
    return ids.map((id) => id.trim());
  }
}
