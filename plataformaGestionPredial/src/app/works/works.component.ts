import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  configurations: any = {title:"Create work", loading:false,textButton:"Create", initialLoading: false};
  //title:string="documento"
  fields: any = [
  //{name:"bovine",type:"image",id:"",text:"Current image:", info:"↓ Select a new image to replace the current image"},
  {name:"image",type:"file", value:"", required:false},
  {name:"name",type:"text", value:"", required:true, placeholder:"Eg: New Work"},
  {name:"description",type:"text", value:"", required:true, placeholder:"Eg: Description Work"},
  {name:"initial date",type:"date", value:"",required:true},
  {name:"finish date",type:"date", value:"",required:true},
  {name:"Estimated cost ($)",type:"number", value:"",required:true, placeholder:"Eg: 50000"},
  //{name:"mother",type:"select", value:"", required:true, options:[]},
  {name:"workers",type:"select", multiple:true, value:"", required:true, options:[{name:"Segundo pereira",value:"1"},{name:"Juan Pérez",value:"2"}]},
  //{name:"type",type:"select",value:"", required:true, options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:""},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}]},
  //{name:"color",type:"select",value:"", required: true, options:[{name:"Clavel(a)",value:"1",selected:""},{name:"Overo(a)",value:"2",selected:""},{name:"Blanco(a)",value:"3",selected:""},{name:"Colorado(a)",value:"4", selected:""},{name:"Amarillo(a)",value:"5",selected:""}]},
  //{name:"state",type:"select",value:"", required: true, options:[{name:"Vivo",value:"1", selected:""},{name:"Muerto",value:"2", selected:""}]},
  //{name:"date sale",type:"date", value:"", required:false},
  //{name:"verified SAG",type:"checkbox", value:"", required:false},
              ]
  constructor() { }

  ngOnInit(): void {
  }

  async registerDocument(): Promise<void> 
  {
    this.configurations.textButton="Creating...";
    this.configurations.loading=true;
    // let documento: any = {};
    // documento.name=(document.getElementById('name') as HTMLInputElement).value;
    // documento.description=(document.getElementById('description') as HTMLInputElement).value;
    //let type=documento.type=(document.getElementById('type') as HTMLInputElement).value;
    try{                 
      const formData = new FormData();
      formData.append('name', (document.getElementById('name') as HTMLInputElement).value);
      formData.append('description', (document.getElementById('description') as HTMLInputElement).value);
      formData.append('type', (document.getElementById('type') as HTMLInputElement).value);//type
      formData.append('file', (document.getElementById('file') as HTMLInputElement)?.files?.item(0) as any);
      let response: any = await fetch("http://localhost:8006/register",
                        {method:"POST",
                          body:formData,
                        })
                        .then(x=>x.json())
                        .then(x=>{setTimeout(()=>{},2000);
                          this.configurations.loading=false;
                          this.configurations.textButton="Create";
                          Swal.fire({
                            title: '',
                            text: 'Document created successfully',
                            icon: 'success',
                            confirmButtonText: 'Accept'
                          })
                          return x;
                        })
                        .catch(error=>console.log(error));   
    }catch{
      console.log("fallo")
    }
  }

}
