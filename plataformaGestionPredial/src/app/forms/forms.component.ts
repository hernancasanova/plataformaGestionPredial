import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @Input () title: string = "";
  @Input () fields: any;
  @Input () nameForm: FormGroup | undefined;

  // registerForm = new FormGroup({
  //   name: new FormControl('hernan'),
  //   password: new FormControl(''),
  //   fecha: new FormControl(''),
  // });
  files: any = [];
  registrando: boolean = false;
  fileToUpload: File | null = null;
  //form: HTMLFormElement = (document.querySelector('#form') as HTMLInputElement);
  id:number=0;
  //name="bbkbkjn"
  constructor() { 
    //this.nameForm="bovineForm";
  }

  ngOnInit(): void {
    //console.log("f: ",)
  }

  handleFileInput(e:any) {
    this.files.push(e.target.files[0])
    //this.fileToUpload = files.item(0);
  }

  async registerDocument(): Promise<void> 
  {
    this.registrando=true;
    let documento: any = {};
    //   if(this.id!=0){
    //     file.id=this.id;
    //   }
    documento.name=(document.getElementById('name') as HTMLInputElement).value;
    documento.description=(document.getElementById('description') as HTMLInputElement).value;
    //documento.type=Number((document.getElementById('type') as HTMLInputElement).value);
    let type=documento.type=(document.getElementById('type') as HTMLInputElement).value;
    //file.file=(document.getElementById('file') as HTMLInputElement).files?.item(0);
    //let files =(document.getElementById('file')).files;
    // for (const iterator of files) {
      
    // }
    //www.googleapis.com/upload/drive/v3/files?fields=id&uploadType=resumable
    //debugger
    //document.fecha=(document.getElementById('fecha') as HTMLInputElement).value;
    try{                 
      const formData = new FormData();
      //formData.append('document["name"]', "name prueba");
      //formData.append('document["description"]', "description prueba");
      //formData.append('document["type"]', "2");
      //formData.append('document',documento)
      //debugger
      formData.append('name', (document.getElementById('name') as HTMLInputElement).value);
      formData.append('description', (document.getElementById('description') as HTMLInputElement).value);
      formData.append('type', type);
      // formData.append('type', (document.getElementById('type') as HTMLInputElement).value);
      formData.append('file', (document.getElementById('archivo') as HTMLInputElement)?.files?.item(0) as any);
      console.log("formData: ",formData.getAll("name"))
      let response: any = await fetch("http://localhost:8006/register",
                        {method:"POST",
                          // body:JSON.stringify({
                          //   name: "hernan",
                          //   description: "description",
                          //   type: 2
                          // }),
                          body:formData,
                         //Content-Type: 'application/json',
                         
                        //  headers: {
                        //   //'Content-Type': 'multipart/form-data'
                        //   'Content-Type': 'multipart/mixed',
                        //   //'Content-Type': 'application/json'
                        //    //'Content-Type': 'application/x-www-form-urlencoded',
                        // },
                        })
                        .then(x=>x.json())
                        .then(x=>{setTimeout(()=>{},2000);this.registrando=false; return x;})
                        .catch(error=>console.log(error));   
      //console.log("response: ",response)
    }catch{
      console.log("fallo")
    }
  }

  /*async registerDocument(): Promise<void> 
  {
    this.registrando=true;
    let file: any = {};
    if(this.id!=0){
      file.id=this.id;
    }
    file.name=(document.getElementById('name') as HTMLInputElement).value;
    file.description=(document.getElementById('description') as HTMLInputElement).value;
    file.type=Number((document.getElementById('type') as HTMLInputElement).value);
    // debugger
    //document.fecha=(document.getElementById('fecha') as HTMLInputElement).value;
    let response: any = await fetch("http://localhost:8006/register",
                        {method:"POST",
                          body:JSON.stringify(file),
                         //Content-Type: application/json
                         headers: {
                          'Content-Type': 'application/json'
                          // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        })
                        .then(x=>x.json())
                        .then(x=>{setTimeout(()=>{},2000);this.registrando=false; return x;})
                        .catch(error=>console.log(error));
    console.log("response: ",response)
  }*/

}
