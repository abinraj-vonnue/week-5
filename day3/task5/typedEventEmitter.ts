/**
 * Task 5 (55 min) - Convert TypedEventEmitter
673.Build TypedEventEmitter<Events extends Record<string, any[]>> with on<K extends keyof
    Events>(event: K, listener: (...args: Events[K]) => void): this
674.emit must only accept defined events with correct argument types
675.Define UserEvents = { userAdded: [User]; userRemoved: [string]; userUpdated: [string,Partial<User>] }
676.Show TypeScript catches wrong argument types at compile time. Zero any.
 */

class TypedEventEmitter<Events extends Record<string, any[]>> {
    private eventMap: Map<keyof Events, Function[]>;
    constructor() {
        this.eventMap = new Map();
    }
    on<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ) {
        if (!this.eventMap.get(event)) this.eventMap.set(event, []);

        this.eventMap.get(event)?.push(listener);
    }
    off<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ): this {
        let listeners;
        if (this.eventMap.get(event)) {
            listeners = this.eventMap
                .get(event)
                ?.filter((fn) => fn != listener);
            this.eventMap.set(event, listeners ? listeners : []);
        }
        return this;
    }
    emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean {
        this.eventMap.get(event)?.forEach((listener) => listener(...args));
        return this.eventMap.get(event) ? true : false;
    }
    once<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ): this {
        const wrapper = (...args: Events[K]) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
        return this;
    }
}
type userEvents = {
    userAdded: [User];
    userRemoved: [string];
    userUpdated: [string, Partial<User>];
};

type User = {
    id: string;
    name: string;
};

const userEmitter = new TypedEventEmitter<userEvents>();

let users: User[] = [
    { id: "1", name: "John" },
    { id: "2", name: "John" },
];

userEmitter.on("userAdded", (user) => {
    console.log(`user Added: ${user.name}`);
});
userEmitter.on("userUpdated", (id, updates) => {
    console.log(id, updates.name);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return;

    if (users[index]) users[index].name = updates.name ?? users[index].name;
    console.log(`user updated : `, users[index]);
});
userEmitter.on("userRemoved", (id) => {
    const user = users.find((u) => u.id === id);
    console.log("deleted ", user);
    users = users.filter((u) => u.id !== id);
    console.log(users);
});

userEmitter.emit("userAdded", users[1]!);
userEmitter.emit("userUpdated", "2", { name: "Alex" });
userEmitter.emit("userRemoved", "1");

// invalid usage

// userEmitter.emit("userAdded","ss") // Argument of type string is not assignable
// userEmitter.emit("userRemoved",1) // argyment of type 'number' is not assignable
// userEmitter.emit("random",'j')  // argument of type 'random' is not assignable to parameter of type keyof userEvents
