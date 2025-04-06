import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf, Location } from '@angular/common';
import Swal from 'sweetalert2';
import {ViewEncapsulation} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  bovine!: number;
  url_bovine:any='';
  url_bovine_local:any='';

  

  changeSelect=(event:any):void=>{
    this.cambioSelect.emit(event);
  }

  openFullscreen(content:any, id: number, idElement:any, urlE:string) {
		//this.title_modal="Bovine: ";
		//this.list_content=[];
    this.bovine=id;
    if(id!=0){
      //this.url_bovine="http://localhost:8006/images/bovines/old/"+id;
      this.url_bovine=urlE
    }else{
      var url = (document.getElementById('preview-'+idElement) as HTMLImageElement).src;
      this.url_bovine_local=this.sanitizer.bypassSecurityTrustUrl(url);
      this.bovine=0;
    }
		//this.name_bovine=name;
		//this.modalService.open(content, { fullscreen: true });
		this.modalService.open(content, { size: 'xl' });
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

  constructor(private location: Location, private sanitizer:DomSanitizer, private router: Router, private modalService: NgbModal, private cdr: ChangeDetectorRef) { 
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
    //this.srcPreview = this.sanitizer.bypassSecurityTrustUrl(url);
    (document.getElementById('preview-'+e.target.id) as HTMLImageElement).src=url;
    //this.url_bovine_local=this.sanitizer.bypassSecurityTrustUrl(url);
    //this.bovine=0;
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


  filterOptions(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log("filterValue: ",filterValue)
    //this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
  filteredOptions = this.options;
  searchTerm: string = '';

  // filterOptions() {
  //   this.filteredOptions = this.options.filter(option =>
  //     option.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }


  onInputChange(value: string, field: any): void {
    let numericValue = value.replace(/\D+/g, '');
    if (field.name === 'DIIO') {
        if (numericValue.length >= 2) {
            numericValue = numericValue.replace(/^(\d{2})(\d{0,3})(\d{0,4})$/, '$1.$2.$3');
        }
    }

    if (numericValue.length < 2) {
      numericValue = numericValue.replace(/\./g, '');
    }

    if (numericValue.endsWith('.')) {
        numericValue = numericValue.slice(0, -1);
    }

    setTimeout(() => {
        field.value = numericValue;
        if (numericValue.endsWith('.')) {
          field.value = numericValue.slice(0, -1);
      }
    }, 1);
  }

}
