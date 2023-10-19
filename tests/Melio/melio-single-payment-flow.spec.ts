import { test, expect, Page } from '@playwright/test';

import { PaymentInboxPage } from '../../pages/MelioSinglePaymentFlow/PaymentDashboard/PayInboxPage';
import { ChooseFundingSourcePage } from '../../pages/MelioSinglePaymentFlow/ChooseOrAddFundingSourcePage';
import { SchedulePaymentPage } from '../../pages/MelioSinglePaymentFlow/SchedulePaymentPage';
import { AddMemoForPayorPage } from '../../pages/MelioSinglePaymentFlow/AddMemoForPayorPage';
import { ReviewAndConfirmPage } from '../../pages/MelioSinglePaymentFlow/ReviewAndConfirmPage';
import { PaymentConfirmationDetailsPage } from '../../pages/MelioSinglePaymentFlow/PaymentConfirmationDetailsPage';
import { PayScheduledPage } from '../../pages/MelioSinglePaymentFlow/PaymentDashboard/PayScheduledPage';

import { MelioLoginBuildingBlock } from '../../building-blocks/Melio/melio_login_building_block';
import { allure } from 'allure-playwright';

//1.login
//2.On payment dashboard ,on inbox,click schedule payment on first existing bill
//3.On Schedule payment form fill in the payment shedule details
//4.

test.describe('single payment flow(existing bill) - schedule payment', () => {
  let currPaymentInboxPage: PaymentInboxPage;
  let currMelioLoginBuildingBlock: MelioLoginBuildingBlock;
  let currChooseFundingSourcePage: ChooseFundingSourcePage;
  let currSchedulePaymentPage: SchedulePaymentPage;
  let currAddMemoForPayorPage: AddMemoForPayorPage;
  let currReviewAndConfirmPage: ReviewAndConfirmPage;
  let currPaymentConfirmationDetailsPage: PaymentConfirmationDetailsPage;
  let currPayScheduledPage: PayScheduledPage;
  //const currUserLoginData: LoginDetails = userLoginData;

  let page: Page;

  test.beforeEach(async ({ browser }) => {
    // Create a new incognito browser context with a proper user agent
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/melio Safari/537.36'
    });

    page = await context.newPage();
    currMelioLoginBuildingBlock = new MelioLoginBuildingBlock(page);
    currPaymentInboxPage = new PaymentInboxPage(page);
    currChooseFundingSourcePage = new ChooseFundingSourcePage(page);
    currSchedulePaymentPage = new SchedulePaymentPage(page);
    currAddMemoForPayorPage = new AddMemoForPayorPage(page);
    currReviewAndConfirmPage = new ReviewAndConfirmPage(page);
    currPaymentConfirmationDetailsPage = new PaymentConfirmationDetailsPage(page);
    currPayScheduledPage = new PayScheduledPage(page);

    await currMelioLoginBuildingBlock.gotoLoginPage();
    allure.issue('Issue Name', 'https://github.com/allure-framework/allure-js/issues/352');
    const username = process.env.USERNAME1; // || '';
    const password = process.env.PASSWORD1; // || '';

    if (username != undefined && password != undefined) await currMelioLoginBuildingBlock.login(username, password);
    else {
      console.log('problem reading the enviornment file');
      throw new Error('problem reading the enviornment file');
    }
  });

  test('NPE off - funding source: ach (micro deposits) to ach, with legal info', async () => {
    await currPaymentInboxPage.clickScheduleAPaymentButton();
    await currChooseFundingSourcePage.clickContinueAfterFundingSourceChosenButton();
    await currSchedulePaymentPage.clickContinueAfterScheduling();
    //expect(await currAddMemoForPayorPage.memoForVendorLabel).toContain('Add a memo for ');

    await currAddMemoForPayorPage.clickContinueAfterFillingMemo();

    await currReviewAndConfirmPage.clickContinueAfterReviewAndConfirm();

    await currPaymentConfirmationDetailsPage.clickGotoDashboard();

    await currPayScheduledPage.clickMenuCancelSceduledPayment();

    await currPayScheduledPage.clickCancelOnConfirmationPopUpOfScheduledPayment();
    expect(true).toBe(true);
  });

  test.afterEach(async () => {
    await page.close();
    console.log('closed browser test finished');
  });
}); //describe
