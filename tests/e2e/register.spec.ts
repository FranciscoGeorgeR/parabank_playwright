import { test } from "../support/fixtures/index";
import { buildUser } from "../support/utils/userFake";
import { authUser } from "../support/fixtures/authUser";
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Cadastro", () => {

  test.beforeEach(async ({ page }) => {
    await page.HomePage.open();
    await page.HomePage.goToRegister();
  });

  test("CT-001 – Cadastro com sucesso", async ({ page }) => {
    const user = buildUser();

    await page.RegisterPage.fillBasicData(user);
    await page.RegisterPage.submit();

    await page.RegisterPage.assertRegisterSuccess(
      "Your account was created successfully. You are now logged in."
    );
  });

  test("CT-002 – Campos obrigatórios vazios", async ({ page }) => {
    await page.RegisterPage.submit();

    await page.RegisterPage.assertRequiredFieldErrors();
    await page.RegisterPage.assertFirstNameRequired("First name is required.");
  });

  test("CT-003 – Senha e confirmação diferentes", async ({ page }) => {
    const user = buildUser({ confirmPassword: "qa123456" });

    await page.RegisterPage.fillBasicData(user);
    await page.RegisterPage.submit();

    await page.RegisterPage.assertPasswordMismatch(
      "Passwords did not match."
    );
  });

  test("CT-004 – Username já existente", async ({ page }) => {
    const user = buildUser({ username: authUser.username });
    
    await page.RegisterPage.fillBasicData(user);
    await page.RegisterPage.submit();

    await page.RegisterPage.assertUsernameAlreadyExists(
      "This username already exists."
    );
  });

  test("CT-005 – Zip Code inválido", async ({ page }) => {
    const user = buildUser({ zipCode: "!@#$%" });

    await page.RegisterPage.fillBasicData(user);
    await page.RegisterPage.submit();

    //comportamento real do sistema
    await page.RegisterPage.assertRegisterSuccess(
      "Your account was created successfully. You are now logged in."
    );
  });

});