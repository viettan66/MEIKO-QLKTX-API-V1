import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { KTX0010 } from 'src/app/QLKTX/models/KTX0010';
import { result } from 'src/app/QLKTX/models/result';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0002 } from 'src/app/QLKTX/models/KTX0002';
declare var $:any

@Component({
  selector: 'app-danhmuctaisasn',
  templateUrl: './danhmuctaisasn.component.html',
  styleUrls: ['./danhmuctaisasn.component.css']
})
export class DanhmuctaisasnComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }

  @Input() ktx10temp: KTX0010[] ;
  @Output('ktx10out') ktx10out=new EventEmitter<KTX0010>() ;
  @Output('ktx10delete') ktx10delete=new EventEmitter<KTX0010>() ;
  ngOnInit() {
    let that=this
    $(document).ready(function(){
      
      $('thead>tr>td>input:checkbox').change(function(){
        ////////////console.log($(this).is(':checked'))
        $(this).parent().parent().parent().parent().find('tbody').find('input:checkbox').click()
      })
      $('.tabledodung').on('click','tbody>tr>td>input:checkbox',function(Event){
        Event.stopPropagation()
        if($(this).attr('checked')){
            $(this).parent().parent().addClass('active')
        }else{
          $(this).parent().parent().removeClass('active')
        }
      })
      $('.tabledodung').on('click','tbody>tr',function(){
        $(this).find('input:checkbox').click()
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
            that.ktx10out.emit(val.data)
            $('.new').val('')
          }
          else alert(val.mess)
        })
      })
    })
    ////////////////
    $('.deleteitem').click(function(Event){
      if(!confirm("Bạn có chắc muốn xóa dữ liệu không?"))return false
      ////////////console.log(that.ktx10temp)
      that.rest.PostDataToAPI<result<KTX0010>[]>(that.ktx10temp.filter(c=>{return c.check===true}),'KTX0010/delete').subscribe(data=>{
        data.forEach(val=>{
          if(val.code=='OK'){
            that.ktx10delete.emit(val.data)
          }
          else alert(val.mess)
        })
      })
    })
    ///////////////
    var row=null
    var rowtr=null
    $('.tabledodung').on('click','.edititem',function(Event){
      Event.stopPropagation()
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
        that.rest.PutDataToAPI<result<KTX0010>[]>([temp],'KTX0010/edit').subscribe(vals=>{
          vals.forEach(val=>{
            if(val.code=='OK'){
              $(this).find('.fa-save').removeClass('fa-save').addClass('fa-edit')
              row.addClass('none')
              row.attr('disabled',true)
              row=null
              that.ktx10out.emit(val.data)
            }
            else alert(val.mess)
          })
        })
      }
    })
    })
  }
}
