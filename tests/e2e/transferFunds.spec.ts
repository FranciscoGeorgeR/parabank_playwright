import { test } from "../support/fixtures/index";

test.describe("Transfer Funds", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/parabank/overview.htm");

        await page.HomePage.goToOpenNewAccount();
        await page.OpenAccountPage.selectAccountType("CHECKING");
        await page.OpenAccountPage.submit();
        await page.OpenAccountPage.assertNewAccountIsCreated();

        await page.HomePage.goToTransferFunds();
    });

    test("CT-013 – Transferência com sucesso", async ({ page }) => {
        await page.TransferFundsPage.fillTransfer("100");
        await page.TransferFundsPage.submit();

        await page.TransferFundsPage.assertTransferSuccess("$100.00");
    });

    test("CT-014 – Valor vazio", async ({ page }) => {
        await page.TransferFundsPage.fillTransfer("");
        await page.TransferFundsPage.submit();

        await page.TransferFundsPage.assertTransferError();
    });

    test("CT-015 – Valor inválido", async ({ page }) => {
        await page.TransferFundsPage.fillTransfer("ABC");
        await page.TransferFundsPage.submit();

        await page.TransferFundsPage.assertTransferError();
    });

});

