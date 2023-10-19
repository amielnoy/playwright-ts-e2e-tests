import { test, expect, Page, Locator } from '@playwright/test';

export class VendorPaymentMethodDriver {
  readonly title: Locator;
  readonly description: Locator;

  readonly vendorDeliveryMethodBankAccountCard: Locator;
  readonly vendorDeliveryMethodPaperCheck: Locator;
  readonly vendorDeliveryMethodLetVendorChoose: Locator;
  readonly skipForNowButton: Locator;
  //readonly selectedVendorOnNextPage: Locator

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId('layout-title');
    this.description = page.getByTestId('layout-description');

    this.vendorDeliveryMethodBankAccountCard = page.getByTestId('add-delivery-method-card-bank-account');
    this.vendorDeliveryMethodPaperCheck = page.getByTestId('add-delivery-method-card-paper-check');
    this.vendorDeliveryMethodLetVendorChoose = page.getByTestId('add-delivery-method-card-virtual-card');
    this.skipForNowButton = page.getByTestId('layout-next-button');
  }

  async getPhoneNumber() {
    const inputSelector = '#phone';
    // Get the text content of the input element
    const vendorPhone = await this.page.$eval(inputSelector, (input) => (input as HTMLInputElement).value);

    console.log('vendor Phone:', vendorPhone);
    return vendorPhone;
  }

  async clickSkipForNowButton(vendorName: string) {
    await test.step('click SKIP FOR NOW BUTTON on Choose vendor payment page', async () => {
      await expect(this.skipForNowButton).toBeVisible();
      await this.skipForNowButton.click();
      await expect(this.page.getByText(vendorName.toUpperCase().charAt(0) + vendorName, { exact: true })).toBeVisible();
      console.log('clicked SKIP FOR NOW BUTTON on Add new vendor page succesfully');
    });
  }
}
