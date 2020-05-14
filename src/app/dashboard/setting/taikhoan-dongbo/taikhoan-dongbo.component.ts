import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from 'src/app/QLKTX/models/result';

@Component({
  selector: 'app-taikhoan-dongbo',
  templateUrl: './taikhoan-dongbo.component.html',
  styleUrls: ['./taikhoan-dongbo.component.css']
})
export class TaikhoanDongboComponent implements OnInit {

  constructor(public rest:RESTService) { }
loading=true
listtaikhoan:any[]=[]
listhethong:any[]=[]
  async ngOnInit() {
    this.listtaikhoan =await this.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1' ).toPromise()
    this.listhethong =await this.rest.GetDataFromAPI<MKV9999[]>('Account/Get').toPromise()
   
    this.loading=false
  }
 async dongho(){
   this.loading=true
    let arrhethong=[...new Set(this.listhethong.map(x=>x.manhansu))]
    let arrasoft=this.listtaikhoan.filter(c=>!arrhethong.includes(c.manhansu))
    let ok=0
    let NG=0
   for(const c of arrasoft) {
      c.matkhau='123456'
      let lkk=  await this.rest.PostDataToAPI<result<MKV9999>>(c,'Account/add').toPromise()
    if(lkk.code==="OK")ok++
    if(lkk.code==="ERR")NG++
    }
  this.loading=false
  alert("Đã thêm thành công: "+ok+" tài khoản\nLỗi: "+NG+" tài khoản.")
    //this.listtaikhoan
  }
}
