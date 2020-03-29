import { LanguageFormModel } from './language-form.model';
import { BaseFormModel } from '../../core/models/form-models/base/base-form.model';
import { InputFieldModel } from '../../core/models/form-models/base/input-field.model';

export class RegisterFormModel extends BaseFormModel {
    email: InputFieldModel;
    password: InputFieldModel;
    passwordConfirmation: InputFieldModel;
    phone: InputFieldModel;
    city: InputFieldModel;
    skills: Array<InputFieldModel>;
    languages: Array<LanguageFormModel>;


    constructor(email: string = '',
                phone: string = '',
                city: string = '') {
        super();
        this.email = new InputFieldModel(email);
        this.phone = new InputFieldModel(phone);
        this.city = new InputFieldModel(city);
        this.password = new InputFieldModel('');
        this.passwordConfirmation = new InputFieldModel('');
        this.skills = [];
        this.languages = [];
    }
}
