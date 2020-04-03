import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0008 } from '../../../Models/RM0008';
declare var $:any
@Component({
  selector: 'app-tuyendung-danhmuc-diadiemphongvan',
  templateUrl: './tuyendung-danhmuc-diadiemphongvan.component.html',
  styleUrls: ['./tuyendung-danhmuc-diadiemphongvan.component.css']
})
export class TuyendungDanhmucDiadiemphongvanComponent implements OnInit {

  public listdata:RM0008[]=[]
  public newdm:RM0008=new RM0008()
    constructor(public rest:RESTService) { }
  

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0008[]>('RM0008/Getall').subscribe(data=>{
      this.listdata=data
    console.log(this.listdata)
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0008>>(this.newdm,'RM0008/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
