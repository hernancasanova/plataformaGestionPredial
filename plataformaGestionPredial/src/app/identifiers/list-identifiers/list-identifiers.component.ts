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

@Component({
  selector: 'app-list-identifiers',
  templateUrl: './list-identifiers.component.html',
  styleUrls: ['./list-identifiers.component.css']
})
export class ListIdentifiersComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  data: any;

  constructor(){
    this.loadRegisters();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadRegisters(): Promise<void> {
    try {
      this.data=await fetch("http://localhost:8007/identifiers")
        .then(response => response.json()).then(y=>y).catch(error=>console.log(error));
    } catch (error) {
      console.log(error);
    }
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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