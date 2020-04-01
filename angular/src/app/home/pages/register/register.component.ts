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

  inputReturn(obj: InputFieldModel, type: string, path: Array<number | string> = []) {
    if (type === 'company') {
      this.form.company[path[0]].value = obj.value;
      this.form.company[path[0]].errors = obj.errors;
    } else if (type === 'languages') {
      this.form.languages[path[0]][path[1]].value = obj.value;
      this.form.languages[path[0]][path[1]].errors = obj.errors;
    } else if (type === 'skills') {
      this.form.skills[path[0]].value = obj.value;
      this.form.skills[path[0]].errors = obj.errors;
    } else {
      this.form[type] = obj;
    }
    console.log(this.form);
  }

  submit() {
    console.log(this.form.prepare2send());
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
