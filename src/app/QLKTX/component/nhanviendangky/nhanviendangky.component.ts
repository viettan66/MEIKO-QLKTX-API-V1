import { Component, OnInit } from '@angular/core';
import { KTX0010 } from '../../models/KTX0010';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0020 } from '../../models/KTX0020';
declare var $:any

@Component({
  selector: 'app-nhanviendangky',
  templateUrl: './nhanviendangky.component.html',
  styleUrls: ['./nhanviendangky.component.css']
})
export class NhanviendangkyComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
public listdon:KTX0020[]=[]
public form='showdon'
public ktx20temp: KTX0020;
  ngOnInit() {
    let that=this

    $(document).ready(function(){
      ////
      function showdon(){
        that.rest.GetDataFromAPI<KTX0020[]>('KTX0020/Getall').subscribe(data=>{
          data.forEach(val=>{
            if(val.MKV9999_ID==Number.parseInt(that.cookie.get('MKV9999_ID')))
          that.listdon.push(val)
          })
        })
      }
      showdon()
      //////////////formdangkyokytucxa////////
        $('.card').on('click','.adddon',function(){
          $('#selecttemplateform').modal()
        })
      //////////////formdangkyokytucxa////////
        $('.card').on('click','.removeadddon',function(){
          that.form='showdon'
          that.ktx20temp=null
          times(false)
        })
      //////////////formdangkyokytucxa////////
        $('.card').on('click','.editdon',function(){
          console.log('fffffffff')
          that.listdon.forEach(val=>{
            if(val.KTX0020_ID==$(this).attr('name')){
              that.ktx20temp=val
              that.form='formdangkyokytucxa'
              times(true)
            }
          })
        })
      //////////////////////
        $('#adddonxinokytucxa').click(function(){
          $('#selecttemplateform').modal('hide')
          that.form='formdangkyokytucxa'
          times(true)
        })
      ////////////////////
      function times(ck){
        if(ck){
          $('.adddon').addClass('removeadddon')
          $('.removeadddon').removeClass('adddon')
          $('.removeadddon').find('.fa-plus').removeClass('fa-plus').addClass('fa-times')
        }else{
          $('.removeadddon').addClass('adddon')
          $('.adddon').removeClass('removeadddon')
          $('.adddon').find('.fa-times').removeClass('fa-times').addClass('fa-plus')
        }
      }
    })
  }

}
