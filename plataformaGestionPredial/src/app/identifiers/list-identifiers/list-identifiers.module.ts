import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIdentifiersComponent } from './list-identifiers.component';
import { TableModule } from 'src/app/shared/table/table.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomMatTableModule } from 'src/app/shared/mat-table/mat-table.module';



@NgModule({
  declarations: [
    ListIdentifiersComponent
  ],
  imports: [
    CommonModule, TableModule, MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule, 
    CustomMatTableModule
  ]
})
export class ListIdentifiersModule { }
