import { BaseFormModel } from '../../core/models/form-models/base/base-form.model';
import { InputFieldModel } from '../../core/models/form-models/base/input-field.model';

export class LanguageFormModel extends BaseFormModel {
    name: InputFieldModel;
    speaking: InputFieldModel;
    writing: InputFieldModel;
    reading: InputFieldModel;
    listening: InputFieldModel;

    constructor(name: string = '',
                speaking: string = '',
                writing: string = '',
                reading: string = '',
                listening: string = '') {
        super();
        this.name = new InputFieldModel(name);
        this.speaking = new InputFieldModel(speaking);
        this.writing = new InputFieldModel(writing);
        this.reading = new InputFieldModel(reading);
        this.listening = new InputFieldModel(listening);
    }
}
