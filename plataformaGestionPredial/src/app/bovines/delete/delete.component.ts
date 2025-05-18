import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { VacunosService } from '../../services/vacunos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  id: number=0;
  displayBovineImage=(event:any):void=>{
    console.log("event: ",event)
    this.fields.forEach(e => {
      if((e.name=="bovine" && event.target.id=="mother") || (e.name=="image-father" && event.target.id=="father")){
        e.id=event.target.value
        e.url="http://localhost:8006/images/bovines/old/"+event.target.value//dejar así por el momento, ya que la información no hace referencia al bovino en cuestion 
      }
    })
  }
  date:Array<string>=[];
  newBovine:Object={};
  configurations: any = {title:"Delete bovine", loading:false, textButton:"Delete", initialLoading:false};
  causes: Array<any>=[];
  fields: Array<any> = [
                //{name:"bovine",type:"image",id:"",text:"Current image:", info:""},
                {name:"bovine",type:"image",id:"",text:"Current image:", info:"", full:false, url:""},
                {name:"name",type:"text", value:"", required:true, placeholder:"Eg: My cow", disabled:true},
                // {name:"father",type:"select", value:"", required:true, options:[], full:true, function:this.displayBovineImage},
                //{name:"reason",type:"select", value:"", required:true, options:[{name:"Enfermedad",value:"1",selected:""},{name:"Muerte natural",value:"2",selected:""},{name:"Otro (agregar en observación)",value:"3",selected:""}]},
                {name:"reason",type:"select", value:"", required:true, options:this.causes},
                {name:"observation",type:"text", value:"", required:false, placeholder:""},
                {name:"date death",type:"date", value:"", required:true, full:true},
                //{name:"Create",type:"submit"}
              ];

  deleteBovine=():number=>{
    this.configurations.loading=true;
    this.configurations.textButton="Deleting...";
    this.vacunoService.deleteBovine(this.id).
    subscribe(r=>console.log("r: ",r),
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{this.configurations.loading=false;
      Swal.fire({
        title: '',
        text: "Bovine deleted succesfully",
        icon: 'success',
        confirmButtonText: 'Accept'
      })
      this.router.navigate(["bovines"])
      this.configurations.textButton="Delete";}
    );
    return 2;
  }


  async getCausesDeath(): Promise<void> 
  {
    //this.configurations.textButton="Creating...";
    //this.configurations.loading=true;
    try{                 
      // const formData = new FormData();
      // formData.append('name', (document.getElementById('name') as HTMLInputElement).value);
      // formData.append('description', (document.getElementById('description') as HTMLInputElement).value);
      // formData.append('type', (document.getElementById('type') as HTMLInputElement).value);//type
      // formData.append('file', (document.getElementById('file') as HTMLInputElement)?.files?.item(0) as any);
      let response: any = await fetch("http://localhost:8006/causes_death",
                        {method:"GET",
                        })
                        .then(x=>x.json())
                        .then(x=>{x.forEach((c:any)=>{
                          this.causes.push({name:c.name,value:c.id,selected:""})
                        })}
                          )
                          /*this.configurations.loading=false;
                          this.configurations.textButton="Create";
                          Swal.fire({
                            title: '',
                            text: 'Document created successfully',
                            icon: 'success',
                            confirmButtonText: 'Accept'
                          })
                          return x;
                        })*/
                        .catch(error=>console.log(error));   
    }catch{
      console.log("No se pudieron obtener las causas de muerte")
    }
  }

  constructor(private router: Router, private vacunoService: VacunosService, private route: ActivatedRoute) {
    this.configurations.initialLoading=true;
    // this.vacunoService.getBovines()
    // .subscribe(bs=>{
    //   bs.forEach((v: { type: string; name: any; id: any; })=>{
    //     if(v.type=="Vaca"){
    //       this.mothers.push({name:v.name, value:v.id, selected:""})
    //     }
    //   })
    // },
    // (error:any)=>console.log("error en Observable: ",error),
    // ()=>{}
    // );
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']){
          this.id=parseInt(params['id']);
          //this.configurations.title="Edit bovine"
        }
      }
    )
    
  }

  /*desplegarImagenBovino=(event:any):void=>{
    // this.fields.forEach(e => {
    //   if(e.name=="image-mother" && event.target.id=="mother" ){
    //     e.id=event.target.value
    //   }
    // })
  }*/

  ngOnInit(): void {
    this.setBovine();
    this.getCausesDeath();
  }

  // ngAfterViewInit(){
  //   this.setBovine();
  // }

  setBovine():void{
    if(this.id>0){
      var fieldName=document.getElementById("name");
      console.log("fieldName: ",fieldName)
      if(fieldName){
        console.log("pasé por aquí")
        fieldName.setAttribute("disabled","");
      }
      //this.configurations.textButton="Edit"
      this.vacunoService.getBovine(this.id).subscribe(b=>{
        this.fields.forEach(element => {
          if (element["name"]=="bovine"){
            element["id"]=b.id
            element.url="http://localhost:8006/images/bovines/young/"+b.id
          }else if (element["type"]=="file"){//name=image
            element["required"]=false
          }else if(element["name"]=="name"){
            element["value"]=b.name
          }
        });
      })
    }
    this.configurations.initialLoading=false;
  }

}


