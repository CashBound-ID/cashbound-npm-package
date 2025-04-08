import { JestBuilder } from '@cashbound-id/jest/utils';

import { requestAnimationHandler } from '@/animation';

type Args = Parameters<typeof requestAnimationHandler>[0];

const animateFnSpy = jest.fn();
const onFinishSpy = jest.fn();
const registerRequestAnimationFnSpy = jest.fn();
const MOCK_ARGS: Args = {
  animateFn: animateFnSpy,
  duration: 1000,
  onFinish: onFinishSpy,
  registerRequestAnimationFn: registerRequestAnimationFnSpy
};

describe('Testing Animation Test Utils', () => {
  beforeEach(jest.clearAllMocks);

  it('Testing animation test utils should be working properly', () => {
    jest.useFakeTimers();

    requestAnimationHandler(MOCK_ARGS);
    JestBuilder.test(onFinishSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1500);

    /**
     * Expect the args should be called
     */
    JestBuilder.test(onFinishSpy).toHaveBeenCalledTimes(1);
    JestBuilder.test(animateFnSpy).toHaveBeenCalled();
    JestBuilder.test(registerRequestAnimationFnSpy).toHaveBeenCalled();
  });

  it('Testing animation test utils withoud defined registerRequestAnimationFn argument should be working properly', () => {
    jest.useFakeTimers();

    requestAnimationHandler({
      ...MOCK_ARGS,
      registerRequestAnimationFn: undefined
    });
    JestBuilder.test(onFinishSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1500);

    /**
     * Expect the args should be called
     */
    JestBuilder.test(onFinishSpy).toHaveBeenCalledTimes(1);
    JestBuilder.test(animateFnSpy).toHaveBeenCalled();
  });
});
