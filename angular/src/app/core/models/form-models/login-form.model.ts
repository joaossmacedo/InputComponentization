import { BaseFormModel } from './base/base-form.model';
import { InputFieldModel } from './base/input-field.model';

export class LoginFormModel extends BaseFormModel {
    email: InputFieldModel;
    password: InputFieldModel;

    constructor(email: string = '',
                password: string = '') {
        super();
        this.email = new InputFieldModel(email);
        this.password = new InputFieldModel(password);
    }
}
