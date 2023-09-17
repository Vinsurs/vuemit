type IEventName = string | symbol
type IHandler = (...args: any[]) => any
type IAddListenerOptinos = {
    /** same as `EventEmitter#once`, default `false` */
    once?: boolean
}
type IEventEntry = {
    /** event name to be subcribed */
    name: IEventName
    /** called immediately when event is triggered */
    handler: IHandler
} & IAddListenerOptinos
type IEventMetadata = WeakMap<IHandler, IAddListenerOptinos>
type IEventMapValue = {
    listeners: Set<IHandler>
    metadate: IEventMetadata
}
type IEventMap = Map<IEventName, IEventMapValue>

function assignOptions(options?: IAddListenerOptinos) {
    const defaults: IAddListenerOptinos = {
        once: false
    }
    return options ? Object.assign<IAddListenerOptinos, IAddListenerOptinos>(defaults, options) : defaults
}
export class EventEmitter {
    /** 
     * @type {IEventMap}
     * @internal */
    private readonly events: IEventMap
    constructor() {
        this.events = new Map<IEventName, IEventMapValue>()
    }
    /**
     * Register a listener for certain specified event, when event trigged them will be called orderly.
     * @param name event name to be subcribed
     * @param handler called immediately when event is triggered
     * @param options 
     */
    addListener(name: IEventName, handler: IHandler, options?: IAddListenerOptinos) {
        options = assignOptions(options)
        let mapValue = this.events.get(name)
        if (!mapValue) {
            mapValue = {
                listeners: new Set(),
                metadate: new WeakMap()
            }
            this.events.set(name, mapValue)
        }
        mapValue.listeners.add(handler)
        mapValue.metadate.set(handler, options)
    }
    /**
     * Register multiple events at once. 
     * @param events 
     */
    addListeners(events: IEventEntry[]) {
        for (let { name, handler, once = false } of events) {
            this.addListener(name, handler, { once })
        }
    }
    /** Register a listener that will be prepended to listeners list head instead of tail for certain specified event, when event trigged them will be called orderly.
     * @param name event name to be subcribed
     * @param handler called immediately when event is triggered
     * @param options 
     */
    prependListener(name: IEventName, handler: IHandler, options?: IAddListenerOptinos) {
        options = assignOptions(options)
        let mapValue = this.events.get(name)
        if (!mapValue) {
            mapValue = {
                listeners: new Set(),
                metadate: new WeakMap()
            }
            this.events.set(name, mapValue)
        }
        mapValue.listeners = new Set([handler, ...mapValue.listeners])
        mapValue.metadate.set(handler, options)
    }
    prependOnceListener(name: IEventName, handler: IHandler) {
        this.prependListener(name, handler, { once: true })
    }
    /**
     * Alias of `EventEmitter#removeListener`
     */
    off(name: IEventName, handler?: IHandler) {
        this.removeListener(name, handler)
    }
    /** Alias of `EventEmitter#addListener` */
    on(name: IEventName, handler: IHandler) {
        this.addListener(name, handler)
    }
    /** Register a listener for certain specified event, but just only called one time. */
    once(name: IEventName, handler: IHandler) {
        this.addListener(name, handler, { once: true })
    }
    /** Remove specified listener for the specified event, but will remove all listeners of `name` event when handler is not set. */
    removeListener(name: IEventName, handler?: IHandler) {
        const mapValue = this.events.get(name)
        if (!mapValue) return false
        if (!handler) {
            return this.events.delete(name)
        }
        return mapValue.listeners.delete(handler) && mapValue.metadate.delete(handler)
    }
    /** Remove all registered events and its listeners. */
    removeAllListeners(){
        this.events.clear()
    }
    hasListener(name: IEventName, handler?: IHandler) {
        if (!handler) return this.listenerCount(name) > 0
        const mapValue = this.events.get(name) as IEventMapValue
        return mapValue.listeners.has(handler)
    }
    /** Get count of listeners of specified event. */
    listenerCount(name: IEventName) {
        const mapValue = this.events.get(name)
        return mapValue ? mapValue.listeners.size : 0;
    }
    emit(name: IEventName, ...args: unknown[]) {
        const mapValue = this.events.get(name)
        if (!mapValue) return
        for (const handler of mapValue.listeners) {
            const { once } = mapValue.metadate.get(handler) as IAddListenerOptinos
            once && this.removeListener(name, handler)
            handler(...args)
        }
    }
    /** Alias of `EventEmitter#emit`. */
    trigger(name: IEventName, ...args: unknown[]) {
        this.emit(name, ...args)
    }
}
