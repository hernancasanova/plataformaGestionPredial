import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { VacunosService } from '../services/vacunos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-bovines',
  templateUrl: './bovines.component.html',
  styleUrls: ['./bovines.component.css']
})
export class BovinesComponent implements OnInit {
  id: number=0;
  date:Array<string>=[];
  newBovine:Object={};
  configurations: any = {title:"Create bovine", loading:false, textButton:"Create", initialLoading:false};
  mothers: Array<any>=[{name:"Sin identificar",value:"0",selected:""}];
  fathers: Array<any>=[{name:"Sin identificar",value:"0",selected:""}];

  displayBovineImage=(event:any):void=>{
    this.fields.forEach(e => {
      if((e.name=="image-mother" && event.target.id=="mother") || (e.name=="image-father" && event.target.id=="father")){
        e.id=event.target.value
        e.url="http://localhost:8006/images/bovines/old/"+event.target.value//dejar así por el momento, ya que la información no hace referencia al bovino en cuestion 
      }
    })
  }

  selectMainImage=(e:any):void=>{
    if(e.target.value=="1"){
      const fieldRequired = this.fields.find(f=>
        f.name=="image young"
      )
      fieldRequired.required=true
      const fieldNoRequired = this.fields.find(f=>
        f.name=="image old"
      )
      fieldNoRequired.required=false
    }else if(e.target.value=="2"){
      const fieldRequired=this.fields.find(f=>
        f.name=="image old"
      )
      fieldRequired.required=true
      const fieldNoRequired=this.fields.find(f=>
        f.name=="image young"
      )
      fieldNoRequired.required=false
    }

    this.cdr.detectChanges();
    
  }
  
  fields: Array<any> = [
                {name:"young image",type:"image",id:"",text:"Young image:", info:"↓ Select a new image to replace the young image", full:false, url:""},
                {name:"divider images bovines", type:"divider"},
                {name:"old image",type:"image",id:"",text:"Old image:", info:"↓ Select a new image to replace the old image", full:false, url:""},
                {name:"image young",type:"file", value:"", required:false, full:false, textInfo:"Selected image will replace the Young image"},
                {name:"divider images bovines", type:"divider"},
                {name:"image old",type:"file", value:"", required:false, full:false, textInfo:"Selected image will replace the Old image"},
                {name:"main image",type:"select", value:"", required:true, options:[{name:"Young image",value:"1",selected:""},{name:"Old image",value:"2",selected:""}], full:true, function: this.selectMainImage},
                {name:"name",type:"text", value:"", required:true, placeholder:"Eg: My cow", full:true, disabled:false},
                {name:"DIIO",type:"numeric", value:"", required:false, placeholder:"", full:true, disabled:true},
                {name:"date birth",type:"date", value:"",required:true, full:true},
                {name:"mother",type:"select", value:"", required:true, options:[], full:true, function:this.displayBovineImage},
                {name:"image-mother",type:"image",id:"",text:"Mother selected:", info:"", full:true, url:""},
                {name:"father",type:"select", value:"", required:true, options:[], full:true, function:this.displayBovineImage},
                {name:"image-father",type:"image",id:"",text:"Father selected:", info:"", full:true, url:""},
                {name:"sex",type:"select", value:"", required:true, options:[{name:"Macho",value:"1",selected:""},{name:"Hembra",value:"2",selected:""}], full:true},
                {name:"type",type:"select",value:"", required:true, options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:""},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}], full:true},
                {name:"color",type:"select",value:"", required: true, options:[{name:"Clavel(a)",value:"1",selected:""},{name:"Overo(a)",value:"2",selected:""},{name:"Blanco(a)",value:"3",selected:""},{name:"Colorado(a)",value:"4", selected:""},{name:"Amarillo(a)",value:"5",selected:""}], full:true},
                {name:"race",type:"select",value:"", required: false, options:[{name:"Holstein",value:"1",selected:""},{name:"Hereford",value:"2",selected:""},{name:"Angus",value:"3",selected:""},{name:"Angus Rojo",value:"4", selected:""},{name:"Clavel Alemán",value:"5", selected:""},{name:"Overo",value:"6", selected:""}], full:true},
                {name:"state",type:"select",value:"", required: true, options:[{name:"Muerto",value:"1", selected:""},{name:"Vivo",value:"2", selected:""}], full:true, disabled:false},
                {name:"date sale",type:"date", value:"", required:false, full:true},
                {name:"internal verification",type:"checkbox", value:"", required:false, full:true},
                {name:"verified SAG",type:"checkbox", value:"", required:false, full:true},
                //{name:"Create",type:"submit"}
              ];

  registerBovine=():number=>{
    this.configurations.loading=true;
    this.configurations.textButton=this.id>0?"Editing...":"Creating...";
    this.fields.forEach(e => {
      if(e.name=="name"){
        this.newBovine={...this.newBovine, name:e.value}
      }
      // else if (e.name=="name" && e.id!=""){
      //   this.newBovine={...this.newBovine, id:e.id}
      // }
      else if(e.name=="date birth"){
        let myDate = e.value.split("-");
        let newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        this.newBovine={...this.newBovine, date_birth:e.value+"T00:00:00"}
      }else if(e.name=="mother"){
        this.newBovine={...this.newBovine, mother:e.value}
        // e.options.forEach((o:any)=>{
        //if(o.selected=="selected")this.newBovine={...this.newBovine, mother:o.value}
        // })
      }else if(e.name=="father"){
        this.newBovine={...this.newBovine, father:e.value}
      }else if(e.name=="sex"){
        let sel=(document.getElementById(e.name)) as HTMLSelectElement;
        let optionSelected=sel.options[sel.selectedIndex].text;
        this.newBovine={...this.newBovine, sex:optionSelected}
      }else if(e.name=="type"){
        this.newBovine={...this.newBovine, type:e.value}
      }else if(e.name=="color"){
        let sel=(document.getElementById(e.name)) as HTMLSelectElement;
        let optionSelected=sel.options[sel.selectedIndex].text;
        this.newBovine={...this.newBovine, color:optionSelected}
      }else if(e.name=="state"){
        let sel=(document.getElementById(e.name)) as HTMLSelectElement;
        let optionSelected=sel.options[sel.selectedIndex].text;
        this.newBovine={...this.newBovine, state:optionSelected}
      }else if(e.name=="date sale"){
        this.newBovine={...this.newBovine, date_sale:e.value!=""?e.value+"T00:00:00":null}
      }else if(e.name=="verified SAG"){
        this.newBovine={...this.newBovine, verified_sag:e.value?"S":"N"}
      }else if(e.name=="internal verification"){
        this.newBovine={...this.newBovine, internal_verification:e.value?"S":"N"}
      }else if(e.name=="main image"){
        this.newBovine={...this.newBovine, main_image:e.value}
      }
    })
    if(this.id>0){
      this.newBovine={...this.newBovine, id:this.id}
    }
    this.vacunoService.createBovine(this.newBovine).
    subscribe(r=>console.log("r: ",r),
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{this.configurations.loading=false;
      Swal.fire({
        title: '',
        text: this.id>0?"Bovine edited succesfully":"Bovine created succesfully",
        icon: 'success',
        confirmButtonText: 'Accept'
      })
      this.router.navigate(["bovines"])
      this.configurations.textButton=this.id>0?"Edit":"Create";}
    );
    return 2;
  }

  constructor(private router: Router, private vacunoService: VacunosService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.configurations.initialLoading=true;
    this.vacunoService.getBovines()
    .subscribe(bs=>{
      bs.forEach((v: { type: string; name: any; id: any; })=>{
        if(v.type=="Vaca" || v.type=="Vaquilla"){
          this.mothers.push({name:v.name, value:v.id, selected:""})
        }
        else if(v.type=="Toro"){
          this.fathers.push({name:v.name, value:v.id, selected:""})
        }
      })
    },
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{this.setBovineEdited()}
    );
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']){
          this.id=parseInt(params['id']);
          this.configurations.title="Edit bovine"
        }
      }
    )
    
  }


  ngOnInit(): void {
  }

  setBovineEdited():void{
    this.fields.forEach(element => {
      if(element["name"]=="mother"){
        element["options"]=this.mothers;
      }
      if(element["name"]=="father"){
        element["options"]=this.fathers;
      }
    });
    if(this.id>0){
      this.configurations.textButton="Edit"
      this.vacunoService.getBovine(this.id).subscribe(b=>{
        this.fields.forEach(element => {
          if(element["name"]=="mother"){
            element["options"]=this.mothers;
            // element.options.forEach((o:any)=>{
            //   if(o.value==b.mother){
            //     o.selected="selected"
            //   }
            // })
            element.value=b.idMother
          }if(element["name"]=="father"){
            element["options"]=this.fathers;
            element.value=b.idFather
          }else if (element["name"]=="image-mother"){
            element["id"]=b.idMother
            element.url="http://localhost:8006/images/bovines/old/"+b.idMother
          }else if (element["name"]=="image-father"){
            element["id"]=b.idFather
            element.url="http://localhost:8006/images/bovines/old/"+b.idFather
          }else if (element["name"]=="old image"){
            element["id"]=b.id
            element.url="http://localhost:8006/images/bovines/old/"+b.id
          }else if (element["name"]=="young image"){
            element["id"]=b.id
            element.url="http://localhost:8006/images/bovines/young/"+b.id
          }else if (element["type"]=="file"){//name=image
            element["required"]=false
          }else if(element["name"]=="name"){
            element["value"]=b.name
          }else if(element["name"]=="DIIO"){
            element.value=b.diio.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1.$2.$3')
            //element.disabled=true
          }else if(element["name"]=="date birth"){
            let date=b.dateBirth.split("T")
            element["value"]=date[0]
          }else if(element["name"]=="sex"){
            element.options.forEach((o:any)=>{
              if(o.name==b.sex){
                o.selected="selected"
                element.value=o.value
              }
            })
          }else if(element["name"]=="type"){
            element.value=b.type
          }else if(element["name"]=="color"){
            element.options.forEach((o:any)=>{
              if(o.name==b.color){
                o.selected="selected"
                element.value=o.value
              }
            })
          }else if(element["name"]=="state"){
            element.options.forEach((o:any)=>{
              if(o.name==b.state){
                o.selected="selected"
                element.value=o.value
              }
            })
          }else if(element["name"]=="date sale"){
            if(b.dateSale){
              if(b.dateSale.includes("T")){
                this.date=b.dateSale.split("T")
              } else if (b.dateSale.includes("")){
                this.date=b.dateSale.split(" ")
              }
              element["value"]=this.date[0]
            }
          }else if(element["name"]=="verified SAG"){
            element["value"]=b.verifiedSag=="SÍ"?true:false
          }else if(element["name"]=="internal verification"){
            element["value"]=b.internalVerification=="SÍ"?true:false
          }else if(element["name"]=="main image"){
            element["value"]=b.mainImage
          }
        });
      })
    }
    this.configurations.initialLoading=false;
  }

}


