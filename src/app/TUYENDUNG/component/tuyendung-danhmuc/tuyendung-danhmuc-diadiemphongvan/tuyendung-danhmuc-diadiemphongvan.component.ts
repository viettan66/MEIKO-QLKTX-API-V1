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
    //////////console.log(this.listdata)
    })
  }  
  public start=0
  public step=20
 getstart($event){
     this.start=$event
   }
   getstep($event){
     this.step=$event
   }
 async themcongviec(){
    let data=await this.rest.PostDataToAPI<result<RM0008>>(new RM0008(),'RM0008/add').toPromise()
    if(data.code=="OK")this.listdata.push(data.data)
  }
  savecongviec(){
    //////////console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0008>>(this.newdm,'RM0008/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
  choose(element:RM0008){
    element.check==null?true:!element.check
  }
  public checkall=false
  public tinhTrang=true
  allchange(){
    this.listdata.map(x=>x.check=this.checkall)
  }
  async edititem(element:RM0008){
    if( $('#edit'+element.RM0008_ID).find('i').hasClass('fa-edit')){
       $('#row'+element.RM0008_ID).find('input:text,select').removeClass('none').removeAttr('disabled') 
       $('#edit'+element.RM0008_ID).find('i').removeClass('fa-edit').addClass('fa-save')
     }else{
       $('#row'+element.RM0008_ID).find('input:text,select').addClass('none').attr('disabled',true)
       $('#edit'+element.RM0008_ID).find('i').removeClass('fa-save').addClass('fa-edit')
       let dataa= await this.rest.PutDataToAPI<result<RM0008>>(element,'RM0008/update').toPromise()
       //////////console.log(dataa)
       if(dataa.code=="OK"){{
         element=dataa.data
       }}
     }
   }
  async xoacongviec(){
    if(!confirm('Bạn có chắc chắn muốn xóa '))return false
    let data=await this.rest.PutDataToAPI<result<RM0008>[]>(this.listdata.filter(c=>{return c.check===true}),'RM0008/delete').toPromise()
    //////////console.log(this.listdata.filter(c=>{return c.check===true}))
    data.filter(c=>{return c.code==="OK"}).forEach(val=>{this.listdata.filter(c=>{return c.RM0008_ID===val.data.RM0008_ID}).map(x=>{this.listdata.splice(this.listdata.indexOf(x),1)})})
   }
}
