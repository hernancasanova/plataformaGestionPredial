import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentifiersComponent } from './identifiers.component';
import { FormsModule } from '../forms/forms.module';



@NgModule({
  declarations: [
    IdentifiersComponent
  ],
  imports: [
    CommonModule,FormsModule
  ],
  exports: [IdentifiersComponent]
})
export class IdentifiersModule { }
