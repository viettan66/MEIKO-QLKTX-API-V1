import { Component, OnInit,Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from '../../models/result';
import { KTX0020 } from '../../models/KTX0020';
import { KTX0002 } from '../../models/KTX0002';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { KTX0001 } from '../../models/KTX0001';
declare var $:any

@Component({
  selector: 'app-sapphong',
  templateUrl: './sapphong.component.html',
  styleUrls: ['./sapphong.component.css']
})
export class SapphongComponent implements OnInit {
  constructor(public rest:RESTService) { }
public listEP:KTX0020[]=[]
public listEPtemp:KTX0020[]=[]
public giuong:KTX0002=null
public phong:KTX0001=null
public listgiuong:KTX0002[]=[]
public listphong:KTX0001[]=[]
public listphongtemp:KTX0001[]=[]
public title=""
  ngOnInit() {
    document.getElementById('hidecolumn').style.display='none'
    let that=this
    $(document).ready(function(){
      /////////////////////////////////////////////
      $('.qlp').css('display','none')
      $('.qlsp').css('display','unset')
      $('thead>tr>td>input:checkbox').change(function(){
        $(this).parent().parent().parent().parent().find('input:checkbox').prop('checked',$(this).prop('checked'))
      })
      $('.table-click').on('click','tbody>tr',function(Event){
        $(this).find('input:checkbox').prop('checked',!$(this).find('input:checkbox').prop('checked'))
        $(this).find('input:checkbox').change()
       })
      $('.table-click').on('click','tbody>tr>td>input:checkbox',function(Event){
        Event.stopPropagation()
      })
      ///////////////////////////////////////////////////
      /////////////////
      $(document).bind("contextmenu", function(e) {
        return false;
    });
      //////////////////
      //////////////////
      $('#addRange').click(function(e){
        that.listphong=[]
        that.listphong.push(that.phong)

       idphong=$(this).attr('name')
       tenphong=$(this).attr('title')
         option=1
         that.title="Chọn "+that.listgiuong.filter(c=>{return c.trangthai===false}).length+" nhân viên cho phòng: "+$(this).find('.card-title').text()
         
         if(getdata(that.phong.khu)==false){
          return false
        }
        $('#sapphongtudongmodal').modal()
    })​
      //////////////////
      $('#sapphongtudong').click(function(e){//console.log(e.which)14%
         //getdata()
         if(getdata()==false){
          return false
        }
        that.listphong=that.listphongtemp
          $('#sapphongtudongmodal').modal()
      })​
       ///
      let option=0
      let idgiuong=0
      let idphong=0
      let tenphong=''
      $('.card').on('click','.giuongclick',function(event){ 
        that.listphong=[]
        that.listphong.push(that.phong)
        event.stopImmediatePropagation()
        option=2
        that.title="Chọn một nhân viên cho giường: "+$(this).find('.card-title').text()
        idgiuong=$(this).attr('id')
        if($(this).hasClass('bg-success')){
          that.rest.GetDataFromAPI<KTX0002>('KTX0002/Get/'+idgiuong).subscribe(data=>{
            //console.log(data)
            that.giuong=data
            that.title="Giường: "+$(this).find('.card-title').text()
          $('#nguoitronggiuong').modal()
          })
        }
        else{

          if(getdata(that.phong.khu)==false){
            return false
          }
          $('#sapphongtudongmodal').modal()}
      })
      ///////////////////////////////////////////////
      $('#deleterooms').click(function(event){
        if(!confirm("Bạn muốn xóa người này ra khỏi phòng: "+that.giuong.KTX0001.ten+'?'))return false
        that.rest.PostDataToAPI<result<KTX0002>>(that.giuong,'QLSP/DeleteBed').subscribe(data=>{
          if(data.code=="OK"){
            $('.giuongclick').each(function(){
              if($(this).attr('id')==data.data.KTX0002_ID){
                $(this).removeClass('bg-success').addClass('bg-secondary').find('.card-text').text('Trống')
               // that.listgiuong.filter(c=>{return c.KTX0002_ID===data.data.KTX0002_ID})[0].trangthai=false;
              }
            })
            $('#nguoitronggiuong').modal('hide')
          }
        })
      })
      ///////////////////////////////////////////////UPDATEinfo
      $('#sapphongauto').click(function(){
        let arr=[]
        $('.listEP>tbody>.active').each(function(){
         arr.push(that.listEP[$(this).find('input[name=ID]').val()])
        })
          that.rest.PostDataToAPI<result<KTX0020>[]>(arr,'QLSP/AddEPToGiuongAuto/'+idphong).subscribe(datas=>{
            let ok=0
            let ng=0
            console.log(datas)
            datas.forEach(data=>{
              if(data.code=="OK"){
                ok++
                $('.giuongclick').each(function(){
                  if($(this).attr('id')==data.data.KTX0002_ID){
                    $(this).removeClass('bg-secondary').addClass('bg-success').find('.card-text').text(data.data.MKV9999.hodem+' '+data.data.MKV9999.ten)
                    //that.listgiuong.filter(c=>{return c.KTX0002_ID===data.data.KTX0002_ID})[0].trangthai=true;
                  }
                })
              }else ng++
            })
            alert('Đã thêm '+ok+' người vào phòng "'+tenphong+'".'+(ng!=0?(" Còn "+ng+' người chưa thêm được. Hãy kiểm tra lại.'):""))
          })
      })
       ///
       $('.listEP').on('click','tr',function(event){ 
        if($(this).hasClass('active')){
          $(this).removeClass('active')
        }else{
          $(this).addClass('active')
          if(option==2){
            var EP=that.listEP[$(this).find('input[name=ID]').val()]
            that.rest.PostDataToAPI<result<KTX0020>>(EP,'QLSP/AddEPToGiuong/'+idgiuong).subscribe(data=>{
              console.log(data)
              if(data.code=="OK"){
                $('.giuongclick').each(function(){
                  if($(this).attr('id')==data.data.KTX0002_ID){
                    $(this).removeClass('bg-secondary').addClass('bg-success').find('.card-text').text(data.data.MKV9999.hodem+' '+data.data.MKV9999.ten)
                    //that.listgiuong.filter(c=>{return c.KTX0002_ID===data.data.KTX0002_ID})[0].trangthai=true;
                  }
                })
              }
            })
            $('#sapphongtudongmodal').modal('hide')
          }else{

          }
        }
      })
      /////////////////////
      function getdata(khu?:string){
        if(khu==null){
          if($("#listkhu").val()=='a'){
            alert('Bạn chưa chọn khu Nam hay Nữ đê xếp phòng.')
            return false
          }
          khu=$("#listkhu").val()
        }
        
        that.listEP=[]
        that.rest.GetDataFromAPI<KTX0020[]>('QLSP/GetAllEp').subscribe(data=>{
          console.log(data)
          data.forEach(cal=>{
            if(cal.gioitinh==(khu=='N'))
            that.listEP.push(cal)
          })
         })
      }
   
    })
  }
  getemitListGIUONG(event){
    this.listgiuong=event
  }
  getemitListPHONG(event){
    this.listphongtemp=event
    this.listphong=event
  }
  getemitPHONG(event){
    this.phong=event
  }
}
