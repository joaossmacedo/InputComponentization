import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type;
  @Output() return = new EventEmitter();

  errors;

  value;

  ionViewWillEnter() {
    this.value = '';
  }

  constructor() { }

  ngOnInit() {
    this.errors = [];
    // const error = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    //   ' Mauris vulputate nec erat in dignissim. Donec ut ligula' +
    //   ' ac risus dignissim.';
    // this.errors.push(error);
  }

  hasError() {
    return this.errors && this.errors.length > 0
  }

  getPlaceholder() {
    var ret = '';

    if (this.type === 'email') {
      ret = 'E-mail';
    } else if (this.type === 'password') {
      ret = 'Senha';
    }

    return ret;
  }

  validate(value) {
    console.log('validating ' + this.type)
    console.log('value: ' + value)
    var errors = []

    if (this.type === 'email') {
      errors = this.validateEmail(value);
    } else if (this.type === 'password') {
      errors = this.validatePassword(value);
    }

    this.errors = errors;

    this.return.emit({
      'input': value,
      'errors': this.errors
    })
  }


  validateEmail(email) {
    var ret = [];

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      ret.push('invalid email')
    }

    return ret;
  }

  validatePassword(password) {
    var ret = [];

    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/

    if (!re.test(String(password))) {
      ret.push('password must contain at least 6 characters, 1 special character, 1 number, 1 uppercase and 1 lowercase')
    }

    return ret;
  }
}
