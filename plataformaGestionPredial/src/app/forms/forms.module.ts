import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';          
import { NgForm } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormsComponent,
    NgForm
  ],
  exports: [FormsComponent, NgForm]
})
export class FormsModule { }
