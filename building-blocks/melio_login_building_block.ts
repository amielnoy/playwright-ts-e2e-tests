import { Page } from '@playwright/test';
import { MelioSUserPasswordLoginPage } from '../pages/MelioLogin/MelioSUserPasswordLoginPage';

export class MelioLoginBuildingBlock {
  readonly loginPage: MelioSUserPasswordLoginPage;

  constructor(page: Page) {
    this.loginPage = new MelioSUserPasswordLoginPage(page);
  }
  async login(username: string, password: string) {
    //await this.loginPage.gotoLogin();
    await this.loginPage.setUserName(username);
    await this.loginPage.setPassword(password);
    await this.loginPage.clickLoginButton();
    console.log('logged in sucessfuly');
  }

  async gotoLoginPage() {
    await this.loginPage.gotoLogin();
  }
}
