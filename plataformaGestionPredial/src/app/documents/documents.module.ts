import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
//import { FormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';
import { ListDocumentsComponent } from './list-documents/list-documents.component';
import { ListDocumentsModule } from './list-documents/list-documents.module';



@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule, FormsModule, ListDocumentsModule
  ]
})
export class DocumentsModule { }
