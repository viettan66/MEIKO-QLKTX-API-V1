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
    //console.log(this.listdata)
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
    let data=await this.rest.PostDataToAPI<result<RM0009>>(new RM0009(),'RM0009/add').toPromise()
    if(data.code=="OK")this.listdata.push(data.data)
  }
  savecongviec(){
    //console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0009>>(this.newdm,'RM0009/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
  choose(element:RM0009){
    element.check==null?true:!element.check
  }
  public checkall=false
  public tinhTrang=true
  allchange(){
    this.listdata.map(x=>x.check=this.checkall)
  }
  async edititem(element:RM0009){
    if( $('#edit'+element.RM0009_ID).find('i').hasClass('fa-edit')){
       $('#row'+element.RM0009_ID).find('input:text,select').removeClass('none').removeAttr('disabled') 
       $('#edit'+element.RM0009_ID).find('i').removeClass('fa-edit').addClass('fa-save')
     }else{
       $('#row'+element.RM0009_ID).find('input:text,select').addClass('none').attr('disabled',true)
       $('#edit'+element.RM0009_ID).find('i').removeClass('fa-save').addClass('fa-edit')
       let dataa= await this.rest.PutDataToAPI<result<RM0009>>(element,'RM0009/update').toPromise()
       //console.log(dataa)
       if(dataa.code=="OK"){{
         element=dataa.data
       }}
     }
   }
  async xoacongviec(){
    if(!confirm('Bạn có chắc chắn muốn xóa '))return false
    let data=await this.rest.PutDataToAPI<result<RM0009>[]>(this.listdata.filter(c=>{return c.check===true}),'RM0009/delete').toPromise()
    //console.log(this.listdata.filter(c=>{return c.check===true}))
    data.filter(c=>{return c.code==="OK"}).forEach(val=>{this.listdata.filter(c=>{return c.RM0009_ID===val.data.RM0009_ID}).map(x=>{this.listdata.splice(this.listdata.indexOf(x),1)})})
   }
}
