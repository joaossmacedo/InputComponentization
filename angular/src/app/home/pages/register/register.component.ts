import { InputFieldModel } from './../../../../../../ionic/src/app/models/input-field-model';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { RegisterFormModel } from '../../models/register-form.model';
import { LanguageFormModel } from '../../models/language-form.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterContentInit {
  form: RegisterFormModel;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.form = new RegisterFormModel();
  }

  inputReturn(obj: InputFieldModel, type: string, i = 0, field = '') {
    if (type === 'languages') {
      this.form.languages[i][field].value = obj.value;
      this.form.languages[i][field].errors = obj.errors;
    } else if (type === 'skills') {
      this.form.skills[i].value = obj.value;
      this.form.skills[i].errors = obj.errors;
    } else {
      this.form[type] = obj;
    }
    console.log(this.form);
  }

  submit() {
    console.log(this.form.prepare2send());
    console.log(this.form.getPropertiesByForm());
  }

  addNewSkill() {
    this.form.skills.push(new InputFieldModel());
  }

  addNewLanguage() {
    this.form.languages.push(new LanguageFormModel());
  }

  removeSkill(i) {
    this.form.skills = this.form.skills.splice(0, i).concat(this.form.skills.splice(i, this.form.skills.length));
  }

  removeLanguages(i) {
    this.form.languages = this.form.languages.splice(0, i).concat(this.form.languages.splice(i, this.form.languages.length));
  }
}
