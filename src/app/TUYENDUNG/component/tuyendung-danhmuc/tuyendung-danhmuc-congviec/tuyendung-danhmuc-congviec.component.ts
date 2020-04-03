import { Component, OnInit } from '@angular/core';
import { RM0001 } from 'src/app/TUYENDUNG/Models/RM0001';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-tuyendung-danhmuc-congviec',
  templateUrl: './tuyendung-danhmuc-congviec.component.html',
  styleUrls: ['./tuyendung-danhmuc-congviec.component.css']
})
export class TuyendungDanhmucCongviecComponent implements OnInit {
public newrm0001:RM0001=new RM0001()
public listrm0001:RM0001[]=[]
  constructor(public rest:RESTService) { }

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0001[]>('RM0001/Getall').subscribe(data=>{
      this.listrm0001=data
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newrm0001)
    this.rest.PostDataToAPI<result<RM0001>>(this.newrm0001,'RM0001/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listrm0001.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
