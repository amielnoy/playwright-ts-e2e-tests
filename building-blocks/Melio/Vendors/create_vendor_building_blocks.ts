import { test, Page, expect } from '@playwright/test';

import { AddNewVendorPage } from '../../../pages/MelioVendorFlow/AddNewVendor';
import { VendorsPage } from '../../../pages/MelioVendors/VendorsPage';

import { NewVendorDetails } from '../../../types/NewVendorDetails';

import CustomizedExpects from '../../../utils/assertions/expects';

export class CreateVendorBuildingBlocks {
  readonly page: Page;
  readonly currAddNewVendorPage: AddNewVendorPage;
  readonly currVendorsPage: VendorsPage;

  constructor(page: Page) {
    this.page = page;
    this.currAddNewVendorPage = new AddNewVendorPage(page);
    this.currVendorsPage = new VendorsPage(page);
  }

  async createNewVendor(newVendorDetails: NewVendorDetails) {
    await this.currVendorsPage.clickCreateVendorButton();

    await this.currAddNewVendorPage.setVendorBuisnessNameEdit(newVendorDetails.vendor_business_name);

    await this.currAddNewVendorPage.setVendorContactName(newVendorDetails.vendor_contact_name);

    await this.currAddNewVendorPage.setPhoneNumber(newVendorDetails.phone_number);

    await this.currAddNewVendorPage.setVendorEmail(newVendorDetails.email_address);

    await test.step('validate VENDOR BUSINESS NAME on Add new vendor page', async () => {
      //validate new vendor business name
      const actualVendorBusinessName = await this.currAddNewVendorPage.getEditVendorBuisnessEdit();
      // expect(actualVendorBusinessName,`ACTUAL=${actualVendorBusinessName} should be===${newVendorDetails.vendor_business_name}=EXPECTED`)
      // .toBe(newVendorDetails.vendor_business_name);
      CustomizedExpects.expectStringValues(actualVendorBusinessName, newVendorDetails.vendor_business_name, 'VendorBusinessName');
    });

    await test.step('validate BUSINESS CONTACT NAME  on Add new vendor page', async () => {
      //validate new vendor contact name
      const actualVendorContactName = await this.currAddNewVendorPage.getAVendorContactName();
      expect(actualVendorContactName).toBe(newVendorDetails.vendor_contact_name);
    });

    await test.step('validate PHONE NUMBER on Add new vendor page', async () => {
      //validate new vendor phone number
      const actualDueDate = await this.currAddNewVendorPage.getPhoneNumber();
      expect(actualDueDate).toBe(newVendorDetails.phone_number);
    });

    await test.step('validate VENDOR EMAIL on Add new vendor page', async () => {
      //validate new vendor email
      const actualVendorEmail = await this.currAddNewVendorPage.getVendorEmail();
      expect(actualVendorEmail).toBe(newVendorDetails.email_address);
    });

    await this.currAddNewVendorPage.clickContinue(newVendorDetails.vendor_business_name);
  }
}
