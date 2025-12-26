import { Page, Locator, expect } from "@playwright/test";
import { User } from "../utils/User";

export class RegisterPage {
  readonly page: Page;

  // Inputs
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatedPasswordInput: Locator;

  // Actions / Messages
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly requiredErrors: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator("#customer\\.firstName");
    this.lastNameInput = page.locator("#customer\\.lastName");
    this.streetInput = page.locator("#customer\\.address\\.street");
    this.cityInput = page.locator("#customer\\.address\\.city");
    this.stateInput = page.locator("#customer\\.address\\.state");
    this.zipCodeInput = page.locator("#customer\\.address\\.zipCode");
    this.phoneInput = page.locator("#customer\\.phoneNumber");
    this.ssnInput = page.locator("#customer\\.ssn");
    this.usernameInput = page.locator("#customer\\.username");
    this.passwordInput = page.locator("#customer\\.password");
    this.repeatedPasswordInput = page.locator("#repeatedPassword");

    this.submitButton = page.getByRole("button", { name: "Register" });
    this.successMessage = page.locator("#rightPanel > p").first();
    this.requiredErrors = page.locator("span.error");
    this.logoutLink = page.getByRole("link", { name: "Log Out" });
  }

  // ======================
  // Actions
  // ======================
  async fillBasicData(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.streetInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.repeatedPasswordInput.fill(user.confirmPassword);
  }

  async submit() {
    await this.submitButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  // ======================
  // Assertions
  // ======================
  async assertRegisterSuccess(text: string) {
    await expect(this.successMessage).toContainText(text);
  }

  async assertRequiredFieldErrors() {
    const count = await this.requiredErrors.count();
    expect(count).toBeGreaterThan(1);
  }

  async assertFirstNameRequired(text: string) {
    await this.assertFieldError("customer.firstName", text);
  }

  async assertPasswordMismatch(text: string) {
    await this.assertFieldError("repeatedPassword", text);
  }

  async assertUsernameAlreadyExists(text: string) {
    await this.assertFieldError("customer.username", text);
  }

  // ======================
  // Helpers
  // ======================
  private fieldError(field: string): Locator {
    return this.page.locator(`#${field.replace(/\./g, "\\.")}\\.errors`);
  }

  private async assertFieldError(field: string, text: string) {
    const error = this.fieldError(field);
    await expect(error).toBeVisible();
    await expect(error).toHaveText(text);
  }
}
