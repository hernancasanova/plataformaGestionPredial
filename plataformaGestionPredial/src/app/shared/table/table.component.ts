import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  columns:any;
  arrColumns:any=[];
  @Input () data: any = [];
  @Input () rows: any;
  @Input () headers: any;


  constructor() { 
  }

  ngOnChanges(changes: SimpleChanges): void{
    //console.log("changes: ",changes)
    //console.log("changes2: ",changes.data.currentValue)
    if(changes.data.currentValue){
      let a:any=changes.data.currentValue;
      this.data=a;
      //console.log("this.data: ",this.data)
      Object.keys(this.data[0]).forEach((k:any)=>{
        this.arrColumns.push({title:k.toLowerCase(), data:k})
      });
      this.dtOptions = {
        pagingType: 'full_numbers',
        data:this.data,
        columns:this.arrColumns
      };
    }
    // if(changes.nemo !== undefined){
    //     this.nemo=changes.nemo.currentValue;
    //     console.log("this.nemo: ",this.nemo)
    // }
    //this.nemo=changes.nemo.currentValue;
  }

  ngOnInit(): void {
    // Object.keys(this.data[0]).forEach((k:any)=>{
    //   this.arrColumns.push({title:k.toLowerCase(), data:k})
    // });
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   data:this.data,
    //   columns:this.arrColumns
    //   // ajax: (dataTablesParameters: any, callback) => {
    //   //   that.http
    //   //     .post<DataTablesResponse>(
    //   //       'https://xtlncifojk.eu07.qoddiapp.com/',
    //   //       dataTablesParameters, {}
    //   //     ).subscribe(resp => {
    //   //       callback({
    //   //         recordsTotal: resp.recordsTotal,
    //   //         recordsFiltered: resp.recordsFiltered,
    //   //         data: resp.data             // <-- see here
    //   //       });
    //   //     });
    //   // },
    //   // columns: [{
    //   //   title: 'ID',
    //   //   data: 'id'
    //   // }, {
    //   //   title: 'First name',
    //   //   data: 'firstName'
    //   // }, {
    //   //   title: 'Last name',
    //   //   data: 'lastName'
    //   // }]
    // };
  }
}
