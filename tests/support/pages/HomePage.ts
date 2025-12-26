import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly openNewAccountLink: Locator;
  readonly accountsOverviewLink: Locator;
  readonly transferFundsLink: Locator;
  readonly registerHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole("button", { name: "Log In" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.openNewAccountLink = page.getByRole("link", { name: "Open New Account" });
    this.accountsOverviewLink = page.getByRole("link", { name: "Accounts Overview" });
    this.transferFundsLink = page.getByRole("link", { name: "Transfer Funds" });
    this.registerHeading = page.getByRole("heading", { name: "Signing up is easy!" });
  }

  async open() {
    await this.page.goto("/");
    await expect(this.loginButton).toBeVisible();
  }

  async goToRegister() {
    await expect(this.registerLink).toBeVisible();
    await this.registerLink.click();
  }

  async expectRegisterMessage() {
    await expect(this.registerHeading).toBeVisible();
  }

  async goToOpenNewAccount() {
    await this.openNewAccountLink.click();
  }

  async goToAccountsOverview() {
    await this.accountsOverviewLink.click();
  }

  async goToTransferFunds() {
    await this.transferFundsLink.click();
  }
}
