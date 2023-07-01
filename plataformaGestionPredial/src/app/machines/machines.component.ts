import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  formulario: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.formulario = this.formBuilder.group({
      campo1: new FormControl('', Validators.required),
      campo2: new FormControl('', Validators.required),
      // Agrega más campos y validaciones según tus necesidades
    });
  }

  ngOnInit(): void {
  }

  enviarFormulario():void{
    alert("Formulario válido")
  }

}
