function identity<T>(arg: T): T {
    console.log(typeof arg);
    return arg;
}
type User = {
    id: number;
    name: string;
};

const user: User = {
    id: 1,
    name: "User 1",
};
identity("hello");
identity(1);
identity(user);

function first<T>(arg: T[]): T | undefined {
    console.log(arg[0]);
    return arg[0];
}

const a: number[] = [1, 2, 3];
const b: number[] = [];
first(a);
first(b);

async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

class Queue<T> {
    private queue: T[];
    constructor() {
        this.queue = [];
    }
    enqueue(item: T) {
        this.queue.push(item);
    }
    dequeue(): T | undefined {
        return this.queue.shift();
    }
    peek(): T | undefined {
        return this.queue[0];
    }
    isEmpty(): boolean {
        return !this.queue.length;
    }
}

const queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(12);
queue.enqueue(82);
queue.dequeue();
console.log(queue.peek());
