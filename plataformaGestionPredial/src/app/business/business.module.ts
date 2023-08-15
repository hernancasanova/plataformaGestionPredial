import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { FormsModule } from '../forms/forms.module';
import { FormsComponent } from '../forms/forms.component';



@NgModule({
  declarations: [
    BusinessComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    BusinessComponent
  ]
})
export class BusinessModule { }
