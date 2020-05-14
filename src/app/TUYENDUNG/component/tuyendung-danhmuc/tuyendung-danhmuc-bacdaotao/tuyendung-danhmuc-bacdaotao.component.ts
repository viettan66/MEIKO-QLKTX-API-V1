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
  

 async ngOnInit() {
   this.listdata=await this.rest.GetDataFromAPI<RM0003[]>('RM0003/Getall').toPromise()
  }
 async themcongviec(){
    let data=await this.rest.PostDataToAPI<result<RM0003>>(new RM0003(),'RM0003/add').toPromise()
    if(data.code=="OK")this.listdata.push(data.data)
  }
  savecongviec(){
    //////console.log(this.newdm)
    this.rest.PostDataToAPI<result<RM0003>>(this.newdm,'RM0003/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listdata.push(data.data)
      }
      else alert(data.mess)
    })
  }
  choose(element:RM0003){
    element.check==null?true:!element.check
  }
  public checkall=false
  public tinhTrang=true
  allchange(){
    this.listdata.map(x=>x.check=this.checkall)
  }
  async edititem(element:RM0003){
    if( $('#edit'+element.RM0003_ID).find('i').hasClass('fa-edit')){
       $('#row'+element.RM0003_ID).find('input:text,select').removeClass('none').removeAttr('disabled') 
       $('#edit'+element.RM0003_ID).find('i').removeClass('fa-edit').addClass('fa-save')
     }else{
       $('#row'+element.RM0003_ID).find('input:text,select').addClass('none').attr('disabled',true)
       $('#edit'+element.RM0003_ID).find('i').removeClass('fa-save').addClass('fa-edit')
       let dataa= await this.rest.PutDataToAPI<result<RM0003>>(element,'RM0003/update').toPromise()
       //////console.log(dataa)
       if(dataa.code=="OK"){{
         element=dataa.data
       }}
     }
   }  
   public start=0
   public step=20
  getstart($event){
      this.start=$event
    }
    getstep($event){
      this.step=$event
    }
  async xoacongviec(){
    if(!confirm('Bạn có chắc chắn muốn xóa '))return false
    let data=await this.rest.PutDataToAPI<result<RM0003>[]>(this.listdata.filter(c=>{return c.check===true}),'RM0003/delete').toPromise()
    //////console.log(this.listdata.filter(c=>{return c.check===true}))
    data.filter(c=>{return c.code==="OK"}).forEach(val=>{this.listdata.filter(c=>{return c.RM0003_ID===val.data.RM0003_ID}).map(x=>{this.listdata.splice(this.listdata.indexOf(x),1)})})
   }
}
