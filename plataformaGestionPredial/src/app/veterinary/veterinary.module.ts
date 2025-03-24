import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeterinaryComponent } from './veterinary.component';
import { FormsModule } from '../forms/forms.module';
//import { ListIdentifiersModule } from './list-identifiers/list-identifiers.module';



@NgModule({
  declarations: [
    VeterinaryComponent
  ],
  imports: [
  FormsModule, 
  //ListIdentifiersModule
  ],
  //exports: [IdentifiersComponent]
})
export class VeterinaryModule { }
