import { test, Page, expect } from '@playwright/test';
import { PaymentInboxPage } from '../pages/MelioSinglePaymentFlow/PaymentDashboard/PayInboxPage';
import { BillPageDetails } from '../types/BillDetails';
import DateOperations from '../utils/time-utils/dates';

export class PayInboxBuildingBlocks {
  readonly page: Page;
  readonly currPaymentInboxPage: PaymentInboxPage;

  constructor(page: Page) {
    this.page = page;
    this.currPaymentInboxPage = new PaymentInboxPage(page);
  }

  async editBillDetails(billPageDetails: BillPageDetails) {
    await this.currPaymentInboxPage.clickActionsAndEditBill();

    await this.currPaymentInboxPage.setVendor(billPageDetails.vendor_name);

    await this.currPaymentInboxPage.setBillAmount(billPageDetails.amount);
    await test.step('set DUE DATE on PayInbox tab page(BILL DETAILS)', async () => {
      await this.currPaymentInboxPage.setDueDate();
    });

    await this.currPaymentInboxPage.setInvoiceNumber(billPageDetails.invoice_number);

    await this.currPaymentInboxPage.setNoteToSelf(billPageDetails.note);

    await this.currPaymentInboxPage.clickSave();

    await test.step('validate VENDOR NAME after save on PayInbox tab page(BILL DETAILS)', async () => {
      //validate vendor change
      const actualSelectedVendor = await this.currPaymentInboxPage.getVendorNameAfterSave();
      expect(actualSelectedVendor).toBe(billPageDetails.vendor_name);
    });

    await test.step('validate BILL AMOUNT after save on PayInbox tab page(BILL DETAILS)', async () => {
      //validate amount change
      const actualBillAmount = await this.currPaymentInboxPage.getAmount();
      expect(actualBillAmount).toBe(billPageDetails.amount);
      //await expect(this.currPaymentInboxPage.billAmount).toHaveText(billPageDetails.amount);
    });
    await test.step('validate DUE DATE after save on PayInbox tab page(BILL DETAILS)', async () => {
      //validate due date change
      const actualDueDate = await this.currPaymentInboxPage.getDueData();
      const expectedDate = DateOperations.convertTextSlashedDateToUsShortMonthUs(billPageDetails.due_date);
      expect(actualDueDate).toBe(expectedDate);
    });
    await test.step('validate INVOICE NUMBER after save on PayInbox tab page(BILL DETAILS)', async () => {
      //validate invoice number change
      const actualInvoiceNumber = await this.currPaymentInboxPage.getInvoiceNumber();
      expect(actualInvoiceNumber).toBe(billPageDetails.invoice_number);
    });

    await test.step('validate NOTE TO SELF after save on PayInbox tab page(BILL DETAILS)', async () => {
      //validate self note change
      const actualNoteToSelf = await this.currPaymentInboxPage.getNoteToSelf();
      expect(actualNoteToSelf).toBe(billPageDetails.note);
    });
  }
}
