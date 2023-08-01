import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentifierService {

  constructor(private http:HttpClient) { }

  public createIdentifier(identifier: any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const formData = new FormData();
    console.log("identifier: ",identifier)
    formData.append("diio",identifier.diio)
    formData.append("date_placement",identifier.date_placement)
    formData.append("bovine",identifier.bovine)
    //formData.append('jsonidentifier', JSON.stringify(identifier));
    //formData.append('file', (document.getElementById('image') as HTMLInputElement)?.files?.item(0) as any);
    // for (let i = 0; i < files.length; i++) {
    //   formData.append(i.toString(), files[i], files[i].name);
    // }
    // formData.append("data", JSON.stringify(data));
    //return this.http.post("http://localhost:8006/bovines/create",JSON.stringifybovine);
    //return this.http.post("http://localhost:8006/bovines/create",JSON.stringify(bovine),httpOptions);//FUNCIONANDO
    return this.http.post("http://localhost:8006/identifiers/create",formData);
  }

  listIdentifiers(bovine:number):Observable<any>{
    return this.http.get("http://localhost:8007/identifiers/bovine/"+bovine);
  }
  
}
