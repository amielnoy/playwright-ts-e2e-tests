import { test, expect, Page, Locator } from '@playwright/test';

export class PayScheduledPage {
  readonly scheduledPaymentDetailsMenu: Locator;
  readonly scheduledPaymentDetailsMenuItemCancel: Locator;
  readonly cancelConfirmationPopUp: Locator;
  readonly noScheduledItemsMessage: Locator;
  readonly tabScheduled: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.scheduledPaymentDetailsMenu = page.getByTestId('scheduled-payment-details-menu');
    this.scheduledPaymentDetailsMenuItemCancel = page.getByTestId('scheduled-payment-details-menu-cancel');
    this.cancelConfirmationPopUp = page.getByTestId('modal-btn-primary');
    this.noScheduledItemsMessage = page.getByText('Your bill details will show here');
    this.tabScheduled = page.getByTestId('tab_scheduled');
  }

  async clickMenuCancelSceduledPayment() {
    await test.step('click Actions and edit Bill on PayInbox tab page', async () => {
      await this.scheduledPaymentDetailsMenu.click();
      await this.scheduledPaymentDetailsMenuItemCancel.click();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      //await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/pay/scheduled/pymnt_'),{timeout: 15000});
      console.log('got to schedule existing payment page succesfuly');
    });
  }

  async clickCancelScheduledPayment() {
    await test.step('click Actions and edit Bill on PayInbox tab page', async () => {
      console.log('before canceling scheduled payment on scheduled payments page succesfuly');
      await this.cancelConfirmationPopUp.click();
      await expect(this.noScheduledItemsMessage).toBeVisible({ timeout: 10000 });
      console.log('After **canceling scheduled payment** on scheduled payments page succesfuly');
    });
  }
}
