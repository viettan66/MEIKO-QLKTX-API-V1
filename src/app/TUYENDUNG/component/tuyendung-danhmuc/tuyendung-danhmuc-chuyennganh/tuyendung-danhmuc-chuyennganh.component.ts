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
 async themcongviec(){
    let data=await this.rest.PostDataToAPI<result<RM0004>>(new RM0004(),'RM0004/add').toPromise()
    if(data.code=="OK")this.listdata.push(data.data)
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
  
  choose(element:RM0004){
    element.check==null?true:!element.check
  }
  public checkall=false
  public tinhTrang=true
  allchange(){
    this.listdata.map(x=>x.check=this.checkall)
  }
  async edititem(element:RM0004){
    if( $('#edit'+element.RM0004_ID).find('i').hasClass('fa-edit')){
       $('#row'+element.RM0004_ID).find('input:text,select').removeClass('none').removeAttr('disabled') 
       $('#edit'+element.RM0004_ID).find('i').removeClass('fa-edit').addClass('fa-save')
     }else{
       $('#row'+element.RM0004_ID).find('input:text,select').addClass('none').attr('disabled',true)
       $('#edit'+element.RM0004_ID).find('i').removeClass('fa-save').addClass('fa-edit')
       let dataa= await this.rest.PutDataToAPI<result<RM0004>>(element,'RM0004/update').toPromise()
       console.log(dataa)
       if(dataa.code=="OK"){{
         element=dataa.data
       }}
     }
   }
  async xoacongviec(){
    if(!confirm('Bạn có chắc chắn muốn xóa '))return false
    let data=await this.rest.PutDataToAPI<result<RM0004>[]>(this.listdata.filter(c=>{return c.check===true}),'RM0004/delete').toPromise()
    console.log(this.listdata.filter(c=>{return c.check===true}))
    data.filter(c=>{return c.code==="OK"}).forEach(val=>{this.listdata.filter(c=>{return c.RM0004_ID===val.data.RM0004_ID}).map(x=>{this.listdata.splice(this.listdata.indexOf(x),1)})})
   }
}
