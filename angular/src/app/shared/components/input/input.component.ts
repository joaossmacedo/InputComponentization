import { InputFieldModel } from '../../../core/models/form-models/base/input-field.model';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MaskService } from '../../../core/services/mask.service';
import { ValidationService } from '../../../core/services/validation.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnChanges {
  @Input() initialValue = '';
  @Input() type = 'none';
  @Input() label = 'Label';
  @Input() placeholder = 'Placeholder';
  @Input() disabled = false;
  @Input() required = true;
  // confirmValue is used to confirm password
  @Input() confirmValue = undefined;

  @Output() emitter = new EventEmitter();


  errors: Array<string>;
  control: FormControl;
  id = this.guidGenerator();

  showPassword = false;

  constructor(public mask: MaskService, public validation: ValidationService) { }

  ngOnInit(): void {
    this.errors = [];

    const validators = [];

    if (this.required) {
      validators.push(Validators.required);
    }

    switch (this.type) {
      case 'email':
        validators.push(this.validation.validateEmailFormat());
        break;
      case 'phone':
        validators.push(this.validation.validatePhoneFormatUS());
        break;
      case 'password':
        validators.push(this.validation.validatePasswordChar());
        validators.push(this.validation.validatePasswordFormat());
        validators.push(
          this.validation.validatePasswordConfirmation(() => this.confirmValue)
        );
        break;
      case 'cpf':
        validators.push(this.validation.validateCPFFormat());
        break;
      case 'cnpj':
        validators.push(this.validation.validateCNPJFormat());
        break;
      default:
        break;
    }

    const initial = {
      value: this.initialValue,
      disabled: this.disabled
    };

    this.control = new FormControl(initial, validators);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.confirmValue && changes.confirmValue.previousValue) {
      // this makes sure when the value of the confirmValue changes but
      // the value stays the same, it still goes through all validators again
      this.control.setValue(this.control.value);
      this.errors = this.getErrors();

      const ret = new InputFieldModel(this.control.value, this.errors);
      this.emitter.emit(ret);
    }
    if (changes.disabled && this.control) {
      if (this.disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
      return;
    }
  }

  keyPress(target): void {
    let value = target.value;

    switch (this.type) {
      case 'phone':
        value = this.mask.maskPhoneUS(value);
        break;
      case 'cpf':
        value = this.mask.maskCPF(value);
        break;
      case 'cnpj':
        value = this.mask.maskCNPJ(value);
        break;
      default:
        break;
    }
    target.value = value;
    this.control.setValue(value);

    this.errors = this.getErrors();

    const ret = new InputFieldModel(this.control.value, this.errors);

    this.emitter.emit(ret);
  }

  getMaxLength(): string {
    let ret = '255';

    switch (this.type) {
      case 'phone':
        ret = '14';
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

  getType() {
    let ret = 'text';

    const passwordType = ['password'];
    const emailType = ['email'];
    const numbersType = [];

    if (passwordType.includes(this.type) && !this.showPassword) {
      ret = 'password';
    } else if (emailType.includes(this.type)) {
      ret = 'email';
    } else if (numbersType.includes(this.type)) {
      ret = 'number';
    }

    return ret;
  }

  getErrorMessage(): string {
    if (0 >= this.errors.length) {
      return '';
    }

    // if the error is not dynamic(error is always the same) it should be included here
    const errorMapping = {
      required: 'Field required',
      invalidEmailFormat: 'Invalid email format',
      invalidPhoneFormat: 'Invalid phone format',
      invalidPasswordFormat: 'Password should contain at least 6 characters of which there shall be at least' +
                             ' 1 uppercase letter , 1 lowercase letter, 1 number and 1 special character ',
      invalidPasswordConfirmation: 'Passwords don\'t match',
      invalidCPFFormat: 'Invalid CPF format',
      invalidCNPJFormat: 'Invalid CNPJ format'
    };

    const error = this.errors[0];

    if (errorMapping[error]) {
      return errorMapping[error];
    }

    // if the error is dynamic
    switch (error) {
      case 'invalidPasswordChar':
        const fullError = this.control.getError(error);
        const invalidChar = fullError.value;
        return 'Character "' + invalidChar + '" is invalid';
      default:
        return 'Invalid field';
    }
  }

  getErrors(): Array<string> {
    const ret = [];

    const controlErrors: ValidationErrors = this.control.errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        if (controlErrors[keyError]) {
          ret.push(keyError);
        }
      });
    }

    return ret;
  }

  guidGenerator(): string {
    const S4 = () => {
      return Math.trunc((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    // WARNING: DON'T REMOVE the 'id' at the beginning of the return.
    // If you remove it, this code might stop working because ids must
    // start with a letter, so the querySelector won't work
    return 'id-' + this.type + '-' + (S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4());
  }
}

