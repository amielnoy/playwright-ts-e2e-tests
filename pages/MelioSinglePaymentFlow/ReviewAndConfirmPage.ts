import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ReviewAndConfirmPage extends BasePage {
  readonly confirmAndSchedulePaymentButton: Locator;
  readonly memoForVendorTitle: Locator;
  readonly nextPagePaymentSceduleTitle: Locator;

  constructor(page: Page) {
    super(page);
    // eslint-disable-next-line max-len
    this.confirmAndSchedulePaymentButton = page.getByTestId('layout-next-button');
    this.nextPagePaymentSceduleTitle = page.getByTestId('layout-title');
    this.memoForVendorTitle = page.getByTestId('layout-title');
  }

  get memoForVendorLabel() {
    return this.memoForVendorTitle.textContent();
  }

  async clickContinueAfterReviewAndConfirm() {
    await test.step('Click confirm and schedule button on Review and confirm  Page', async () => {
      console.log('Before clicking Continue button on add Payor a memo Page,Got to Review and confirm page');
      await this.confirmAndSchedulePaymentButton.click();
      await expect(this.nextPagePaymentSceduleTitle).toBeVisible();
      console.log(
        'clicked succesfuly: ***confirm and schedule payment*** button on Review & Confirm Page,Got to Payment scheduled confirmation message page'
      );
    });
  }
}
