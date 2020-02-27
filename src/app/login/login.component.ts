import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { MKV9999 } from '../Models/MKV9999';
import { CookieService } from 'ngx-cookie-service';
import { result } from '../QLKTX/models/result';
import { MKV9991 } from '../Models/MKV9991';

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
              //alert('Sai tên đăng nhập hoặc mật khẩu...')
              //$(':text').val('')
              that.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1').subscribe(data=>{
                data.forEach(val=>{
                  if(val.manhansu+''==$('#ID').val()){
                        console.log(val)
                    val.matkhau='123456'
                    that.rest.PostDataToAPI<result<MKV9999>>(val,'Account/add').subscribe(data1=>{
                      if(data1!=null){
                        console.log(data1)
                      }else{
                        console.log(data1)
                      }
                    })
                  }
                })
              })
            }
            else{

              that.cookie.set('MKV9999_ID',data.MKV9999_ID+'')
              that.cookie.set("id",data.id )
              that.cookie.set("manhansu",data.manhansu )
              that.cookie.set("hodem",data.hodem )
              that.cookie.set("ten",data.ten )
              that.cookie.set("ngaysinh",data.ngaysinh+"")
              that.cookie.set("gioitinh",data.gioitinh+'')
              that.cookie.set("noisinh",data.noisinh )
              that.cookie.set("quequan",data.quequan )
              that.cookie.set("diachithuongtru",data.diachithuongtru )
              that.cookie.set("diachitamtru",data.diachitamtru )
              that.cookie.set("cmtnd_so",data.cmtnd_so )
              that.cookie.set("cmtnd_ngayhethan",data.cmtnd_ngayhethan+'' )
              that.cookie.set("cmtnd_noicap",data.cmtnd_noicap )
              that.cookie.set("hochieu_so",data.hochieu_so)
              that.cookie.set("ngayvaocongty",data.ngayvaocongty+"")
              that.cookie.set("phong_id",data.phong_id )
              that.cookie.set("ban_id",data.ban_id )
              that.cookie.set("congdoan_id",data.congdoan_id )
              that.cookie.set("chucvu_id",data.chucvu_id )
              that.cookie.set("nganhang_stk",data.nganhang_stk )
              that.cookie.set("nganhang_id",data.nganhang_id)
              that.cookie.set("sosobaohiem",data.sosobaohiem)
              that.cookie.set("honnhantinhtrang",data.honnhantinhtrang+'' )
              that.cookie.set("datnuoc_id",data.datnuoc_id )
              that.cookie.set("phuongxa",data.phuongxa )
              that.cookie.set("suckhoetinhtrang",data.suckhoetinhtrang )
              that.cookie.set("dienthoai_nharieng",data.dienthoai_nharieng )
              that.cookie.set("dienthoai_didong",data.dienthoai_didong )
              that.cookie.set("email",data.email )
              that.cookie.set("tinhtrangnhansu",data.tinhtrangnhansu+'' )
              that.cookie.set("thutu",data.thutu+'' )
              that.cookie.set("chucvu",data.chucvu )
              that.cookie.set("capbac",data.capbac )
              that.cookie.set("thetu_id",data.thetu_id )

              that.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/'+data.phong_id).subscribe(dat=>{
                that.cookie.set("bpid",dat.id);
                that.cookie.set("bpbophan_ma",dat.bophan_ma)
                that.cookie.set("bpbophan_ten",dat.bophan_ten )
                that.cookie.set("bpbophan_dienthoai",dat.bophan_dienthoai )
                that.cookie.set("bpbophan_diachi",dat.bophan_diachi )
                that.cookie.set("bplogo",dat.logo )
                that.cookie.set("bptinhtrang",dat.tinhtrang+'')
                that.cookie.set("bpthutu",dat.thutu+'')
                that.cookie.set("bpidcha",dat.idcha )
                that.cookie.set("bpmuc",dat.muc )
                that.cookie.set("bpasoft",dat.asoft +'')
                that.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/'+data.ban_id).subscribe(dat2=>{
                  that.cookie.set("banid",dat2.id);
                  that.cookie.set("banbophan_ma",dat2.bophan_ma)
                  that.cookie.set("banbophan_ten",dat2.bophan_ten )
                  that.cookie.set("banbophan_dienthoai",dat2.bophan_dienthoai )
                  that.cookie.set("banbophan_diachi",dat2.bophan_diachi )
                  that.cookie.set("banlogo",dat2.logo )
                  that.cookie.set("bantinhtrang",dat2.tinhtrang+'')
                  that.cookie.set("banthutu",dat2.thutu+'')
                  that.cookie.set("banidcha",dat2.idcha )
                  that.cookie.set("banmuc",dat2.muc )
                  that.cookie.set("banasoft",dat2.asoft +'')
                })
              })

              window.location.assign('')


            }
        })
      })
    })
  }

}
