import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  title:string="documento"
  fields: any = [{name:"name",type:"text"},{name:"description",type:"text"},
                {name:"type",type:"select",options:[{name:"Formulario",value:"1"},{name:"Respaldo",value:"2"},{name:"Factura",value:"3"}]},
                {name:"archivo",type:"file"},{name:"Create",type:"submit"}]

  constructor() { }

  ngOnInit(): void {
  }

}
