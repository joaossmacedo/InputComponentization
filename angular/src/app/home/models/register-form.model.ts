import { CompanyFormModel } from './company-form.model';
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
    company: CompanyFormModel;

    constructor(email: string = '',
                phone: string = '',
                city: string = '',
                skills: Array<string> = [],
                languages: Array<{name: string, speaking: string, writing: string,
                                  reading: string, listening: string }> = [],
                company: {name: string, area: string} = {name: '', area: ''}) {
        super();
        this.email = new InputFieldModel(email);
        this.phone = new InputFieldModel(phone);
        this.city = new InputFieldModel(city);
        this.password = new InputFieldModel('');
        this.passwordConfirmation = new InputFieldModel('');
        this.skills = [];
        for (const skill of skills) {
            this.skills.push(new InputFieldModel(skill));
        }
        this.languages = [];
        for (const language of languages) {
            this.languages.push(new LanguageFormModel(language.name, language.speaking, language.writing,
                                                      language.reading, language.listening));
        }
        this.company = new CompanyFormModel(company.name, company.area);
    }
}
