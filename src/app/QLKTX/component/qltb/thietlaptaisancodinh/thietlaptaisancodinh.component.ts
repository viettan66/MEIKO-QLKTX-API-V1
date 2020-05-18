import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { KTX0010 } from 'src/app/QLKTX/models/KTX0010';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-thietlaptaisancodinh',
  templateUrl: './thietlaptaisancodinh.component.html',
  styleUrls: ['./thietlaptaisancodinh.component.css']
})

export class ThietlaptaisancodinhComponent implements OnInit {
  constructor(public rest:RESTService,public cookie:CookieService) { }
  @Input() ktx10temp: KTX0010[] ;
  @Output() ktx10out=new EventEmitter<KTX0010>() ;
  public listtaisancodinh:KTX0010[]=[]

  ngOnInit() {
    let that=this
    $(document).ready(function(){
      ///////////////////

      $('thead>tr>td>input:checkbox').change(function(){
        //////////console.log($(this).is(':checked'))
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
    ///////////////
    var row=null
    $('.card').on('click','.edititem',function(Event){
      Event.stopPropagation()
      if(row==null){
        $('.tabledodung').find('.fa-edit').removeClass('fa-edit').addClass('fa-save')
      row=$('.tabledodung').find('.none')
      row.removeClass('none')
      row.removeAttr('disabled')
      }else{
        that.rest.PutDataToAPI<result<KTX0010>[]>(that.listtaisancodinh,'KTX0010/edit').subscribe(vals=>{
              $(this).find('.fa-save').removeClass('fa-save').addClass('fa-edit')
              row.addClass('none')
              row.attr('disabled',true)
              row=null
          vals.forEach(val=>{
            if(val.code=='OK'){
              that.ktx10out.emit(val.data)
            }
            else alert(val.mess)
          })
        })
      }
    })
      /////////////////////
      that.listtaisancodinh=that.ktx10temp.filter(c=>{return c.loai===1})
      
    })
  }

}
