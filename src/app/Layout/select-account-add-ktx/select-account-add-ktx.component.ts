import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KTX0052 } from 'src/app/QLKTX/models/KTX0052';
import { result } from 'src/app/QLKTX/models/result';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9998 } from 'src/app/Models/MKV9998';
declare var $:any

@Component({
  selector: 'app-select-account-add-ktx',
  templateUrl: './select-account-add-ktx.component.html',
  styleUrls: ['./select-account-add-ktx.component.css']
})
export class SelectAccountAddKTXComponent implements OnInit {
@Output("listdata")datalist=new EventEmitter<KTX0052[]>()
  public listKTX0052:KTX0052[] = []
  public listMKV9998: MKV9998[] = []
  constructor(public rest: RESTService) { }

  async ngOnInit() {
  this.listMKV9998 = await this.rest.PostDataToAPI<MKV9998[]>({},'MKV9998/Getall').toPromise()
    this.listKTX0052=await this.rest.GetDataFromAPI<KTX0052[]>("KTX0052/Getall").toPromise()
    this.send()
  }
  public checkallrow=false;
  checkall(){
    this.listKTX0052.map(x=>x.check=this.checkallrow)
  }
  public startacc=0
  public stepacc=20
  getstartacc($event) {
    //console.log(this.startacc)
    this.startacc = $event
  }
  getstepacc($event) {
    this.stepacc = $event
    //console.log(this.stepacc)
  }
  getlistacc($event) {
    this.listKTX0052 = $event
  }
  async edit(element: KTX0052) {
    if ($('#editacc' + element.KTX0052_ID).find('i').hasClass('fa-edit')) {
      $('#rowacc' + element.KTX0052_ID).find('input:text,select').removeClass('none').removeAttr('disabled')
      $('#editacc' + element.KTX0052_ID).find('i').removeClass('fa-edit').addClass('fa-save')
    } else {
      $('#rowacc' + element.KTX0052_ID).find('input:text,select').addClass('none').attr('disabled', true)
      $('#editacc' + element.KTX0052_ID).find('i').removeClass('fa-save').addClass('fa-edit')
      let dataa = await this.rest.PutDataToAPI<result<KTX0052>>(element, 'KTX0052/update').toPromise()
      //console.log(dataa)
      if (dataa.code == "OK") {
        {
          element = dataa.data
        }
      }
    }
    this.send()
  }
  async deleteallacc(){
    if(!confirm("Bạn có chắc chắn mốn xóa những tài khoản đã chọn không?"))return false
    let data=await this.rest.PutDataToAPI<result<KTX0052>[]>(this.listKTX0052.filter(c=>c.check),'KTX0052/delete').toPromise()
    //console.log(data)
    data.filter(c=>c.code==="OK").map(x=>this.listKTX0052.filter(c=>c.User_ID===x.data.User_ID).map(x=>this.listKTX0052.splice(this.listKTX0052.indexOf(x),1)))
    this.send()
  }
 async addaccount(){
   let data= await this.rest.PostDataToAPI<result<KTX0052>>(new KTX0052({
      User_ID :"1",
      manhansu :"1",
      hodem :"Họ Đệm",
      ten :"Tên",
      ngaysinh :"1995-01-01",
      gioitinh :null,
      cmtnd_so :"",
      cmtnd_ngayhethan :"",
      cmtnd_noicap :"",
      phong_id :"",
      dienthoai_didong :"",
      chucvu :"",
      capbac :"1",
      thetu_id :"1"}),"KTX0052/add").toPromise()
    if(data.code=="OK"){
      this.listKTX0052.push(data.data)
    }
    this.send()
  }
  send(){
    this.datalist.emit(this.listKTX0052)
  }
}
