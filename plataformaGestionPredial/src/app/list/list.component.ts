import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Bovine } from '../models/bovine';
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
import { CarouselModule } from '../shared/carousel/carousel.module';
import { NgSelectModule } from '@ng-select/ng-select';

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
		CarouselModule,
		NgIf,
		DatePipe,
		NgSelectModule
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
			.parent div{
				float: left;
				clear: none;
			}
			th, td{
				text-align: center;
			}
			tr{
				/*cursor: pointer !important;*/
			}
			thead {
				position: sticky;
				top: -1px;
				background-color: rgb(31, 139, 78);
				z-index: 1;
				color:white
			  }
			.parent div img{
				float: right;
			}
			.container-form{
				text-align: center;
				padding-top: 15%;
				vertical-align: text-bottom;
				height: 100%;
				background-color:white;
			}
			
			th.asc::after {
				content: "\f062"; /* Font Awesome chevron-up */
				font-family: "Font Awesome 5 Free";
				font-weight: 900; /* Font Awesome icon font weight */
				margin-left: 5px;
			}

			th.desc::after {
				content: "\f063"; /* Font Awesome chevron-down */
				font-family: "Font Awesome 5 Free";
				font-weight: 900;
				margin-left: 5px;
			}			

		`,
	],
})
export class ListComponent {
	items$: Observable<Bovine[]>;
	direccion: any;
	//items: Array<any> = [];
	//total: number = 20;
	//page: number = 1;
	//pageSize: number = 10;
	title_modal: string ="";
	list_content: any=[];
	bovine:number=0;
	name_bovine:string="";
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: CountryService, private router: Router, private vacunoService: VacunosService, private identifierService: IdentifierService, private modalService: NgbModal) {
		this.items$ = service.countries$;
		this.total$ = service.total$;
	}

	openModalDialogCustomClass(content: any, id: number, name:string) {
		this.title_modal="List of identifiers "+name;
		this.list_content=[];
		this.identifierService.listIdentifiers(id).
    subscribe(r=>{
		r.forEach((e:any)=>{
			this.list_content.push({diio:e.diio,state:e.state})
		})
	},
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{
		this.modalService.open(content, { modalDialogClass: 'dark-modal', centered:true });
	}
    );
	}

	types = [
		{ value: "all", name: 'All' },
		{ value: "Ternero", name: 'Ternero' },
		{ value: "Ternera", name: 'Ternera' },
		{ value: "Toro", name:'Toro'},
		{ value: "Vaquilla", name: 'Vaquilla' },
		{ value: "Vaca", name: 'Vaca' },
		{ value: "Buey", name: 'Buey' },
		{ value: "Novillo", name: 'Novillo' }
	];

	states = [
		{ value: "all", name: 'All' },
		{ value: "Vivo", name: 'Alive' },
		{ value: "Vendido", name: 'Sold' },
		{ value: "Muerto", name: 'Die' }
	];

	years = [
		{ value: "2025", name: '2025' },
		{ value: "2024", name: '2024' },
		{ value: "2023", name: '2023' },		
	];

	formatDiio(input: string): string {
		return input.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1.$2.$3');
	}

	openFullscreen(content:any,id:number, name:string) {
		this.title_modal="Bovine: "+name;
		this.list_content=[];
		this.bovine=id;
		this.name_bovine=name;
		//this.modalService.open(content, { fullscreen: true });
		this.modalService.open(content, { size: 'xl' });
	}

	openModalDialogCustomClass2(content: any, id: number, name:string) {
		this.title_modal="List of children "+name;
		this.list_content=[];
		this.vacunoService.getChildren(id).
    subscribe(r=>{
		this.list_content=r;
	},
    (error:any)=>console.log("error en Observable: ",error),
    ()=>{
		this.modalService.open(content, { modalDialogClass: 'dark-modal', centered:true });
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
		var mainImages: Array<string> = [];
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
						vac.age,
						vac.mainImage,
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
				'Edad',
				''//imagen principal
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
				7: { cellWidth: 'auto', minCellHeight: 0,  },
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
				if (data.column.index === 7 && data.cell.section === 'body') {
					mainImages.push(data.cell.text[0]);
					data.cell.text[0] = "";
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
					let url=mainImages[i]=='1'?'http://localhost:8006/images/bovines/young/'+ids[i]:'http://localhost:8006/images/bovines/old/'+ids[i];
				pdf.addImage(
					url,
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

	deleteBovine(id: number):any{
		this.router.navigate(["/bovines/delete/"+id])
	}

	onSort({ column, direction }: SortEvent) {
		//this.direccion=direction;
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
