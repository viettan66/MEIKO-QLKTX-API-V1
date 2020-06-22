import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from 'src/app/QLKTX/models/result';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  public newcomer:MKV9999=new MKV9999()
  constructor(public rest:RESTService,public active:ActivatedRoute,public router:Router) {
    
   }

  ngOnInit() {
    $(document).ready(function(){

    })
    let that=this
    this.active.queryParams.subscribe(vla=>{
      Object.keys(vla) .forEach(k=>{
            this.newcomer[k]=vla[k]
          })
    })
  }
  ff(newcomer){
console.log(newcomer)
  }
  public checkpass=''
  async singin(){
    if(this.newcomer.matkhau!=this.checkpass){
      alert("Mật khẩu đã nhập không khớp.")
      return false
    }
    let check=true
    if(this.newcomer.hodem==null||this.newcomer.hodem.trim()=='')check=false
    if(this.newcomer.ten==null||this.newcomer.ten.trim()=='')check=false
    if(this.newcomer.ngaysinh==null||this.newcomer.ngaysinh.toString().trim()=='')check=false
    if(this.newcomer.gioitinh==null)check=false
    if(this.newcomer.noisinh==null||this.newcomer.noisinh.trim()=='')check=false
    if(this.newcomer.quequan==null||this.newcomer.quequan.trim()=='')check=false
    if(this.newcomer.diachithuongtru==null||this.newcomer.diachithuongtru.trim()=='')check=false
    if(this.newcomer.cmtnd_so==null||this.newcomer.cmtnd_so.trim()=='')check=false
    if(this.newcomer.cmtnd_ngayhethan==null||this.newcomer.cmtnd_ngayhethan.toString().trim()=='')check=false
    if(this.newcomer.cmtnd_noicap==null||this.newcomer.cmtnd_noicap.trim()=='')check=false
    if(this.newcomer.capbac==null||this.newcomer.capbac.trim()=='')check=false
    if(this.newcomer.matkhau==null||this.newcomer.matkhau.trim()=='')check=false
    if(!check){
      alert('Bạn phải hoàn thành các mục bắt buộc...')
      return
    }
    this.newcomer.type=0
    if(this.newcomer.manhansu==null||this.newcomer.manhansu=="")this.newcomer.manhansu=this.newcomer.cmtnd_so
    let data= await this.rest.PostDataToAPI<result<MKV9999>>(this.newcomer,'Account/add').toPromise();
    if(data.code=="OK"){
      alert('Đăng ký thành công, xin mời bạn quay lại trang đăng nhập')
      this.router.navigate(['Login'],{queryParams:{ID:data.data.cmtnd_so}})
    }else{
      alert(data.mess)
    }
  }
  consolelog(){
    console.log('data')
  }
  getngaysinh($event){
    this.newcomer.ngaysinh=$event
  }
  getngaycap($event){
    this.newcomer.cmtnd_ngayhethan=$event
  }
}
