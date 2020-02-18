import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { MKV9999 } from '../Models/MKV9999';
import { CookieService } from 'ngx-cookie-service';

declare var $:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }

  ngOnInit() {
    let that=this
    $(document).ready(function(){
      $('#LOGIN').click(function(){
        that.rest.PostDataToAPI<MKV9999>({ID:$('#ID').val(),pass:$('#PASS').val()},'Account/Check').subscribe(data=>{
            if(data==null){
              alert('Sai tên đăng nhập hoặc mật khẩu...')
              $(':text').val('')
            }
            else{
              console.log(data)
              that.cookie.set('MKV9999_ID',data.MKV9999_ID+'')
              that.cookie.set('manhansu',data.manhansu+'')
              that.cookie.set('id',data.id+'')
              that.cookie.set('hodem',data.hodem+'')
              that.cookie.set('ten',data.ten+'')
              that.cookie.set('phong_id',data.phong_id+'')
              that.cookie.set('id',data.id+'')
              that.cookie.set('dienthoai_didong',data.dienthoai_didong+'')
              that.cookie.set('dienthoai_nharieng',data.dienthoai_nharieng+'')
              that.cookie.set('email',data.email+'')
              that.cookie.set('tinhtrangnhansu',data.tinhtrangnhansu+'')
              window.location.assign('')
            }
        })
      })
    })
  }

}
