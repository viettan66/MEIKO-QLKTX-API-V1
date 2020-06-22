import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0020 } from '../../models/KTX0020';
import { result } from '../../models/result';
import * as Global from '../../../Service/global.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { valuesearch } from '../../models/valuesearch';
declare var $:any

@Component({
  selector: 'app-qld',
  templateUrl: './qld.component.html',
  styleUrls: ['./qld.component.css']
})
export class QldComponent implements OnInit {

  constructor(public rest:RESTService) { }
  public listdon:KTX0020[]=[]
  public ktx20temp:KTX0020
  public user:MKV9999
  public listdontemp:KTX0020[]=[]
  public form=''
  public now=new Date()
  public now1=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+new Date().getDay()
  public start=0;
  public step=20;
  loading=true
  ngOnInit() {  let that=this
this.user=JSON.parse(localStorage.getItem('KTX_User'))
    $(document).ready(function(){
      
      $('thead>tr>th>input:checkbox').change(function(){
        //////////////console.log($(this).is(':checked'))
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
      that.showdon()
      ////////////////
      $('.tablelistdon').on('click','tbody>tr',function(){
        $(this).find('input:checkbox').click()
      })
      ////////////////
      $('.card').on('change','#filter',function(){
        that.showdon()
      })
      ////////////////
      $('.card').on('click','#agree',function(){
        that.listdon.filter(c=>{return c.check===true}).forEach(val=>{
          val.hotenbengiao=that.user.hodem+' '+that.user.ten
        })
        that.rest.PostDataToAPI<result<KTX0020>[]>(that.listdon.filter(c=>{return c.check===true}),'KTX0020/approval').subscribe(data=>{
          //////////////console.log(data)
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
      
      
      ////////////////
      $('#myModalungvieninfo').on('hidden.bs.modal', function () {
        that.form='';
        that.ktx20temp=null
      })
      ////////////////
      $('.card').on('click','#disagree',function(){
        //////////////console.log(that.listdon)
      })
    })
  }
 async showdon(){
    this.loading=true
    let check=$('#filter').val()
    let startdate=$('#startdate').val()
    let enddate=$('#enddate').val()
    this.listdon=await this.rest.PostDataToAPI<KTX0020[]>({trangthai:check,startdate:startdate,enddate:enddate},'KTX0020/Getall').toPromise()
    this.listdontemp=this.listdon
  this.loading=false
     this.listdon.map(async element  =>{
    let key=element.MKV9999.cmtnd_so!=null?element.MKV9999.cmtnd_so:
     (element.MKV9999.hochieu_so!=null?element.MKV9999.hochieu_so:
      (element.MKV9999.manhansu!=null?element.MKV9999.manhansu:(element.hotenkhaisinh))
      )
      element.check2=false
       element.timkiem=await this.rest.PostDataToAPI<valuesearch>({key:key},'Search/Search').toPromise()
      // //console.log(element.timkiem)
        element.check2=true
      element.count= element.timkiem.KTX0020.filter(v=>{return v.trangthai===true}).length
    })
    
    this.loading=false
  }
  showdetaildon(element){
        //////////////console.log(element)
        this.ktx20temp=element
        this.form='formdangkyokytucxa';
        $('#myModalungvieninfo').modal()
      }
  deleteall(){
    if(!confirm('Bạn có chắc chắn muốn xóa các đơn đã chọn?'))return false
    let ok=0,ng=0
    let that=this
    this.rest.PutDataToAPI<result< KTX0020>[]>(this.listdon.filter(c=>{return c.check===true}),'KTX0020/delete').subscribe(data=>{
    //////////////console.log(data)
    data.forEach(val=>{
      if(val.code=="OK"){
        ok++
        let l=this.listdon.filter(c=>{return c.KTX0020_ID===val.data.KTX0020_ID})
        if(l.length!=0){
          this.listdon.splice(this.listdon.indexOf(l[0]),1)
        }
      }else{
        ng++
        //
      }
    })
    alert('Đã xóa "'+ok+'" đơn. Lỗi "'+ng+'" đơn.')
  })
  }
  delete(element){
    if(!confirm('Bạn có chắc chắn muốn xóa đơn này?'))return false
    let that=this
    this.rest.PutDataToAPI<result< KTX0020>[]>([element],'KTX0020/delete').subscribe(data=>{
    //////////////console.log(data)
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
  public ktx20tempprint:KTX0020[]=[]
 async print2(){
    
  this.ktx20tempprint=[]
  this.ktx20tempprint=await this.listdon.filter(c=>{return c.check===true})
  //////////////console.log(this.ktx20tempprint)
  this.loading=true
    setTimeout(() => {
      this.loading=false
      setTimeout(() => {
        
      print()
      }, 200);
    },2000);
    
  }
  // async count(element:KTX0020){
  //    let key=element.MKV9999.cmtnd_so!=null?element.MKV9999.cmtnd_so:
  //    (element.MKV9999.hochieu_so!=null?element.MKV9999.hochieu_so:
  //     (element.MKV9999.manhansu!=null?element.MKV9999.manhansu:(element.hotenkhaisinh))
  //     )
  //     element.check2=false
  //      element.timkiem=await this.rest.PostDataToAPI<valuesearch>({key:key},'Search/Search').toPromise()
  //       element.check2=true
  //     element.count= element.timkiem.KTX0020.filter(v=>{return v.trangthai===true}).length
  //    //////////////console.log(element.timkiem)
    
  // }
  export(){
    $('.ddd').css('display','')
    this.rest.ExportTOExcel(document.getElementById('tabletoexport'),'Danh sách vào '+(new Date).getDay+(new Date).getMonth+(new Date).getFullYear)
    $('.ddd').css('display','none')
  }
  kj(){
    //////////////console.log(this.start)
  }
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  getlist($event){
    this.listdon=$event
  }
}
