import { formattingPhoneNumber, sanitizePhoneNumber } from '@/phone';

describe('Testing Phone Utils', () => {
  describe('Testing formatting phone number should be return correctly', () => {
    it.each`
      args
      ${'087823397132'}
      ${'87823397132'}
      ${'6287823397132'}
      ${'+6287823397132'}
      ${'+62 878 2339 7132'}
      ${'+62_878_233_9_7132'}
      ${'+6_2_8_7_8_2_3_3_9_7*1*3*2'}
    `(
      'Format phone number $args should be return "+62 878 2339 7132"',
      ({ args }) => {
        expect(formattingPhoneNumber(args)).toBe('+62 878 2339 7132');
      }
    );
  });

  describe('Testing sanitize phone number should be return correctly', () => {
    it.each`
      args                     | output
      ${'+6287823397132'}      | ${'087823397132'}
      ${'87823397132'}         | ${'087823397132'}
      ${'6287823397132'}       | ${'087823397132'}
      ${'+6287823397132'}      | ${'087823397132'}
      ${'+62 878 2339 7132'}   | ${'087823397132'}
      ${'62 878 2339 7132'}    | ${'087823397132'}
      ${'(62) 878 2339 7132'}  | ${'087823397132'}
      ${'(+62) 878 2339 7132'} | ${'087823397132'}
    `(
      'Format phone number $args should be return $output',
      ({ args, output }) => {
        expect(sanitizePhoneNumber(args)).toBe(output);
      }
    );
  });
});
