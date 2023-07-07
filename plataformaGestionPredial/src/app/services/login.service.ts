import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string):Observable<any>{
    //return this.http.get('https://rickandmortyapi.com/api/character');
    //return this.http.get('http://localhost:8005/listar');
    return this.http.post('http://localhost:8006/login',null,{params:{username,password}});
  }

  public register(username: string, password: string):Observable<any>{
    //return this.http.get('https://rickandmortyapi.com/api/character');
    //return this.http.get('http://localhost:8005/listar');
    return this.http.post('http://localhost:8006/register',null,{params:{username,password}});
  }

}
