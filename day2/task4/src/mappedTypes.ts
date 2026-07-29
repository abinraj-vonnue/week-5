/*
Task 4 (50 min) - Mapped Types
Implement Readonly<T> from scratch: type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
Implement Partial<T> from scratch
Build a DeepPartial<T> type that makes all nested properties optional using recursion
Use keyof and typeof in combination to type a safe object property accessor
 */

// readonly
type MyReadOnly<T> = { readonly [K in keyof T]: T[K] };

const user: MyReadOnly<Record<string, string>> = {
    name: "name",
};

// partial

type MyPartial<T> = { [K in keyof T]?: T[K] };

interface User {
    name: string;
    email: string;
}

const updatedUser: MyPartial<User> = {
    name: "a",
};

// deep partial
type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

interface Address {
    steet: string;
    city: string;
}
interface Customer {
    name: string;
    age: number;
    address: Address;
}

const user1: DeepPartial<Customer> = {
    address: {
        city: "Tokyo",
    },
};

// safe object property accessor

const client = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
};

type ClientKeys = keyof typeof client;

let key: ClientKeys = "name";
key = "age";

function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "James", age: 19 };
const age = getValue(person, "age");
console.log(age);
// const invalid = getValue(person,"address")
