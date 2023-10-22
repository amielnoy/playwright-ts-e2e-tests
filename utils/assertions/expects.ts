import { expect } from '@playwright/test';

export default class CustomizedExpects {
  public static expectStringValues(actualValue: string | null, expectedValue: string | null, varribleName: string) {
    expect(actualValue, `${varribleName}(ACTUAL VALUE)=${actualValue} should be===${expectedValue}=${varribleName} (EXPECTED VALUE)`).toBe(
      expectedValue
    );
    console.log(`${varribleName} ACTUAL VALUE=***${actualValue}*** should be===***${expectedValue}***=${varribleName} EXPECTED VALUE`);
  }
}
