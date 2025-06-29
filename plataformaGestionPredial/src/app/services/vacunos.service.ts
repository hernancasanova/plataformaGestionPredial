import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public getRaces():Observable<any>{
    return this.http.get("http://localhost:8006/races");
  }

  public getBovine(id: number):Observable<any>{
    return this.http.get("http://localhost:8006/bovines/"+id);
  }

  public getChildren(id: number):Observable<any>{
    return this.http.get("http://localhost:8006/bovines/"+id+"/children");
  }

  public createBovine(bovine: any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const formData = new FormData();
    formData.append('jsonbovine', JSON.stringify(bovine));
    formData.append('youngFile', (document.getElementById('image young') as HTMLInputElement)?.files?.item(0) as any);
    formData.append('oldFile', (document.getElementById('image old') as HTMLInputElement)?.files?.item(0) as any);
    // for (let i = 0; i < files.length; i++) {
    //   formData.append(i.toString(), files[i], files[i].name);
    // }
    // formData.append("data", JSON.stringify(data));
    //return this.http.post("http://localhost:8006/bovines/create",JSON.stringifybovine);
    //return this.http.post("http://localhost:8006/bovines/create",JSON.stringify(bovine),httpOptions);//FUNCIONANDO
    return this.http.post("http://localhost:8006/bovines/create",formData);
  }

  public deleteBovine(id:number):Observable<any>{
    return this.http.put("http://localhost:8006/bovines/"+id+"/delete",null);
  }

}
