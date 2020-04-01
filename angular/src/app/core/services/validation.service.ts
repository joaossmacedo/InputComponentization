import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

// tslint:disable-next-line: class-name
interface RETURN_TYPE { [key: string]: {[value: string]: string}; }

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  validatePhoneFormatBR(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      const phoneRegex = /^(\(){1}(\d){2}(\)){1}(\d){4,5}(-){1}(\d){4,5}$/;
      const invalidPhone = !phoneRegex.test(control.value);

      return invalidPhone
        ? { invalidPhoneFormat: { value: control.value } }
        : null;
    };
  }

  validatePhoneFormatUS(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      const phoneRegex = /^(\(){1}(\d){3}(\)){1}(\d){3}(-){1}(\d){4}$/;
      const invalidPhone = !phoneRegex.test(control.value);

      return invalidPhone
        ? { invalidPhoneFormat: { value: control.value } }
        : null;
    };
  }


  validateEmailFormat() {
    return (control: AbstractControl): RETURN_TYPE | null => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const invalidEmail = !emailRegex.test(control.value);

      return invalidEmail
        ? { invalidEmailFormat: { value: control.value } }
        : null;
    };
  }

  validateEmailCPFFormat(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      const cpfRegex = /^(\d){3}(.){1}(\d){3}(.){1}(\d){3}(-){1}(\d){2}$/;
      const invalidCPF = !cpfRegex.test(control.value);
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const invalidEmail = !emailRegex.test(control.value);

      const invalidEmailCPF = invalidCPF && invalidEmail;

      return invalidEmailCPF
        ? { invalidEmailCPFFormat: { value: control.value } }
        : null;
    };
  }

  validateCPFFormat(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      const cpfRegex = /^(\d){3}(.){1}(\d){3}(.){1}(\d){3}(-){1}(\d){2}$/;
      const invalidCPF = !cpfRegex.test(control.value);

      return invalidCPF
        ? { invalidCPFFormat: { value: control.value } }
        : null;
    };
  }

  validateCNPJFormat(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      const cnpjRegex = /^(\d){2}(.){1}(\d){3}(.){1}(\d){3}(\/){1}(\d){4}(-){1}(\d){2}$/;
      const invalidCNPJ = !cnpjRegex.test(control.value);

      return invalidCNPJ
        ? { invalidCNPJFormat: { value: control.value } }
        : null;
    };
  }

  validatePasswordFormat(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      let invalidPassword = false;

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&+-])[A-Za-z\d@$!%*#?&+-]{6,}$/;
      invalidPassword = !passwordRegex.test(control.value);

      return invalidPassword
        ? { invalidPasswordFormat: { value: control.value } }
        : null;
    };
  }

  validatePasswordChar(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      let invalidPassword = false;

      const invalidCharRegex = /[^A-Za-z\d@$!%*#?&+-]+/;
      invalidPassword = invalidCharRegex.test(control.value);

      let invalidChar = '';
      if (invalidPassword) {
        invalidChar = invalidCharRegex.exec(control.value)[0].substr(0, 1);
      }

      return invalidPassword
        ? { invalidPasswordChar: { value: invalidChar } }
        : null;
    };
  }

  validatePasswordConfirmation = (getConfirmValue: (() => string[])) => {
    return (control: FormControl) => {
      const confirmValue = getConfirmValue();
      let invalidPassword = false;

      invalidPassword = confirmValue !== undefined && control.value !== confirmValue;

      return invalidPassword ? { invalidPasswordConfirmation: { value: control.value } } : null;
    };
  }

  validateLanguageLevel(): ValidatorFn {
    return (control: AbstractControl): RETURN_TYPE | null => {
      let invalidLanguageLevel = false;

      const validLanguageLevelRegex = /^(\d){1}$/;
      invalidLanguageLevel = !validLanguageLevelRegex.test(control.value);

      const value = Number(control.value);

      if (value < 1 || value > 5) {
        invalidLanguageLevel = true;
      }

      return invalidLanguageLevel
        ? { invalidLanguageLevel: { value: control.value } }
        : null;
    };
  }
}
