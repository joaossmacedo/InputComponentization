import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [InputComponent]
})
export class ComponentsModule { }
