import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from '../models/country';
import { CountryService } from './country.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { VacunosService } from '../services/vacunos.service';
import { Router } from '@angular/router';
import { IdentifierService } from '../services/identifier.service';

@Component({
	selector: 'ngbd-table-complete',
	standalone: true,
	imports: [
		NgFor,
		DecimalPipe,
		FormsModule,
		AsyncPipe,
		NgbTypeaheadModule,
		NgbdSortableHeader,
		NgbPaginationModule,
		NgIf,
		DatePipe
	],
	templateUrl: './list.component.html',
	providers: [CountryService, DecimalPipe],
	styles: [
		`
			.dark-modal .modal-content {
				background-color: #292b2c;
				color: white;
			}
			.dark-modal .close {
				color: white;
			}
			.light-blue-backdrop {
				background-color: #5cb3fd;
			}
		`,
	],
})
export class ListComponent {
	items$: Observable<Country[]>;
	//items: Array<any> = [];
	//total: number = 20;
	//page: number = 1;
	//pageSize: number = 10;
	title_modal: string ="";
	list_content: Array<String>=[];
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: CountryService, private router: Router, private vacunoService: VacunosService, private identifierService: IdentifierService, private modalService: NgbModal) {
		this.items$ = service.countries$;
		this.total$ = service.total$;
	}

	openModalDialogCustomClass(content: any, id: number) {
		this.title_modal="List of identifiers";
		this.list_content=[];
		this.identifierService.listIdentifiers(id).
    subscribe(r=>{
		r.forEach((e:any)=>{
			this.list_content.push(e.diio)
		})
	},
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{
		this.modalService.open(content, { modalDialogClass: 'dark-modal' });
	}
    );
	}


	openModalDialogCustomClass2(content: any, id: number) {
		this.title_modal="List of children";
		this.list_content=[];
		this.vacunoService.getChildren(id).
    subscribe(r=>{
		r.forEach((e:any)=>{
			this.list_content=r[0].split(",")
		})
	},
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{
		this.modalService.open(content, { modalDialogClass: 'dark-modal' });
	}
    );
	}

	editBovine(id: number):any{
		console.log("id: ",id)
		this.router.navigate(["/bovines/edit/"+id])
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}

	// getBovines():void{
	// 	//let r:any=this.service.getRegisters().subscribe(result=>{
	// 	this.vacunoService.getBovines().subscribe(r => {
	// 	  //return r.results;
	// 	  console.log("r: ",r)
	// 		//debugger
	// 	  this.items = r;
	// 	  //this.total = r.length;
	// 	  //console.log("this.h: ",this.h)
	// 	}); 
	//   }
}
