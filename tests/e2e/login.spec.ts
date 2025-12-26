import { test } from "../support/fixtures/index";
import { authUser } from "../support/fixtures/authUser";
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login", () => {

    test.beforeEach(async ({ page }) => {
        await page.HomePage.open();
    });

    test("CT-006 – Login com sucesso", async ({ page }) => {
        await page.LoginPage.login(authUser.username, authUser.password);
        await page.LoginPage.assertLoginSuccess();

    });

    test("CT-007 – Senha incorreta", async ({ page }) => {
        await page.LoginPage.login(authUser.username, "senhaIncorreta");
        await page.LoginPage.assertInvalidCredentialsError();

    });

    test("CT-008 – Usuário inexistente", async ({ page }) => {
        await page.LoginPage.login("user_inexistente", "qa123");
        await page.LoginPage.assertInvalidCredentialsError();

    });

    test("CT-009 – Campos vazios", async ({ page }) => {
        await page.LoginPage.login("", "");
        await page.LoginPage.assertEmptyFieldsError();

    });

});