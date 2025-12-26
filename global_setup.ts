
import { chromium, type FullConfig } from "@playwright/test";
import { buildUser } from "./tests/support/utils/userFake";

export default async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const user = buildUser();

  await page.goto(`${baseURL}/parabank/register.htm`);

  await page.locator("#customer\\.firstName").fill(user.firstName);
  await page.locator("#customer\\.lastName").fill(user.lastName);
  await page.locator("#customer\\.address\\.street").fill(user.address);
  await page.locator("#customer\\.address\\.city").fill(user.city);
  await page.locator("#customer\\.address\\.state").fill(user.state);
  await page.locator("#customer\\.address\\.zipCode").fill(user.zipCode);
  await page.locator("#customer\\.phoneNumber").fill(user.phone);
  await page.locator("#customer\\.ssn").fill(user.ssn);
  await page.locator("#customer\\.username").fill(user.username);
  await page.locator("#customer\\.password").fill(user.password);
  await page.locator("#repeatedPassword").fill(user.confirmPassword);

  await page.locator('input[value="Register"]').click();

  //valida que cadastrou/logou
  await page.locator("#rightPanel").waitFor();
  await page
    .locator("#rightPanel")
    .getByText("Your account was created successfully")
    .waitFor();

  //salva sessão
  await context.storageState({ path: "playwright/.auth/auth.json" });

  await browser.close();
}