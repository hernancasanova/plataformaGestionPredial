import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
//import { FormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';



@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule, FormsModule
  ]
})
export class DocumentsModule { }
