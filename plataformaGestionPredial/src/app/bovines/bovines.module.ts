import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BovinesComponent } from './bovines.component';
import { FormsModule } from '../forms/forms.module';
import { FormsComponent } from '../forms/forms.component';



@NgModule({
  declarations: [BovinesComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [BovinesComponent]
})
export class BovinesModule { }
