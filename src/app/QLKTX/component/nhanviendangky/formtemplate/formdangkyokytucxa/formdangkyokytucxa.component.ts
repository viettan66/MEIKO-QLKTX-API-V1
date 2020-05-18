import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RESTService } from 'src/app/Service/rest.service';
import * as Global from 'src/app/Service/global.service';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
import { formatDate } from '@angular/common';
import { KTX0021 } from 'src/app/QLKTX/models/KTX0021';
import { result } from 'src/app/QLKTX/models/result';
import {  } from 'events';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { KTX0031 } from 'src/app/QLKTX/models/KTX0031';
import { KTX0022 } from 'src/app/QLKTX/models/KTX0022';
declare var $: any

@Component({
  selector: 'app-formdangkyokytucxa',
  templateUrl: './formdangkyokytucxa.component.html',
  styleUrls: ['./formdangkyokytucxa.component.css']
})
export class FormdangkyokytucxaComponent implements OnInit {
  @Input() check: boolean;
  @Input() ktx20temp: KTX0020;
  @Output('ktx20out') ktx20out=new EventEmitter<KTX0020>()
  constructor(public rest: RESTService, public cookie: CookieService) { }
  public ktx10: KTX0031[] = []
  public ktx0020:KTX0020=new KTX0020()
  public date=new Date
  ngOnInit() {
    if(!this.check){
      $('#savedon').css('display','none')
      $('.none,.formcontrol').attr('readonly',true).addClass('none')
      $(".addroww").css('display','none')
      $(".deleteroww").css('display','none')
    }
    let that = this
    let user:MKV9999= JSON.parse(localStorage.getItem('KTX_User'))
    if(this.ktx20temp!=null){
      //////////console.log(this.ktx20temp)
      that.ktx0020=this.ktx20temp
      this.date=new Date(that.ktx20temp.ngaytaodon) 
    }else{
      //////////console.log('truyền vào null rồi')
      //////////console.log(user)
    that.ktx0020.KTX0021.push(new KTX0021)
    that.ktx0020.KTX0022.push(new KTX0022)
    that.ktx0020.MKV9999=user
    that.ktx0020.hotenkhaisinh=user.hodem+' '+user.ten
    that.ktx0020.MKV9999_ID=user.MKV9999_ID
    that.ktx0020.gioitinh= user.gioitinh
    that.ktx0020.ngaysinh= formatDate(user.ngaysinh,'yyyy-MM-dd','en-US') 
    that.ktx0020.quequan= user.quequan
    that.ktx0020.cmtnd_so= user.cmtnd_so==""?user.hochieu_so:user.cmtnd_so
    that.ktx0020.cmtnd_ngaycap= formatDate(user.cmtnd_ngayhethan,'yyyy-MM-dd','en-US') 
    that.ktx0020.cmtnd_noicap= user.cmtnd_noicap
    that.ktx0020.noithuongtru= user.diachithuongtru
    that.ktx0020.choohiennay= user.diachitamtru
    that.ktx0020.noisinh= user.noisinh
    if(user.capbac!=null){
      let capbac=Number(user.capbac.replace(Global.regex_a_z,''))
      that.ktx0020.capbac=capbac<4?1:(capbac<6?2:(capbac<8?3:4))
    }
  }
      if(that.ktx0020.capbac!=null){
        $('input[name='+that.ktx0020.capbac+']').prop('checked',true)
        $('.fff').attr('disabled',true)
      }else{

      }
      function showdodung() {
        that.rest.GetDataFromAPI<KTX0031[]>('KTX0031/Get/'+that.ktx0020.MKV9999_ID).subscribe(data => {
          that.ktx10 = data
          //////////console.log(data)
        })
      }
      /////////////
      showdodung()
      ////////////////
      $('.table').on('change','.endtexaddrow',function(){
          // if($(this).parent().parent().index()==($(this).parent().parent().parent().find('tr').length-1)){
          //   that.ktx0020.KTX0021.push(new KTX0021())
          // }
        })
      ////////////////
      $('.addroww').click(function(){
        if(that.ktx0020.KTX0021==null)that.ktx0020.KTX0021=[]
        that.ktx0020.KTX0021.push(new KTX0021())
      })
      ////////////////
      $('.fff').change(function(){
       $('.fff').removeClass('clicked')
       $(this).addClass('clicked')
       $('.fff:not(.clicked)').prop('checked',false)
       that.ktx0020.capbac=$(this).attr('name')
      })
      
      ////////////////
      $('.table').on('click','.deleteroww',function(){
        let i=$(this).parent().find('input[name=ID]').val()
        that.ktx0020.KTX0021.splice(i,1);
      })
      ////////////////
      $('#savedon').click(function(){
        if(that.ktx0020.KTX0020_ID==null){
          that.rest.PostDataToAPI<result<KTX0020>>(that.ktx0020,'KTX0020/add').subscribe(data=>{
            if(data.code=="OK"){
              //////////console.log(data)
              that.ktx20out.emit(data.data)
            }
            else{
              alert(data.mess)
            }
          })
        }else{ 
          that.rest.PutDataToAPI<result<KTX0020>>(that.ktx0020,'KTX0020/edit').subscribe(data=>{
            if(data.code=="OK"){
              that.ktx20out.emit(data.data)
            }
            else{
              alert(data.mess)
            }
        })
        }
        ////////////console.log(that.ktx0020)
      })

  }
  test(formketthucj){
    window.print()
  }
  addroww(){
    this.ktx0020.KTX0022.push(new KTX0022())
  }
  removeitem(element){
    this.ktx0020.KTX0022.splice(this.ktx0020.KTX0022.indexOf(element),1)
  }
}
