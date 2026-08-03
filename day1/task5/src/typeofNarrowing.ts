/*
Task 5 (55 min) - Type Narrowing & Type Guards
606.Write processInput(value: string | number | boolean | null | undefined) using typeof, equality,
    and nullish narrowing
607.Write custom type guard isUser(value: unknown): value is User that validates an unknown API
    response
608.Use discriminated unions: Shape = { kind: 'circle'; radius: number } | { kind: 'rect'; w: number; h:
    number }. Write getArea using exhaustive switch.
609.Show the never type: add a new Shape variant, TypeScript catches the missing case
*/

function processInput(value: string | number | boolean | null | undefined) {
    const isNull = value ?? "null value"; //nullish narrowing
    return typeof value == "string" //typeof
        ? "string"
        : typeof value == "number"
          ? "number"
          : typeof value == "boolean"
            ? "boolean"
            : value === undefined //equality narrowing
              ? "undefined"
              : isNull;
}

interface User {
    id: number;
    name: string;
}
function isUser(value: unknown): value is User {
    return (
        value !== null &&
        typeof value === "object" &&
        "id" in value &&
        "name" in value
    );
}
