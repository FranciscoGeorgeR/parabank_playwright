import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';

const test = base.extend<{ page: any }>({
  page: async ({ page }, use) => {
    page.HomePage = new HomePage(page);
    page.RegisterPage = new RegisterPage(page);
    page.LoginPage = new LoginPage(page);
    page.AccountsOverviewPage = new AccountsOverviewPage(page);
    page.OpenAccountPage = new OpenAccountPage(page);
    page.TransferFundsPage = new TransferFundsPage(page);


    await use(page);
  }
});

export { test };
