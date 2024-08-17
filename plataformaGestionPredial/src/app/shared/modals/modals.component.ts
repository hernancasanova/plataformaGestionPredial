import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  //title_modal: string ="";
	//list_content: any=[];
	//bovine:number=0;
	name_bovine:string="";
  @Input () title_modal: any;
  @Input () list_content: any;
  @Input()
  bovine!: number;

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  editBovine(id: number):any{
		this.router.navigate(["/bovines/edit/"+id])
	}

  	openFullscreen(content:any) {
		this.title_modal="Bovine: ";
		this.list_content=[];
		//this.bovine=id;
		//this.name_bovine=name;
		//this.modalService.open(content, { fullscreen: true });
		this.modalService.open(content, { size: 'xl' });
	}

	test(event:any){
		console.log("event.target desde modal: ",event.target)
	}

  // openModalDialogCustomClass(content: any, id: number, name:string) {
	// 	this.title_modal="List of identifiers "+name;
	// 	this.list_content=[];
	// 	this.identifierService.listIdentifiers(id).
  //   subscribe(r=>{
	// 	r.forEach((e:any)=>{
	// 		this.list_content.push({diio:e.diio,state:e.state})
	// 	})
	// },
  //   (error:any)=>console.log("error en Observable: ",error),
  //   ()=>{
	// 	this.modalService.open(content, { modalDialogClass: 'dark-modal', centered:true });
	// }
  //   );
	// }

}
