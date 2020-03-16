import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0010 } from 'src/app/QLKTX/models/KTX0010';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
import { formatDate } from '@angular/common';
import { KTX0021 } from 'src/app/QLKTX/models/KTX0021';
import { result } from 'src/app/QLKTX/models/result';
import {  } from 'events';
declare var $: any

@Component({
  selector: 'app-formdangkyokytucxa',
  templateUrl: './formdangkyokytucxa.component.html',
  styleUrls: ['./formdangkyokytucxa.component.css']
})
export class FormdangkyokytucxaComponent implements OnInit {
  @Input() ktx20temp: KTX0020;
  @Output('ktx20out') ktx20out=new EventEmitter<KTX0020>()
  constructor(public rest: RESTService, public cookie: CookieService) { }
  public ktx10: KTX0010[] = []
  public ktx0020:KTX0020=new KTX0020()
  
  ngOnInit() {
    let that = this
    if(this.ktx20temp!=null){
      that.ktx0020=this.ktx20temp
    }else{
      console.log('truyền vào null rồi')
    that.ktx0020.KTX0021=[]
    this.ktx0020.hotenkhaisinh=that.cookie.get('hodem')+' '+that.cookie.get('ten')
    this.ktx0020.MKV9999_ID=Number.parseInt(that.cookie.get('MKV9999_ID')) 
    this.ktx0020.gioitinh= that.cookie.get('gioitinh')=="true"
    this.ktx0020.ngaysinh= formatDate(that.cookie.get('ngaysinh'),'yyyy-MM-dd','en-US') 
    this.ktx0020.quequan= that.cookie.get('quequan')
    this.ktx0020.cmtnd_so= that.cookie.get('cmtnd_so')==""?that.cookie.get('hochieu_so'):that.cookie.get('cmtnd_so')
    this.ktx0020.cmtnd_ngaycap= formatDate(that.cookie.get('cmtnd_ngayhethan'),'yyyy-MM-dd','en-US') 
    this.ktx0020.cmtnd_noicap= that.cookie.get('cmtnd_noicap')
    this.ktx0020.noithuongtru= that.cookie.get('diachithuongtru')
    this.ktx0020.choohiennay= that.cookie.get('diachitamtru')
    this.ktx0020.noisinh= that.cookie.get('noisinh')
  }
    $(document).ready(function () {
      function showdodung() {
        that.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getall').subscribe(data => {
          that.ktx10 = data
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
      $('.table').on('click','.deleteroww',function(){
        let i=$(this).parent().find('input[name=ID]').val()
        that.ktx0020.KTX0021.splice(i,1);
      })
      ////////////////
      $('#savedon').click(function(){
        if(that.ktx0020.KTX0020_ID==null){
          that.rest.PostDataToAPI<result<KTX0020>>(that.ktx0020,'KTX0020/add').subscribe(data=>{
            if(data.code=="OK"){
              that.ktx20out.emit(data.data)
            }
          })
        }else{ 
          that.rest.PutDataToAPI<result<KTX0020>>(that.ktx0020,'KTX0020/edit').subscribe(data=>{
            if(data.code=="OK"){
              //that.ktx20out.emit(data.data)
            }
        })
        }
        //console.log(that.ktx0020)
      })
    })

  }

}
