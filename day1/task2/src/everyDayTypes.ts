// variables
let myName: string = "John";

let myAge: number = 22;

let isValid: boolean = true;

let none: null = null;
let notYet: undefined = undefined;

let a: symbol = Symbol("key");
let population: bigint = 900719925474099199n;

let passcode: any;

let val: unknown;
val = true;

function infiniteLoop(): never {
    for (;;) {}
}

let empty: void;
let obj: object = { name: "Akash" };

// five functions with explicit parameter types and return types

function greet(name: string): string {
    return `Hello ${name}`;
}

function incrementCount(count: number): number {
    return ++count;
}

interface user {
    id: string | number;
    name: string;
}
interface userCollection {
    [key: string]: user;
}
function addUser(users: userCollection, user: user): userCollection {
    return {
        ...users,
        [user.id]: user,
    };
}

function printDetails(details: object): void {
    console.log(details);
}

function isInvalid(count: number): boolean {
    return count < 10;
}

function isInvalid2(count: number) {
    return count < 10;
}

const greeting: "Hello" = "Hello";
let greets: string = "Hello";

function lookup(id: any): string | number {
    if (typeof id === "string") return `${id}`;

    return id;
}
