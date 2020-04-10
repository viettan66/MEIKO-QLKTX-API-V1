import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { MKV8001 } from 'src/app/Models/MKV8001';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.component.html',
  styleUrls: ['./quenmatkhau.component.css']
})
export class QuenmatkhauComponent implements OnInit {

  constructor(public route:Router,public rest:RESTService) { }
public taikhoan
public sdt
public cmnd
  ngOnInit() {
  }
login(){
  this.route.navigate(['Login'])
}
async send(){
let data=await this.rest.PostDataToAPI<result<MKV8001>>({taikhoan:this.taikhoan,sdt:this.sdt,cmnd:this.cmnd,trangthai:false},'MKV8001/add').toPromise()
if(data.code=="OK")alert('Đã gửi yêu cầu khôi phục mật khẩu, mật khẩu mới sẽ sớm gửi vào sdt của bạn.Xin vui lòng không gửi lại yêu cầu trong 24h.')
else alert(data.mess)
}
}
