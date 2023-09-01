import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf, Location } from '@angular/common';
import Swal from 'sweetalert2';
import {ViewEncapsulation} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  //encapsulation: ViewEncapsulation.None
  //host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class FormsComponent implements OnInit {
  // remove(toast: any) {
	// 	this.toasts = this.toasts.filter((t) => t !== toast);
	// }
  @Input () fields: any;
  @Input () form: FormGroup | undefined;
  //@Input () textButton: string = "";
  @Input () configurations: any;
  //@Input () loading: boolean = false; 
  //@Output() newItemEvent = new EventEmitter<string>();
  //@Input () callBackFunction: (() => void);
  @Input () callBackFunction: any;
  @Output()
  cambioSelect = new EventEmitter<string>();
  titlePage: string = "";
  srcPreview:any;
  icon:boolean=false;
  files: any = [];
  loading2: boolean = false;
  fileToUpload: File | null = null;

  

  changeSelect=(event:any):void=>{
    this.cambioSelect.emit(event);
  }
  //id:number=0;

  // toasts: any[] = [];

	// show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
	// 	this.toasts.push({ textOrTpl, ...options });
	// }

	// clear() {
	// 	this.toasts.splice(0, this.toasts.length);
	// }

  // isTemplate(toast: { textOrTpl: any; }) {
	// 	return toast.textOrTpl instanceof TemplateRef;
	// }

  constructor(private location: Location, private sanitizer:DomSanitizer, private router: Router) { 
    router.events.subscribe(e=>{
      if(e instanceof NavigationEnd ){
        this.titlePage=e.url;
      }
    })
  }

  goBack():void{
    this.location.back();
  }

  inputFunction():any{
    this.callBackFunction()
  }

  ngOnInit(): void {
  }




  handleFileInput(e:any) {
    let file = e.target.files[0];
    let blob = new Blob([file], { type: file.type });
    let url = window.URL.createObjectURL(blob); 
    this.srcPreview = this.sanitizer.bypassSecurityTrustUrl(url);
    if(this.titlePage.includes("edit")){
      this.icon = true;
    }
    //this.srcPreview=URL.createObjectURL(e.target.files[0]);
    this.files.push(e.target.files[0]);
  }

  formValid():boolean{
    let valid=true;
    this.fields.forEach((f:any)=>{
      // if(f.value || (f.value && f.value==""))valid=true; 
      // else valid=false;
      if(!!f.value)valid=true
      else valid=false
    })
    return valid
  }


  /*async registerDocument(): Promise<void> 
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
  }*/


}
