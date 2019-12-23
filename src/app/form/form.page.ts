import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class FormPage implements OnInit {

  constructor() {
    
  }

  ngOnInit() {
  }

  inputReturn(result, type){
    console.log("Result: ", result)
    console.log("Type: ", type)
  }
}
