import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validatePhone(input) {
    return [];
  }

  validateEmail(email) {
    const ret = [];

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      ret.push('invalid email');
    }

    return ret;
  }

  validatePassword(password) {
    const ret = [];

    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!re.test(String(password))) {
      ret.push('password must contain at least 6 characters, 1 special character, 1 number, 1 uppercase and 1 lowercase');
    }

    return ret;
  }
}
