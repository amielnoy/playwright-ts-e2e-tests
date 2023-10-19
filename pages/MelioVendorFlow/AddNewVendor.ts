import { test, expect, Page, Locator } from '@playwright/test';
import WebElementsOperations from '../../utils/gui-utils/WebElementsOperations';

export class AddNewVendorPage {
  readonly addNewVendorTitle: Locator;
  readonly vendorBuisnessNameEdit: Locator;
  readonly vendorAlreadyExistMessage: Locator;
  readonly vendorContactName: Locator;
  readonly vendorEmail: Locator;
  readonly vendorPhone: Locator;

  readonly continueButton: Locator;
  readonly nextPageVendorDeliveryMethodHeader: Locator;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.addNewVendorTitle = page.getByTestId('layout-title');
    this.vendorBuisnessNameEdit = page.getByTestId('form-input-companyName');
    this.vendorAlreadyExistMessage = page.getByTestId('form-error-message-companyName');

    this.vendorContactName = page.getByTestId('form-input-fullName');
    this.vendorEmail = page.getByTestId('form-input-email');
    this.vendorPhone = page.getByTestId('form-input-phone');

    this.continueButton = page.getByTestId('layout-next-button');
    this.nextPageVendorDeliveryMethodHeader = page.getByTestId('layout-title');
  }

  async setVendorBuisnessNameEdit(VendorBuisnessName: string) {
    await test.step('set vendor buisness name on Add new vendor page', async () => {
      await this.vendorBuisnessNameEdit.fill(VendorBuisnessName);
      console.log('set vendor buisness name on Add new vendor page succesfully');
    });
  }

  async getEditVendorBuisnessEdit() {
    const inputSelector = '[data-testid="form-input-companyName"]';
    // Get the value of the input element
    const selectedVendor = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);

    console.log('selectedVendor:', selectedVendor);
    return selectedVendor;
  }

  async setVendorContactName(vendorContactName: string) {
    await test.step('set vendor contact name on Add new vendor page', async () => {
      await WebElementsOperations.setEditText(this.vendorContactName, vendorContactName);
      console.log('set **VENDOR CONTACT NAME** on Add new vendor page succesfully');
    });
  }

  async getAVendorContactName() {
    const inputSelector = '[data-testid="form-input-fullName"]';
    // Get the text content of the input element
    const vendorContactName = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);

    console.log('VendorContactName:', vendorContactName);
    return vendorContactName;
  }

  async setVendorEmail(vendorEmail: string) {
    await test.step('set VENDOR EMAIL ADDRESS on Add new vendor', async () => {
      await this.vendorEmail.fill(vendorEmail);
      //await this.page.pause()
      console.log('set VENDOR EMAIL ADDRESS on Add new vendor was set succesfully');
    });
  }

  async getVendorEmail() {
    const inputSelector = '[data-testid="form-input-email"]';
    // Get the text content of the input element
    const vendorEmail = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);

    console.log('vendor email:', vendorEmail);
    return vendorEmail;
  }

  async setPhoneNumber(vendorPhoneNumber: string) {
    await test.step('set VENDOR PHONE NUMBER on Add new vendor', async () => {
      await this.vendorPhone.fill(vendorPhoneNumber);
      //await this.page.pause()
      console.log('set VENDOR PHONE NUMBER on Add new vendor was set succesfully');
    });
  }

  async getPhoneNumber() {
    const inputSelector = '#phone';
    // Get the text content of the input element
    const vendorPhone = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return input ? input.value : null;
    }, inputSelector);

    console.log('vendor Phone:', vendorPhone);
    return vendorPhone;
  }

  async clickContinue(vendorName: string) {
    await test.step('click CONTINUE BUTTON on Add new vendor page', async () => {
      await this.continueButton.click();
      await expect(this.nextPageVendorDeliveryMethodHeader).toContainText('How would ' + vendorName + ' like to receive payments?');
      console.log('clicked CONTINUE BUTTON on Add new vendor page succesfully');
    });
  }
}
