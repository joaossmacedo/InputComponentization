import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validatePhoneBR(value: string): Array<string> {
    const errors = [];

    const phoneRegex = /^(\(){1}(\d){2}(\)){1}(\d){4,5}(-){1}(\d){4,5}$/;
    if (!phoneRegex.test(value)) {
      errors.push('Invalid phone');
    }

    return errors;
  }

  validatePhoneUS(value: string): Array<string> {
    const errors = [];
    const phoneRegex = /^(\(){1}(\d){3}(\)){1}(\d){3}(-){1}(\d){4}$/;

    if (!phoneRegex.test(value)) {
      errors.push('Invalid phone');
    }

    return errors;
  }


  validateEmail(value: string): Array<string> {
    const errors = [];

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      errors.push('Invalid email');
    }

    return errors;
  }

  validateCPF(value: string): Array<string> {
    const errors = [];

    const cpfRegex = /^(\d){3}(.){1}(\d){3}(.){1}(\d){3}(-){1}(\d){2}$/;
    if (!cpfRegex.test(value)) {
      errors.push('Invalid CPF');
    }

    return errors;
  }

  validateCNPJ(value: string): Array<string> {
    const errors = [];

    const cnpjRegex = /^(\d){2}(.){1}(\d){3}(.){1}(\d){3}(\/){1}(\d){4}(-){1}(\d){2}$/;
    if (!cnpjRegex.test(value)) {
      errors.push('Invalid CNPJ');
    }

    return errors;
  }

  validatePassword(value: string): Array<string> {
    const errors = [];
    let invalidPassword = false;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&+-])[A-Za-z\d@$!%*#?&+-]{6,}$/;
    if (!passwordRegex.test(value)) {
      errors.push('Password should contain at least 6 characters of which there shall be at least' +
                  ' 1 uppercase letter , 1 lowercase letter, 1 number and 1 special character');
    }

    const invalidCharRegex = /[^A-Za-z\d@$!%*#?&+-]+/;
    invalidPassword = invalidCharRegex.test(value);
    let invalidChar = '';
    if (invalidPassword) {
      invalidChar = invalidCharRegex.exec(value)[0].substr(0, 1);
      errors.push('Character "' + invalidChar + '" is invalid');
    }

    return errors;
  }

  validatePasswordConfirmation(value: string, confirmValue: string): Array<string> {
    const errors = [];

    if (confirmValue !== undefined && value !== confirmValue) {
      errors.push('Passwords don\'t match');
    }

    return errors;
  }
}
