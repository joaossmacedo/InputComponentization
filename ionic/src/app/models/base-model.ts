import { InputFieldModel } from './input-field-model';

const INVALID_FORM_MODEL = 'Invalid Form Model. Form Models should only contain ' +
                           'properties of type InputFieldModel or BaseFormModel.';

export class BaseModel {
    // this is the base model
    //
    // if you create a new model it should extend from this one
    // if you do so you will be able to use methods common to all models
    //
    // the models that inherit from this base model should have only properties from type "InputFieldModal"
    // if you DON'T do this THERE WILL BE ERRORS
    constructor() {
    }

    // checks if one of the object's fields has an error
    // if so returns true
    // otherwise returns false
    hasError(nonRequiredParam: Array<string> = []): boolean {
        const keys = (Object.keys(this));

        for (const key of keys) {
            const field = this[key];

            let hasError = false;
            if (field instanceof InputFieldModel) {
                if (field.errors.length > 0 ||
                    (field.value === '' && !nonRequiredParam.includes(key))) {
                    hasError = true;
                }
            } else if (field instanceof BaseModel) {
                hasError = field.hasError(nonRequiredParam);
            } else {
                throw new Error(INVALID_FORM_MODEL);
            }

            if (hasError) {
                return true;
            }
        }

        return false;
    }

    // returns an object ready to be sent to the backend
    // Ex:
    // {
    //      'property1': value1,
    //      'property2': value2,
    //      'property3': value3,
    //      'property4': value4
    // }
    prepare2send(propertiesIgnored: Array<string> = []): object {
        const keys = (Object.keys(this));

        const ret = {};

        for (const key of keys) {
            if (propertiesIgnored.includes(key)) {
                continue;
            }

            const field = this[key];

            if (field instanceof InputFieldModel) {
                ret[key] = field.value;
            } else if (field instanceof BaseModel) {
                ret[key] = field.prepare2send(propertiesIgnored);
            } else {
                throw new Error(INVALID_FORM_MODEL);
            }
        }

        return ret;
    }

    // returns a list of the name of all properties that have input === ''
    //
    // this function returns a list instead of a boolean because it might be useful
    // for example returning a boolean wouldn't work if one of the fields is not required
    //
    // Ex:
    // ["name", "phone"]
    emptyProperties(propertiesIgnored: Array<string> = []): string[] {
        const keys = (Object.keys(this));

        let ret = [];

        for (const key of keys) {
            if (propertiesIgnored.includes(key)) {
                continue;
            }

            const field = this[key];

            if (field instanceof InputFieldModel) {
                if (this[key].value === '') {
                    ret.push(key);
                }
            } else if (field instanceof BaseModel) {
                ret = ret.concat(field.emptyProperties(propertiesIgnored));
            } else {
                throw new Error(INVALID_FORM_MODEL);
            }
        }

        return ret;
    }
}
