import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { IdentifierService } from 'src/app/services/identifier.service';

@Component({
  selector: 'app-list-identifiers',
  templateUrl: './list-identifiers.component.html',
  styleUrls: ['./list-identifiers.component.css']
})
export class ListIdentifiersComponent implements OnInit {
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
  constructor(private service: IdentifierService) {
    this.loadRegisters();
   }

  ngOnInit(): void {
  }

  async loadRegisters(): Promise<void> {
    this.data=await fetch("http://localhost:8007/identifiers").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
  }

}