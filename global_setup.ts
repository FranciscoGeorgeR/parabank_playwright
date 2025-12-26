import { chromium, type FullConfig } from "@playwright/test";
import { Page, expect } from '@playwright/test';
import { authUser } from "./tests/support/fixtures/authUser";

export default async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseURL}/parabank/index.htm`);

  await page.locator('input[name="username"]').fill(authUser.username);
  await page.locator('input[name="password"]').fill(authUser.password);
  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByRole("heading", { name: "Accounts Overview" })).toBeVisible()

  await context.storageState({
    path: "playwright/.auth/auth.json",
  });

  await browser.close();
}