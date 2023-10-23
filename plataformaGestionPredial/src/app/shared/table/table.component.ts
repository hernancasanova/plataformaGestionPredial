import { UpperCasePipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  columns:any;
  arrColumns:any=[];
  @Input () data: any = [];


  constructor(private pipeInstance: DatePipe) { 
  }

  ngOnChanges(changes: SimpleChanges): void{
    //console.log("changes: ",changes)
    //console.log("changes2: ",changes.data.currentValue)
    if(changes.data.currentValue){
      let a:any=changes.data.currentValue;
      this.data=a;
      this.data.forEach((d:any)=>{
        if(d.State=='activo'){
          d.State='<button style="cursor:default;color:white;background-color:rgb(31, 139, 78); width: 80%; border-radius:5px;">active</button>';
        }else if(d.State=='inactivo'){
          d.State='<button style="cursor:default;color:white;background-color:red; width: 80%; border-radius:5px;">inactive</button>';
        }
        return d;
      })
      Object.keys(this.data[0]).forEach((k:any)=>{
        this.arrColumns.push({title:k, data:k,ngPipeInstance: (k.includes("Date")||k.includes("date"))?this.pipeInstance:null, ngPipeArgs: (k.includes("Date")||k.includes("date"))?['dd/MM/yyyy']:null})
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
  }
}
