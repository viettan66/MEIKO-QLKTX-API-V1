
    import { Injectable, Type } from '@angular/core';
import * as Global from '../../Service/global.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KTX0010_Service{
    constructor(private http:HttpClient) { }

  public GetAllTaiSanCoDinh<Type>( ) {
    return this.http.get<Type>(Global.APIUrl+"KTX0010/Taisancodinh");
  }

//   public Get207<Type>( uri:string) {
//     return this.http.get<Type>(uri);
//   }
//   public Get<Type>( uri:string) {
//     return this.http.get<Type>(uri);
//   }
//   public Post<Type>( uri:string) {
//     return this.http.get<Type>(uri);
//   }
//   PostDataToAPI<Type> (post,uri) {
//     let data = JSON.stringify(post);
//     let headers = new HttpHeaders(); 
//     headers.set('Content-Type', 'application/json');
//     return this.http.post<Type>(Global.APIUrl+uri,post, {headers: headers});
//   }
//   PutDataToAPI<Type> (post,uri) {
//     let data = JSON.stringify(post);
//     let headers = new HttpHeaders(); 
//     headers.set('Content-Type', 'application/json');
//     return this.http.put<Type>(Global.APIUrl+uri,post, {headers: headers});
//   }
}