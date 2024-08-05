import { Component, Input, OnInit, SimpleChanges, ViewChild  } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { IdentifierService } from 'src/app/services/identifier.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  @Input () data: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnChanges(changes: SimpleChanges): void{
    if(changes.data && changes.data.currentValue){
      this.dataSource.data = changes.data.currentValue;
      if (this.dataSource.data.length > 0) {
        this.displayedColumns = Object.keys(this.dataSource.data[0]);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

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