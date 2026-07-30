interface User {
    id: number;
}
interface User {
    name: string;
}

const user: User = {
    id: 1,
    name: "User 1",
};

declare global {
    interface Array<T> {
        sum: T extends number ? () => number : never;
    }
    interface Window {
        appState: string;
    }
}

Array.prototype.sum = function (this: number[]) {
    return this.reduce((total, current) => total + current, 0);
};

const a: Array<number> = [1, 0, 1, 2];
console.log(a.sum());

Window.prototype.appState = "Loading";

console.log(window.appState);

// module augmentation

import { substract } from "#math-lib";

console.log(substract(10, 3));
