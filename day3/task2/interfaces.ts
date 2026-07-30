/**
 * Task 2 (45 min) - Interfaces & implements
660. Define Serializable with toJSON(): string and fromJSON(data: string): this
661. Define Printable with print(): void and getDisplayName(): string
662. Define Validatable with validate(): ValidationResult
663. Implement all three on a Document class - TypeScript confirms the class satisfies all three
664. Show structural typing: a plain object that satisfies Serializable without explicitly implementing it

 */

interface Serializable {
    toJSON(): string;
    fromJSON(data: string): this;
}
interface Printable {
    print(): void;
    getDisplayName(): string;
}
interface Validatable {
    validate(): ValidationResult;
}

type ValidationResult = boolean;

class Document implements Serializable, Printable, Validatable {
    private displayName: string = "DisplayName";
    constructor(private data: Record<string, string>) {
        this.data = data;
    }

    //serializable
    toJSON(): string {
        return JSON.stringify(this.data);
    }
    fromJSON(data: string): this {
        this.data = JSON.parse(data);
        return this;
    }

    // printable
    print() {
        console.log(this.data);
    }
    getDisplayName(): string {
        return this.displayName;
    }

    // Validatable
    validate(): ValidationResult {
        return true;
    }
}
function json(serializable: Serializable, data: string) {
    serializable.toJSON();
    serializable.fromJSON(data);
}
