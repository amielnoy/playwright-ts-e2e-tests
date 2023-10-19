export default class DateOperations {
  static convertTextSlashedDateToUsShortMonthUs(textDate: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const dateParts = textDate.split('/');
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[0]);
    const year = parseInt(dateParts[2]);

    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(undefined, options);
    console.log(formattedDate); // Output: "Aug 9, 2023"
    return formattedDate;
  }

  static convertDateToUsShortMonthUs(date: Date): string {
    const inputDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    console.log(formattedDate);
    return formattedDate;
  }

  static getTextMonthFromShortMonthUs(textDate: string): string {
    const dateArr: string[] = textDate.split(' ');
    const textMonth = dateArr[0];
    return textMonth;
  }

  static getNumericalMonth(monthStr: string) {
    return new Date(monthStr + '-1-01').getMonth() + 1;
  }

  static isLastDay(date: Date) {
    const test = new Date(date.getTime());
    test.setDate(test.getDate() + 1);
    return test.getDate() === 1;
  }
}
