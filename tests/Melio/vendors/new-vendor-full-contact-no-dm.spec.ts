import { test, Page, expect } from '@playwright/test';

import { MelioLoginBuildingBlock } from '../../../building-blocks/Melio/melio_login_building_block';
import { CreateVendorBuildingBlocks } from '../../../building-blocks/Melio/Vendors/create_vendor_building_blocks';

import { MelioIoDashboardPage } from '../../../pages/Melio-IO-dashboardPage';
import { VendorsPage } from '../../../pages/MelioVendors/VendorsPage';
import { VendorPaymentMethodDriver } from '../../../pages/MelioVendorFlow/VendorPaymentMethodDriver';
import newVendorDetails from '../../../Data/Vendors/new_vendor_details.json';
import { PaymentInboxPage } from '../../../pages/MelioSinglePaymentFlow/PaymentDashboard/PayInboxPage';

import { allure } from 'allure-playwright';

test.describe('Test creation of new vendors on vendors tab', () => {
  let currMelioLoginBuildingBlock: MelioLoginBuildingBlock;
  let currCreateNewVendorBuildingBlock: CreateVendorBuildingBlocks;

  let currMelioIoDashboardPage: MelioIoDashboardPage;
  let currVendorsPage: VendorsPage;
  let currChooseVendorPaymentMethod: VendorPaymentMethodDriver;
  let currPayInboxPage: PaymentInboxPage;

  let page: Page;

  test.beforeEach(async ({ browser }) => {
    // Create a new incognito browser context with a proper user agent
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/melio Safari/537.36'
    });

    page = await context.newPage();
    currMelioLoginBuildingBlock = new MelioLoginBuildingBlock(page);
    currCreateNewVendorBuildingBlock = new CreateVendorBuildingBlocks(page);

    currMelioIoDashboardPage = new MelioIoDashboardPage(page);
    currVendorsPage = new VendorsPage(page);
    currChooseVendorPaymentMethod = new VendorPaymentMethodDriver(page);
    currPayInboxPage = new PaymentInboxPage(page);

    await currMelioLoginBuildingBlock.gotoLoginPage();
    const username = process.env.USERNAME1 || '';
    const password = process.env.PASSWORD1 || '';

    await currMelioLoginBuildingBlock.login(username, password);
  });

  test('new-vendor-full-contact-no-delivery-method @sanity @vendors', async () => {
    allure.tms('Create vendor full-contact-no-delivery-method', 'https://meliorisk.atlassian.net/browse/ME-37970');
    await currMelioIoDashboardPage.clickVendorsTabButton();

    await currCreateNewVendorBuildingBlock.createNewVendor(newVendorDetails);
    //await page.pause();
    await currChooseVendorPaymentMethod.clickSkipForNowButton(newVendorDetails.vendor_business_name);
    await currPayInboxPage.validateNewVendorExistsAndFocused(newVendorDetails.vendor_business_name);
    expect(true).toBeTruthy();
    //restore account to initial state by deleting the created vendor
    await currVendorsPage.clickMenuDeleteSceduledPayment();
    await currVendorsPage.clickDeleteOnConfirmationPopUp(newVendorDetails.vendor_business_name);
  });

  test.afterEach(async () => {
    await page.close();
    console.log('closed browser test finished');
  });
}); //describe
