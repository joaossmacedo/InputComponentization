export class InputFieldModel {
    input: string;
    error: [];

    // there should be one InputFieldModal for each input field
    constructor(response: {input: string, error: []} = null) {
        if (response) {
            this.input = response.input;
            this.error = response.error;
        } else {
            this.input = '';
            this.error = [];
        }
    }
}
