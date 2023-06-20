import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { VacunosService } from '../services/vacunos.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-bovines',
  templateUrl: './bovines.component.html',
  styleUrls: ['./bovines.component.css']
})
export class BovinesComponent implements OnInit {
  id: number=0;
  name="";
  date:Array<string>=[];
  //bovineForm : string = "";
  //activatedRoute: ActivatedRoute | undefined;
  title:string="Ingresar bovino";
  mothers: Array<any>=[];
  fields: Array<any> = [
                {name:"bovine",type:"image",id:"",text:"Actual image", info:"Select a new image to replace the actual image"},
                {name:"image",type:"file"},
                {name:"name",type:"text", value:""},
                {name:"date birth",type:"date", value:""},
                // {name:"mother",type:"select",options:[{name:"Vaca 1",value:"2"}], value:"hola"},
                // {name:"sex",type:"select", selected:"2", options:[{name:"Hembra",value:"2"}]},
                // {name:"type",type:"select",options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:"selected"},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}]},
                // {name:"color",type:"select",options:[{name:"Clavel(a)",value:"1"},{name:"Overo(a)",value:"2"},{name:"Blanco(a)",value:"3"},{name:"Colorado(a)",value:"4"},{name:"Amarillo(a)",value:"5"}], value:"hola"},
                // {name:"state",type:"select",options:[{name:"Vaca 1",value:"2"}], value:"hola"},
                // {name:"date sale",type:"select",options:[{name:"Vaca 1",value:"2"}], value:"hola"},
                {name:"mother",type:"select",options:[{name:"Seleccione",value:"1",selected:"selected"}]},
                {name:"sex",type:"select", options:[{name:"Macho",value:"1",selected:""},{name:"Hembra",value:"2",selected:""}]},
                {name:"type",type:"select",options:[{name:"Ternero",value:"1",selected:""},{name:"Ternera",value:"2",selected:""},{name:"Toro",value:"3", selected:""},{name:"Vaquilla",value:"4", selected:""},{name:"Vaca",value:"5",selected:""},{name:"Buey",value:"6",selected: ""},{name:"Novillo",value:"7", selected:""}]},
                {name:"color",type:"select",options:[{name:"Clavel(a)",value:"1",selected:""},{name:"Overo(a)",value:"2",selected:""},{name:"Blanco(a)",value:"3",selected:""},{name:"Colorado(a)",value:"4", selected:""},{name:"Amarillo(a)",value:"5",selected:""}]},
                //{name:"color",type:"text",value:""},
                {name:"state",type:"select",options:[{name:"Vivo",value:"1", selected:""},{name:"Muerto",value:"2", selected:""}]},
                {name:"date sale",type:"date", value:""},
                {name:"Create",type:"submit"}];
  
  bovineForm = new FormGroup({
    cantidad: new FormControl(''),
    condicion: new FormControl(''),
    fecha: new FormControl(''),
  });

  constructor(private router: Router, private vacunoService: VacunosService, private route: ActivatedRoute) {
    // router.events.subscribe(e=>{
    //   if(e instanceof NavigationEnd ){
    //     this.currentRoute=e.url;
    //     console.log("route: ",this.currentRoute)
    //   }
    // })
    this.vacunoService.getBovines()
    // .subscribe({
    //   (bs)=>{
    //       bs.forEach((v: { type: string; name: any; id: any; })=>{
    //     if(v.type=="Vaca"){
    //       this.mothers.push({name:v.name, value:v.id, selected:""})
    //     }//else console.log("v: ",v)
    //   })
    //   },
    //   (err) => {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   ()=> {
    //     this.
    //     //console.log('done');
    //   }
    // });
    // .subscribe({
    //   next(bs) {
    //       // bs.forEach((v: { type: string; name: any; id: any; })=>{
    //       //   if(v.type=="Vaca"){
    //       //     this.mothers.push({name:v.name, value:v.id, selected:""})
    //       //   }
    //       // })
    //   },
    //   error(err) {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   // complete(bs) {
    //   //   console.log('bs');
    //   // }
    // });

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
      // .subscribe(
      //   bs => {
      //     bs.forEach((v: { type: string; name: any; id: any; })=>{
      //     if(v.type=="Vaca"){
      //       this.mothers.push({name:v.name, value:v.id, selected:""})
      //     }//else console.log("v: ",v)
      //   })
      //   }
      // )
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']){
          console.log(params['id'])
          this.id=parseInt(params['id']);
          this.title="Editar bovino"
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
    /* this.vacunoService.getBovine(this.id).subscribe(b=>{
    //   console.log("b: ",b);
    //   //console.log("this.mothers: ",this.mothers)
    //   this.fields.forEach(element => {
    //     if(element["name"]=="mother"){
    //       element["options"]=this.mothers;
    //       element.options.forEach((o:any)=>{
    //         if(o.value==b.mother){
    //           o.selected="selected"
    //           console.log("debería haber pasado por aqui")
    //         }
    //       })
    //       //element["value"]=b.
    //       //console.log("this.mothers: ",this.mothers )
    //       //this.name=b.name;
    //     }else if(element["name"]=="name"){
    //       element["value"]=b.name
    //     }else if(element["name"]=="date birth"){
    //       let date=b.date_birth.split("T")
    //       //console.log("date: ",date)
    //       element["value"]=date[0]
    //     }else if(element["name"]=="mother"){
    //       element["value"]=b.mother
    //     }else if(element["name"]=="sex"){
    //       //element["value"]=b.sex
    //       element.options.forEach((o:any)=>{
    //         if(o.name==b.sex)o.selected="selected"
    //       })
    //     }else if(element["name"]=="type"){
    //       //element["value"]=b.type
    //       element.options.forEach((o:any)=>{
    //         if(o.value==b.type)o.selected="selected"
    //       })
    //     }else if(element["name"]=="color"){
    //       element.options.forEach((o:any)=>{
    //         if(o.name==b.color)o.selected="selected"
    //       })
    //     }else if(element["name"]=="state"){
    //       element.options.forEach((o:any)=>{
    //         if(o.name==b.state)o.selected="selected"
    //       })
    //     }else if(element["name"]=="date sale"){
    //       element["value"]=b.dateSale
    //     }
    //     // this.bovineForm.setValue({
    //     //   cantidad: element.cantidad,
    //     //   condicion: element.condicion,
    //     //   fecha:element.fecha
    //     // })
    //   });
    // })*/
  }

  setBovineEdited():void{
    if(this.id>0){
      this.vacunoService.getBovine(this.id).subscribe(b=>{
        console.log("b: ",b);
        //console.log("this.mothers: ",this.mothers)
        this.fields.forEach(element => {
          if(element["name"]=="mother"){
            element["options"]=this.mothers;
            element.options.forEach((o:any)=>{
              if(o.value==b.mother){
                o.selected="selected"
              }
            })
          }else if (element["type"]=="image"){
            element["id"]=b.id
          }else if(element["name"]=="name"){
            element["value"]=b.name
          }else if(element["name"]=="date birth"){
            let date=b.date_birth.split("T")
            element["value"]=date[0]
          }else if(element["name"]=="mother"){
            element["value"]=b.mother
          }else if(element["name"]=="sex"){
            element.options.forEach((o:any)=>{
              if(o.name==b.sex)o.selected="selected"
            })
          }else if(element["name"]=="type"){
            element.options.forEach((o:any)=>{
              if(o.value==b.type)o.selected="selected"
            })
          }else if(element["name"]=="color"){
            element.options.forEach((o:any)=>{
              if(o.name==b.color)o.selected="selected"
            })
          }else if(element["name"]=="state"){
            element.options.forEach((o:any)=>{
              if(o.name==b.state)o.selected="selected"
            })
          }else if(element["name"]=="date sale"){
            if(b.date_sale.includes("T")){
              this.date=b.date_sale.split("T")
            } else if (b.date_sale.includes("")){
              this.date=b.date_sale.split(" ")
            }
            element["value"]=this.date[0]
            //element["value"]=b.date_sale
            //console.log("pasé por la fecha de venta")
          }
        });
      })
    }
  }

}
// function Complete(): (() => void) | null | undefined {
//   throw new Error('Function not implemented.');
// }

// function next(next: any, arg1: (bs: any) => void, arg2: any) {
//   throw new Error('Function not implemented.');
// }

