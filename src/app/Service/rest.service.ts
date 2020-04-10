import { Injectable, Type } from '@angular/core';
import * as Global from './global.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx'; 
import { async } from 'rxjs/internal/scheduler/async';
import { type } from 'os';
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
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(TABLE,  {display:false});  
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
 async ReadExcelFile<Type>(fileName:File){
  return new Promise<any>((resolve, reject) =>{
    let arrayBuffer:any;
      let fileReader = new FileReader();
      fileReader.onload =  ( e) => {
        arrayBuffer = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        resolve(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      }
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer( fileName);
    })
  }
  async ChooseFileExcel<Type>(){
    return new Promise<Type>((resolve, reject) =>{
      var input = document.createElement('input');
      input.type = 'file';
      input.onchange = async e => {
      resolve(await this.ReadExcelFile<Type>(input.files[0])) 
      }
      input.click();
    })
  }
  
  ExportTOExcelFromJson(datalist,namefile?,title?) {  
    let ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(datalist,{skipHeader:true})

    let wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, (namefile!=null?namefile:"no_name_file")+'.xlsx');  
  } 
}
