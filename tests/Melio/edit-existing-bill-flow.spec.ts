import { test, expect, Page } from '@playwright/test';

import { PaymentInboxPage } from '../../pages/MelioSinglePaymentFlow/PaymentDashboard/PayInboxPage';

import { MelioLoginBuildingBlock } from '../../building-blocks/Melio/melio_login_building_block';
import { PayInboxBuildingBlocks } from '../../building-blocks/Melio/pay_inbox_building_blocks';
import billDetails from '../../Data/Bills/bill_details.json';

//1.login
//2.On payment dashboard ,on inbox,click schedule payment on first existing bill
//3.On Schedule payment form fill in the payment shedule details
//4.

test.describe('Editing first existing bill - on payment Inbox tab @sanity @poc', () => {
  let currPayInboxBuildingBlocks: PayInboxBuildingBlocks;
  let currMelioLoginBuildingBlock: MelioLoginBuildingBlock;
  let currPaymentInboxPage: PaymentInboxPage;

  let page: Page;

  test.beforeEach(async ({ browser }) => {
    // Create a new incognito browser context with a proper user agent
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/melio Safari/537.36'
    });

    page = await context.newPage();
    currMelioLoginBuildingBlock = new MelioLoginBuildingBlock(page);
    currPayInboxBuildingBlocks = new PayInboxBuildingBlocks(page);

    currPaymentInboxPage = new PaymentInboxPage(page);

    await currMelioLoginBuildingBlock.gotoLoginPage();
    const username = process.env.USERNAME1; // || '';
    const password = process.env.PASSWORD1; // || '';

    if (username != undefined && password != undefined) await currMelioLoginBuildingBlock.login(username, password);
    else {
      console.log('problem reading the enviornment file');
      throw new Error('problem reading the enviornment file');
    }
  });

  test('Edit first existing bill - on payment Inbox tab ***positive flow***', async () => {
    await currPayInboxBuildingBlocks.editBillDetails(billDetails);

    await test.step('validate SAVE BUTTON is hidden after pressing save on PayInbox tab page(BILL DETAILS)', async () => {
      await expect(currPaymentInboxPage.saveButton).toBeHidden();
    });
  });

  test.afterEach(async () => {
    await page.close();
    console.log('closed browser, test finished');
  });
}); //describe
