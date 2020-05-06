import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { KTX0001 } from 'src/app/QLKTX/models/KTX0001';
declare var $:any

@Component({
  selector: 'app-qlktx-upload-phong',
  templateUrl: './qlktx-upload-phong.component.html',
  styleUrls: ['./qlktx-upload-phong.component.css']
})
export class QlktxUploadPhongComponent implements OnInit {
public listKTX0001
  constructor(public rest:RESTService) { }
  ngOnInit() {
  }
  getdata($event){
    this.listKTX0001=$event
    //console.log($event)
  }
 async edit(element){
    if( $('#edit'+element.PHONG).find('i').hasClass('fa-edit')){
      $('#tr'+element.PHONG).find('input:text,select').removeClass('none').removeAttr('disabled') 
      $('#edit'+element.PHONG).find('i').removeClass('fa-edit').addClass('fa-save')
    }else{
      $('#tr'+element.PHONG).find('input:text,select').addClass('none').attr('disabled',true)
      $('#edit'+element.PHONG).find('i').removeClass('fa-save').addClass('fa-edit')
      
    }
  }
  
 async save(){
    let listToa=[]
    this.listKTX0001.forEach(val=>{
      if(listToa.filter(c=>{return c['ten']===val.TOA}).length==0)
      listToa.push({khu:val.TOA=="A"?"N":"F",ten:val.TOA,makhoa:val.MAKHOA,ghichu:"Tòa mới",trangthai:true,type:2})
    })
    //console.log(listToa)
    let data=await this.rest.PostDataToAPI<result< KTX0001>[]>(listToa,"KTX0001/add").toPromise()
    data.filter(c=>{return c.code==="OK"}).forEach(async val=>{
      let listTang=[]
      this.listKTX0001.filter(c=>{return c.TOA===val.data.ten}).forEach(kkkk=>{
        if(listTang.filter(c=>{return c['ten']===kkkk.TANG}).length==0)
        listTang.push({khu:kkkk.TOA=="A"?"N":"F",ten:kkkk.TANG,ghichu:"Tầng mới",idcha:val.data.KTX0001_ID,trangthai:true,type:3})
      })
      //console.log(listTang)
      let datatang=await this.rest.PostDataToAPI<result< KTX0001>[]>(listTang,"KTX0001/add").toPromise()

        datatang.filter(c=>{return c.code==="OK"}).forEach(async val2=>{
          let listphong=[]
          this.listKTX0001.filter(c=>{return c.TOA===val.data.ten}).filter(c=>{return c.TANG===val2.data.ten}).forEach(kkkk=>{
            if(listphong.filter(c=>{return c['ten']===kkkk.PHONG}).length==0)
            listphong.push({khu:kkkk.TOA=="A"?"N":"F",ten:kkkk.PHONG,slot:kkkk.SLOT,capbac:kkkk.CAPBAC,ghichu:"Phòng mới",makhoa:kkkk.MAKHOA,idcha:val2.data.KTX0001_ID,trangthai:true,type:4})
          })
          //console.log(listphong)
          let dataphong=await this.rest.PostDataToAPI<result< KTX0001>[]>(listphong,"KTX0001/add").toPromise()
          //console.log(dataphong)
        })

    })
    // listToa.forEach(async val=>{
    //   if(val!=null){
    //     let data=await this.rest.PostDataToAPI<result< KTX0001>[]>({},"KTX0001/add").toPromise()
    //     data.forEach(cal=>{
    //       if(cal.code=="OK"){
    //         this.listKTX0001.filter(c=>{return c.TOA===cal.data.ten}).map(x=>{

    //         })
    //       }
    //     })
    //   }
    // })
    
    let listTang=[]
    listToa.forEach(val=>{listTang.push()})
    
  }
}
