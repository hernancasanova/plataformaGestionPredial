import { Component, OnInit, SimpleChanges, ViewChild  } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { IdentifierService } from 'src/app/services/identifier.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Identifier {
  State: string;
  Diio: string;
}

// const ELEMENT_DATA: Elemento[] = [
//   {nombre: 'Juan', edad: 25},
//   {nombre: 'Ana', edad: 30},
//   // otros datos
// ];

@Component({
  selector: 'app-list-identifiers',
  templateUrl: './list-identifiers.component.html',
  styleUrls: ['./list-identifiers.component.css']
})
export class ListIdentifiersComponent implements OnInit {
  //data:any;
  //dataSource!: any;
  //displayedColumns!: string[];//=['Bovine associated','State','Diio','Date placement'];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  // data:any=[{
  //   "name": "Vaca gorda",
  //   "id": 3,
  //   "state": "Vivo",
  //   "type": "Vaca",
  //   "datePlacement": "2022-05-08T00:00:00.000+00:00",
  //   "verifiedSag": "S",
  //   "dateBirth": "2015-12-17T00:00:00.000+00:00",
  //   "dateSale": null,
  //   "diio": "014628320",
  //   "mother": "Espinazo de camello",
  //   "age": "7 años, 8 meses y 13 días ",
  //   "idMother": 21
  // }]
  headers: any = [];
  constructor(private service: IdentifierService) {
    
   }

   ngOnInit(): void {
    this.loadRegisters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadRegisters(): Promise<void> {
    try {
      const data = await fetch("http://localhost:8007/identifiers")
        .then(response => response.json());

      this.dataSource.data = data;
      if (this.dataSource.data.length > 0) {
        this.displayedColumns = Object.keys(this.dataSource.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // columnDefs = [
  //   { headerName: 'Name', field: 'name', filter: true },
  //   { headerName: 'Age', field: 'age', filter: true },
  //   { headerName: 'City', field: 'city', filter: true },
  // ];

  // rowData = [
  //   { name: 'John', age: 25, city: 'New York' },
  //   { name: 'Jane', age: 30, city: 'San Francisco' },
  //   { name: 'Mike', age: 35, city: 'Los Angeles' },
  // ];

  //displayedColumns: string[] = ['Bovine associated', 'State', 'Diio'];
  //dataSource:any;
  //dataSource = new MatTableDataSource<Elemento>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //ngOnInit() {
    //var dataSource = new MatTableDataSource<any>(this.data);
    //this.dataSource=this.data;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  //}

  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data[column].toString().toLowerCase();
      return textToSearch.indexOf(filter.toLowerCase()) !== -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

} 