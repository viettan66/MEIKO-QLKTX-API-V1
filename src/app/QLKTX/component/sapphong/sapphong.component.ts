import { Component, OnInit,Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from '../../models/result';
import { KTX0020 } from '../../models/KTX0020';
import { KTX0002 } from '../../models/KTX0002';
import { KTX0001 } from '../../models/KTX0001';
import { WH0007 } from 'src/app/Models/WH0007';
import { KTX0010 } from '../../models/KTX0010';
import { Validators } from '@angular/forms';
import { KTX0031 } from '../../models/KTX0031';
import * as Global from '../../../Service/global.service';
import { xuatkho } from '../../models/xuatkho';
declare var $:any

@Component({
  selector: 'app-sapphong',
  templateUrl: './sapphong.component.html',
  styleUrls: ['./sapphong.component.css']
})
export class SapphongComponent implements OnInit {
  constructor(public rest:RESTService) { }
public listEP:KTX0020[]=[]
public listEPcopy:KTX0020[]=[]
public listEPtemp:KTX0020[]=[]
public giuong:KTX0002=null
public phong:KTX0001=null
public listgiuong:KTX0002[]=[]
public listphong:KTX0001[]=[]
public listphongcopy:KTX0001[]=[]
public listphongtemp:KTX0001[]=[]
public title=""
  ngOnInit() {
    this.show()
    document.getElementById('hidecolumn').style.display='none'
    let that=this
    $(document).ready(function(){
      /////////////////////////////////////////////
      $('.qlp').css('display','none')
      $('.qlsp').css('display','unset')
      $('thead>tr>td>input:checkbox').change(function(){
        //////////////console.log($(this).is(':checked'))
        $(this).parent().parent().parent().parent().find('tbody').find('input:checkbox').click()
      })
      $('.table-click').on('click','tbody>tr',function(Event){
        $(this).find('input:checkbox').click()
       })
      $('.table-click').on('click','tbody>tr>td>input:checkbox',function(Event){
        Event.stopPropagation()
      })
      $('.table-click').on('change','tbody>tr>td>input:checkbox',function(Event){
        Event.stopPropagation()
        
          let c= that.listEPcopy.filter(c=>{return c.check===true})
          that.ktx0010.forEach(vla=>{
            vla.soluongtinh=c.length*vla.soluongmacdinh
            if(vla.soLuongTonKho-vla.soluongtinh<0)alert("Mặt hàng "+vla.tenSanPham+' không đủ.')
          })
  
      })
      ///////////////////////////////////////////////////
      /////////////////
      $(document).bind("contextmenu", function(e) {
        return false;
    });
      //////////////////
      //////////////////
      $('#addRange').click(function(e){
        that.listphongcopy = []
        that.listphongcopy.push(that.phong)
        idphong = $(this).attr('name')
        tenphong = $(this).attr('title')
        option = 1
        that.title = "Chọn " + that.listgiuong.filter(c => { return c.trangthai === false }).length + " nhân viên cho phòng: " + $(this).find('.card-title').text()
        ////////////console.log('1')
        let ch
          getdata(that.phong.khu).then(da=>{
                ch=da
          ////////////console.log('2')   
        if (ch == false) {
          return false
        } else {
       that.listEPcopy=that.listEP.filter(c=>{return c.capbac===that.phong.capbac})
          that.showdodung().then(data => {
            if (data) {
              //////////////console.log(that.ktx0010)
              $('#sapphongtudongmodal').modal()
            }
          })

        }
          })
   
        //$('#sapphongtudongmodal').modal()
    })​
      //////////////////
      $('#sapphongtudong').click(function(e){//////////////console.log(e.which)14%
        let khu=that.phong!=null?that.phong.khu:$('#listkhu').val()
        if(khu=='a'){
          alert('Bạn phải chọn khu Nam Nữ trước.')
          return false
        }
        getdata(khu).then(da=>{
         if(da==false){
          return false
        }
        that.listphong=that.listphongtemp
           that.listEPcopy=that.listEP
           that.listphongcopy=that.listphong.filter(c=>{return (c.slotuse<c.slot)})
           that.showdodung().then(data => {
            if (data) {
              //////////////console.log(that.ktx0010)
              $('#sapphongtudongmodal').modal()
            }
          })
        })
      })​
       ///
      let option=0
      let idgiuong=0
      let idphong=0
      let tenphong=''
      $('.card').on('click','.giuongclick',function(event){ 
        that.listphongcopy=[]
        that.listphongcopy.push(that.phong)
        event.stopImmediatePropagation()
        option=2
        that.title="Chọn một nhân viên cho giường: "+$(this).find('.card-title').text()
        idgiuong=$(this).attr('id')
        if($(this).hasClass('bg-success')){
          that.rest.GetDataFromAPI<KTX0002>('KTX0002/Get/'+idgiuong).subscribe(data=>{
            ////////////console.log(data)
            that.giuong=data
            that.title="Giường: "+$(this).find('.card-title').text()
          $('#nguoitronggiuong').modal()
          })
        }
        else{

          let ch
          getdata(that.phong.khu).then(da=>{
                ch=da
          })
           if(ch==false){
            return false
          }
          
          that.listEPcopy=that.listEP
          that.showdodung().then(data => {
            if (data) {
              //////////////console.log(that.ktx0010)
              $('#sapphongtudongmodal').modal()
            }
          })}
      })
      ///////////////////////////////////////////////
      $('#deleterooms').click(function(event){
        if(!confirm("Bạn muốn xóa người này ra khỏi phòng: "+that.giuong.KTX0001.ten+'?'))return false
        that.rest.PostDataToAPI<result<KTX0002>[]>([that.giuong],'QLSP/DeleteBed').subscribe(datas=>{
            datas.forEach(data => {
            if(data.code=="OK"){
              var l=that.listgiuong.filter(c=>{return c.KTX0002_ID===data.data.KTX0002_ID})
              if(l.length!=0){
                l[0].KTX0020=null;
                l[0].trangthai=false
              } 
              var k=that.listphong.filter(c=>{return c.KTX0001_ID===data.data.KTX0001_ID})
              if(k.length!=0){
                k[0].slotuse--
              }
              $('#nguoitronggiuong').modal('hide')
            }else{
              ////////////console.log(data.mess)
            }
          })
        })
      })
      ///////////////////////////////////////////////UPDATEinfo
      $('#sapphongauto').click( function(){
       that.sapphong(false)
      })
       ///
      //  $('.listEP').on('click','tr',function(event){ 
      //   if($(this).hasClass('active')){
      //     $(this).removeClass('active')
      //   }else{
      //     $(this).addClass('active')
      //     if(option==2){
      //       var EP=that.listEP[$(this).find('input[name=ID]').val()]
      //       that.rest.PostDataToAPI<result<KTX0020>>(EP,'QLSP/AddEPToGiuong/'+idgiuong).subscribe(data=>{
      //         ////////////console.log(data)
      //         if(data.code=="OK"){
      //           $('.giuongclick').each(function(){
      //             if($(this).attr('id')==data.data.KTX0002_ID){
      //               $(this).removeClass('bg-secondary').addClass('bg-success').find('.card-text').text(data.data.MKV9999.hodem+' '+data.data.MKV9999.ten)
      //               //that.listgiuong.filter(c=>{return c.KTX0002_ID===data.data.KTX0002_ID})[0].trangthai=true;
      //             }
      //           })
      //         }
      //       })
      //       $('#sapphongtudongmodal').modal('hide')
      //     }else{

      //     }
      //   }
      // })
      /////////////////////
     async function getdata(khu?:string){
        if(khu==null){
          if($("#listkhu").val()=='a'){
            alert('Bạn chưa chọn khu Nam hay Nữ đê xếp phòng.')
            return false
          }
          khu=$("#listkhu").val()
        }
        that.listEP=[]
       let data= await that.rest.GetDataFromAPI<KTX0020[]>('QLSP/GetAllEp').toPromise()
       //////////console.log(data)
          data.forEach(cal=>{
            if(cal.gioitinh==(khu=='N'))
            that.listEP.push(cal)
          })
          return true
      }
      ///////////// edit danh mục đồ 
      $('.table-edit-button').on('click','button',function () {
        if($(this).find('i').hasClass('fa-edit')){
          $(this).parent().parent().find('input,textarea').removeClass('none').removeAttr('disabled')
          $(this).find('i').removeClass('fa-edit').addClass('fa-save')
        }else{
              $(this).parent().parent().find('input,textarea').addClass('none').attr('disabled',true)
              $(this).find('i').removeClass('fa-save').addClass('fa-edit')
        }
      })
    })
  }
  public ktx0010:WH0007[]=[]
  public arr:WH0007[]=[]
  public ktx0010show:KTX0010[]=[]

  async showdodung():Promise<boolean>{
    this.ktx0010=[]
    this.ktx0010show=(await  this.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getall').toPromise()).filter(c=>{return c.loai===2})
   
    this.ktx0010show.forEach(val=>{
      var check=this.arr.filter(c=>{return c.WH0007_ID===val.WH0007_ID})
      if(check.length>0){
        let kl=check[0]
        kl.soluongmacdinh=val.soluongmacdinh
        kl.KTX0010_ID=val.KTX0010_ID
        kl.soluongtinh=0
        this.ktx0010.push(kl)

      }
    })

    return true
  }
  show(){
    let that = this
    let input = new FormData();
    input.append('pz', '100000');
    input.append('p', '1');
    input.append('ob', '');
    input.append('sort', '');
    input.append('s', '');
    input.append('sts', '');
    input.append('WH0001_ID', Global.Khohang);
    that.rest.Post<any>(input, 'http://192.84.100.207/AdminAPI/api/WH/R1_GetKhoHang').subscribe(data => {
      that.arr = JSON.parse(data['data'])[0]
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
  public ktx20tempprint:KTX0020[]=[]
  
 async sapphong(check:boolean){
    let arr:xuatkho=new xuatkho()
    this.ktx20tempprint=[]
    let that=this
    ////////////console.log(that.listEPcopy.filter(c=>{return c.check===true}))
  let  datas=await that.rest.PostDataToAPI<result<KTX0020>[]>({arrPhong:that.listphongcopy.filter(c=>{return c.check===true}),EPs:that.listEPcopy.filter(c=>{return c.check===true}) },'QLSP/AddEPToGiuongAuto').toPromise()
      ////////////console.log(datas)
       let ok=0
        let ng=0
        that.ktx0010.forEach(kll=>{
          if(kll.soluongmacdinh>0)
            arr.ListProduct.push({soLuong:kll.soluongmacdinh,donViTinh:kll.tenDonViTinh,WH0007_ID:kll.WH0007_ID})
        })
        
      datas.forEach(data=>{
        if(data.code=="OK"){
          if(data.data.MKV9999.type!=0){
            arr.ListUser.push(data.data.MKV9999.manhansu)
          }
          this.ktx20tempprint.push(data.data)
          ok++
          var k=that.listphong.filter(c=>{return c.KTX0001_ID===data.data.KTX0001_ID})
          if(k.length!=0){
            k[0].slotuse++
          }
          var l=that.listgiuong.filter(c=>{return c.KTX0002_ID===data.data.KTX0002_ID})
          if(l.length!=0){
            l[0].trangthai=true
            l[0].KTX0020=data.data
          }
          let arr31:KTX0031[]=[]
           that.ktx0010.filter(c=>{return (c.soluongmacdinh>0&&c.soLuongTonKho>=c.soluongmacdinh)}).forEach(val=>{
             let tem=new KTX0031();
             tem.KTX0010_ID=val.KTX0010_ID
             tem.MKV9999_ID=data.data.MKV9999_ID
             tem.ghichu="Cấp phát mới ngày "+new Date()
             tem.ngaycap=new Date()
             tem.soluongcap=val.soluongmacdinh
             val.soLuongTonKho-=val.soluongmacdinh
             tem.trangthai=true
             arr31.push(tem)
           })
             that.rest.PostDataToAPI<result<KTX0031>[]>(arr31,'KTX0031/add').subscribe(data=>{
               ////////////console.log(data)
               data.forEach(val=>{
                 if(val.code=="OK"){
                  
                 }else{
                   alert(val.mess)
                 }
               })
             })
        }else ng++
      })
      ///////////////////////////////////////////////
      
      ////////////console.log(arr)
    let input = new FormData();
    input.append('ListUser',JSON.stringify(arr.ListUser) );
    input.append('ListProduct',JSON.stringify(arr.ListProduct) );
    let kkkk=await this.rest.Post<any>(input, Global.xuatkhoAPI).toPromise()
     //////////console.log(kkkk)
     
      alert('Đã sắp phòng cho '+ok+' người\n'+(ng!=0?('Chưa sắp được phòng cho '+ng+' người'):''))
      if(check){
        
        $('#sapphongtudongmodal').modal('hide')
        this.loading=true
        setTimeout(() => {
          this.loading=false
          setTimeout(() => {
            
          print()
          }, 200);
        },4000);
      }
    return
  }
  public loading=false
  sapphongvaindon(){
    this.sapphong(true)
  }
  loc(){
    //////////////console.log(this.listEP)
    let value=Number($('#loc').val()) 
    if(value!=0){
      this.listphongcopy=this.listphongtemp.filter(c=>{return c.capbac===value})
      // if(value==1)
      this.listEPcopy=this.listEP.filter(c=>{return c.capbac===value})
      // if(value==2)
      // this.listEPcopy=this.listEP.filter(c=>{return (c.capbac>3&&c.capbac<6)})
      // if(value==3)
      // this.listEPcopy=this.listEP.filter(c=>{return (c.capbac>5&&c.capbac<8)})
      // if(value==4)
      // this.listEPcopy=this.listEP.filter(c=>{return (c.capbac>7)})
}
  else{
  this.listphongcopy=this.listphongtemp
  this.listEPcopy=this.listEP
}
  }
}
