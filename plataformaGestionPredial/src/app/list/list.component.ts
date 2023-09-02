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
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';

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

	downloadPdf():void{
		// const doc = new jsPDF('l', 'mm', 'a4'); 
    
		// const head = [['ID', 'Country', 'Index', 'Capital']]
		// const data = [
		// 	[1, 'Finland', 7.632, 'Helsinki'],
		// 	[2, 'Norway', 7.594, 'Oslo'],
		// 	[3, 'Denmark', 7.555, 'Copenhagen'],
		// 	[4, 'Iceland', 7.495, 'Reykjavík'],
		// 	[5, 'Switzerland', 7.487, 'Bern'],
		// 	[9, 'Sweden', 7.314, 'Stockholm'],
		// 	[73, 'Belarus', 5.483, 'Minsk'],
		// ]

		// autoTable(doc, {
		// 	head: head,
		// 	body: data,
		// 	didDrawCell: (data) => { },
		// });
		var pdf = new jsPDF('p', 'pt', 'letter');
		var nColumna = 1;
		var ids: Array<string> = [];
		var i = 0;
		//var fecha;
		var tabla = document.getElementById('tableBovines');
		if(tabla){
			// var tablaCopia = tabla.cloneNode(true);
			// var filas = tablaCopia.row;
			// for (var j = 0; j < filas.length; j++) {
			// filas[j].deleteCell(7);
			// }
			var body: any = [];
			this.service.getTargetBovines().forEach((vac:any) => {
				//bov.forEach((vac:any)=>{
					let fila = [
						vac.id,
						'imagen',
						vac.name,
						vac.diio,
						//vac.fecha_colocacion ? formatoFecha(vac.fecha_colocacion) : 'Sin arete',
						//formatoFecha(vac.fecha_nacimiento),
						vac.mother,
						vac.type,
						vac.age
					];
					body.push(fila);
				//})
			});
			autoTable(pdf,{
			head: [
				[
				'N°',
				'Imagen',
				'Nombre',
				'DIIO',
				//'Fecha colocación',
				//'Fecha nacimiento',
				'Madre',
				'Tipo',
				'Edad'
				],
			],
			body,
			columnStyles: {
				0: { cellWidth: 'auto', minCellHeight: 80 },
				1: { cellWidth: 120, minCellHeight: 80 },
				2: { cellWidth: 'auto', minCellHeight: 80 },
				3: { cellWidth: 'auto', minCellHeight: 80 },
				//4: { cellWidth: 'auto', minCellHeight: 80 },
				//5: { cellWidth: 'auto', minCellHeight: 80 },
				4: { cellWidth: 'auto', minCellHeight: 80 },
				5: { cellWidth: 'auto', minCellHeight: 80 },
				6: { cellWidth: 'auto', minCellHeight: 80 },
			},
			styles: {
				valign: 'middle',
				halign: 'center',
			},
			rowPageBreak: 'avoid',
			//bodyStyles: {minCellHeight: 80, minCellWidth: 80},
			includeHiddenHtml: true,
			didParseCell: function (data) {
				if (data.column.index === 0 && data.cell.section === 'body') {
					ids.push(data.cell.text[0]);
					data.cell.text[0] = nColumna.toString();
					nColumna++;
				}
				/*if((data.column.index === 4 && data.cell.section === 'body')||(data.column.index === 5 && data.cell.section === 'body')){
					//data.cell.text[0]=moment(data.cell.text[0], 'DD-MM-YYYY');
					if(data.cell.text[0]!="Sin arete"){
					fecha=data.cell.text[0].split('-');
					data.cell.text[0] = [fecha[2],fecha[1],fecha[0] ].join("-");
					}
				}*/
			},
			didDrawCell: function (data) {
				if (data.column.index === 1 && data.cell.section === 'body') {
				pdf.addImage(
					'http://localhost:8006/images/bovines/' + ids[i],
					'JPEG',
					data.cell.x + 15,
					data.cell.y + 2,
					80,
					80,
				);
				i++;
				}
			},
			});
		}
		pdf.save('list_bovines.pdf');
	}

	editBovine(id: number):any{
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
