import { Page, Locator, expect } from "@playwright/test";

export class OpenAccountPage {
  readonly page: Page;
  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly openNewAccountButton: Locator;
  readonly rightPanel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountTypeSelect = page.locator("#type");
    this.fromAccountSelect = page.locator("#fromAccountId").first();
    this.openNewAccountButton = page.getByRole("button", { name: "Open New Account" });
    this.rightPanel = page.locator("#rightPanel");
  }

  async selectAccountType(type: string) {
    await this.accountTypeSelect.selectOption(type);
    await this.fromAccountSelect.selectOption({ index: 0 });
  }

  async submit() {
    await this.openNewAccountButton.click();
  }

  async assertNewAccountIsCreated() {
    await expect(this.rightPanel).toContainText("Account Opened!");
    await expect(this.rightPanel).toContainText("Congratulations, your account is now open.");
    await expect(this.rightPanel).toContainText(/Your new account number:\s*\d+/);
  }
}

