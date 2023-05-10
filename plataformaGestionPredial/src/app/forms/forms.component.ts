import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  
  registrando: boolean = false;
  id:number=0;
  constructor() { }

  ngOnInit(): void {
  }

  async registerDocument(): Promise<void> 
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
  }

}
