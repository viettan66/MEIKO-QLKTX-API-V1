import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { Router } from '@angular/router';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router,public rest:RESTService) { }
public user:MKV9999
  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('KTX_User'))
  }
  logout(){
    localStorage.removeItem('KTX_User')
    window.location.assign('');
  }
  search($event){
    this.router.navigate(['QLKTX/QLTCTK'], { queryParams: { key: "test" } });
  }
  public userclickc:boolean=false
  userclick(){
this.userclickc=!this.userclickc
  }
  changepass(){
    $('#changepassworld').modal()
  }
  savechange(){
    this.user=JSON.parse(localStorage.getItem('KTX_User'))
    let oldpass:string= $('#oldpass').val()
    let newpass:string= $('#newpass').val()
    let confirmnewpass:string= $('#confirmnewpass').val()
    if(newpass!=confirmnewpass){
      alert('Bạn nhập mật khẩu mới không khớp.')
      $('#newpass').val("")
      $('#confirmnewpass').val("")
      return false
    }
    else if(newpass.trim()==""){
      alert('Bạn chưa nhập mật khẩu mới.')
      return false
    }
    else if(oldpass!=this.user.matkhau){
      alert('Mật khẩu cũ chưa chính xác.')
      return false
    }
    this.user.matkhau=newpass
    this.rest.PutDataToAPI<result<MKV9999>>(this.user,'Account/Update').subscribe(data=>{
      if(data.code=='OK'){
        localStorage.removeItem('KTX_User')
        localStorage.setItem('KTX_User',JSON.stringify(data.data))
        alert("Bạn đã đổi mật khẩu thành công.")
        $('#changepassworld').modal('hide')
      }else alert(data.mess)
    })
  }
}
