import { BaseModel } from './base-model';
import { InputFieldModel } from './input-field-model';

// this is an example
export class FormModel extends BaseModel {
    email: InputFieldModel;
    password: InputFieldModel;
    phone: InputFieldModel;

    constructor(email: InputFieldModel = new InputFieldModel(),
                password: InputFieldModel = new InputFieldModel(),
                phone: InputFieldModel = new InputFieldModel()) {
        super();
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

}
