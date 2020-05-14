
  import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0002 } from 'src/app/QLKTX/models/KTX0002';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-qlktx-upload-giuong',
  templateUrl: './qlktx-upload-giuong.component.html',
  styleUrls: ['./qlktx-upload-giuong.component.css']
})

export class QlktxUploadGiuongComponent implements OnInit {

  public listKTX0002
  constructor(public rest:RESTService) { }
  ngOnInit() {
  }
  getdata($event){
    $event.map(x=>{
      x.PHONG=x.PHONG.replace(/\s/g,'').trim()
      if(x.ID==null||x.ID.replace(/\s/g,'').trim()=='')
      $event.splice($event.indexOf(x),1)
    })
    this.listKTX0002=$event
    //////console.log($event)
  }
 async edit(element){
    if( $('#edit'+element.MAGIUONG).find('i').hasClass('fa-edit')){
      $('#tr'+element.MAGIUONG).find('input:text,select').removeClass('none').removeAttr('disabled') 
      $('#edit'+element.MAGIUONG).find('i').removeClass('fa-edit').addClass('fa-save')
    }else{
      $('#tr'+element.MAGIUONG).find('input:text,select').addClass('none').attr('disabled',true)
      $('#edit'+element.MAGIUONG).find('i').removeClass('fa-save').addClass('fa-edit')
      
    }
  }
  
 async save(){
  let data=await this.rest.PostDataToAPI<result< KTX0002>[]>(this.listKTX0002,"KTX0002/Add").toPromise()
    //////console.log(data)
    
  }
}
