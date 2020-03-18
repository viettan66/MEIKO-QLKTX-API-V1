import { Injectable, Type } from '@angular/core';
import * as Global from './global.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RESTService {
  constructor(private http:HttpClient) { }
  //http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1
  public GetDataFromAPI<Type>( uri:string) {
    return this.http.get<Type>(Global.APIUrl+uri);
  }
  public Get207<Type>( uri:string) {
    return this.http.get<Type>(uri);
  }
  public Get<Type>( uri:string) {
    return this.http.get<Type>(uri);
  }
  public Post<Type>( uri:string) {
    return this.http.get<Type>(uri);
  }
  PostDataToAPI<Type> (post,uri) {
    let data = JSON.stringify(post);
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.post<Type>(Global.APIUrl+uri,post, {headers: headers});
  }
  PutDataToAPI<Type> (post,uri) {
    let data = JSON.stringify(post);
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.put<Type>(Global.APIUrl+uri,post, {headers: headers});
  }
  // DeleteDataToAPI<Type> (post,uri) {
  //   let data = JSON.stringify(post);
  //   let headers = new HttpHeaders(); 
  //   headers.set('Content-Type', 'application/json');
  //   return this.http.delete<Type>(Global.APIUrl+uri,post, {headers: headers});
  // }

  
}
