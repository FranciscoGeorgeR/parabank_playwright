import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly successHeading: Locator;
    readonly invalidCredentialsMessage: Locator;
    readonly emptyFieldsMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole("button", { name: "Log In" });
        this.successHeading = page.getByRole("heading", { name: "Accounts Overview" });
        this.invalidCredentialsMessage = page.getByText("The username and password could not be verified.");
        this.emptyFieldsMessage = page.getByText("Please enter a username and password.");
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoginSuccess() {
        await expect(this.successHeading).toBeVisible();
    }

    async assertInvalidCredentialsError() {
        await expect(this.invalidCredentialsMessage).toBeVisible();
    }

    async assertEmptyFieldsError() {
        await expect(this.emptyFieldsMessage).toBeVisible();
    }
}
