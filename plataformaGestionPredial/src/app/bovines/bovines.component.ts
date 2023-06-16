import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bovines',
  templateUrl: './bovines.component.html',
  styleUrls: ['./bovines.component.css']
})
export class BovinesComponent implements OnInit {

  title:string="bovino"
  fields: any = [{name:"imagen",type:"file"},{name:"name",type:"text"},{name:"date birth",type:"date"},
                {name:"mother",type:"select",options:[{name:"Vaca 1",value:"2"}]},
                {name:"sex",type:"select"},
                {name:"type",type:"select",options:[{name:"Ternero",value:"1"},{name:"Ternera",value:"2"},{name:"Toro",value:"3"},{name:"Vaquilla",value:"4"},{name:"Vaca",value:"5"},{name:"Buey",value:"6"},{name:"Novillo",value:"7"}]},
                {name:"color",type:"select",options:[{name:"Clavel(a)",value:"1"},{name:"Overo(a)",value:"2"},{name:"Blanco(a)",value:"3"},{name:"Colorado(a)",value:"4"},{name:"Amarillo(a)",value:"5"}]},
                {name:"state",type:"select",options:[{name:"Vaca 1",value:"2"}]},
                {name:"date sale",type:"select",options:[{name:"Vaca 1",value:"2"}]},
                {name:"Create",type:"submit"}]

  constructor() { }

  ngOnInit(): void {
  }

}
