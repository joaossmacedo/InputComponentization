export class InputFieldModel {
    value: string;
    errors: string[];

    // there should be one InputFieldModal for each input field
    constructor(value: string = '', errors: string[] = []) {
        this.value = value;
        this.errors = errors;
    }
}
