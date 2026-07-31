/**
 * Task 5 (55 min) - Convert TypedEventEmitter
673.Build TypedEventEmitter<Events extends Record<string, any[]>> with on<K extends keyof
    Events>(event: K, listener: (...args: Events[K]) => void): this
674.emit must only accept defined events with correct argument types
675.Define UserEvents = { userAdded: [User]; userRemoved: [string]; userUpdated: [string,Partial<User>] }
676.Show TypeScript catches wrong argument types at compile time. Zero any.
 */
export {};
