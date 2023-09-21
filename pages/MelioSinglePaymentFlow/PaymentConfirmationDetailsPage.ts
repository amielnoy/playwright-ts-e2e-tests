import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class PaymentConfirmationDetailsPage extends BasePage {
  readonly statusVideo: Locator;
  readonly gotoDashboardButton: Locator;
  readonly notifyVendorButton: Locator;
  readonly paymentDetailsLabel: Locator;
  readonly paymentStatusLabel: Locator;
  readonly nextPagePaymentSceduledTitle: Locator;

  constructor(page: Page) {
    super(page);
    // eslint-disable-next-line max-len
    this.gotoDashboardButton = page.getByTestId('layout-next-button');
    this.notifyVendorButton = page.getByTestId('notify-vendor-button');
    this.paymentDetailsLabel = page.getByTestId('layout-description');
    this.paymentStatusLabel = page.getByTestId('layout-title');
    this.statusVideo = page.locator('video');
    this.nextPagePaymentSceduledTitle = page.getByText('Payment scheduled');
  }

  get paymentDetails() {
    return this.paymentDetailsLabel.textContent();
  }

  get paymentLabel() {
    return this.paymentDetailsLabel.textContent();
  }

  async clickGotoDashboard() {
    await test.step('Click goto dashboard button on payment confirmation Page', async () => {
      console.log('Before clicking Continue button on add Payor a memo Page,Got to Review and confirm page');

      await this.gotoDashboardButton.click();
      await expect(this.nextPagePaymentSceduledTitle).toBeVisible({ timeout: 15000 });

      console.log('clicked succesfuly: ***goto payment dashboard(scheduled)*** button on Payments sceduled tab page');
    });
  }
}
