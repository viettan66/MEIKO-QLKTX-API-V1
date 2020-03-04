import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0001 } from '../../models/KTX0001';
import { result } from '../../models/result';
import { KTX0002 } from '../../models/KTX0002';
declare var $:any

@Component({
  selector: 'app-qlp',
  templateUrl: './qlp.component.html',
  styleUrls: ['./qlp.component.css']
})
export class QLPComponent implements OnInit {

  constructor(public rest:RESTService) { }
public listtoanha:KTX0001[]=[]
public listkhu:KTX0001[]=[]
public listtang:KTX0001[]=[]
public listphong:KTX0001[]=[]
public listgiuong:KTX0002[]=[]
public khu=''
public notify
public palahol
public toanha=0
public tang=0
public phong=0
public tentoanha=''
public tenphong=''
public isaddtoanha=true;
  ngOnInit() {
    let that=this
    

    $(document).ready(function(){
      
      function filttertoanha(){
        that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall').subscribe(data=>{
          that.listtang=[]
          that.listtoanha=[]
          that.listphong=[]
          that.listgiuong=[]
          that.tang=0;
          that.toanha=0;
          data.forEach(val=>{
             if(val.type==2){
               if(val.khu==that.khu)
              that.listtoanha.push(val)
            }else if(val.type==3){
               if(val.KTX0001_ID==that.toanha)
              that.listtang.push(val)
            }
          })
        })
      }
      function filttertangnha(){
        that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall').subscribe(data=>{
          that.listtang=[]
          that.listphong=[]
          that.listgiuong=[]
          that.tang=0;
          data.forEach(val=>{
            if(val.type==3&&val.idcha==that.toanha){
              that.listtang.push(val)
            }
          })
        })
      }
      function filtterphong(){
        that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall').subscribe(data=>{
          that.listphong=[]
          that.listgiuong=[]
          data.forEach(val=>{
            if(val.type==4&&val.idcha==that.tang){
              that.listphong.push(val)
            }
          })
        })
      }
      function filttergiuong(){
        that.rest.GetDataFromAPI<KTX0002[]>('KTX0002/Getall').subscribe(data=>{
          that.listgiuong=[]
          console.log(data)
          data.forEach(val=>{
            if(val.KTX0001_ID==that.phong){
              that.listgiuong.push(val)
            }
          })
        })
      }
      ////////////////////////
      $('#themtoanha').click(function(){
        that.isaddtoanha=true;
        that.notify="Thêm tòa nhà"
        that.palahol="Tên tòa nhà"
        $('#khuvuc').css('display','')
        $('#formaddtoanhatang').modal();
      })
      ////////////////////////
      $('#themtang').click(function(){
        if(that.toanha==0){
          alert('Bạn hãy chọn tòa nhà trước nhé')
          return
        }
        that.isaddtoanha=false;
        that.notify="Thêm tầng cho tòa nhà: "+that.tentoanha
        that.palahol="Tên tầng"
        $('#khuvuc').css('display','none')
        $('#formaddtoanhatang').modal();
      })
      ////////////////////////
      $('#themphongthemphong').click(function(){
        if(that.tang==0){
          alert('Bạn hãy chọn Tầng trước khi tạo phòng!')
          return
        }
        $('#khuvuc2').val(that.khu)
        $('#toa2').val(that.toanha)
        $('#tang2').val(that.tang)
        $('#tenphong').val(that.tentoanha+'-')
        $('#themphongmodal2').modal();
      })
      ////////////////////////
      $('#luuphong').click(function(){
        let kt01=new KTX0001();
        let kt02: KTX0001[]=[];
        kt01.ghichu=$('#ghichu2').val()
        kt01.ten=$('#tenphong').val()
        kt01.thutu=999
        kt01.khu=that.khu
        kt01.idcha=that.tang
        kt01.type=4
        kt01.slot=$('#soluongchochua').val()
        if($('#soluongchochua').val()<1||$('#soluongchochua').val()>10){
          alert('Số lượng không hợp lệ')
          return
        }
        kt01.trangthai=true
        kt02.push(kt01)
        that.rest.PostDataToAPI< result<KTX0001>[]>(kt02,'KTX0001/add').subscribe(data=>{
          data.forEach(vla=>{
            if(vla.code=="OK"){
              that.listphong.push(vla.data)
            }
          })
        })

      })
      ////////////////////////
      $('#listkhu').on('click','.list-group-item',function(){
        that.toanha=0
        that.khu=$(this).attr('id')
        $(this).parent().find('li').removeClass('active')
        $(this).addClass('active')
        filttertoanha()
      })
      ////////////////////////
      $('#listtoanhash').on('click','.list-group-item',function(){
        that.toanha=$(this).attr('id')
        that.tentoanha=$(this).text()
       // findter()
        $(this).parent().find('li').removeClass('active')
        $(this).addClass('active')
        filttertangnha()
      })
      ////////////////////////
      $('#listtangsh').on('click','.list-group-item',function(){
        that.tang=$(this).attr('id')
        $(this).parent().find('li').removeClass('active')
        $(this).addClass('active')
        filtterphong()
      })
      ////////////////////////
      $('.card').on('click','.phongclick',function(){
        that.phong=$(this).attr('id')
        that.tenphong=$(this).attr('title')
        $(this).parent().find('.card').removeClass('bg-info')
        $(this).parent().find('.card').removeClass('text-white')
        $(this).addClass('bg-info')
        $(this).addClass('text-white')
        filttergiuong()
      })
      ////////////////////////
      $('.card').on('click','.giuongclick',function(){
        $(this).parent().find('.card').removeClass('bg-info')
        $(this).parent().find('.card').removeClass('text-white')
        $(this).addClass('bg-info')
        $(this).addClass('text-white')
      })
      ////////////////////////
      $('#formaddtoanhatang').on('click','#luutoanha',function(){
        let kt01=new KTX0001();
        let kt02: KTX0001[]=[];
        kt01.ghichu=$('#ghichu').val()
        kt01.khu=that.khu
        kt01.ten=$('#tentoanha').val()
        kt01.thutu=999
        kt01.idcha=that.toanha
        if(that.isaddtoanha)
        kt01.type=2
        else
        kt01.type=3
        kt01.trangthai=true
        kt02.push(kt01)
        that.rest.PostDataToAPI< result<KTX0001>[]>(kt02,'KTX0001/add').subscribe(data=>{
          data.forEach(vla=>{
            if(vla.code=="OK"){
              if(that.isaddtoanha)
             that.listtoanha.push(vla.data)
             else that.listtang.push(vla.data)
            }
          })
        })
      })

    })
  }

}
