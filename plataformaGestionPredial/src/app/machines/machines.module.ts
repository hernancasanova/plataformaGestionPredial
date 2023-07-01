import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachinesComponent } from './machines.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MachinesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class MachinesModule { }
