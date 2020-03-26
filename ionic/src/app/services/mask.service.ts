import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  constructor() { }

  maskPhoneBR(event) {
    // I'm using the brazilian format for phones "(00)0000-0000" or "(00)00000-0000".
    // We decide if we should use the 9 or 8 digit format based on its value length.
    let value: string = event.value;

    if (value.length > 14) {
      value = value.substr(0, value.length - 1);
    }

    const len = value.length;
    if (len === 1 && value[len - 1] === '(') {
      value = '';
    } else if (len === 1) {
      value = '(' + value;
    } else if (len === 4  && value[len - 1] === ')') {
      value = value.substr(0, len - 1);
    } else if (len === 4) {
      value = value.substr(0, len - 1) + ')' + value[len - 1];
    } else if (len === 9  && value[len - 1] === '-') {
      value = value.substr(0, len - 1);
    } else if (len === 9) {
      value = value.substr(0, len - 1) + '-' + value[len - 1];
    } else if (len === 13  && value[9] === '-') {
      value = value.replace('-', '');
      value = value.substr(0, 8) + '-' + value.substr(8, len - 1);
    } else if (len === 14) {
      value = value.replace('-', '');
      value = value.substr(0, 9) + '-' + value.substr(9, len - 1);
    }

    event.value = value;
  }

  maskPhoneUS(event) {
    // I'm using the brazilian format for phones "(00)0000-0000" or "(00)00000-0000".
    // We decide if we should use the 9 or 8 digit format based on its value length.
    let value: string = event.value;

    if (value.length > 13) {
      value = value.substr(0, value.length - 1);
    }

    const len = value.length;
    if (len === 1 && value[len - 1] === '(') {
      value = '';
    } else if (len === 1) {
      value = '(' + value;
    } else if (len === 5  && value[len - 1] === ')') {
      value = value.substr(0, len - 1);
    } else if (len === 5) {
      value = value.substr(0, len - 1) + ')' + value[len - 1];
    } else if (len === 9  && value[len - 1] === '-') {
      value = value.substr(0, len - 1);
    } else if (len === 9) {
      value = value.substr(0, len - 1) + '-' + value[len - 1];
    }

    event.value = value;
  }
}
