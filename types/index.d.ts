type IEventName = string | symbol;
type IHandler = (...args: any[]) => any;
type IAddListenerOptinos = {
    /** same as `EventEmitter#once`, default `false` */
    once?: boolean;
};
type IEventEntry = {
    /** event name to be subcribed */
    name: IEventName;
    /** called immediately when event is triggered */
    handler: IHandler;
} & IAddListenerOptinos;
export declare class EventEmitter {
    /**
     * @type {IEventMap}
     * @internal */
    private readonly events;
    constructor();
    /**
     * Register a listener for certain specified event, when event trigged them will be called orderly.
     * @param name event name to be subcribed
     * @param handler called immediately when event is triggered
     * @param options
     */
    addListener(name: IEventName, handler: IHandler, options?: IAddListenerOptinos): void;
    /**
     * Register multiple events at once.
     * @param events
     */
    addListeners(events: IEventEntry[]): void;
    /** Register a listener that will be prepended to listeners list head instead of tail for certain specified event, when event trigged them will be called orderly.
     * @param name event name to be subcribed
     * @param handler called immediately when event is triggered
     * @param options
     */
    prependListener(name: IEventName, handler: IHandler, options?: IAddListenerOptinos): void;
    prependOnceListener(name: IEventName, handler: IHandler): void;
    /**
     * Alias of `EventEmitter#removeListener`
     */
    off(name: IEventName, handler?: IHandler): void;
    /** Alias of `EventEmitter#addListener` */
    on(name: IEventName, handler: IHandler): void;
    /** Register a listener for certain specified event, but just only called one time. */
    once(name: IEventName, handler: IHandler): void;
    /** Remove specified listener for the specified event, but will remove all listeners of `name` event when handler is not set. */
    removeListener(name: IEventName, handler?: IHandler): boolean;
    /** Remove all registered events and its listeners. */
    removeAllListeners(): void;
    hasListener(name: IEventName, handler?: IHandler): boolean;
    /** Get count of listeners of specified event. */
    listenerCount(name: IEventName): number;
    emit(name: IEventName, ...args: unknown[]): void;
    /** Alias of `EventEmitter#emit`. */
    trigger(name: IEventName, ...args: unknown[]): void;
}
export {};
