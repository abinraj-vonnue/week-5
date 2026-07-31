export interface ValidationRules {
    [fieldName: string]: {
        required?: boolean;
        [ruleName: string]: any;
    };
}

export default class FormValidator {
    public form: HTMLFormElement;
    public rules: ValidationRules;
    public allValid: boolean;
    constructor(form: HTMLFormElement, rules: ValidationRules) {
        this.form = form!;
        this.rules = rules;
        this.allValid = true;
    }
    validate(
        field:
            | HTMLInputElement
            | HTMLButtonElement
            | HTMLSelectElement
            | HTMLTextAreaElement
            | null
    ) {
        if (!field) return;
        if (field && !this.rules[field.name]) return;
        const fieldRules = this.rules[field.name];
        if (!fieldRules) {
            console.log("field not found");
            return;
        }
        const span = field.nextElementSibling;
        if (!span) return;
        let isInvalid = false;

        for (const rule of Object.keys(fieldRules)) {
            switch (rule) {
                case "required": {
                    if (fieldRules[rule] && field.value.trim() === "") {
                        span.textContent = `Error this field is required`;
                        isInvalid = true;
                        break;
                    }
                }
            }
            if (isInvalid) {
                field.classList.add("invalid");
                this.allValid = false;
            } else {
                field.classList.remove("invalid");
                span.textContent = "";
            }
        }
    }
    validateAll(): boolean {
        Object.keys(this.rules).map((key) => {
            const element = this.form.elements.namedItem(
                key
            ) as HTMLInputElement | null;
            this.validate(element);
        });
        return this.allValid;
    }
}
