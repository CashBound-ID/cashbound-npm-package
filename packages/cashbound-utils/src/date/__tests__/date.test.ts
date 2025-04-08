import dayjs from 'dayjs';

import {
  convertEpochToDate,
  convertStringToDate,
  convertToEpoch,
  convertToFormattedDate,
  formatTimeUnit,
  setBeginningOfDay,
  setEndOfDay,
  setFirstDayOfMonth,
  setLastDayOfMonth
} from '@/date';

describe('Testing Date Utils', () => {
  describe('Testing formatTimeUnit method', () => {
    it.each`
      testCase                                             | input        | output
      ${'Testing with argument is number'}                 | ${0}         | ${'00'}
      ${'Testing with argument is number ||'}              | ${19}        | ${'19'}
      ${'Testing with argument is number greater than 59'} | ${200}       | ${'00'}
      ${'Testing with argument is number lower than 0'}    | ${-10}       | ${'00'}
      ${'Testing with argument is string'}                 | ${'testing'} | ${'00'}
      ${'Testing with argument is null'}                   | ${null}      | ${'00'}
      ${'Testing with argument is undefined'}              | ${undefined} | ${'00'}
    `('$testCase', ({ input, output }) => {
      expect(formatTimeUnit(input)).toBe(output);
    });
  });

  describe('Testing convertStringToDate method', () => {
    it.each`
      testCase                                                                           | input                           | output
      ${'Testing with argument is date string format should be return date'}             | ${'09/09/2003'}                 | ${new Date('09/09/2003')}
      ${'Testing with argument is date string format should be return date II'}          | ${'07/01/2023'}                 | ${new Date('07/01/2023')}
      ${'Testing with argument is string not date format should be return undefined'}    | ${'07/JJJ/2023'}                | ${undefined}
      ${'Testing with argument is string not date format should be return undefined II'} | ${'lorem ipsum dolor sim amet'} | ${undefined}
      ${'Testing with argument is undefined should be return undefined'}                 | ${undefined}                    | ${undefined}
      ${'Testing with argument is null should be return undefined'}                      | ${null}                         | ${undefined}
    `('$testCase', ({ input, output }) => {
      expect(convertStringToDate(input)?.getTime()).toBe(
        output ? output.getTime() : undefined
      );
    });
  });

  describe('Testing convertEpochToDate method', () => {
    it.each`
      testCase                                              | input           | output
      ${'Testing with argument is number'}                  | ${1743724800}   | ${new Date('2025-04-04T00:00:00.000Z')}
      ${'Testing with argument is number but lower than 0'} | ${-10}          | ${undefined}
      ${'Testing with argument is string'}                  | ${'2025/04/04'} | ${undefined}
      ${'Testing with argument is undefined'}               | ${undefined}    | ${undefined}
      ${'Testing with argument is null'}                    | ${null}         | ${undefined}
    `('$testCase', ({ input, output }) => {
      expect(convertEpochToDate(input)?.getTime()).toBe(
        output ? output.getTime() : undefined
      );
    });
  });

  describe('Testing convertToFormattedDate method', () => {
    it.each`
      testCase                                                      | date                            | format                   | output
      ${'Testing with format date "MMMM D, YYYY h:mm A"'}           | ${new Date('09/08/1980')}       | ${'MMMM D, YYYY h:mm A'} | ${'September 8, 1980 12:00 AM'}
      ${'Testing with format date "DD MMM YYYY"'}                   | ${new Date('01/04/2005')}       | ${'DD MMM YYYY'}         | ${'04 Jan 2005'}
      ${'Testing with date is number (epoch)'}                      | ${1743779886000}                | ${'DD MMM YYYY'}         | ${'04 Apr 2025'}
      ${'Testing with date is string (04 Apr 2025)'}                | ${'04 Apr 2025'}                | ${'DD MMM YYYY'}         | ${'04 Apr 2025'}
      ${'Testing with date is string (lorem ipsum dolor sim amet)'} | ${'lorem ipsum dolor sim amet'} | ${'DD MMM YYYY'}         | ${undefined}
      ${'Testing with date is undefined'}                           | ${undefined}                    | ${'DD MMM YYYY'}         | ${undefined}
      ${'Testing with date is null'}                                | ${null}                         | ${'DD MMM YYYY'}         | ${undefined}
    `('$testCase should returning "$output"', ({ date, format, output }) => {
      expect(convertToFormattedDate(date, format)).toBe(output);
    });
  });

  describe('Testing convertToEpoch method', () => {
    it.each`
      testCase                                                      | date                            | output
      ${'Testing with format date "DD MMM YYYY"'}                   | ${new Date('01/04/2005')}       | ${1104771600}
      ${'Testing with date is number (epoch)'}                      | ${1743724800000}                | ${1743724800}
      ${'Testing with date is string (Friday, 4 April 2025 00.00)'} | ${'04 Apr 2025 07:00:00'}       | ${1743724800}
      ${'Testing with date is string (lorem ipsum dolor sim amet)'} | ${'lorem ipsum dolor sim amet'} | ${undefined}
      ${'Testing with date is undefined'}                           | ${undefined}                    | ${undefined}
      ${'Testing with date is null'}                                | ${null}                         | ${undefined}
    `('$testCase should returning "$output"', ({ date, output }) => {
      expect(convertToEpoch(date)).toBe(output);
    });
  });

  it('Testing setBeginningOfDay method should be working properly', () => {
    expect(
      dayjs(setBeginningOfDay(new Date('01/01/2001'))).format(
        'DD MMM YYYY HH:mm:ss'
      )
    ).toBe('01 Jan 2001 00:00:00');
  });

  it('Testing setEndOfDay method should be working properly', () => {
    expect(
      dayjs(setEndOfDay(new Date('01/01/2001'))).format('DD MMM YYYY HH:mm:ss')
    ).toBe('01 Jan 2001 23:59:59');
  });

  it('Testing setFirstDayOfMonth method should be working properly', () => {
    expect(
      dayjs(setFirstDayOfMonth(new Date('01/25/2001'))).format(
        'DD MMM YYYY HH:mm:ss'
      )
    ).toBe('01 Jan 2001 00:00:00');
  });

  it('Testing setLastDayOfMonth method should be working properly', () => {
    expect(
      dayjs(setLastDayOfMonth(new Date('01/25/2001'))).format(
        'DD MMM YYYY HH:mm:ss'
      )
    ).toBe('31 Jan 2001 00:00:00');
  });
});
