import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any
@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.css']
})
export class TaikhoanComponent implements OnInit {
@Input()listMKV9999input:MKV9999[]=[]
@Input()id
  constructor(public rest:RESTService,public cookie:CookieService) { }
  public listacc:MKV9999[]=[]
  public listdept=[]
  public start:number=0
  public step:number=20
  public keysearch=''
  public phong_id='all'
 async ngOnInit() {
   //////////console.log(this.listMKV9999input)
    let that=this
     this.listacc= this.listMKV9999input
       this.listdept=await this.rest.PostDataToAPI<any>({},"MKV9998/Getall").toPromise()
  }

  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  bophanchange($event){
    this.phong_id=$event.target.value
      // this.listMKV9999show=this.listacc.filter(c=>c.phong_id===$event.target.value)
      // if($event.target.value=='all')this.listMKV9999show=this.listacc
  }
  checkkey(element:MKV9999){
    if(element.manhansu.indexOf(this.keysearch)!=-1)return true
    if((element.hodem+' '+element.ten).toLowerCase().indexOf(this.keysearch.toLowerCase())!=-1)return true
  }
 async resetpass(element:MKV9999){
element.matkhau="123456"
let data=await this.rest.PutDataToAPI<result<MKV9999>>(element,'Account/Update').toPromise()
if( data.code=="OK"){
  alert("Thành công: Passworld mới là 123456")
}
else
  alert( data.mess)
  }
  checkin(element:MKV9999){
   if(this.listMKV9999input==null)return false
 return  this.listMKV9999input.filter(c=>{return c.MKV9999_ID===element.MKV9999_ID}).length==0?false:true
  }
  checkall($event){
    //////////console.log(this.listMKV9999input)
  }
}
