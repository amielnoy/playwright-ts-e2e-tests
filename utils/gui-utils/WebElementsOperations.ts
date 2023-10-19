import { Locator } from '@playwright/test';

export default class WebElementsOperations {
  static async setSelectText(webElement: Locator, text: string) {
    await webElement.click();
    await webElement.fill(text);
    await webElement.press('Enter');
  }
  static async setEditText(webElement: Locator, text: string) {
    await webElement.fill(text);
  }
}
