import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IdentifierService } from '../services/identifier.service';
import { VacunosService } from '../services/vacunos.service';

@Component({
  selector: 'app-identifiers',
  templateUrl: './identifiers.component.html',
  styleUrls: ['./identifiers.component.css']
})
export class IdentifiersComponent implements OnInit {
  setImageBovine=(bovine:any):void=>{
    console.log("bovine: ",bovine.target.value)
  }
  idBovineSelected: number=0;
  newIdentifier:Object={};
  bovines:Array<any>=[];
  date:Array<string>=[];
  configurations: any = {title:"Create identifier", loading:false,textButton:"Create", initialLoading:false};
  fields: Array<any> = [
                //{name:"image",type:"file"},
                {name:"DIIO",type:"text", value:"", required:true , placeholder:"Eg: 014628273"},
                {name:"date placement",type:"date", value:"", required:true},
                {name:"bovine",type:"select",value:"", required: true, options:[], change: this.setImageBovine },
                {name:"image-bovine",type:"image",id:"",text:"Bovine selected:", info:""},
                // {name:"bovine",type:"image",id:"",text:"Current image", info:"Select a new image to replace the current image"},
                // {name:"image",type:"file", value:"", required:true},
                // {name:"name",type:"text", value:"", required:true},
                // {name:"date birth",type:"date", value:"",required:true},
                // {name:"mother",type:"select", value:"", required:true, options:[]},
                // {name:"sex",type:"select", value:"", required:true, options:[{name:"Macho",value:"1",selected:""},{name:"Hembra",value:"2",selected:""}]},
                // {name:"type",type:"select",value:"", required:true, options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:""},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}]},
                // {name:"color",type:"select",value:"", required: true, options:[{name:"Clavel(a)",value:"1",selected:""},{name:"Overo(a)",value:"2",selected:""},{name:"Blanco(a)",value:"3",selected:""},{name:"Colorado(a)",value:"4", selected:""},{name:"Amarillo(a)",value:"5",selected:""}]},
                // {name:"state",type:"select",value:"", required: true, options:[{name:"Vivo",value:"1", selected:""},{name:"Muerto",value:"2", selected:""}]},
                // {name:"date sale",type:"date", value:"", required:false},
                // {name:"CreateCreate",type:"submit"},
                // {name:"Create",type:"submit"}
              ];

  constructor(private identifierService: IdentifierService, private vacunoService: VacunosService) {
    this.configurations.initialLoading=true;
    this.vacunoService.getBovines()
    .subscribe(bs=>{
      bs.forEach((b: { type: string; name: any; id: any; })=>{
        this.bovines.push({name:b.name, value:b.id})
      })
    },
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{this.setBovines()}
    );
  }

  ngOnInit(): void {
    
  }

  /*ngAfterViewInit() {
    //this.renderer.listen(this.myDiv, 'click', (event) => console.log("Trying to listen to click event on that DIV"));
    var sel=(document.getElementById('bovine')) as HTMLSelectElement;
    sel.addEventListener('change', function() {
      //this.setImageBovine(this.value);
      console.log('You selected: ', this.value);
    });
  }*/

  desplegarImagenBovino=(event:any):void=>{
    this.fields.forEach(e => {
      if(e.name=="image-bovine"){
        e.id=event.target.value
      }
    })
  }



  setBovines():void{
    this.fields.forEach(e => {
      if(e.name=="bovine"){
        e.options=this.bovines
      }
      this.configurations.initialLoading=false;
    })
  }


  registerIdentifier=():void=>{
    this.configurations.loading=true;
    this.configurations.textButton="Creating...";
    //console.log("this.loading: ",this.loading)
    this.fields.forEach(e => {
      if(e.name=="DIIO"){
        this.newIdentifier={...this.newIdentifier, diio:e.value}
      }else if (e.name=="date placement"){
        this.newIdentifier={...this.newIdentifier, date_placement:e.value+"T00:00:00"}
      }else if(e.name=="bovine"){
        //let myDate = e.value.split("-");
        //let newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        this.newIdentifier={...this.newIdentifier, bovine:parseInt(e.value)}
      }
    })
    console.log("this.newIdentifier: ",this.newIdentifier)
    this.identifierService.createIdentifier(this.newIdentifier).
    subscribe(r=>console.log("r: ",r),
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{this.configurations.loading=false;
      Swal.fire({
        title: '',
        text: "DIIO created succesfully",
        icon: 'success',
        confirmButtonText: 'Accept'
      })
      this.configurations.textButton="Create";}
    );
    //return 2;
  }

}
