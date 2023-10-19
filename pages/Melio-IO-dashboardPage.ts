import { test, expect, Page, Locator } from '@playwright/test';

export class MelioIoDashboardPage {
  readonly vendorTabButton: Locator;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.vendorTabButton = page.getByTestId('left-layout-menu-Vendors');
  }

  async clickVendorsTabButton() {
    await test.step('click VENDORS TAB button on Melio IO left dashboard tab page', async () => {
      await this.vendorTabButton.click();
      //await expect(this.createVendorButton, 'Pay page loaded').toBeVisible({ visible: false });
      await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/vendors/vendor_'), { timeout: 15000 });
      console.log('clicked ***Vendors Tab button*** Melio IO left dashboard tab page');
    });
  }
}
