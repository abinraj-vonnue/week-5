function multiply(a: number, b: number): number {
    return a * b;
}
function substract(a: number, b: number): number {
    return a - b;
}
console.log(multiply(2, 9));

function bug(a: number | undefined) {
    if (!a) return; // possibly undefined
    if (a + 3 > 10) return ++a;
}

function accessValue(a: number[]): number[] {
    if (a[10] && a[10] > 3) {
        // NoUncheckedIndexedAccess fix
        return a;
    }
    return [];
}
