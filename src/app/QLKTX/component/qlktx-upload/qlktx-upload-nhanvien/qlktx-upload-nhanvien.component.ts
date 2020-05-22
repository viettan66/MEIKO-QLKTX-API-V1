

import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0002 } from 'src/app/QLKTX/models/KTX0002';
import { result } from 'src/app/QLKTX/models/result';
import * as Global from 'src/app/Service/global.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { async } from '@angular/core/testing';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
import { MKV9991 } from 'src/app/Models/MKV9991';
declare var $:any

@Component({
  selector: 'app-qlktx-upload-nhanvien',
  templateUrl: './qlktx-upload-nhanvien.component.html',
  styleUrls: ['./qlktx-upload-nhanvien.component.css']
})
export class QlktxUploadNhanvienComponent implements OnInit {
  public listKTX0002
  constructor(public rest:RESTService) { }
  public listMKV9999:MKV9999[]=[]
  public pending=true
 async ngOnInit() {
  this.listMKV9999=await this.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1').toPromise()

  this.pending=false
  }
  getpending($event){
    this.pending=$event
  }
 async getdata($event){
   this.pending=true
   Promise.all( $event.map(async x=>{
     x.manhansu=(x.manhansu+'')
     x.phong=(x.phong+"").replace(/\s/g,'').trim()
     if((x.manhansu+'').length<6){
       x.manhansu='00000000'.substring(0,6-x.manhansu.length)+x.manhansu
       ////////////console.log(x)
     }
     
      let l=await this.listMKV9999.filter( c=>{return c.manhansu===x.manhansu})
      ////////////console.log(l)
      ////////////console.log(x)
      if(l.length!=0){
        l[0].matkhau="123456"
        let lkk=  await this.rest.PostDataToAPI<result<MKV9999>>(l[0],'Account/add').toPromise()
        if(lkk.code=="OK"||lkk.code=="exist")
        l[0]=lkk.data
        x.MKV9999=l[0]
         x.MKV9999_ID=l[0].MKV9999_ID
         x.okitucxa=true
        if(x.ngayvao.substring(x.ngayvao.lastIndexOf('/')+1).length==4)
        x.ngayvao=x.ngayvao.split('/').reverse().join("/")
         x.ngayokitucxa=x.ngayvao
         x.lydodangkyoktx="Thêm từ file excel"
         x.nguyenvongophongso=x.phong
         x.didong=l[0].dienthoai_didong
         x.bqlktx=true
         x.truongphongGA=true
         if(l[0].capbac!=null){
          let capbac=Number(l[0].capbac.replace(Global.regex_a_z,''))
          x.capbac=capbac<4?1:(capbac<6?2:(capbac<8?3:4))
        }   
        x.hotenkhaisinh=l[0].hodem+' '+l[0].ten
        x.gioitinh=l[0].gioitinh
        x.ngaysinh=l[0].ngaysinh
        x.noisinh=l[0].noisinh
        x.quequan=l[0].quequan
        x.cmtnd_so=l[0].cmtnd_so;
        x.cmtnd_ngaycap=l[0].cmtnd_ngayhethan;
        x.cmtnd_noicap=l[0].cmtnd_noicap;
         x.ngaycohieuluc=x.ngayvao
         x.bengiao=true
         x.bennhan=true
        x.noithuongtru=l[0].diachithuongtru
        x.choohiennay='KTX công ty MEIKO ELECTRONICS, khu CN Thạch Thất, Quốc Oai, Hà Nội.'
        x.ngaytaodon=x.ngayvao
        x.ngayduyetdon=x.ngayvao
        x.sokhoatu=x.tu==null?'':x.tu
        x.ghichu=x.giuong==null?'':x.giuong
        x.ghichu2=x.phong==null?'':x.phong
         x.trangthai=true
      }
    })).then(k=>{

    ////////////console.log($event)
    
   this.pending=false
    this.listKTX0002=$event
    })
  }
 async edit(element){
    if( $('#edit'+element.manhansu).find('i').hasClass('fa-edit')){
      $('#tr'+element.manhansu).find('input:text,select').removeClass('none').removeAttr('disabled') 
      $('#edit'+element.manhansu).find('i').removeClass('fa-edit').addClass('fa-save')
    }else{
      $('#tr'+element.manhansu).find('input:text,select').addClass('none').attr('disabled',true)
      $('#edit'+element.manhansu).find('i').removeClass('fa-save').addClass('fa-edit')
      
    }
  }
  
 async save(){
  this.getpending(true)
  let data=await this.rest.PostDataToAPI<result< KTX0020>[]>(this.listKTX0002.filter(c=>{return c.MKV9999!=null}),"KTX0020/upload").toPromise()
   Promise.all( data.map( async val=>{
      this.listKTX0002.filter(c=>{return c.manhansu===val.data.MKV9999.manhansu}).map(x=>{this.listKTX0002.splice(this.listKTX0002.indexOf(x),1)})
  })) .then(fj=>{

   this.pending=false
    ////////////console.log(data)
  })
    
  }
  getdate(element:string){
   if(element.substring(element.lastIndexOf('/')+1).length==4){
     let ngay=element.substring(0,element.indexOf('/'))
     let thang=element.substring(element.indexOf('/')+1,element.lastIndexOf('/'))
     let nam=element.substring(element.lastIndexOf('/')+1)
  
     return nam+'-'+thang+'-'+ngay
   }
return element==null?'':new Date(element)
  }
  sync(){ 
    this.rest.ExportTOExcelFromJson(this.listMKV9999.filter(c=>{return c.phong_id!=null&&c.manhansu!=null}),'listAcc') 
    this.listMKV9999.filter(c=>{return c.phong_id!=null&&c.manhansu!=null}).forEach(async a=>{
    let dat2=await this.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + a.phong_id).toPromise()
    await this.rest.PostDataToAPI({phong_id:dat2.id,bophan_ma:dat2.bophan_ma,bophan_ten:dat2.bophan_ten,idcha:dat2.idcha},'MKV9998/add').toPromise()
    let dat3=await this.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + a.ban_id).toPromise()
    await this.rest.PostDataToAPI({phong_id:dat3.id,bophan_ma:dat3.bophan_ma,bophan_ten:dat3.bophan_ten,idcha:dat3.idcha},'MKV9998/add').toPromise()
    a.matkhau='123456'
    let lkk=  await this.rest.PostDataToAPI<result<MKV9999>>(a,'Account/add').toPromise()
    //if(lkk.code==="OK")////////console.log(lkk)
  })
}
}
