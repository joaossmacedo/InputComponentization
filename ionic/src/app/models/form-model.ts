import { BaseFormModel } from './base/base-model';
import { InputFieldModel } from './base/input-field-model';

// this is an example
export class FormModel extends BaseFormModel {
    email: InputFieldModel;
    password: InputFieldModel;
    phone: InputFieldModel;

    constructor(email: string = '',
                password: string = '',
                phone: string = '') {
        super();
        this.email = new InputFieldModel(email);
        this.password = new InputFieldModel(password);
        this.phone = new InputFieldModel(phone);
    }

}
