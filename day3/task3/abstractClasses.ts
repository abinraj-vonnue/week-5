abstract class Shape {
    constructor(private type: string) {
        this.type = type;
    }
    abstract area(): number;
    abstract perimeter(): number;
    public describe() {
        console.log(`type : ${this.type}`);
        console.log(`area : ${this.area()}sq.cm`);
        console.log(`perimeter : ${this.perimeter()}sq.cm`);
    }
    static create(type: "circle" | "rect" | "triangle", ...args: number[]) {
        switch (type) {
            case "circle":
                return new Circle(...(args as [number]));

            case "rect":
                return new Rectangle(...(args as [number, number]));
            case "triangle":
                return new Triangle(...(args as [number, number, number]));
        }
    }
}

// const shape = new Shape()  // error : cannot create instance of an abstract class

class Circle extends Shape {
    constructor(private radius: number) {
        super("circle");
        this.radius = radius;
    }
    area(): number {
        return Math.PI * this.radius ** 2;
    }
    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle extends Shape {
    constructor(
        private l: number,
        private b: number
    ) {
        super("rect");
    }
    area(): number {
        return this.l * this.b;
    }
    perimeter(): number {
        return 2 * (this.l + this.b);
    }
}
class Triangle extends Shape {
    constructor(
        private a: number,
        private b: number,
        private c: number
    ) {
        super("triangle");
    }
    area(): number {
        const s = (this.a + this.b + this.c) * 0.5;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    perimeter(): number {
        return this.a + this.b + this.c;
    }
}
