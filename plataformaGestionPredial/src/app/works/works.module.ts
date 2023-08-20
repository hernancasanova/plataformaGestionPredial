import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksComponent } from './works.component';
import { FormsModule } from '../forms/forms.module';



@NgModule({
  declarations: [
    WorksComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class WorksModule { }
