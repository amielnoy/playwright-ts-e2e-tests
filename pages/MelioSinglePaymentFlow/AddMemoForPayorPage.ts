import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AddMemoForPayorPage extends BasePage {
  readonly continueButton: Locator;
  readonly memoForVendorTitle: Locator;
  readonly nextPageReviewAndConfirmLayoutTitle: Locator;

  constructor(page: Page) {
    super(page);
    // eslint-disable-next-line max-len
    this.continueButton = page.getByTestId('layout-next-button');
    this.nextPageReviewAndConfirmLayoutTitle = page.getByTestId('layout-title');
    this.memoForVendorTitle = page.getByTestId('layout-title');
  }

  get memoForVendorLabel() {
    return this.memoForVendorTitle.textContent();
  }

  async clickContinueAfterFillingMemo() {
    await test.step('Click Continue button on AddMemoForPayorPage Page', async () => {
      console.log('Before clicking Continue button on add Payor a memo Page,Got to Review and confirm page');
      await this.continueButton.click();
      await expect(this.nextPageReviewAndConfirmLayoutTitle).toBeVisible();
      console.log('clicked succesfuly: Continue button on add Payor a memo Page,Got to Review and confirm page');
    });
  }
}
