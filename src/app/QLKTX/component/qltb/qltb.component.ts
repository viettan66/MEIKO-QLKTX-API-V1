import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0010 } from '../../models/KTX0010';
import { result } from '../../models/result';
declare var $:any

@Component({
  selector: 'app-qltb',
  templateUrl: './qltb.component.html',
  styleUrls: ['./qltb.component.css']
})
export class QLTBComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
public ktx0010:KTX0010[]=[]
  ngOnInit() {
    let that=this
    $(document).ready(function(){
      function showdodung(){
        that.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getall').subscribe(data=>{
          that.ktx0010=data;
        })
      }
      showdodung()
    })
    ////////////////
    $('#thietlap').click(function(){
      $('#thietlapmodal').modal()
    })
    ////////////////
    $('#savedodung').click(function(){
      let temp=new KTX0010()
      let temparr:KTX0010[]=[]
      temp.ten=$('#tendodung').val()
      temp.giatien=$('#giatien').val()
      temp.ghichu=$('#ghichu').val()
      temp.loai=$('#loai').val()
      temp.trangthai=true
      temp.thutu=1
      temparr.push(temp)
      that.rest.PostDataToAPI<result<KTX0010>[]>(temparr,'KTX0010/add').subscribe(data=>{
        data.forEach(val=>{
          if(val.code=='OK'){
            that.ktx0010.push(val.data)
            $('.new').val('')
          }
          else alert(val.mess)
        })
      })
    })
    ///////////////
    var row=null
    var rowtr=null
    $('.tabledodung').on('click','.edititem',function(){
      if(row==null){
        $(this).find('.fa-edit').removeClass('fa-edit').addClass('fa-save')
      row=$(this).parent().parent().find('.none')
      rowtr=$(this).parent().parent()
      row.removeClass('none')
      row.removeAttr('disabled')
      }else{
        let temp=new KTX0010()
        temp.KTX0010_ID=rowtr.find('input:hidden').val()
        temp.ten=rowtr.find('input[name=ten]').val()
        temp.giatien=rowtr.find('input[name=giatien]').val()
        temp.ghichu=rowtr.find('input[name=ghichu]').val()
        temp.trangthai=rowtr.find('select[name=trangthai]').val()
        temp.thutu=1
        temp.loai=rowtr.find('select[name=loai]').val()
        that.rest.PutDataToAPI<result<KTX0010>>(temp,'KTX0010/edit').subscribe(val=>{
            if(val.code=='OK'){
              $(this).find('.fa-save').removeClass('fa-save').addClass('fa-edit')
              row.addClass('none')
              row.attr('disabled',true)
              row=null
              console.log('d')
            }
            else alert(val.mess)
        })
      }
    })
  }

}
