# remity

remity is a slim EventEmitter implementation.


## Install

```sh
npm install --save remity
```

## Usage

```js
import { EventEmitter } from 'remity'
const event = new EventEmitter()
event.addListener("eventname", callback);        // subscribe a event
event.emit("eventname", {
    a: 'some args'
});  // trigger a event
```

## Documentation


### EventEmitter class

#### EventEmitter#addListener(name, handler)

Register a listener for certain specified event, when event trigged them will be called orderly.

#### EventEmitter#addListeners(events)

Register multiple events at once. the `events` is an array of structure like below:
```js
{
    name: string;           // event name
    handler: args=>any;     // it will be called when event is triggered
    once?: boolean;         // same as `EventEmitter#once`, default false
}
```

#### EventEmitter#prependListener(name, handler)

Register a listener that will be prepended to listeners list head instead of tail for certain specified event, when event trigged them will be called orderly.

#### EventEmitter#prependOnceListener(name, handler)


#### EventEmitter#off(name, handler?)

Alias of `EventEmitter#removeListener`

#### EventEmitter#on(name, handler)

Alias of `EventEmitter#addListener`

#### EventEmitter#once(name, handler)

Register a listener for certain specified event, but just only effects one time.  

#### EventEmitter#removeListener(name, handler?)

Remove specified listener for the specified event, but will remove all listeners of `name` event when handler is not set.

#### EventEmitter#removeAllListeners()

Remove all registered events and its listeners.

#### EventEmitter#hasListener(name, handler?)



#### EventEmitter#listenerCount(name)

Get count of listeners of specified event.

#### EventEmitter#emit(name, args)

Emit a event with optional arguments.

#### EventEmitter#trigger(name, args)

alias of `EventEmitter#emit`.

## License

MIT.