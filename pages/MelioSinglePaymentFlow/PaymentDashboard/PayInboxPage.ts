import { test, expect, Page, Locator } from '@playwright/test';

export class PaymentInboxPage {
  readonly scheduleAPaymentButton: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.scheduleAPaymentButton = page.getByTestId('schedule-payment-button');
  }

  async goto() {
    await test.step('Go to Payment Page', async () => {
      await this.page.goto('orgs/2838724/bills?start=0&limit=20&status=unpaid&sorting=mostRecent&search=');
      await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible();
      await expect(this.page).toHaveURL(new RegExp('$bills?start=0&limit=20&status=unpaid&sorting=mostRecent&search='));
    });
  }
  async clickScheduleAPaymentButton() {
    await test.step('click Schedule a payment on PayInbox tab page', async () => {
      await this.scheduleAPaymentButton.click();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/schedule-payment/bill_'), { timeout: 15000 });
      console.log('clicked ***Schedule a payment*** on PayInbox tab page,got to schedule existing payment page succesfuly');
    });
  }

  async clickActionsAndEditBill() {
    await test.step('click Actions and edit Bill on PayInbox tab page', async () => {
      await this.scheduleAPaymentButton.click();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/schedule-payment/bill_'), { timeout: 15000 });
      console.log('got to schedule existing payment page succesfuly');
    });
  }
}
