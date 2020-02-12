import { BaseModel } from './base-model';
import { InputFieldModel } from './input-field-model';

// this is an example
export class FormModel extends BaseModel {
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
