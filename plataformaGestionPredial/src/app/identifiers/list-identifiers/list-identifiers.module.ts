import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIdentifiersComponent } from './list-identifiers.component';
import { TableModule } from 'src/app/shared/table/table.module';



@NgModule({
  declarations: [
    ListIdentifiersComponent
  ],
  imports: [
    CommonModule, TableModule
  ]
})
export class ListIdentifiersModule { }
