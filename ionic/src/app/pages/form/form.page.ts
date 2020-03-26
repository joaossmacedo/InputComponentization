import { FormModel } from './../../models/form-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class FormPage implements OnInit {
  form: FormModel;

  constructor() {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // CREATE
    this.form = new FormModel();
    // EDIT
    // this.form = new FormModel('email@gmail.com', 'Senha1!', '(000)000-0000');
  }

  inputReturn(result, type) {
    this.form[type] = result;

    console.log('Form: ', this.form);
    console.log('Errors: ', this.form.hasError());
    console.log('Empty: ', this.form.emptyProperties());
  }

  reset() {
  }

  submit() {
    console.log(this.form.prepare2send());
  }
}
