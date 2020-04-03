import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0009 } from '../../../Models/RM0009';
declare var $:any
@Component({
  selector: 'app-tuyendung-danhmuc-nguonthongtin',
  templateUrl: './tuyendung-danhmuc-nguonthongtin.component.html',
  styleUrls: ['./tuyendung-danhmuc-nguonthongtin.component.css']
})
export class TuyendungDanhmucNguonthongtinComponent implements OnInit {

  public listdata:RM0009[]=[]
  public newdm:RM0009=new RM0009()
    constructor(public rest:RESTService) { }
  

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0009[]>('RM0009/Getall').subscribe(data=>{
      this.listdata=data
    console.log(this.listdata)
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0009>>(this.newdm,'RM0009/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
