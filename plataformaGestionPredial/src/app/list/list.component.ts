import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from '../models/country';
import { CountryService } from './country.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { VacunosService } from '../services/vacunos.service';
import { Router } from '@angular/router';

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
})
export class ListComponent {
	items$: Observable<Country[]>;
	//items: Array<any> = [];
	//total: number = 20;
	//page: number = 1;
	//pageSize: number = 10;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: CountryService, private router: Router, private vacunoService: VacunosService) {
		//service.getBovines();
		// setInterval(()=>{

		// },1000)
		//setTimeout(()=>{
		// 
		//this.items=this.service.getBovines();
		//this.changeDetectorRef.detectChanges();
		this.items$ = service.countries$;
		//},5000)
		//console.log("this.items 1: ",this.items)
		this.total$ = service.total$;
	}

	//ngOnInit(): void {
		//this.getBovines()
		//this.items=this.service.getBovines();
		//console.log("this.items 2: ",this.items)
	//}
	editBovine(id: number):any{
		console.log("id: ",id)
		this.router.navigate(["/bovines/create"])
	}

	// itemsIsNotNull():boolean{
	// 	console.log("pase?");
	// 	console.log("this.items: ",this.items)
	// 	if(this.items){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// }

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
