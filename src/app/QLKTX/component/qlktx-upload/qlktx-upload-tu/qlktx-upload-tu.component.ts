import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0003 } from 'src/app/QLKTX/models/KTX0003';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-qlktx-upload-tu',
  templateUrl: './qlktx-upload-tu.component.html',
  styleUrls: ['./qlktx-upload-tu.component.css']
})
export class QlktxUploadTuComponent implements OnInit {

  public listKTX0003
  constructor(public rest:RESTService) { }
  ngOnInit() {
  }
  getdata($event){
    $event.map(x=>{x.trangthai=false;x.ghichu=x.PHONG;x.MaKhoa=x.MATU,x.SoTu=x.SOTU})
    this.listKTX0003=$event
    //////////////console.log($event)
  }
 async edit(element){
    if( $('#edit'+element.MATU).find('i').hasClass('fa-edit')){
      $('#tr'+element.MATU).find('input:text,select').removeClass('none').removeAttr('disabled') 
      $('#edit'+element.MATU).find('i').removeClass('fa-edit').addClass('fa-save')
    }else{
      $('#tr'+element.MATU).find('input:text,select').addClass('none').attr('disabled',true)
      $('#edit'+element.MATU).find('i').removeClass('fa-save').addClass('fa-edit')
      
    }
  }
  
 async save(){
  let data=await this.rest.PostDataToAPI<result< KTX0003>[]>(this.listKTX0003,"KTX0003/Add").toPromise()
    //////////////console.log(data)
  //   let data=await this.rest.PostDataToAPI<result< KTX0003>[]>(listPhong,"KTX0003/add").toPromise()
  //   data.filter(c=>{return c.code==="OK"}).forEach(async val=>{
  //     let listTang=[]
  //     this.listKTX0003.filter(c=>{return c.TOA===val.data.ten}).forEach(kkkk=>{
  //       if(listTang.filter(c=>{return c['ten']===kkkk.TANG}).length==0)
  //       listTang.push({khu:kkkk.TOA=="A"?"N":"F",ten:kkkk.TANG,ghichu:"Tầng mới",idcha:val.data.KTX0003_ID,trangthai:true,type:3})
  //     })
  //     //////////////console.log(listTang)
  //   })
    
  }
}
