import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomPaginatorIntl } from './custom-paginator-intl';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [],
  providers:[{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}]
})
export class CustomMatTableModule { }
