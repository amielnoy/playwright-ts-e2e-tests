import { test, expect, Page, Locator } from '@playwright/test';

export class VendorsPage {
  readonly createVendorButton: Locator;
  readonly nextPageAddNewVendorHeader: Locator;

  readonly vendorMenu: Locator;
  readonly vendorMenuItemDelete: Locator;
  readonly vendorDeleteConfirmationPopUp: Locator;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.createVendorButton = page.getByRole('button', { name: 'add-icon Add new vendor' });
    this.nextPageAddNewVendorHeader = page.getByTestId('layout-title');

    this.vendorMenu = page.getByTestId('vendor-menu');
    this.vendorMenuItemDelete = page.getByTestId('vendor-menu-delete');
    this.vendorDeleteConfirmationPopUp = page.getByTestId('modal-btn-primary');
  }

  async clickCreateVendorButton() {
    await test.step('click CREATE VENDOR on Vendors page', async () => {
      await this.createVendorButton.click();
      await expect(this.nextPageAddNewVendorHeader, 'Add new vendor page apeared').toBeVisible();
      await expect(this.page).toHaveURL('https://app.melio.com/melio/vendors/new-vendor');
      console.log('clicked CREATE VENDOR on Vendors page succesfuly');
    });
  }

  async clickMenuDeleteSceduledPayment() {
    await test.step('click CANCEL MENU OPTION on PayInbox tab page', async () => {
      await this.vendorMenu.click();
      await this.vendorMenuItemDelete.click();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      //await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/pay/scheduled/pymnt_'),{timeout: 15000});
      console.log('got to schedule existing payment page succesfuly');
    });
  }

  async clickDeleteOnConfirmationPopUp(deletedVendorName: string) {
    await test.step('click CANCEL CONFIRMATION POPUP button  on PayInbox tab page', async () => {
      console.log('before canceling scheduled payment on scheduled payments page succesfuly');
      await this.vendorDeleteConfirmationPopUp.click();
      await expect(this.page.getByText(deletedVendorName.toUpperCase().charAt(0) + deletedVendorName, { exact: true })).toBeVisible({
        visible: false
      });
      console.log('After **canceling scheduled payment** on scheduled payments page succesfuly');
    });
  }
}
