import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class VacunosService{

  constructor(private http:HttpClient) { }

  public getBovines():Observable<any>{
    return this.http.get("http://localhost:8006/bovines");
  }

  public getBovine(id: number):Observable<any>{
    return this.http.get("http://localhost:8006/bovines/"+id);
  }
}
