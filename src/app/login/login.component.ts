import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { MKV9999 } from '../Models/MKV9999';
import { CookieService } from 'ngx-cookie-service';
import { result } from '../QLKTX/models/result';
import { MKV9991 } from '../Models/MKV9991';
import { Router, ActivatedRoute } from '@angular/router';
import { MKV9981 } from '../Models/MKV9981';

declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public rest: RESTService, public cookie: CookieService,private router: Router,public active:ActivatedRoute) { }

  ngOnInit() {
    this.active.queryParams.subscribe(vla=>{
      $('#ID').val(vla['ID'])
    })
    
    let that = this
    $(document).ready(function () {
      function  LOGIN(data: MKV9999, o?: boolean) {
        if (o) {
          that.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + data.phong_id).subscribe(dat => {
            data.bophan = dat
            if(data.ban_id==null)data.ban_id='sdsd'
            that.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + data.ban_id).subscribe(dat2 => {
              //console.log(dat2)
              if(dat2!=null)
              that.rest.PostDataToAPI({phong_id:dat2.id,bophan_ma:dat2.bophan_ma,bophan_ten:dat2.bophan_ten,idcha:dat2.idcha},'MKV9998/add').subscribe(dataa=>{
                //console.log(dataa)
              })
              data.ban = dat2
              localStorage.setItem('KTX_User', JSON.stringify(data)); 
              that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+data.MKV9999_ID).subscribe(data=>{
                localStorage.setItem('KTX_Menu', JSON.stringify(data)); 
                that.router.navigate(['']).finally (() => {
                  window.location.reload();
                });
                //window.location.reload()
              })
            })
          })
        } else {
          localStorage.setItem('KTX_User', JSON.stringify(data));
              that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+data.MKV9999_ID).subscribe(data=>{
                localStorage.setItem('KTX_Menu', JSON.stringify(data)); 
                that.router.navigate([' ']).finally(() => {
                  window.location.reload();
                });
                //window.location.reload()
              })
        }


      }
      $('#LOGIN').click(function () {
        that.rest.PostDataToAPI<MKV9999>({ ID: $('#ID').val(), pass: $('#PASS').val() }, 'Account/Check').subscribe(data => {
          if (data == null) {
            //alert('Sai tên đăng nhập hoặc mật khẩu...')
            //$(':text').val('')
            that.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1').subscribe(data => {
              let checkf=true
              data.forEach(val => {
                if (val.manhansu + '' == $('#ID').val()) {
                  checkf=false
                  //console.log(val)
                  val.matkhau = $('#PASS').val()
                  that.rest.PostDataToAPI<result<MKV9999>>(val, 'Account/add').subscribe(data1 => {
                    if (data1.code == "OK") {
                      //alert('Tài khoản của bạn đã được tạo')
                      LOGIN(data1.data, true)
                    } else {
                      alert(data1.mess)
                    }
                  })
                }
              })
              if(checkf){
                that.router.navigate(['NewComer'],{ queryParams: { cmtnd_so: $('#ID').val() } })
              }
              
            })
          }
          else {
            if( data.matkhau == $('#PASS').val())
            LOGIN(data, false)
            else{
              alert('Sai mật khẩu')
            }

          }
        })
      })
    })
  }
forgot(){
  this.router.navigate(['ForgotPassworld'])
}
}
