import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public bovines: Array<any> = [];
  public identifiers: Array<any> = [];
  h:any={};
  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.loadBovines();
    this.loadIdentifiers();
    // this.service.getRegisters().subscribe(r => {
    //   //return r.results;
    //   console.log("r: ",r);
    //   this.h = r.results;
    //   console.log("this.h: ",this.h)}
    // );
  }

  async loadBovines(): Promise<void> {
    this.bovines=await fetch("http://localhost:8006/bovines").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
    //this.registers=await fetch("http://localhost:4000/listar").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
  }

  async loadIdentifiers(): Promise<void> {
    this.identifiers=await fetch("http://localhost:8007/identifiers").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
    //this.registers=await fetch("http://localhost:4000/listar").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
  }

  // async loadRegisters(): Promise<void> {
  //   this.registers=await fetch("http://localhost:8006/listar").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
  //   //this.registers=await fetch("http://localhost:4000/listar").then(x=>x.json()).then(y=>y).catch(error=>console.log(error));
  // }

}
