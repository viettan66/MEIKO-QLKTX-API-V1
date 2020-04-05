import { Component, OnInit } from '@angular/core';
import { RM0008 } from 'src/app/TUYENDUNG/Models/RM0008';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-td-lh-themlichen',
  templateUrl: './td-lh-themlichen.component.html',
  styleUrls: ['./td-lh-themlichen.component.css']
})
export class TdLhThemlichenComponent implements OnInit {
public listRM0008:RM0008[]=[]
public listMKV9999:MKV9999[]=[]
public listRM0010:RM0010[]=[]
public listMKV9999choose:MKV9999[]=[]
public ngay=null
public gio=null
public diadiem=null
public start:number=0
public step:number=20
  constructor(public rest:RESTService) { }

  async ngOnInit() {
    this.listRM0008= await this.rest.GetDataFromAPI<RM0008[]>('RM0008/Getall').toPromise()
    this.listMKV9999= await this.rest.GetDataFromAPI<MKV9999[]>('Account/Get').toPromise()
    console.log(this.listMKV9999)
  }
  selectaccount(){
    $("#selectaccount").modal()
  }
  chooseaccount(element:MKV9999){
    if(this.listMKV9999choose.indexOf(element)==-1){
      this.listMKV9999choose.push(element)
      $('#tr'+element.manhansu).addClass('actived')
    }else{
      this.listMKV9999choose.splice(this.listMKV9999choose.indexOf(element),1)
      $('#tr'+element.manhansu).removeClass('actived')
    }
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
  checkelement(element:MKV9999){
    return this.listMKV9999choose.indexOf(element)==-1?'':'actived'
  }
  removechoose(element:MKV9999){
      this.listMKV9999choose.splice(this.listMKV9999choose.indexOf(element),1)
  }
  getlistRM0010($event:RM0010[]){
    this.listRM0010=$event
    console.log($event)
  }
  async themlichhen(){
   // console.log(this.listRM0010)
    if(this.ngay==null){
      alert("Bạn chưa chọn ngày phỏng vấn.")
      return false
    }
    if(this.gio==null){
      alert("Bạn chưa chọn giờ phỏng vấn.")
      return false
    }
    if(this.diadiem==null||this.diadiem=='null'){
      alert("Bạn chưa chọn địa điểm phỏng vấn.")
      return false
    }
    if(this.listRM0010.filter(c=>{return c.check===true}).length==0){
      alert("Bạn chưa chọn ứng viên phỏng vấn.")
      return false
    }
    let data= await this.rest.PostDataToAPI<any>({thoigian:(this.ngay+' '+this.gio),diadiem:this.diadiem,RM0010:this.listRM0010.filter(c=>{return c.check===true})},'RM0015/add').toPromise()
    console.log(data)
  }
}
