import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0003 } from '../../../Models/RM0003';
declare var $:any
@Component({
  selector: 'app-tuyendung-danhmuc-bacdaotao',
  templateUrl: './tuyendung-danhmuc-bacdaotao.component.html',
  styleUrls: ['./tuyendung-danhmuc-bacdaotao.component.css']
})
export class TuyendungDanhmucBacdaotaoComponent implements OnInit {

  public listdata:RM0003[]=[]
  public newdm:RM0003=new RM0003()
    constructor(public rest:RESTService) { }
  

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0003[]>('RM0003/Getall').subscribe(data=>{
      this.listdata=data
    console.log(this.listdata)
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0003>>(this.newdm,'RM0003/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
