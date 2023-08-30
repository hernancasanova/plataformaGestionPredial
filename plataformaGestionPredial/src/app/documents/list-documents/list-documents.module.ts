import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocumentsComponent } from './list-documents.component';
import { TableModule } from 'src/app/shared/table/table.module';



@NgModule({
  declarations: [ListDocumentsComponent],
  imports: [
    CommonModule, TableModule
  ],
  exports:[ListDocumentsComponent]
})
export class ListDocumentsModule { }
