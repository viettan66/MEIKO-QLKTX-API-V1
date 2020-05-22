import { Component, OnInit } from '@angular/core';
import * as Global from '../../../Service/global.service';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0020 } from '../../models/KTX0020';
import { KTX0023 } from '../../models/KTX0023';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from '../../models/result';
import { KTX0031 } from '../../models/KTX0031';
declare var $:any

@Component({
  selector: 'app-nhanviendangky',
  templateUrl: './nhanviendangky.component.html',
  styleUrls: ['./nhanviendangky.component.css']
})
export class NhanviendangkyComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
public listdon:KTX0020[]=[]
public listdon2:KTX0023[]=[]
//public form='showdon'
public form='showdon'
public iI=0
public ktx20temp: KTX0020;
public ktx23temp: KTX0023;
public user:MKV9999
  ngOnInit() {
    var arr=[]
   

    this. user= JSON.parse(localStorage.getItem('KTX_User'))
    let that=this

    $(document).ready(function(){
      ////
      function showdon(){
        that.rest.PostDataToAPI<KTX0020[]>({MKV9999_ID:that.user.MKV9999_ID},'KTX0020/Getall').subscribe(data=>{
          ////////////console.log(data)
          data.forEach(val=>{
            if(val.MKV9999_ID==that.user.MKV9999_ID)
          that.listdon.push(val)
          })
        })
        that.rest.PostDataToAPI<KTX0023[]>({MKV9999_ID:that.user.MKV9999_ID},'KTX0023/Getall').subscribe(data=>{
          ////////////console.log(data)
          data.forEach(val=>{
            if(val.MKV9999_ID==that.user.MKV9999_ID)
          that.listdon2.push(val)
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
          that.times(false)
        })
      //////////////formdangkyokytucxa////////
        $('.card').on('click','.editdon',function(){
          that.listdon.forEach(val=>{
            if(val.KTX0020_ID==$(this).attr('name')){
              that.ktx20temp=val
              that.form='formdangkyokytucxa'
              that.times(true)
            }
          })
        })
      //////////////////////
        $('#adddonxinokytucxa').click(function(){
          $('#selecttemplateform').modal('hide')
          that.form='formdangkyokytucxa'
          that.times(true)
        })
      //////////////////////
        $('#ketthucluutru').click( function(){
          $('#selecttemplateform').modal('hide')
        that.showketthuc();
          
        })
    })
  }
      ////////////////////
       times(ck){
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
  /////
  getktx20(event:KTX0020){
    let l=this.listdon.filter(c=>{return c.KTX0020_ID===event.KTX0020_ID})
    if(l.length==0)
    this.listdon.push(event)
    else{
      this.listdon.splice(this.listdon.indexOf(l[0]),1)
      this.listdon.push(event)
    }
    this.form='showdon'
    this.ktx20temp=null
    //times(false)
  }
  /////
  getktx23(event:KTX0023){
    this.listdon2.push(event)
    ////////////console.log(event)
    this.form='showdon'
    this.ktx23temp=null
    //times(false)
  }
  print(){ 
    $('td').addClass('td')
    window.print() 
    $('td').addClass('td')
  }
  delete(element){   
    if(!confirm('Bạn có chắc chắn muốn xóa đơn này?'))return false
    let that=this
    this.rest.PutDataToAPI<result< KTX0020>[]>([element],'KTX0020/delete').subscribe(data=>{
    ////////////console.log(data)
    data.forEach(val=>{
      if(val.code=="OK"){
        let l=this.listdon.filter(c=>{return c.KTX0020_ID===val.data.KTX0020_ID})
        if(l.length!=0){
          this.listdon.splice(this.listdon.indexOf(l[0]),1)
        }
      }else{
        alert(val.mess)
      }
    })
  })
  }
  delete2(element){   
    if(!confirm('Bạn có chắc chắn muốn xóa đơn này?'))return false
    let that=this
    this.rest.PutDataToAPI<result< KTX0023>[]>([element],'KTX0023/delete').subscribe(data=>{
    ////////////console.log(data)
    data.forEach(val=>{
      if(val.code=="OK"){
        let l=this.listdon2.filter(c=>{return c.KTX0023_ID===val.data.KTX0023_ID})
        if(l.length!=0){
          this.listdon2.splice(this.listdon2.indexOf(l[0]),1)
        }
      }else{
        alert(val.mess)
      }
    })
  })
  }
  async editdonlulu(element:KTX0023){
    ////////////console.log(element)
    this.ktx23temp=element
    let da=await this.rest.GetDataFromAPI<KTX0020>('KTX0020/Get/'+this.user.MKV9999_ID).toPromise()
    ////////////console.log(da)
    this.ktx23temp.KTX0001//=da.KTX0001
    this.ktx23temp.KTX0002//=da.KTX0002
    this.form='formketthucluutru'
    this.times(true)
  }
  async showketthuc(){
    this.ktx23temp=new KTX0023();
    this.ktx23temp.MKV9999=this.user
    this.ktx23temp.trakytucxa=true
    let da=await this.rest.GetDataFromAPI<KTX0020>('KTX0020/Get/'+this.user.MKV9999_ID).toPromise()
    ////////////console.log(da)
    this.ktx23temp.KTX0001=da.KTX0001
    this.ktx23temp.KTX0002=da.KTX0002
    this.ktx23temp.KTX0001_ID=da.KTX0001_ID
    this.ktx23temp.KTX0002_ID=da.KTX0002_ID
    this.ktx23temp.KTX0003_ID=da.KTX0003_ID
    this.ktx23temp.khoaphong=da.khoaphong
    this.ktx23temp.sotu=da.sotu
    this.ktx23temp.sokhoatu=da.sokhoatu
    this.ktx23temp.KTX0031=await this.rest.GetDataFromAPI<KTX0031[]>('KTX0031/Get/'+this.user.MKV9999_ID).toPromise()
    ////////////console.log(this.ktx23temp)
    this.form='formketthucluutru'
    this.times(true)
    
  }
}
