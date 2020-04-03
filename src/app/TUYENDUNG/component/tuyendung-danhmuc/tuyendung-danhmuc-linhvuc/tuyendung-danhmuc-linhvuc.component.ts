import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0002 } from '../../../Models/RM0002';
declare var $:any

@Component({
  selector: 'app-tuyendung-danhmuc-linhvuc',
  templateUrl: './tuyendung-danhmuc-linhvuc.component.html',
  styleUrls: ['./tuyendung-danhmuc-linhvuc.component.css']
})
export class TuyendungDanhmucLinhvucComponent implements OnInit {

  public listrm0002:RM0002[]=[]
  public newrm0002:RM0002=new RM0002()
    constructor(public rest:RESTService) { }
  

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0002[]>('RM0002/Getall').subscribe(data=>{
      this.listrm0002=data
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newrm0002)
    this.rest.PostDataToAPI<result<RM0002>>(this.newrm0002,'RM0002/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listrm0002.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
