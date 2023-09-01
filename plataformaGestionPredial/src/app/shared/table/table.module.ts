import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableComponent } from './table.component';
import { DataTablesModule } from "angular-datatables";



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    DataTablesModule,
  ],
  exports:[
    TableComponent
  ],
  providers:[DatePipe]
})
export class TableModule { }
