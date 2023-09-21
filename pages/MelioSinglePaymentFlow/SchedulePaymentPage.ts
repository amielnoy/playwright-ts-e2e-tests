import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SchedulePaymentPage extends BasePage {
  readonly continueAfterSchedulingButton: Locator;
  readonly nextPageAddMemoLayoutTitle: Locator;

  constructor(page: Page) {
    super(page);
    // eslint-disable-next-line max-len
    this.continueAfterSchedulingButton = page.getByTestId('layout-next-button');
    this.nextPageAddMemoLayoutTitle = page.getByTestId('layout-title');
  }

  async clickContinueAfterScheduling() {
    await test.step('Click Continue button on Scheduling payment Page', async () => {
      await this.continueAfterSchedulingButton.click();
      await expect(this.nextPageAddMemoLayoutTitle).toBeVisible();
      console.log('clicked succesfuly: Continue button on Scheduling Page,Got to Add Memo  page');
    });
  }
}
