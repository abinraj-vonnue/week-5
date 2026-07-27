type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "rect"; w: number; h: number };

const exhaustiveMatchingGuard = (_: never): never => {
    throw new Error("should not have reached here");
};
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rect":
            return shape.w * shape.h;
        default:
            return exhaustiveMatchingGuard(shape);
    }
}
