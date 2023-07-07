import { Component, OnInit } from '@angular/core';
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
  //name="";
  date:Array<string>=[];
  newBovine:Object={};
  //bovineForm : string = "";
  //loading:boolean=false;
  //title:string="Create bovine";
  //textButtonForm:string=this.loading?"Creating...":"Create";
  configurations: any = {title:"Create bovine", loading:false,textButton:"Create"};
  mothers: Array<any>=[{name:"Sin identificar",value:"0",selected:""}];
  fields: Array<any> = [
                {name:"bovine",type:"image",id:"",text:"Current image", info:"Select a new image to replace the current image"},
                {name:"image",type:"file", value:"", required:true},
                {name:"name",type:"text", value:"", required:true, placeholder:"Eg: My cow"},
                {name:"date birth",type:"date", value:"",required:true},
                {name:"mother",type:"select", value:"", required:true, options:[]},
                {name:"sex",type:"select", value:"", required:true, options:[{name:"Macho",value:"1",selected:""},{name:"Hembra",value:"2",selected:""}]},
                {name:"type",type:"select",value:"", required:true, options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:""},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}]},
                {name:"color",type:"select",value:"", required: true, options:[{name:"Clavel(a)",value:"1",selected:""},{name:"Overo(a)",value:"2",selected:""},{name:"Blanco(a)",value:"3",selected:""},{name:"Colorado(a)",value:"4", selected:""},{name:"Amarillo(a)",value:"5",selected:""}]},
                {name:"state",type:"select",value:"", required: true, options:[{name:"Vivo",value:"1", selected:""},{name:"Muerto",value:"2", selected:""}]},
                {name:"date sale",type:"date", value:"", required:false},
                //{name:"Create",type:"submit"}
              ];

  registerBovine=():number=>{
    this.configurations.loading=true;
    this.configurations.textButton=this.id>0?"Editing...":"Creating...";
    //console.log("this.loading: ",this.loading)
    this.fields.forEach(e => {
        //Object.keys(e)  
        //var name=e.name
         //console.log(e)
        //this.newBovine={...this.newBovine, name:e.value}
    //   //let v={e.name: e["value"]};
    //   //console.log("e: ",{e.name: e["value"]})
    //   //.newBovine={...this.newBovine, {e.name: e.value}}
      if(e.name=="name"){
        this.newBovine={...this.newBovine, name:e.value}
      }else if (e.name=="bovine" && e.id!=""){
        this.newBovine={...this.newBovine, id:e.id}
      }else if(e.name=="date birth"){
        let myDate = e.value.split("-");
        let newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        this.newBovine={...this.newBovine, date_birth:e.value+"T00:00:00"}
        //console.log((new Date("2012-02-26")).getTime()/1000)
        //debugger
      }else if(e.name=="mother"){
        this.newBovine={...this.newBovine, mother:e.value}
        // e.options.forEach((o:any)=>{
        //if(o.selected=="selected")this.newBovine={...this.newBovine, mother:o.value}
        // })
      }else if(e.name=="sex"){
        // e.options.forEach((o:any)=>{
        //   if(o.selected=="selected")this.newBovine={...this.newBovine, sex:o.value}
        // })
        let sel=(document.getElementById(e.name)) as HTMLSelectElement;
        // if(sel){
        let optionSelected=sel.options[sel.selectedIndex].text;
        // }
        this.newBovine={...this.newBovine, sex:optionSelected}
      }else if(e.name=="type"){
        // e.options.forEach((o:any)=>{
        //   if(o.selected=="selected")this.newBovine={...this.newBovine, type:o.value}
        // })
        this.newBovine={...this.newBovine, type:e.value}
      }else if(e.name=="color"){
        // e.options.forEach((o:any)=>{
        //   if(o.selected=="selected")this.newBovine={...this.newBovine, color:o.name}
        // })
      //this.newBovine={...this.newBovine, color:e.options.selected}
        let sel=(document.getElementById(e.name)) as HTMLSelectElement;
        let optionSelected=sel.options[sel.selectedIndex].text;
        this.newBovine={...this.newBovine, color:optionSelected}
      }else if(e.name=="state"){
        // e.options.forEach((o:any)=>{
        //   if(o.selected=="selected")this.newBovine={...this.newBovine, state:o.value}
        // })
        let sel=(document.getElementById(e.name)) as HTMLSelectElement;
        let optionSelected=sel.options[sel.selectedIndex].text;
        this.newBovine={...this.newBovine, state:optionSelected}
      }else if(e.name=="date sale"){
        // let myDate = e.value.split("-");
        // let newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        this.newBovine={...this.newBovine, date_sale:e.value!=""?e.value+"T00:00:00":null}
      }
    })
    console.log("this.newBovine: ",this.newBovine)
    //debugger
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
      this.configurations.textButton=this.id>0?"Edit":"Create";}
    );
    return 2;
  }

  constructor(private router: Router, private vacunoService: VacunosService, private route: ActivatedRoute) {
    this.vacunoService.getBovines()
    .subscribe(bs=>{
      bs.forEach((v: { type: string; name: any; id: any; })=>{
        if(v.type=="Vaca"){
          this.mothers.push({name:v.name, value:v.id, selected:""})
        }
      })
    },
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{this.setBovineEdited()}
    );
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']){
          //console.log(params['id'])
          this.id=parseInt(params['id']);
          this.configurations.title="Edit bovine"
        }
      }
    )
    
  }

  process(bs:any): void{
    bs.forEach((v: { type: string; name: any; id: any; })=>{
      if(v.type=="Vaca"){
        this.mothers.push({name:v.name, value:v.id, selected:""})
      }//else console.log("v: ",v)
    })
  }

  ngOnInit(): void {
  }

  setBovineEdited():void{
    this.fields.forEach(element => {
      if(element["name"]=="mother"){
        element["options"]=this.mothers;
      }
    });
    if(this.id>0){
      this.configurations.textButton="Edit"
      this.vacunoService.getBovine(this.id).subscribe(b=>{
        console.log("b: ",b);
        //console.log("this.mothers: ",this.mothers)
        this.fields.forEach(element => {
          if(element["name"]=="mother"){
            element["options"]=this.mothers;
            // element.options.forEach((o:any)=>{
            //   if(o.value==b.mother){
            //     o.selected="selected"
            //   }
            // })
            element.value=b.mother
          }else if (element["type"]=="image"){
            element["id"]=b.id
          }else if (element["type"]=="file"){//name=image
            element["required"]=false
          }else if(element["name"]=="name"){
            element["value"]=b.name
          }else if(element["name"]=="date birth"){
            let date=b.date_birth.split("T")
            element["value"]=date[0]
          }else if(element["name"]=="mother"){
            element["value"]=b.mother
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
            if(b.date_sale){
              if(b.date_sale.includes("T")){
                this.date=b.date_sale.split("T")
              } else if (b.date_sale.includes("")){
                this.date=b.date_sale.split(" ")
              }
              element["value"]=this.date[0]
            }
            //element["value"]=b.date_sale
            //console.log("pasé por la fecha de venta")
          }
        });
      })
    }
  }

}


