import { test } from "../support/fixtures/index";

test.describe("Accounts", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/parabank/overview.htm");
    await page.HomePage.goToOpenNewAccount();
  });

  test("CT-010 – Abrir conta Savings", async ({ page }) => {
    await page.OpenAccountPage.selectAccountType("SAVINGS");
    await page.OpenAccountPage.submit();
    await page.OpenAccountPage.assertNewAccountIsCreated();
  });

  test("CT-011 – Abrir conta Checking", async ({ page }) => {
    await page.OpenAccountPage.selectAccountType("CHECKING");
    await page.OpenAccountPage.submit();
    await page.OpenAccountPage.assertNewAccountIsCreated();
  });

  test("CT-012 – Accounts Overview", async ({ page }) => {
    await page.OpenAccountPage.selectAccountType("CHECKING");
    await page.OpenAccountPage.submit();
    await page.OpenAccountPage.assertNewAccountIsCreated();

    await page.HomePage.goToAccountsOverview();
    await page.AccountsOverviewPage.expectAtLeastOneAccount();
  });

});