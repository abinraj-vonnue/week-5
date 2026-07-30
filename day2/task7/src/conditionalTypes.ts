/**
 Task 7 (50 min) - Conditional & Infer Types
648.Write IsArray<T> = T extends any[] ? true : false
649.Write Flatten<T> = T extends Array<infer Item> ? Item : T
650.Write Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T - recursive Promise unwrapping
651.Implement Parameters<T> and ReturnType<T> from scratch using infer
652.Find TypeScript's built-in lib.es5.d.ts in node_modules and read five utility type definitions
 */
type IsArray<T> = T extends any[] ? true : false;
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type Parameters<T> = T extends (...args: infer Params) => any ? Params : never;
type ReturnType<T> = T extends (...args: never[]) => infer Return
    ? Return
    : never;

type MyFunc = () => string;
type typeOfMyFunc = ReturnType<MyFunc>;
const a: typeOfMyFunc = "s";

type MyArray = IsArray<string[]>;
type Users = string[];
type SingleUser = Flatten<Users>;

type FetchData = Promise<string>;
type Data = Awaited<FetchData>;

type Nested = Promise<Promise<number>>;
type DeepData = Awaited<Nested>;

type LoginFunc = (username: string) => number;
type LoginArgs = Parameters<LoginFunc>;

const arg: LoginArgs = ["a"];
