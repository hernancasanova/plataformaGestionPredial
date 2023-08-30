import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {
  data1: any = [{nombre:"hernan", descripcion:"desc", profession:"ingeniero"},
              {nombre:"david", descripcion:"asc", profession:"ingeniero"},
              {nombre:"veronica", descripcion:"up", profession:"ingeniera"}
            ];
  data:any;
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
  //rows: any = ["nombre","descripcion"];
  // columns: [{
  //   title: 'ID',
  //   data: 'id'
  // }, {
  //   title: 'First name',
  //   data: 'firstName'
  // }, {
  //   title: 'Last name',
  //   data: 'lastName'
  // }]
  constructor(private service: DashboardService) {
    this.loadRegisters();
    // console.log("Object.keys: ",Object.keys(this.rows[0]));
    // this.headers=Object.keys(this.rows[0]);
   }

  ngOnInit(): void {
  }

  async loadRegisters(): Promise<void> {
    this.data=await fetch("http://localhost:8006/listar").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
    //this.registers=await fetch("http://localhost:4000/listar").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
  }

}
