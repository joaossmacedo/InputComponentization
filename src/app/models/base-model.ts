import { InputFieldModel } from './input-field-model';

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
    hasError(): boolean {
        const keys = (Object.keys(this));

        for (const key of keys) {
            const property = this[key];
            if (property.errors.length > 0) {
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
    prepare2send(): object {
        const keys = (Object.keys(this));

        const ret = {};

        for (const key of keys) {
            const property = this[key];
            ret[key] = property.input;
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
    emptyProperties(): string[] {
        const keys = (Object.keys(this));

        const ret = [];

        for (const key of keys) {
            if (this[key].input === '') {
                ret.push(key);
            }
        }

        return ret;
    }
}
