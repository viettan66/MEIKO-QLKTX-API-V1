import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0006 } from '../../../Models/RM0006';
declare var $:any
@Component({
  selector: 'app-tuyendung-danhmuc-tieuchidanhgia',
  templateUrl: './tuyendung-danhmuc-tieuchidanhgia.component.html',
  styleUrls: ['./tuyendung-danhmuc-tieuchidanhgia.component.css']
})
export class TuyendungDanhmucTieuchidanhgiaComponent implements OnInit {

  public listdata:RM0006[]=[]
  public newdm:RM0006=new RM0006()
    constructor(public rest:RESTService) { }
  

  ngOnInit() {
    this.rest.GetDataFromAPI<RM0006[]>('RM0006/Getall').subscribe(data=>{
      this.listdata=data
    console.log(this.listdata)
    })
  }
  themcongviec(){
    $('#myModalungvieninfo').modal()
  }
  savecongviec(){
    console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0006>>(this.newdm,'RM0006/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
}
