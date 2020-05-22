import { Component, OnInit } from '@angular/core';import { RESTService } from 'src/app/Service/rest.service';
import { KTX0002 } from '../../models/KTX0002';
import { result } from '../../models/result';
import * as Global from '../../../Service/global.service';
import { KTX0023 } from '../../models/KTX0023';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { KTX0031 } from '../../models/KTX0031';
import { KTX0001 } from '../../models/KTX0001';
import { promise } from 'protractor';
declare var $:any

@Component({
  selector: 'app-qlr',
  templateUrl: './qlr.component.html',
  styleUrls: ['./qlr.component.css']
})
export class QlrComponent implements OnInit {

  constructor(public rest:RESTService) { }
  public listdon:KTX0023[]=[]
  public now=new Date
  public now1=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+new Date().getDay()
  public form=''
  public start=0;
  public step=20;
  async ngOnInit() {
    let user: MKV9999 = JSON.parse(localStorage.getItem('KTX_User'))
     this.listdon=await this.rest.PostDataToAPI<KTX0023[]>({},'KTX0023/Getall').toPromise()
      ////////////console.log(this.listdon)
   
let that=this
    $(document).ready(function(){

      $('thead>tr>th>input:checkbox').change(function(){
        ////////////console.log($(this).is(':checked'))
        $(this).parent().parent().parent().parent().find('tbody').find('input:checkbox').click()
      })
      ////
      $('.tablelistdon').on('click','tbody>tr>td>input:checkbox,button,input',function(Event){
        Event.stopPropagation()
        if($(this).attr('checked')){
            $(this).parent().parent().addClass('active')
        }else{
          $(this).parent().parent().removeClass('active')
        }
      }) ////////////////
      $('.card').on('change','#filter',function(){
        that.showdon()
      })
      ////////////////
      $('.tablelistdon').on('click','tbody>tr',function(){
        $(this).find('input:checkbox').click()
      })
      $('#myModalungvieninfo').on('hidden.bs.modal', function () {
        that.form='';
        that.ktx23temp=null
      })
    })
  }

  showdon() {

    let check = $('#filter').val()
    let startdate = $('#startdate').val()
    let enddate = $('#enddate').val()
    this.rest.PostDataToAPI<KTX0023[]>({ 'trangthai': check, 'startdate': startdate, 'enddate': enddate }, 'KTX0023/Getall').subscribe(data => {
      this.listdon = data
      ////////////console.log(data)
      ////////////console.log('fffffffffffff')
    })
      ////////////console.log('fffffffffffff')
  }
  public ktx23temp: KTX0023 = new KTX0023
  async getda(element:KTX0023){
    if(element.KTX0002==null)element.KTX0002=new KTX0002({ten:"Trống"})
    if(element.KTX0001==null)element.KTX0001=new KTX0001({ten:"Trống"})
    if(element.trangthai)
    element.KTX0031 = await this.rest.GetDataFromAPI<KTX0031[]>('KTX0031/Get23/' + element.KTX0023_ID).toPromise()
    else
    element.KTX0031 = await this.rest.GetDataFromAPI<KTX0031[]>('KTX0031/Get/' + element.MKV9999_ID).toPromise()
    return element
  }
  async showdetaildon(element: KTX0023) {
    await this.getda(element)
    ////////////console.log(element)
    this.ktx23temp = element
    this.form = 'formket';
    $('#myModalungvieninfo').modal()
  }
  checkdo(element: KTX0023) {
    return element.KTX0031.filter(c => { return c.soluongtra != c.soluongcap }).length != 0 ? true : false
  }
  public ktx23tempprint:KTX0023[]=[]
  async agree(check?:boolean){
    this.ktx23tempprint=[]
    ////////////console.log(this.listdon.filter(c=>{return c.check===true}))
   let l= await this.rest.PutDataToAPI<result<KTX0023>[]>(this.listdon.filter(c=>{return c.check===true}),'KTX0023/Agree').toPromise()
   ////////////console.log(l)
   l.forEach( cal=> {
     if(cal.code=="OK"){
     }
   })
   if(check){
    this.ktx23tempprint=this.listdon.filter(c=>{return c.check===true})
      
    await this.ktx23tempprint.forEach( k=>{
       this.getda(k)
    })
    this.loading=true
     setTimeout(() => {
       this.loading=false
       setTimeout(() => {
         window.print()
       }, 200);
       
     }, 3000);
   }
  }
  print(){
    this.agree(true)
  }
  public loading=false
  
  export(){
    $('.ddd').css('display','')
    this.rest.ExportTOExcel(document.getElementById('tabletoexport'),'Danh sách ra '+(new Date).getDay+(new Date).getMonth+(new Date).getFullYear)
    $('.ddd').css('display','none')
  }
  deleteall(){
    if(!confirm('Bạn có chắc chắn muốn xóa các đơn đã chọn?'))return false
    let ok=0,ng=0
    let that=this
    this.rest.PutDataToAPI<result< KTX0023>[]>(this.listdon.filter(c=>{return c.check===true}),'KTX0023/delete').subscribe(data=>{
    ////////////console.log(data)
    data.forEach(val=>{
      if(val.code=="OK"){
        ok++
        let l=this.listdon.filter(c=>{return c.KTX0023_ID===val.data.KTX0023_ID})
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
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
}
