//pipe
const pipe =
    (...functions: Array<Function>): Function =>
    (value: number) => {
        return functions.reduce(
            (currentValue: number, currentFunction: Function) => {
                return currentFunction(currentValue);
            },
            value
        );
    };

export function debounce(func: Function, delay: number = 300): Function {
    let timeout: number;
    return function (...args: Array<unknown>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export const memoize = (func: Function): Function => {
    const cache: Record<string, unknown> = {};
    return (...args: Array<unknown>) => {
        let strKey: string = args.join(",");
        if (!cache[strKey]) {
            console.log("adding to cache");
            cache[strKey] = func.apply(this, args);
        }

        return cache[strKey];
    };
};

export class EventEmitter {
    private eventMap: Map<string, Function[]>;
    constructor() {
        this.eventMap = new Map();
    }
    on(event: string, listener: Function): void {
        if (!this.eventMap.has(event)) this.eventMap.set(event, []);

        this.eventMap.get(event)!.push(listener);
    }
    off(event: string, listener: Function): void {
        const listeners = this.eventMap.get(event);
        if (listeners) {
            const filteredList = listeners.filter(
                (fn: Function) => fn !== listener
            );
            this.eventMap.set(event, filteredList);
        }
    }
    emit(event: string, ...args: unknown[]): void {
        const listeners = this.eventMap.get(event);
        if (listeners) {
            listeners?.forEach((listener: Function) => listener(...args));
            const globalListeners = this.eventMap.get("*");
            if (globalListeners) {
                globalListeners.forEach((listener) => listener(...args));
            }
        }
    }
    once(event: string, listener: Function): void {
        const wrapper = (...args: unknown[]) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}

export class UserStore extends EventEmitter {
    private users: Record<number, string>;
    constructor() {
        super();
        this.users = {};
    }
    add(id: number, name: string): void {
        this.users[id] = name;
        this.emit("userAdded", id);
    }
    remove(id: number) {
        delete this.users[id];
        this.emit("userRemoved", id);
    }
    update(id: number, name: string) {
        this.users[id] = name;
        this.emit("userUpdated", id);
    }
}
export async function fetchJson(url: string): Promise<unknown> {
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch (error) {
        throw new Error("HttpError");
    }
}
