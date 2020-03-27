import { InputFieldModel } from './../../../../../../ionic/src/app/models/input-field-model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RegisterFormModel } from '../../models/register-form.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form: RegisterFormModel;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form = new RegisterFormModel();
  }

  inputReturn(obj: InputFieldModel, type: string) {
    console.log(type + ': ' + obj);
    this.form[type] = obj;
  }

  submit() {
    console.log(this.form.prepare2send());
  }
}
