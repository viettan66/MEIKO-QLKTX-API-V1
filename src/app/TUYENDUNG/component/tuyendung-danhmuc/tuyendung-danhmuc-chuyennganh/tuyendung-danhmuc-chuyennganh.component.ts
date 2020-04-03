import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0004 } from '../../../Models/RM0004';
declare var $:any
@Component({
  selector: 'app-tuyendung-danhmuc-chuyennganh',
  templateUrl: './tuyendung-danhmuc-chuyennganh.component.html',
  styleUrls: ['./tuyendung-danhmuc-chuyennganh.component.css']
})
export class TuyendungDanhmucChuyennganhComponent implements OnInit {

  public listdata:RM0004[]=[]
  public newdm:RM0004=new RM0004()
    constructor(public rest:RESTService) { }
  

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0004[]>('RM0004/Getall').subscribe(data=>{
      this.listdata=data
    console.log(this.listdata)
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0004>>(this.newdm,'RM0004/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
