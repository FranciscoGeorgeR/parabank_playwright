import { Page, Locator, expect } from "@playwright/test";

export class TransferFundsPage {
  readonly page: Page;

  // Inputs / Selects
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;

  // Actions
  readonly transferButton: Locator;

  // Panels / Results
  readonly rightPanel: Locator;
  readonly showResult: Locator;
  readonly amountResult: Locator;
  readonly fromAccountResult: Locator;
  readonly toAccountResult: Locator;
  readonly showError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.amountInput = page.locator("#amount");
    this.fromAccountSelect = page.locator("#fromAccountId").first();
    this.toAccountSelect = page.locator("#toAccountId").first();
    this.transferButton = page.getByRole("button", { name: "Transfer" });

    this.rightPanel = page.locator("#rightPanel");
    this.showResult = page.locator("#showResult");
    this.amountResult = page.locator("#amountResult");
    this.fromAccountResult = page.locator("#fromAccountIdResult");
    this.toAccountResult = page.locator("#toAccountIdResult");
    this.showError = page.locator("#showError");
  }

  async fillTransfer(amount?: string) {
    if (amount !== undefined) {
      await this.amountInput.fill(amount);
    }

    await expect(this.fromAccountSelect).toBeVisible();
    await expect(this.toAccountSelect).toBeVisible();
    await expect(this.fromAccountSelect).toBeEnabled();
    await expect(this.toAccountSelect).toBeEnabled();

    await this.fromAccountSelect.selectOption({ index: 0 });
    await this.toAccountSelect.selectOption({ index: 1 });
  }

  async submit() {
    await this.transferButton.click();
  }

  async assertTransferSuccess(expectedAmount: string) {
    await expect(this.showResult).toBeVisible();
    await expect(this.showResult).toContainText("Transfer Complete!");

    await expect(this.amountResult).toHaveText(expectedAmount);
    await expect(this.fromAccountResult).toHaveText(/^\d+$/);
    await expect(this.toAccountResult).toHaveText(/^\d+$/);

    await expect(this.showResult).toContainText("See Account Activity for more details.");
  }

  async assertTransferError() {
    await expect(this.showError).toBeVisible();
    await expect(this.showError).toContainText("Error!");
    await expect(this.showError).toContainText("An internal error has occurred and has been logged.");
  }

  async assertTransferErrorForInvalidAmount() {
    await expect(this.rightPanel).toContainText(/error|invalid/i);
  }
}
