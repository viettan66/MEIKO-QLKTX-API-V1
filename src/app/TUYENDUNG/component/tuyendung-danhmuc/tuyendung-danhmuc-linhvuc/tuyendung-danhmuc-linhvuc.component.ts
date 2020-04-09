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
  async themcongviec(){
    let data=await this.rest.PostDataToAPI<result<RM0002>>(new RM0002(),'RM0002/add').toPromise()
    if(data.code=="OK")this.listrm0002.push(data.data)
    //$('#myModalungvieninfo').modal()
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
  
  choose(element:RM0002){
    element.check==null?true:!element.check
  }
  public checkall=false
  public tinhTrang=true
  allchange(){
    this.listrm0002.map(x=>x.check=this.checkall)
  }
  async edititem(element:RM0002){
    if( $('#edit'+element.RM0002_ID).find('i').hasClass('fa-edit')){
       $('#row'+element.RM0002_ID).find('input:text,select').removeClass('none').removeAttr('disabled') 
       $('#edit'+element.RM0002_ID).find('i').removeClass('fa-edit').addClass('fa-save')
     }else{
       $('#row'+element.RM0002_ID).find('input:text,select').addClass('none').attr('disabled',true)
       $('#edit'+element.RM0002_ID).find('i').removeClass('fa-save').addClass('fa-edit')
       let dataa= await this.rest.PutDataToAPI<result<RM0002>>(element,'RM0002/update').toPromise()
       console.log(dataa)
       if(dataa.code=="OK"){{
         element=dataa.data
       }}
     }
   }
  async xoacongviec(){
    if(!confirm('Bạn có chắc chắn muốn xóa '))return false
    let data=await this.rest.PutDataToAPI<result<RM0002>[]>(this.listrm0002.filter(c=>{return c.check===true}),'RM0002/delete').toPromise()
    data.filter(c=>{return c.code==="OK"}).forEach(val=>{this.listrm0002.filter(c=>{return c.RM0002_ID===val.data.RM0002_ID}).map(x=>{this.listrm0002.splice(this.listrm0002.indexOf(x),1)})})
   }
}
