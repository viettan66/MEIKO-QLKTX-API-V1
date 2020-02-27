import { Component, OnInit } from '@angular/core';
import { MKV9982 } from 'src/app/Models/MKV9982';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-menuaccount',
  templateUrl: './menuaccount.component.html',
  styleUrls: ['./menuaccount.component.css']
})
export class MenuaccountComponent implements OnInit {
  public title=''
  public listapp:MKV9982[]=[]
  public listmenu:MKV9982[]=[]
  constructor(public rest:RESTService,public cookie:CookieService) { }

  ngOnInit() {
    let that=this
    $(document).ready(function(){
    that.rest.GetDataFromAPI<MKV9982[]>('Category/GetApps').subscribe(data=>{
      that.listapp=data
    })
    ///////////////////////////
    $('#listapp').on('click','li',function(){
      $('#listapp>li').removeClass('active')
      $(this).addClass('active')
      let id=$(this).attr('id')
      idapp=$(this).attr('id')
      tenapp=$(this).text()
      that.rest.GetDataFromAPI<MKV9982[]>('Category/GetApps/Menus/'+id).subscribe(data=>{
        that.listmenu=data
      })
    })

    var mkv82:MKV9982=new MKV9982()
    var tenapp=null
    var idapp=null
    //////////////////////////
    $('.addapp').click(function(){
      that.title="THÊM ỨNG DỤNG"
      mkv82.CAPMENU=0
      $('#addMKV9982').modal()
    })
    //////////////////////////
    $('.addmenu').click(function(){
      if(tenapp==null){
        alert('Chọn ứng dụng cần thêm menu con trước')
        return false
      }
      that.title="THÊM MENU CON CHO ỨNG DỤNG "+tenapp
      mkv82.CAPMENU=1
      mkv82.IDCHA=idapp
      $('#addMKV9982').modal()
    })
    //////////////////////////
    $('#savemodal').click(function(){
      mkv82.GHICHU=$('#ghichu').val()
      mkv82.IMAGE=''
      mkv82.LINKMENU=$('#link').val()
      mkv82.TENMENU=$('#ten').val()
      mkv82.TINHTRANG=true
      that.rest.PostDataToAPI<result<MKV9982>>(mkv82,'Category/GetApps/add').subscribe(data=>{
        if(data.code=="OK"){
          if(data.data.CAPMENU=0)
          that.listapp.push(data.data)
          if(data.data.CAPMENU=1)
          that.listmenu.push(data.data)
        }
        else if(data.code=="ERR")alert(data.mess)
      })
    })
  })
  }
  // onFileChange(event) {
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       $('#avatar').setValue({
  //         filename: file.name,
  //         filetype: file.type,
  //         value: reader.result.toString().split(',')[1]
  //       })
  //     };
  //   }
  // }
}
