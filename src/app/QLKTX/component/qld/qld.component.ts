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
  public listdontemp:KTX0020[]=[]

  ngOnInit() {  let that=this

    $(document).ready(function(){
      ////
      function showdon(){
        that.rest.GetDataFromAPI<KTX0020[]>('KTX0020/Getall').subscribe(data=>{
          that.listdon=data
          that.listdontemp=data
          console.log(data)
        })
      }
      showdon()
      ////////////////
      $('.tablelistdon').on('click','tr',function(){
        if(!$(this).hasClass('active'))
        $(this).addClass('active')
        else $(this).removeClass('active')
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
        let arr:KTX0020[]=[]
        $('.tablelistdon>tbody>tr').each(function(){
          if($(this).hasClass('active')){
            arr.push(that.listdon[$(this).find('input[name=ID]').val()])
          }
        })
        that.rest.PostDataToAPI<result<KTX0020>[]>(arr,'KTX0020/approval').subscribe(data=>{
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
    })
  }

}
