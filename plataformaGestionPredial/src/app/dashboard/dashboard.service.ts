import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getRegisters():Observable<any>{
    //return this.http.get('https://rickandmortyapi.com/api/character');
    //return this.http.get('http://localhost:8005/listar');
    return this.http.get('http://localhost:8006/listar');
  }

  public getRegister(id:string):Observable<any>{
    //return this.http.get('https://rickandmortyapi.com/api/character');
    //return this.http.get('http://localhost:8005/listar');
    return this.http.get('http://localhost:8005/listar/'+id);
  }
}
