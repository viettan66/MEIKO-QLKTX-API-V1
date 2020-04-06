import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { RM0015 } from 'src/app/TUYENDUNG/Models/RM0015';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { RM0008 } from 'src/app/TUYENDUNG/Models/RM0008';
import { RM0015A } from 'src/app/TUYENDUNG/Models/RM0015A';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-td-lh-danhsachlichen',
  templateUrl: './td-lh-danhsachlichen.component.html',
  styleUrls: ['./td-lh-danhsachlichen.component.css']
})
export class TdLhDanhsachlichenComponent implements OnInit {

  constructor(public rest:RESTService) { }
public listRM0015:RM0015[]=[]
public listRM0008:RM0008[]=[]
public rm0010in:RM0010=new RM0010()
public start:number=0
public step:number=20
public listMKV9999:MKV9999[]=[]
 async ngOnInit() {
    this.listRM0015=await this.rest.GetDataFromAPI<RM0015[]>("RM0015/Getall").toPromise()
    this.listRM0008=await this.rest.GetDataFromAPI<RM0008[]>("RM0008/Getall").toPromise()
    this.listMKV9999= await this.rest.GetDataFromAPI<MKV9999[]>('Account/Get').toPromise()
       console.log(this.listRM0015)
   
    
  }
  showungvien(element:RM0015){
    if(element.RM0010!=null){
      this.rm0010in=element.RM0010
      $('#modalungvien').modal()
    }
  }
  close(){
    $("#modalungvien").modal('hide')
  }
 async edititem(element:RM0015){
    this.thisrm0015=element
    var show=$('#tr'+element.RM0015_ID).find('.show')
    var hide=$('#tr'+element.RM0015_ID).find('.hide')
    show.addClass('hide').removeClass('show')
    hide.addClass('show').removeClass('hide')
    if($('#edit'+element.RM0015_ID).find('i').hasClass('fa-edit'))$('#edit'+element.RM0015_ID).find('i').removeClass('fa-edit').addClass('fa-save')
    else{
      $('#edit'+element.RM0015_ID).find('i').removeClass('fa-save').addClass('fa-edit')
      this.thisrm0015.thoiGianPhongVan=this.thisrm0015.ngayPV+' '+this.thisrm0015.thoiGianPV
      console.log(this.thisrm0015)
     let data= await this.rest.PutDataToAPI<result< RM0015>>(this.thisrm0015,'RM0015/update').toPromise()
     console.log(data)
    } 
  }
 async deleteitem(element:RM0015){
    if(confirm("Bạn muốn xóa lịch hẹn này?")){
      let data= await this.rest.GetDataFromAPI<result< RM0015>>('RM0015/delete/'+element.RM0015_ID).toPromise()
     if(data.code=="OK"){
        this.listRM0015.splice(this.listRM0015.indexOf(element),1)
     }else{
       alert(data.mess)
     }
    }
  }
  removeaccount(element:RM0015,button:RM0015A){
    element.RM0015A.splice(element.RM0015A.indexOf(button),1)
  }
  public thisrm0015:RM0015=null
  selectaccount(element:RM0015){
    $('#selectaccount').modal()

  }
  
  checkelement(element:MKV9999){
    if(this.thisrm0015==null)return false
    return this.thisrm0015.RM0015A.indexOf(this.thisrm0015.RM0015A.filter(c=>{return c.MKV9999_ID===element.MKV9999_ID})[0])==-1?'':'actived'
  }
  pre(){
    if(this.start==0)return false
    this.start--
  }
  nex(){
    if((this.start+1)*this.step>=this.listMKV9999.length)return false
    this.start++
  }
  closeselectaccount(){
    $('#selectaccount').modal('hide')
  }
  
  chooseaccount(element:MKV9999){
    if(this.thisrm0015.RM0015A.indexOf(this.thisrm0015.RM0015A.filter(c=>{return c.MKV9999_ID===element.MKV9999_ID})[0] )==-1){
      let temp:RM0015A=new RM0015A()
      temp.MKV9999=element
      temp.MKV9999_ID=element.MKV9999_ID
      temp.RM0015_ID=this.thisrm0015.RM0015_ID
      temp.ghiChu=this.thisrm0015.ghiChu
      temp.trangThai=this.thisrm0015.trangThai
      temp.check=true
      this.thisrm0015.RM0015A.push(temp)
      $('#tracc'+element.manhansu).addClass('actived')
    }else{
      this.thisrm0015.RM0015A.splice(this.thisrm0015.RM0015A.indexOf(this.thisrm0015.RM0015A.filter(c=>{return c.MKV9999_ID===element.MKV9999_ID})[0]),1)
      $('#tracc'+element.manhansu).removeClass('actived')
    }
  }
}
