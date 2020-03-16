import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0020 } from '../../models/KTX0020';
import { result } from '../../models/result';
declare var $:any

@Component({
  selector: 'app-qld',
  templateUrl: './qld.component.html',
  styleUrls: ['./qld.component.css']
})
export class QldComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
  public listdon:KTX0020[]=[]
  public ktx20temp:KTX0020
  public listdontemp:KTX0020[]=[]
  public form=''

  ngOnInit() {  let that=this

    $(document).ready(function(){
      
      
      $('thead>tr>th>input:checkbox').change(function(){
        console.log($(this).is(':checked'))
        $(this).parent().parent().parent().parent().find('tbody').find('input:checkbox').click()
      })
      ////
      $('.tablelistdon').on('click','tbody>tr>td>input:checkbox',function(Event){
        Event.stopPropagation()
        if($(this).attr('checked')){
            $(this).parent().parent().addClass('active')
        }else{
          $(this).parent().parent().removeClass('active')
        }
      })
      function showdon(){
        that.rest.GetDataFromAPI<KTX0020[]>('KTX0020/Getall').subscribe(data=>{
          that.listdon=data
          that.listdontemp=data
          console.log(data)
        })
      }
      showdon()
      ////////////////
      $('.tablelistdon').on('click','tbody>tr',function(){
        $(this).find('input:checkbox').click()
      })
      ////////////////
      $('.card').on('change','#filter',function(){
        let check=$(this).val()
        if(check!='all'){
          that.listdon=that.listdontemp.filter(c=>{
            return c.trangthai===(check =="true") 
          })
        }else{
          that.listdon=that.listdontemp
        }
      })
      ////////////////
      $('.card').on('click','#agree',function(){
        that.rest.PostDataToAPI<result<KTX0020>[]>(that.listdon.filter(c=>{return c.check===true}),'KTX0020/approval').subscribe(data=>{
          console.log(data)
          data.forEach(val=>{
            if(val.code=="OK"){
              that.listdon.forEach((c,index)=>{
                if(c.KTX0020_ID==val.data.KTX0020_ID){
                  that.listdon[index]=val.data
                }
              })
            }
          })
        })
      })
      ////////////////
      
      $('.tablelistdon').on('click','.showdetaildon',function(){
        let id=$(this).attr('name')
        console.log(id)
        that.ktx20temp=that.listdon.filter(c=>{return c.KTX0020_ID===Number(id)})[0]
        console.log(that.ktx20temp)
        that.form='formdangkyokytucxa';
      })
      ////////////////
      $('.card').on('click','#disagree',function(){
        console.log(that.listdon)
      })
    })
  }

}
