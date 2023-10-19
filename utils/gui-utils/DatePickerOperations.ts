import { Page, Locator } from '@playwright/test';
import DateOperations from '../time-utils/dates';

export default class DatePickerOperations {
  static lastChosenDate: string;

  static async chooseNextValidDateRelativeToToday(page: Page, oldMonth: number): Promise<number | null | undefined> {
    const today: Date = new Date();
    let dayInMonth = today.getDate();

    console.log(dayInMonth);

    dayInMonth = today.getDate();

    await DatePickerOperations.GotoCurrentMonth(page, oldMonth);
    let isDayNotValid = await DatePickerOperations.isValidDayInDatePicker(page, dayInMonth);
    while (isDayNotValid === true) {
      //get next date
      today.setDate(today.getDate() + 1);
      const dayInMonth = today.getDate();

      //day is in next month
      if (dayInMonth === 1) {
        //advance month to next month on date picker
        await page.getByTestId('calendar-next-month-button').click();
      }
      //get enabled/disabled property
      isDayNotValid = await DatePickerOperations.isValidDayInDatePicker(page, dayInMonth);
    }
    DatePickerOperations.lastChosenDate = DateOperations.convertDateToUsShortMonthUs(today);
    //if day is valid return it
    return today.getDate();
  }
  //precondition DatePicker in present!
  static async GotoCurrentMonth(page: Page, oldMonth: number): Promise<void> {
    const today: Date = new Date();
    const currMonth = today.getMonth() + 1;

    const monthDelta: number = currMonth - oldMonth;

    console.log(monthDelta);
    //dayInMonth=30
    const maxIterations = monthDelta;

    const buttonSelector = '[data-testid="calendar-next-month-button"]';

    for (let i = 0; i < maxIterations; i++) {
      await page.evaluate((selector) => {
        const button = document.querySelector(selector) as HTMLButtonElement | null;

        if (button) {
          button.click();
        } else {
          throw new Error('Button not found');
        }
      }, buttonSelector);
      // Add a delay or wait for some condition if needed between the clicks
    }

    console.log(maxIterations + ' Clicks succeeded.');

    console.log('got to current month');
  }

  static async isValidDayInDatePicker(page: Page, currentDayInMonth: number): Promise<boolean | undefined> {
    const currDayInMonthWebElement: Locator = page.getByTestId('calendar-day-'.concat(currentDayInMonth.toString()));
    const isDayNotValid = await currDayInMonthWebElement.getAttribute('aria-disabled');
    console.log(isDayNotValid);

    let isDayNotValidBoolean: boolean;
    if (isDayNotValid != null) {
      isDayNotValidBoolean = JSON.parse(isDayNotValid);
      return isDayNotValidBoolean;
    } else return undefined;
  }
}
