import { MaskService } from './../../services/mask.service';
import { ValidationService } from '../../services/validation.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputFieldModel } from './../../models/base/input-field-model';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type;
  @Input() label;
  @Input() example;
  @Input() value = '';
  @Output() return = new EventEmitter();

  id = this.generate_id();
  errors;

  ionViewWillEnter() {
  }

  constructor(public validation: ValidationService, public mask: MaskService) { }

  ngOnInit() {
    this.errors = [];
  }

  hasError() {
    return this.errors && this.errors.length > 0;
  }

  isNotEmpty() {
    return this.value && this.value.length > 0;
  }

  onInput(event) {
    let errors = [];

    // mask
    if (this.type === 'phone') {
      event.value = this.mask.maskPhoneUS(event.value);
    }

    // validation
    if (this.type === 'email') {
      errors = this.validation.validateEmail(event.value);
    } else if (this.type === 'password') {
      errors = this.validation.validatePassword(event.value);
    } else if (this.type === 'phone') {
      errors = this.validation.validatePhoneUS(event.value);
    }

    this.errors = errors;
    this.value = event.value;

    const ret = new InputFieldModel(this.value, this.errors);
    this.return.emit(ret);
  }


  getHeight() {
    let height = 52;
    const input = document.querySelector('#' + this.id + ' .input');
    const error = document.querySelector('#' + this.id + ' .error');

    if (input && error) {
      height = input.scrollHeight + error.scrollHeight;
    }

    return height.toString() + 'px';
  }

  getInputType() {
    let ret = 'text';

    if (this.type === 'password') {
      ret = 'password';
    }

    return ret;
  }

  getMaxLength(): string {
    let ret = '255';

    switch (this.type) {
      case 'phone':
        ret = '13';
        break;
      case 'cpf':
        ret = '14';
        break;
      case 'cnpj':
        ret = '18';
        break;
      default:
        break;
    }
    return ret;
  }

  // found at: https://stackoverflow.com/questions/45661767/javascript-guid-global-unique-identifier-generator-explanation
  generate_id() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return 'id-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
