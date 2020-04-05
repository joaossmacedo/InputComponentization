import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  constructor() { }

  maskPhoneBR(value: string): string {
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 11) {
      value = value.substr(0, 11);
    }

    const len = (value.length);

    if (len > 0) {
      value = '(' + value;
    }
    if (len > 2) {
      value = value.slice(0, 3) + ')' + value.slice(3);
    }
    if (len > 6) {
      const dashPosition = len === 11 ? 9 : 8;
      value = value.slice(0, dashPosition) + '-' + value.slice(dashPosition);
    }

    return value;
  }

  maskPhoneUS(value: string): string {
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 10) {
      value = value.substr(0, 10);
    }

    const len = (value.length);

    if (len > 0) {
      value = '(' + value;
    }
    if (len > 3) {
      value = value.slice(0, 4) + ')' + value.slice(4);
    }
    if (len > 6) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }

    return value;
  }

  maskCNPJ(value: string): string {
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 14) {
      value = value.substr(0, 14);
    }

    const len = (value.length);

    if (len > 2) {
      value = value.slice(0, 2) + '.' + value.slice(2);
    }
    if (len > 5) {
      value = value.slice(0, 6) + '.' + value.slice(6);
    }
    if (len > 8) {
      value = value.slice(0, 10) + '/' + value.slice(10);
    }
    if (len > 12) {
      value = value.slice(0, 15) + '-' + value.slice(15);
    }
    if (len > 14) {
      value = value.slice(0, 18) + ')' + value.slice(18);
    }

    return value;
  }

  maskCPF(value: string): string {
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 11) {
      value = value.substr(0, 11);
    }

    const len = (value.length);

    if (len > 3) {
      value = value.slice(0, 3) + '.' + value.slice(3);
    }
    if (len > 6) {
      value = value.slice(0, 7) + '.' + value.slice(7);
    }
    if (len > 9) {
      value = value.slice(0, 11) + '-' + value.slice(11);
    }

    return value;
  }

  maskLanguageLevel(value: string): string {
    value = value.replace(/[^0-9]/g, '');

    const numericalValue = Number(value);

    if (numericalValue < 1 || numericalValue > 5) {
      if (value.length > 1) {
        value = value.substr(0, 1);
      } else {
        value = '';
      }
    }

    return value;
  }
}
