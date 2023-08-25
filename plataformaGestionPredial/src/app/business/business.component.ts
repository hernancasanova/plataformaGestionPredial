import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  configurations: any = {title:"Register business", loading:false,textButton:"Register", initialLoading:false};
  //title:string="documento"
  fields: any = [{name:"name",type:"text",value:"", required:true, placeholder:"Eg: New business"},{name:"description",type:"text", value:"", required:true, placeholder:"Eg: An description"},
                {name:"type",type:"select", value:"", required:true ,options:[{name:"Compra",value:"1"},{name:"Venta",value:"2"},{name:"Trabajo",value:"3"}]},
                {name:"date",type:"date", value:"", required:true},
                {name:"file",type:"file", value:"", required:false}
              ]

  constructor() { }

  ngOnInit(): void {
  }

  async registerBusiness(): Promise<void> 
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
                          // Swal.fire({
                          //   title: '',
                          //   text: 'Document created successfully',
                          //   icon: 'success',
                          //   confirmButtonText: 'Accept'
                          // })
                          return x;
                        })
                        .catch(error=>console.log(error));   
    }catch{
      console.log("fallo")
    }
  }

}
