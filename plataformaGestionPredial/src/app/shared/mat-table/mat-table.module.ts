import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { MatTableComponent } from './mat-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    MatTableComponent
  ],
  imports: [
    CommonModule, 
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [MatTableComponent],
  providers:[]
})
export class CustomMatTableModule { }
