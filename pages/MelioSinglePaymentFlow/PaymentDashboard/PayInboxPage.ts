import { test, expect, Page, Locator } from '@playwright/test';
import WebElementsOperations from '../../../utils/gui-utils/WebElementsOperations';
//import DatePickerOperations from '../../../utils/gui-utils/datePickerOperations'
import DateOperations from '../../../utils/time-utils/dates';
import DatePickerOperations from '../../../utils/gui-utils/datePickerOperations';

export class PaymentInboxPage {
  readonly scheduleAPaymentButton: Locator;
  readonly scheduledPaymentDetailsMenu: Locator;
  readonly scheduledPaymentDetailsMenuItemCancel: Locator;
  readonly scheduledPaymentDetailsMenuItemEdit: Locator;

  readonly VendorName: Locator;
  readonly VendorAfterSave: Locator;

  readonly billAmount: Locator;
  readonly dueDate: Locator;
  readonly invoiceNumber: Locator;
  readonly invoiceNumberAfterSave: string;

  readonly noteToSelf: Locator;
  readonly noteToSelfAfterSave: string;
  readonly saveButton: Locator;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.scheduleAPaymentButton = page.getByTestId('schedule-payment-button');
    this.scheduledPaymentDetailsMenu = page.getByTestId('bill-details-menu');
    this.scheduledPaymentDetailsMenuItemCancel = page.getByTestId('bill-details-menu-delete');
    this.scheduledPaymentDetailsMenuItemEdit = page.getByTestId('bill-details-menu-edit');

    this.VendorName = page.getByTestId('form-input-vendorId');
    this.VendorAfterSave = page.getByTestId('select-container');

    this.billAmount = page.getByTestId('form-input-totalAmount');
    this.dueDate = page.getByTestId('form-input-dueDate');
    this.invoiceNumber = page.getByTestId('form-input-billNumber');
    this.invoiceNumberAfterSave = '#billNumber';

    this.noteToSelf = page.getByTestId('form-input-noteToSelf');
    this.noteToSelfAfterSave = '#noteToSelf';

    this.saveButton = page.getByLabel('Save');
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
      await this.scheduledPaymentDetailsMenu.click();
      await this.scheduleAPaymentButton.click();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/schedule-payment/bill_'), { timeout: 15000 });
      console.log('clicked ***Edit bill menu item*** on PayInbox tab page succesfuly');
    });
  }

  async clickActionsAndEditBill() {
    await test.step('click Actions and edit Bill on PayInbox tab page', async () => {
      await this.scheduledPaymentDetailsMenu.click();
      await this.scheduledPaymentDetailsMenuItemEdit.click();

      await expect(this.scheduledPaymentDetailsMenu).toBeHidden();
      await expect(this.scheduledPaymentDetailsMenuItemEdit).toBeHidden();
      //await expect(this.scheduleAPaymentButton, 'Pay page loaded').toBeVisible({ visible: false });
      await expect(this.page).toHaveURL(new RegExp('^https://app.melio.com/melio/pay/inbox/bill_'), { timeout: 15000 });
      console.log('got to schedule existing payment page succesfuly');
    });
  }

  async setVendor(VendorName: string) {
    await test.step('set vendor name on PayInbox tab page(BILL DETAILS)', async () => {
      WebElementsOperations.setSelectText(this.VendorName, VendorName);
      console.log('set vendor name on PayInbox tab page(BILL DETAILS) succesfully');
    });
  }

  async getVendorNameOnEdit(): Promise<string | null> {
    const inputSelector = '[data-testid="form-input-vendorId"]';
    // Get  vendor name input element
    //const selectedVendor = await this.page.$eval(inputSelector, (input) => (input as HTMLInputElement).value);
    const selectedVendor = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);
    console.log('selectedVendor:', selectedVendor);
    if (selectedVendor != null) return selectedVendor;
    else return null;
  }

  async getVendorNameAfterSave() {
    return await this.VendorAfterSave.textContent();
  }

  async setBillAmount(amount: string) {
    await test.step('set BILL AMOUNT on PayInbox tab page(BILL DETAILS)', async () => {
      await WebElementsOperations.setEditText(this.billAmount, amount);
      console.log('set BILL AMOUNT on PayInbox tab page(BILL DETAILS) succesfully');
    });
  }

  async getAmount() {
    const inputSelector = '#totalAmount';
    // Get the text content of the input element
    //const totalAmount = await this.page.$eval(inputSelector, (input) => (input as HTMLInputElement).value)
    const totalAmount = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);

    console.log('selectedVendor:', totalAmount);

    if (totalAmount != null) return totalAmount;
    else return null;
  }

  async setDueDate() {
    const currentDateString: string | null = await this.getDueData();
    if (currentDateString) {
      const oldMonthStr: string = currentDateString.split(' ')[0];
      const numeriaclOldMonth: number = DateOperations.getNumericalMonth(oldMonthStr);

      await this.page.getByTestId('form-input-dueDate').click();

      const validDayInMonth = await DatePickerOperations.chooseNextValidDateRelativeToToday(this.page, numeriaclOldMonth);
      if (validDayInMonth != null && validDayInMonth != undefined)
        await this.page.getByTestId('calendar-day-'.concat(validDayInMonth.toString())).click();
      //await this.page.pause()
      console.log('set INVOICE NUMBER on PayInbox tab page(BILL DETAILS) succesfully');
    } else {
      console.log('error due date is null!!');
    }
  }

  async getDueData() {
    //await test.step('get DUE DATE on PayInbox tab page(BILL DETAILS)', async () => {
    const inputSelector = '#dueDate';
    // Get the text content of the input element
    //const dueDate = await this.page.$eval(inputSelector, (input) => (input as HTMLInputElement).value);
    const dueDate = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);

    console.log('DueDate:', dueDate);
    return dueDate;
    //})
  }

  async setInvoiceNumber(invoiceNumberText: string) {
    await test.step('set INVOICE NUMBER on PayInbox tab page(BILL DETAILS)', async () => {
      await WebElementsOperations.setEditText(this.invoiceNumber, invoiceNumberText);
      console.log('set INVOICE NUMBER on PayInbox tab page(BILL DETAILS) succesfully');
    });
  }

  async getInvoiceNumber() {
    // Get the text content of the input element
    //const invoiceNumber = await this.page.$eval(this.invoiceNumberAfterSave, (input) => (input as HTMLInputElement).value);
    const invoiceNumber = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, this.invoiceNumberAfterSave);

    console.log('InvoiceNumber:', invoiceNumber);
    return invoiceNumber;
  }

  async setNoteToSelf(noteTpSelf: string) {
    await test.step('set NOTE TO SELF on PayInbox tab page(BILL DETAILS)', async () => {
      await WebElementsOperations.setEditText(this.noteToSelf, noteTpSelf);
      //await expect(this.billAmount).toHaveText(amount,{timeout:15000});
      console.log('set NOTE TO SELF on PayInbox tab page(BILL DETAILS) succesfully');
    });
  }

  async getNoteToSelf() {
    //await test.step('get NOTE TO SELF on PayInbox tab page(BILL DETAILS)', async () => {
    // Get the text content of the input element
    //const noteToSelf = await this.page.$eval(this.noteToSelfAfterSave, (input) => (input as HTMLInputElement).value);

    const noteToSelf = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, this.noteToSelfAfterSave);
    console.log('NoteToSelfAfterSave:', noteToSelf);
    return noteToSelf;
    //})
  }

  async clickSave() {
    await test.step('click SAVE BUTTON on PayInbox tab page(BILL DETAILS)', async () => {
      await this.saveButton.click();
      await expect(this.saveButton).toBeHidden();
      console.log('set SAVE BUTTON on PayInbox tab page(BILL DETAILS) succesfully');
    });
  }

  public static getNewVendorCard(newVendorName: string, page: Page) {
    return page.getByText(newVendorName.toUpperCase().charAt(0) + newVendorName);
  }

  async validateNewVendorExistsAndFocused(newVendorName: string) {
    await test.step('validate new vendor card visible and focused on PayInbox tab page LEFT INNER TAB', async () => {
      const newVendorCardLocator: Locator = PaymentInboxPage.getNewVendorCard(newVendorName, this.page).nth(1);

      await expect(newVendorCardLocator).toBeVisible();
      expect(newVendorCardLocator.getAttribute('data-selected')).toBeTruthy();
      console.log('NEW VENDOR CARD ' + newVendorName + ' is visible and focused on PayInbox  tab page LEFT INNER TAB succesfully');
    });
  }
}
