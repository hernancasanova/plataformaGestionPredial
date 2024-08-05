import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentifiersComponent } from './identifiers.component';
import { FormsModule } from '../forms/forms.module';
import { ListIdentifiersModule } from './list-identifiers/list-identifiers.module';



@NgModule({
  declarations: [
    IdentifiersComponent
  ],
  imports: [
  FormsModule, ListIdentifiersModule
  ],
  exports: [IdentifiersComponent]
})
export class IdentifiersModule { }
