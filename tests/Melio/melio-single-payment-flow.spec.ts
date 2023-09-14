import { test, expect, Page } from '@playwright/test';

import { LoginDetails } from '../../types/userLogin';
import userLoginData from '../../data/userLogin.json';

import { PaymentPage } from '../../pages/MelioPaymentPage';
import { MelioLoginBuildingBlock } from '../../building-blocks/melio_login_building_block';

test.describe('single payment flow - schedule payment', () => {
  let currPaymentPage: PaymentPage;
  let currMelioLoginBuildingBlock: MelioLoginBuildingBlock;
  const currUserLoginData: LoginDetails = userLoginData;

  let page: Page;

  test.beforeEach(async ({ browser }) => {
    // Create a new incognito browser context with a proper user agent
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/melio Safari/537.36'
    });

    page = await context.newPage();
    currMelioLoginBuildingBlock = new MelioLoginBuildingBlock(page);
    currPaymentPage = new PaymentPage(page);

    await currMelioLoginBuildingBlock.gotoLoginPage();
  });

  test('NPE off - funding source: ach (micro deposits) to ach, with legal info', async () => {
    await currMelioLoginBuildingBlock.login(currUserLoginData['username'], currUserLoginData['password']);
    await currPaymentPage.clickScheduleAPaymentButton();
    expect(currPaymentPage.page).toBeDefined();
  });

  test.afterEach(async () => {
    await page.close();
    console.log('closed browser test finished');
  });
}); //describe
