import { BaseFormModel } from '../../core/models/form-models/base/base-form.model';
import { InputFieldModel } from '../../core/models/form-models/base/input-field.model';

export class CompanyFormModel extends BaseFormModel {
    name: InputFieldModel;
    area: InputFieldModel;

    constructor(name: string = '',
                area: string = '') {
        super();
        this.name = new InputFieldModel(name);
        this.area = new InputFieldModel(area);
    }
}
