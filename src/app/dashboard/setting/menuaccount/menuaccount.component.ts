import { Component, OnInit } from '@angular/core';
import { MKV9981 } from 'src/app/Models/MKV9981';
import { MKV9980 } from 'src/app/Models/MKV9980';
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
  public listper:MKV9980[]=[]
  public listaction:MKV9981[]=[]
  constructor(public rest:RESTService,public cookie:CookieService) { }

  ngOnInit() {
    let that=this
    $(document).ready(function(){

    that.rest.GetDataFromAPI<MKV9980[]>('Permistion/GetAll').subscribe(data=>{
      that.listper=data
    })
    ///////////////////////////
    $('#listper').on('click','li',function(){
      $('#listper>li').removeClass('active')
      $(this).addClass('active')
      let id=$(this).attr('id')
      
      that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAll/'+id).subscribe(data=>{
        that.listaction=data
      })
    })

    
    let isadd=false
    //////////////////////////
    $('.addapp').click(function(){
      that.title="THÊM QUYỀN"
      isadd=true;
        $('.linkabc').css('display','none')
        $('#CAP').css('display','none')
      $('#addMKV9982').modal()
    })
    //////////////////////////
    $('.addmenu').click(function(){
      var kk=$('#listper').find('.active')
      if(kk.length==0){
        alert('Chọn ứng dụng cần thêm menu con trước')
        return false
      }
      isadd=false;
      that.title="THÊM HÀNH ĐỘNG CHO QUYỀN "+kk.text()
    
      $('.linkabc').css('display','unset')
      $('#CAP').css('display','unset')
      $('#addMKV9982').modal()
    })

    ////////////////////////
    $('#savemodal').click(function(){
      if(isadd==true){
        var mkv80:MKV9980=new MKV9980()
        mkv80.TENQUYEN=$('#ten').val()
        mkv80.TINHTRANG==true
        mkv80.GHICHU=$('#ghichu').val()
        that.rest.PostDataToAPI<result<MKV9980>>(mkv80,'Permistion/AddPer').subscribe(data=>{
          if(data.code=="OK"){
            that.listper.push(data.data)
          }
          else if(data.code=="ERR")alert(data.mess)
        })
      }
      else{

        var mkv81:MKV9981=new MKV9981() 
        mkv81.TENHANHDONG=$('#ten').val()
        mkv81.MKV9980_ID=$('#listper').find('.active').attr('id')
        mkv81.TINHTRANG=true
        mkv81.LINKMENU=$('#link').val()
        mkv81.CAPMENU=$('#CAP').val()
        mkv81.GHICHU=$('#ghichu').val()
        that.rest.PostDataToAPI<result<MKV9981>>(mkv81,'Permistion/AddAction').subscribe(data=>{
          if(data.code=="OK"){
            that.listaction.push(data.data)
          }
          else if(data.code=="ERR")alert(data.mess)
        })
      }
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
