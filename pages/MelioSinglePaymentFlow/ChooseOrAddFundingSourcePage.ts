import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ChooseFundingSourcePage extends BasePage {
  readonly continueAfterFundingChosenButton: Locator;
  readonly nextPageLayoutTitle: Locator;

  constructor(page: Page) {
    super(page);
    // eslint-disable-next-line max-len
    this.continueAfterFundingChosenButton = page.getByTestId('layout-next-button');
    this.nextPageLayoutTitle = page.getByTestId('layout-title');
  }

  async clickContinueAfterFundingSourceChosenButton() {
    await test.step('Click Continue button on choose/Add funding source Page', async () => {
      await this.continueAfterFundingChosenButton.click();
      await expect(this.nextPageLayoutTitle).toBeVisible({ timeout: 15000 });
      console.log('clicked succesfuly: Continue button on choose/Add funding source Page,Got to scedule payment page');
    });
  }
}
