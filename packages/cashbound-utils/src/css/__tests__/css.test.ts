import { cx, hexToRgba, numberToPx, pxToNumber } from '@/css';

describe('Testing CSS Utils', () => {
  describe('Testing CX method', () => {
    it.each`
      testCase                                      | args                                                       | expectedOutput
      ${'Test with argument is array'}              | ${[['ui-accordion']]}                                      | ${'ui-accordion'}
      ${'Test with argument is boolean'}            | ${[{ 'ui-accordion': true, 'ui-accordion--bold': false }]} | ${'ui-accordion'}
      ${'Test with argument is string'}             | ${['ui-accordion']}                                        | ${'ui-accordion'}
      ${'Test with argument is multiple arguments'} | ${['ui-accordion', { 'ui-accordion--bold': false }]}       | ${'ui-accordion'}
      ${'Test with argument is null'}               | ${[null]}                                                  | ${''}
    `('$testCase', ({ args, expectedOutput }) => {
      expect(cx(...args)).toBe(expectedOutput);
    });

    it('should return an empty string for no arguments', () => {
      expect(cx()).toBe('');
    });

    it('should handle strings correctly', () => {
      expect(cx('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle arrays correctly', () => {
      expect(cx(['class1', 'class2'])).toBe('class1 class2');
      expect(cx(['class1', ['class2', 'class3']])).toBe('class1 class2 class3');
    });

    it('should handle objects correctly', () => {
      expect(cx({ class1: true, class2: false, class3: true })).toBe(
        'class1 class3'
      );
    });

    it('should handle mixed input types correctly', () => {
      expect(
        cx('class1', ['class2', { class3: true, class4: false }], 'class5')
      ).toBe('class1 class2 class3 class5');
    });

    it('should handle null and undefined values', () => {
      expect(cx(null, undefined, 'class1')).toBe('class1');
    });

    it('should handle complex nested structures', () => {
      expect(cx('class1', ['class2', { class3: true }])).toBe(
        'class1 class2 class3'
      );
    });
  });

  describe('Testing numberToPx method', () => {
    it.each`
      testCase                                | input        | output
      ${'Testing with argument is number'}    | ${10}        | ${'10px'}
      ${'Testing with argument is number II'} | ${20}        | ${'20px'}
      ${'Testing with argument is string'}    | ${'string'}  | ${''}
      ${'Testing with argument is null'}      | ${null}      | ${''}
      ${'Testing with argument is undefined'} | ${undefined} | ${''}
    `('$testCase', ({ input, output }) => {
      expect(numberToPx(input)).toBe(output);
    });
  });

  describe('Testing pxToNumber method', () => {
    it.each`
      testCase                                                                  | input         | output
      ${'Testing with argument is string contain px char'}                      | ${'10px'}     | ${10}
      ${'Testing with argument is string contain px char II'}                   | ${'20px'}     | ${20}
      ${'Testing with argument is string contain px and number is not correct'} | ${'samplepx'} | ${0}
      ${'Testing with argument is number'}                                      | ${20}         | ${0}
      ${'Testing with argument is null'}                                        | ${null}       | ${0}
      ${'Testing with argument is undefined'}                                   | ${undefined}  | ${0}
    `('$testCase', ({ input, output }) => {
      expect(pxToNumber(input)).toBe(output);
    });
  });

  describe('Testing hexToRgba method', () => {
    it('Testing with color 6 digit should be return rgba format', () => {
      expect(hexToRgba('#000000')).toBe('rgba(0, 0, 0, 1)');
      expect(hexToRgba('#69acec', 0.5)).toBe('rgba(105, 172, 236, 0.5)');
    });

    it('Testing with color 3 digit should be return rgba format', () => {
      expect(hexToRgba('#FFF', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
      expect(hexToRgba('#ACD', 0.2)).toBe('rgba(170, 204, 221, 0.2)');
    });

    it('Testing with color not using correct format', () => {
      expect(() => hexToRgba('#ZZZ', 0.5)).toThrow('Invalid hex color code');
      expect(() => hexToRgba('#AAA', 3)).toThrow(
        'Alpha value must be between 0 and 1'
      );
    });
  });
});
