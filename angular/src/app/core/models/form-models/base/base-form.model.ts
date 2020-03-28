import { InputFieldModel } from './input-field.model';

const INVALID_FORM_MODEL = 'Invalid Form Model. Form Models should only contain ' +
                           'properties of type InputFieldModel or BaseFormModel.';

export abstract class BaseFormModel {
    // this is the base model
    //
    // if you create a new model it should extend from this one
    // if you do so you will be able to use methods common to all models
    //
    // the models that inherit from this base model should have only properties from type "InputFieldModal"
    // if you DON'T do this THERE WILL BE ERRORS
    constructor() {
    }

    private static isFieldValid(field): boolean {
        if (!(field instanceof InputFieldModel ||
              field instanceof BaseFormModel ||
              field instanceof Array)) {
            return false;
        }

        return true;
    }

    // checks if one of the object's fields has an error
    // if so returns true
    // otherwise returns false
    hasError(nonRequiredParam: Array<string> = []): boolean {
        const keys = (Object.keys(this));

        for (const key of keys) {
            const field = this[key];

            if (BaseFormModel.isFieldValid(field)) {
                throw new Error(INVALID_FORM_MODEL);
            }

            let hasError = false;
            if (field instanceof BaseFormModel) {
                hasError = field.hasError(nonRequiredParam);
            } else if (field instanceof Array) {
                console.log('Not handling arrays yet');
            } else if (field.errors.length > 0 ||
                       (field.value === '' && !nonRequiredParam.includes(key))) {
                hasError = true;
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

            if (BaseFormModel.isFieldValid(field)) {
                throw new Error(INVALID_FORM_MODEL);
            }

            if (field instanceof BaseFormModel) {
                ret[key] = field.prepare2send(propertiesIgnored);
            } else if (field instanceof Array) {
                console.log('Not handling arrays yet');
            } else {
                ret[key] = field.value;
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

            if (BaseFormModel.isFieldValid(field)) {
                throw new Error(INVALID_FORM_MODEL);
            }

            if (field instanceof BaseFormModel) {
                ret = ret.concat(field.emptyProperties(propertiesIgnored));
            } else if (field instanceof Array) {
                console.log('Not handling arrays yet');
            } else if (this[key].value === '') {
                ret.push(key);
            }
        }

        return ret;
    }
}
