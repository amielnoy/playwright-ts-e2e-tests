import { test, expect, Page, Locator } from '@playwright/test';

export class MelioSUserPasswordLoginPage {
  readonly usernameEditField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly nextPagePayLabel: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    // eslint-disable-next-line max-len
    this.usernameEditField = this.page.getByTestId('input-email');
    this.passwordField = this.page.getByTestId('input-password');
    this.loginButton = this.page.getByTestId('button-auth.signIn.buttonLabel');
    this.nextPagePayLabel = this.page.getByRole('heading', { name: 'Pay' });
  }

  public async gotoLogin() {
    await test.step('navigating to Login page', async () => {
      await this.page.goto('https://app.meliopayments.com/login', { waitUntil: 'domcontentloaded' });
      await this.page.waitForURL('**/login');
      await expect(this.page.url(), 'Verify user name value').toContain('https://app.meliopayments.com/login');
      await expect(this.loginButton).toBeVisible();
    });
  }

  public async setUserName(username: string) {
    await test.step('Set username on Login page', async () => {
      await this.usernameEditField.fill(username);
      await expect(this.usernameEditField, 'Verify user name value').toHaveValue(username);
    });
  }

  public async setPassword(password: string) {
    await test.step('Set password on Login page', async () => {
      await this.passwordField.fill(password);
      await expect(this.passwordField, 'Verify password value').toHaveValue(password);
    });
  }

  public async clickLoginButton() {
    await test.step('Click login button on Login page', async () => {
      await this.loginButton.click();
      await expect(this.nextPagePayLabel).toBeVisible({ timeout: 30000 });
      console.log('logged in succesfully!');
    });
  }
}
