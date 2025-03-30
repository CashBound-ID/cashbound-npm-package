import { noop } from '@/misc';

/**
 * Type definition for the ResizeObserver callback function.
 *
 * @callback ResizeObserverFnType
 * @param {ResizeObserverEntry} arg - The entry object containing information about the observed element's size.
 */
export interface ResizeObserverFnType {
  (arg: ResizeObserverEntry): void;
}

/**
 * Type definition for the state of the Resizer Observer.
 *
 * @interface ResizerObserverStateType
 * @property {Element} element - The element to be observed for resizing.
 * @property {ResizeObserverFnType} fn - The callback function to be called when the element is resized.
 */
export interface ResizerObserverStateType {
  element: Element;
  fn: ResizeObserverFnType;
}

/**
 * Creates a handler for ResizeObserver that allows registering and unregistering elements to observe for resizing.
 *
 * @returns {object} An object with methods to manage the observer.
 * @returns {function(): void} disconnect - Disconnects the observer and stops observing all elements.
 * @returns {function(ResizerObserverStateType): void} register - Registers an element to be observed for resizing.
 * @returns {function(): void} unregister - Unregisters the currently observed element.
 *
 * @example
 * const resizer = resizeObserverHandler();
 * const element = document.getElementById('my-element');
 *
 * const resizeCallback = (entry) => {
 *   console.log('Element resized:', entry.contentRect);
 * };
 *
 * resizer.register({ element, fn: resizeCallback });
 * // To unregister later:
 * resizer.unregister();
 */
export const resizeObserverHandler = () => {
  if (typeof window === 'undefined') {
    return { disconnect: noop, register: noop, unregister: noop };
  }

  let state: Partial<ResizerObserverStateType> = {};

  const instance = new ResizeObserver((entries) => {
    if (
      Array.isArray(entries) &&
      entries.length > 0 &&
      state.fn &&
      entries[0]
    ) {
      const [firstItem] = entries;
      state.fn(firstItem);
    }
  });

  return {
    disconnect: () => {
      instance.disconnect();
    },
    register: (args: ResizerObserverStateType) => {
      state.element = args.element;
      state.fn = args.fn;
      instance.observe(args.element);
    },
    unregister: () => {
      if (state.element) instance.unobserve(state.element);
      state = {};
    }
  };
};

/**
 * Type definition for the IntersectionObserver callback function.
 *
 * @callback IntersectObserverFnType
 * @param {IntersectionObserverEntry} arg - The entry object containing information about the observed element's intersection with the viewport.
 */
export interface IntersectObserverFnType {
  (arg: IntersectionObserverEntry): void;
}

/**
 * Type definition for the state of the Intersect Observer.
 *
 * @interface IntersectObserverStateType
 * @property {Element} element - The element to be observed for intersection with the viewport.
 * @property {IntersectObserverFnType} fn - The callback function to be called when the element intersects with the viewport.
 */
export interface IntersectObserverStateType {
  element: Element;
  fn: IntersectObserverFnType;
}

/**
 * Creates a handler for IntersectionObserver that allows registering and unregistering elements to observe for intersection with the viewport.
 *
 * @returns {object} An object with methods to manage the observer.
 * @returns {function(): void} disconnect - Disconnects the observer and stops observing all elements.
 * @returns {function(IntersectObserverStateType): void} register - Registers an element to be observed for intersection with the viewport.
 * @returns {function(): void} unregister - Unregisters the currently observed element.
 *
 * @example
 * const intersector = intersectObserverHandler();
 * const element = document.getElementById('my-element');
 *
 * const intersectionCallback = (entry) => {
 *   if (entry.isIntersecting) {
 *     console.log('Element is in view:', entry.target);
 *   }
 * };
 *
 * intersector.register({ element, fn: intersectionCallback });
 * // To unregister later:
 * intersector.unregister();
 */
export const intersectObserverHandler = () => {
  if (typeof window === 'undefined') {
    return { disconnect: noop, register: noop, unregister: noop };
  }

  let state: Partial<IntersectObserverStateType> = {};

  const instance = new IntersectionObserver((entries) => {
    if (
      Array.isArray(entries) &&
      entries.length > 0 &&
      state.fn &&
      entries[0]
    ) {
      const [firstItem] = entries;
      state.fn(firstItem);
    }
  });

  return {
    disconnect: () => {
      instance.disconnect();
    },
    register: (args: IntersectObserverStateType) => {
      state.element = args.element;
      state.fn = args.fn;
      instance.observe(args.element);
    },
    unregister: () => {
      if (state.element) instance.unobserve(state.element);
      state = {};
    }
  };
};
