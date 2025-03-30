interface RequestAnimationHandlerArgs {
  animateFn: (percentage: number) => void;
  duration: number;
  onFinish: () => void;
  registerRequestAnimationFn: (
    args: ReturnType<typeof window.requestAnimationFrame>
  ) => void;
}

/**
 * Handles animation using requestAnimationFrame.
 *
 * This function sets up an animation loop that calls the provided `animateFn`
 * with a percentage indicating the progress of the animation.
 *
 * @param {RequestAnimationHandlerArgs} args - The arguments for the animation handler.
 * @param {function} args.animateFn - The function to call for each frame of the animation,
 * which receives the progress percentage (0 to 1).
 * @param {number} args.duration - The duration of the animation in milliseconds.
 * @param {function} args.onFinish - The function to call when the animation finishes.
 * @param {function} args.registerRequestAnimationFn - A function to register the requestAnimationFrame ID.
 *
 * @example
 * requestAnimationHandler({
 *   animateFn: (percentage) => {
 *     console.log(`Animation progress: ${percentage * 100}%`);
 *   },
 *   duration: 1000,
 *   onFinish: () => {
 *     console.log('Animation finished');
 *   },
 *   registerRequestAnimationFn: (requestId) => {
 *     // Optionally store or manage the request ID
 *   }
 * });
 */
export const requestAnimationHandler = (args: RequestAnimationHandlerArgs) => {
  const { animateFn, duration, onFinish, registerRequestAnimationFn } = args;
  let start: number | undefined;
  let previousTimestamp: number | undefined;

  /**
   * Callback function for requestAnimationFrame to perform the animation.
   *
   * @param {number} timestamp - The timestamp provided by requestAnimationFrame.
   */
  const doAnimate = (timestamp: number) => {
    if (typeof start === 'undefined') {
      start = timestamp;
    }

    const elapsed = timestamp - start;
    const percentage = Math.round((elapsed / duration) * 100) / 100;

    if (previousTimestamp !== timestamp) {
      animateFn(percentage);
    }

    // Stop the animation after the elapsed time reaches the duration
    if (elapsed < duration) {
      previousTimestamp = timestamp;
      registerRequestAnimationFn(window.requestAnimationFrame(doAnimate));
      return;
    }

    onFinish();
  };

  registerRequestAnimationFn(window.requestAnimationFrame(doAnimate));
};
