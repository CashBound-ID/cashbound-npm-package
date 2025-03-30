# Event Emitter Utils

This utils provides a simple and powerful event emitter. This guide explains how to implement and use the "mitt" event emitter with TypeScript.

## Installation

To use "mitt", you can install it via npm:


## How to Use
### Importing mitt

First, import the utilities from your module:

```typescript
import { mitt } from '@cashbound-id/utils/emitter';
```

### Defining Events
You need to define the events your application will handle. This is done by creating an interface that specifies the event types and their associated data.

```typescript
interface MyEvents {
  foo: string;
  bar: number;
}
```

### Creating an Event Emitter Instance
You can create an instance of the event emitter by calling `mitt`, passing the event handler map as an optional parameter.

```typescript
const emitter = mitt<MyEvents>();
```

### Adding Event Listeners
To listen for specific events, use the `on` method. It takes the event type and a handler function.

```typescript
emitter.on('foo', (event) => {
  console.log('foo event triggered:', event);
});
```

You can also listen for wildcard events by using `*` to collect all events that we send using emitter:

```typescript
emitter.on('*', (type, event) => {
  console.log(`Event of type ${type} triggered with data:`, event);
});
```

### Emitting Events
You can trigger events using the "emit" method. It takes the event type and the associated data.

```typescript
emitter.emit('foo', 'Hello, world!');
```

### Removing Event Listeners
To remove an event listener, use the `off` method. If you want to remove all listeners for a specific event type, you can omit the handler.

```typescript
emitter.off('foo'); // Removes all foo listeners
```

To remove a specific handler, pass it as the second argument.

```typescript
const handler = (event: string) => console.log(event);
emitter.on('foo', handler);
emitter.off('foo', handler); // Removes the specific handler
```

### Complete Example
Here’s a complete example demonstrating how to use the `mitt` event emitter:

```typescript
import { mitt } from '@cashbound-id/utils/emitter';

interface MyEvents {
  foo: string;
  bar: number;
}

const emitter = mitt<MyEvents>();

// Add event listener
emitter.on('foo', (event) => {
  console.log('foo event triggered:', event);
});

// Emit event
emitter.emit('foo', 'Hello, world!');

// Remove event listener
emitter.off('foo');
```