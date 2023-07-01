import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';          
import { NgForm } from '@angular/forms';
import { FormsModule as FM, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule, 
    FM,
    //ReactiveFormsModule,
    NgbToastModule
  ],
  declarations: [
    FormsComponent,
    //NgForm,
  ],
  //exports: [FormsComponent, NgForm,NgbdToastGlobal]
  exports: [FormsComponent, NgForm]
})
export class FormsModule { }
