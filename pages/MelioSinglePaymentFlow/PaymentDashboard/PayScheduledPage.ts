import { test, Page, expect, Locator } from '@playwright/test';

export class PayScheduledPage {
  readonly scheduledPaymentDetailsMenu: Locator;
  readonly scheduledPaymentDetailsMenuItemCancel: Locator;
  readonly cancelConfirmationPopUp: Locator;
  readonly noScheduledItemsMessage: Locator;
  readonly tabScheduled: Locator;
  readonly cancelScheduledPaymentShadowResponce: Locator;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.scheduledPaymentDetailsMenu = page.getByTestId('scheduled-payment-details-menu');
    this.scheduledPaymentDetailsMenuItemCancel = page.getByTestId('scheduled-payment-details-menu-cancel');
    //this.cancelConfirmationPopUp = page.getByTestId('modal-btn-primary');
    this.cancelConfirmationPopUp = page.getByLabel('Cancel payment');
    this.noScheduledItemsMessage = page.getByText('Your bill details will show here');
    this.tabScheduled = page.getByTestId('tab_scheduled');
    this.cancelScheduledPaymentShadowResponce = page.locator('#chakra-toast-manager-top').getByText('Payment canceled');
  }

  async clickMenuCancelSceduledPayment() {
    await test.step('click CANCEL MENU OPTION on PayInbox tab page', async () => {
      await this.scheduledPaymentDetailsMenu.click();
      await this.scheduledPaymentDetailsMenuItemCancel.click();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      //await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/pay/scheduled/pymnt_'),{timeout: 15000});
      console.log('got to schedule existing payment page succesfuly');
    });
  }

  async clickCancelOnConfirmationPopUpOfScheduledPayment() {
    await test.step('click CANCEL CONFIRMATION POPUP button  on PayInbox tab page', async () => {
      console.log('before canceling scheduled payment on scheduled payments page succesfuly');
      await this.cancelConfirmationPopUp.click();
      await expect(this.cancelScheduledPaymentShadowResponce).toBeVisible({ timeout: 10000 });
      //await this.page.waitForTimeout(5000);
      console.log('After **canceling scheduled payment** on scheduled payments page succesfuly');
    });
  }
}
