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
    this.form = new FormModel();
  }

  inputReturn(result, type) {
    this.form[type] = result;

    console.log(this.form);
    console.log(this.form.hasError());
    console.log(this.form.emptyProperties());
  }

  reset() {
  }

  submit() {
    console.log(this.form.prepare2send());
  }
}
