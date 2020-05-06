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

 async ngOnInit() {
   this.listrm0001=await this.rest.GetDataFromAPI<RM0001[]>('RM0001/Getall').toPromise()
   //console.log(this.listrm0001)
  }
 async themcongviec(){
    let data=await this.rest.PostDataToAPI<result<RM0001>>(new RM0001(),'RM0001/add').toPromise()
    if(data.code=="OK")this.listrm0001.push(data.data)
    //$('#myModalungvieninfo').modal()
  }
  savecongviec(){
    //console.log(this.newrm0001)
    this.rest.PostDataToAPI<result<RM0001>>(this.newrm0001,'RM0001/add').subscribe(data=>{
      if(data.code=="OK"){
        this.listrm0001.push(data.data)
      }
      else alert(data.mess)
    })
  }
  async edititem(element:RM0001){
   if( $('#edit'+element.RM0001_ID).find('i').hasClass('fa-edit')){
      $('#row'+element.RM0001_ID).find('input:text,select').removeClass('none').removeAttr('disabled') 
      $('#edit'+element.RM0001_ID).find('i').removeClass('fa-edit').addClass('fa-save')
    }else{
      $('#row'+element.RM0001_ID).find('input:text,select').addClass('none').attr('disabled',true)
      $('#edit'+element.RM0001_ID).find('i').removeClass('fa-save').addClass('fa-edit')
      let dataa= await this.rest.PutDataToAPI<result<RM0001>>(element,'RM0001/update').toPromise()
      //console.log(dataa)
      if(dataa.code=="OK"){{
        element=dataa.data
      }}
    }
  }
  choose(element:RM0001){
    element.check==null?true:!element.check
  }
  public checkall=false
  public tinhTrang=true
  allchange(){
    this.listrm0001.map(x=>x.check=this.checkall)
  }
  kjkj($event){
    this.tinhTrang=$event.target.value=='true'
  }
  async xoacongviec(){
  if(!confirm('Bạn có chắc chắn muốn xóa '))return false
  let data=await this.rest.PutDataToAPI<result<RM0001>[]>(this.listrm0001.filter(c=>{return c.check===true}),'RM0001/delete').toPromise()
  //console.log(this.listrm0001.filter(c=>{return c.check===true}))
  data.filter(c=>{return c.code==="OK"}).forEach(val=>{this.listrm0001.filter(c=>{return c.RM0001_ID===val.data.RM0001_ID}).map(x=>{this.listrm0001.splice(this.listrm0001.indexOf(x),1)})})
 }
 public start=0
 public step=20
 getstart($event){
  this.start=$event
}
getstep($event){
  this.step=$event
}
// getlist($event){
//   this.listdon=$event
// }

}
