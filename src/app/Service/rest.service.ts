import { Injectable, Type } from '@angular/core';
import * as Global from './global.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx'; 
import {from, Observable} from 'rxjs';
declare var XDomainRequest

@Injectable({
  providedIn: 'root'
})
export class RESTService {
  constructor(private http:HttpClient) { }
  public GetDataFromAPI<Type>( uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.get<Type>(Global.APIUrl+uri,{headers:headers});
  }
  public Get207<Type>( uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.get<Type>(uri, {headers:headers});
  }
  public Get<Type>( uri:string) {
    return this.http.get<Type>(uri);
  }
  public Post<Type>(post, uri:string) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.post<Type>(uri,post, {headers: headers });
  }
  PostDataToAPI<Type> (post,uri) {
    let data=JSON.stringify(post)
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.post<Type>(Global.APIUrl+uri,post, {headers: headers});
  }
  PutDataToAPI<Type> (post,uri) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    return this.http.put<Type>(Global.APIUrl+uri,post, {headers: headers});
  }
  ExportTOExcel(TABLE,namefile?,title?) {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(TABLE);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, (namefile!=null?namefile:"no_name_file")+'.xlsx');  
  } 
    postFile(fileToUpload: File) {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    const endpoint = window.location.hostname+'/'+'assets/image';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http .post<boolean>(endpoint, formData, { headers: headers }).toPromise()
}
   createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
      xhr = null;
    }
    return xhr;
  }
}
