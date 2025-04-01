/* eslint-disable @typescript-eslint/no-explicit-any */

type AnyRecord<T> = any[] extends T ? never : object;

export type Handler<T = unknown> = (event: T) => void;

export type WildcardHandler<T = Record<string, unknown>> = (
  type: keyof T,
  event: T[keyof T]
) => void;

export type EventHandlerList<T = unknown> = Array<Handler<T>>;

export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<
  WildcardHandler<T>
>;

export type EventHandlerMap<Events extends AnyRecord<Events>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends AnyRecord<Events>> {
  all: EventHandlerMap<Events>;

  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
  emit<Key extends keyof Events>(
    type: undefined extends Events[Key] ? Key : never
  ): void;

  off<Key extends keyof Events>(
    type: Key,
    handler?: Handler<Events[Key]>
  ): void;
  off(type: '*', handler: WildcardHandler<Events>): void;

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  on(type: '*', handler: WildcardHandler<Events>): void;
}

/**
 * Creates an event emitter instance.
 *
 * @template Events - A type defining the event types and their associated data.
 *
 * @param {EventHandlerMap<Events>} [all] - Optional initial event handler map.
 * @returns {Emitter<Events>} An object with methods to emit, subscribe, and unsubscribe to events.
 *
 * @example
 * const emitter = mitt<{ foo: string }>();
 *
 * // Add event listener
 * emitter.on('foo', (event) => console.log(event));
 *
 * // Emit event
 * emitter.emit('foo', 'Hello, world!');
 *
 * // Remove event listener
 * emitter.off('foo');
 */
export function mitt<Events extends AnyRecord<Events>>(
  all?: EventHandlerMap<Events>
): Emitter<Events> {
  type GenericEventHandler =
    | Handler<Events[keyof Events]>
    | WildcardHandler<Events>;
  const instance: EventHandlerMap<Events> = all || new Map();

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all: instance,

    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      let handlers = instance.get(type);
      if (handlers) {
        (handlers as EventHandlerList<Events[keyof Events]>)
          .slice()
          .forEach((handler) => {
            /**
             * This is valid since, although `evt` may be optional, from our
             * function overload it will map only to `undefined` while kept
             * enforcing the other types to be required.
             */

            handler(evt!);
          });
      }

      handlers = instance.get('*');
      if (handlers) {
        (handlers as WildCardEventHandlerList<Events>)
          .slice()
          .forEach((handler) => {
            /**
             * This is valid since, although `evt` may be optional, from our
             * function overload it will map only to `undefined` while kept
             * enforcing the other types to be required.
             */

            handler(type, evt!);
          });
      }
    },

    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
      const handlers: GenericEventHandler[] | undefined = instance.get(type);
      if (!handlers) {
        return;
      }

      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      } else {
        instance.set(type, []);
      }
    },

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
      const handlers: GenericEventHandler[] | undefined = instance.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        instance.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
      }
    }
  };
}
