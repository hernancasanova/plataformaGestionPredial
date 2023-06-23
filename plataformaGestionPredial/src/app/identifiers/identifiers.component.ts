import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identifiers',
  templateUrl: './identifiers.component.html',
  styleUrls: ['./identifiers.component.css']
})
export class IdentifiersComponent implements OnInit {
  id: number=0;
  name="";
  date:Array<string>=[];
  title:string="Ingresar Identificador";
  fields: Array<any> = [
                // {name:"bovine",type:"image",id:"",text:"Actual image", info:"Select a new image to replace the actual image"},
                //{name:"image",type:"file"},
                {name:"DIIO",type:"text", value:""},
                {name:"date placement",type:"date", value:""},
                {name:"bovine",type:"select",options:[{name:"Seleccione",value:"1",selected:"selected"}]},
                // {name:"sex",type:"select", options:[{name:"Macho",value:"1",selected:""},{name:"Hembra",value:"2",selected:""}]},
                // {name:"type",type:"select",options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:""},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}]},
                // {name:"color",type:"select",options:[{name:"Clavel(a)",value:"1",selected:""},{name:"Overo(a)",value:"2",selected:""},{name:"Blanco(a)",value:"3",selected:""},{name:"Colorado(a)",value:"4", selected:""},{name:"Amarillo(a)",value:"5",selected:""}]},
                // {name:"state",type:"select",options:[{name:"Vivo",value:"1", selected:""},{name:"Muerto",value:"2", selected:""}]},
                // {name:"date sale",type:"date", value:""},
                {name:"Create",type:"submit"}];

  constructor() { }

  ngOnInit(): void {
  }

}
