import { InputFieldModel } from './input-field.model';

const INVALID_FORM_MODEL = 'Invalid Form Model. Form Models should only contain ' +
                           'properties of type InputFieldModel, Array or BaseFormModel.';

// tslint:disable-next-line: class-name
interface PREPARE_TO_SEND_RETURN {
    [form: string]: string | PREPARE_TO_SEND_RETURN |
                    Array<string | PREPARE_TO_SEND_RETURN>;
}
// tslint:disable-next-line: class-name
type VALID_TYPES = InputFieldModel | BaseFormModel | Array<VALID_TYPES>;



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
        if (field instanceof InputFieldModel ||
            field instanceof BaseFormModel ||
            field instanceof Array) {
            return true;
        }

        return false;
    }

    private static modelHasError(model: BaseFormModel, nonRequiredParam: Array<string> = []): boolean {
        const keys = (Object.keys(model));

        for (const key of keys) {
            const field = model[key];

            if (!BaseFormModel.isFieldValid(field)) {
                throw new Error(INVALID_FORM_MODEL);
            }

            let hasError = false;
            if (field instanceof BaseFormModel) {
                hasError = this.modelHasError(field, nonRequiredParam);
            } else if (field instanceof Array) {
                hasError = this.arrayHasError(field, nonRequiredParam);
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

    private static arrayHasError(fields: Array<any>, nonRequiredParam: Array<string> = []): boolean {
        for (const field of fields) {
            let hasError = false;

            if (field instanceof BaseFormModel) {
                hasError = this.modelHasError(field, nonRequiredParam);
            } else if (field instanceof Array) {
                hasError = this.arrayHasError(field, nonRequiredParam);
            } else if (field.hasOwnProperty('value') && field.hasOwnProperty('errors')) {
                hasError = field.errors.length > 0 || field.value === '';
            }

            if (hasError) {
                return true;
            }
        }

        return false;
    }

    private static prepareModel2send(model: BaseFormModel, flat = false, propertiesIgnored: Array<string> = []): PREPARE_TO_SEND_RETURN {
        const keys = (Object.keys(model));

        let ret = {};

        for (const key of keys) {
            if (propertiesIgnored.includes(key)) {
                continue;
            }

            const field = model[key];

            if (!BaseFormModel.isFieldValid(field)) {
                throw new Error(INVALID_FORM_MODEL);
            }

            if (field instanceof BaseFormModel) {
                const returnedValue = this.prepareModel2send(field, flat, propertiesIgnored);

                if (flat) {
                    // merge the objects
                    ret = {...ret, ...returnedValue};
                } else {
                    ret[key] = returnedValue;
                }

            } else if (field instanceof Array) {
                if (field.length > 0) {
                    const array = this.prepareArray2send(field, flat, propertiesIgnored);
                    ret[key] = array === null ? field : array;
                }
            } else {
                ret[key] = field.value;
            }
        }

        return ret;
    }

    private static prepareArray2send(fields: Array<VALID_TYPES>,
                                     flat: boolean, propertiesIgnored: Array<string>):
                                     Array<VALID_TYPES> | null {
        const array = [];

        for (const field of fields) {
            if (field instanceof BaseFormModel) {
                const returnedValue = this.prepareModel2send(field, flat, propertiesIgnored);
                array.push(returnedValue);
            } else if (field instanceof Array) {
                const returnedValue = this.prepareArray2send(field, flat, propertiesIgnored);
                array.push(returnedValue);
            } else if (field.hasOwnProperty('value')) {
                // for some reason when field is InputFieldModel instanceof doesn't work
                // tslint:disable-next-line: no-string-literal
                array.push(field['value']);
            } else {
                return null;
            }
        }

        return array;
    }

    // checks if one of the object's fields has an error
    // if so returns true
    // otherwise returns false
    hasError(nonRequiredParam: Array<string> = []): boolean {
        return BaseFormModel.modelHasError(this, nonRequiredParam);
    }


    // returns an object ready to be sent to the backend
    // Ex:
    // {
    //      'property1': value1,
    //      'property2': value2,
    //      'property3': value3,
    //      'property4': value4
    // }
    prepare2send(flat = false, propertiesIgnored: Array<string> = []) {
        return BaseFormModel.prepareModel2send(this, flat, propertiesIgnored)
    }

    // returns a list of the name of all properties that have input === ''
    //
    // this function returns a list instead of a boolean because it might be useful
    // for example returning a boolean wouldn't work if one of the fields is not required
    //
    // Ex:
    // ["name", "phone"]
    emptyProperties(propertiesIgnored: Array<string> = []): Array<string> {
        const keys = (Object.keys(this));

        let ret = [];

        for (const key of keys) {
            if (propertiesIgnored.includes(key)) {
                continue;
            }

            const field = this[key];

            if (!BaseFormModel.isFieldValid(field)) {
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
