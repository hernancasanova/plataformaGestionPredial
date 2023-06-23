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
  //@Input () textButton: string = "";
  @Input () configurations: any;
  @Input () loading: boolean = false; 
  //@Output() newItemEvent = new EventEmitter<string>();
  //@Input () callBackFunction: (() => void);
  @Input () callBackFunction: any;

  //submitFunction:any;
  files: any = [];
  loading2: boolean = false;
  fileToUpload: File | null = null;
  id:number=0;
  constructor() { 
  }

  inputFunction():any{
    this.callBackFunction()
  }

  ngOnInit(): void {
  }

  handleFileInput(e:any) {
    this.files.push(e.target.files[0])
  }

  async registerDocument(): Promise<void> 
  {
    this.loading2=true;
    let documento: any = {};
    documento.name=(document.getElementById('name') as HTMLInputElement).value;
    documento.description=(document.getElementById('description') as HTMLInputElement).value;
    let type=documento.type=(document.getElementById('type') as HTMLInputElement).value;
    try{                 
      const formData = new FormData();
      formData.append('name', (document.getElementById('name') as HTMLInputElement).value);
      formData.append('description', (document.getElementById('description') as HTMLInputElement).value);
      formData.append('type', type);
      formData.append('file', (document.getElementById('archivo') as HTMLInputElement)?.files?.item(0) as any);
      console.log("formData: ",formData.getAll("name"))
      let response: any = await fetch("http://localhost:8006/register",
                        {method:"POST",
                          body:formData,
                        })
                        .then(x=>x.json())
                        .then(x=>{setTimeout(()=>{},2000);this.loading2=false; return x;})
                        .catch(error=>console.log(error));   
    }catch{
      console.log("fallo")
    }
  }


}
