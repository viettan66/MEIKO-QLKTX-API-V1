import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0001 } from '../../models/KTX0001';
import { result } from '../../models/result';
import { KTX0002 } from '../../models/KTX0002';
import * as Global from '../../../Service/global.service';
import { KTX0011 } from '../../models/KTX0011';
import { KTX0010 } from '../../models/KTX0010';
import { KTX0003 } from '../../models/KTX0003';
import { datacount } from '../../models/datacount';

declare var $: any

@Component({
  selector: 'app-qlp',
  templateUrl: './qlp.component.html',
  styleUrls: ['./qlp.component.css']
})
export class QLPComponent implements OnInit {
  @Output('ktx02out') ktx02out = new EventEmitter<KTX0002[]>()
  @Output('ktx01out') ktx01out = new EventEmitter<KTX0001[]>()
  @Output('ktx01oneout') ktx01oneout = new EventEmitter<KTX0001>()
  @Output('ktx03out') ktx03out = new EventEmitter<KTX0003[]>()
  constructor(public rest: RESTService) { }
  public listtoanha: KTX0001[] = []
  public listkhu: KTX0001[] = []
  public listtang: KTX0001[] = []
  public listphong: KTX0001[] = []
  public listphongf:any[] = []
  public listgiuong: KTX0002[] = []
  public listkhoa: KTX0003[] = []
  public listkhoaadd: KTX0003[] = []
  public listktx0001: KTX0001[] = []
  public khu = ''
  public notify
  public palahol
  public toanha = 0
  public tang = 0
  public phong = 0
  public giuong = 0
  public tenphong = ''
  public isaddtoanha = true;
  public phongdetail: KTX0001 = new KTX0001()
  public giuongdetail: KTX0002 = new KTX0002()
  public khoadetail: KTX0003 = new KTX0003()
  public tab=1
  public x = null;
  public y = null;
  public color=Global.color
  public datacount=new datacount
  ngOnInit() {
    ////////////console.log()
    let that = this
    that.rest.GetDataFromAPI<datacount>('KTX0002/getcount').subscribe(data => {
      that.datacount=data
    })
    that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall/-1').subscribe(data => {
      this.listktx0001 = data
      //////////////console.log(data)
    })
    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);
    function onMouseUpdate(e) { that.x = e.pageX; that.y = e.pageY; }

    $(document).ready(function () {
 
      /////////////////
      $(document).bind("contextmenu", function (e) {
        return false;
      });
      //////////////////
      $('body:not(#divtoshow):not(#divtoshowoptionphong):not(button)').click(function (e) {
        if (e.which == 1) {
          //////////////console.log(e.which)
          $('#divtoshow').hide()
          $('#divtoshowoptionphong').hide()
          $('#divtoshowoptionkhoa').hide()
        }
      })
      //////////////////
      let tengiuong = ""
      let idgiuong = 0
      $('.card').on('mousedown', '.giuongclick', function (e) {//////////////console.log(e.which)
        if (e.which == 3) {
          tengiuong = $(this).find('.card-title').text()
          idgiuong = $(this).attr('id')
          that.giuong = $(this).attr('id')
          $('#divtoshow').css({ 'top': that.y, 'left': that.x - 100 }).show()
        }
      }) 
      $('.card').on('mousedown', '.khoaclick', function (e) {//////////////console.log(e.which)
        if (e.which == 3) {
          let id=$(this).attr('id')
          that.khoadetail = that.listkhoa.filter(c=>{return c.KTX0003_ID===Number(id)}) [0]
          $('#divtoshowoptionkhoa').css({ 'top': that.y, 'left': that.x - 100 }).show()
          //////////////console.log(that.khoadetail)
        }
      })
      $('#divtoshow').on('click', 'ul>button', function (e) {
        e.stopPropagation()
        //////////////console.log('click ed')
        $('#divtoshow').hide()
      })
      //////////////////
      $('#deletebed').click(function () {
        if (confirm('Bạn có muốn xóa giường: ' + tengiuong)) {
          that.rest.GetDataFromAPI<result<KTX0002>>('KTX0002/Delete/' + idgiuong).subscribe(data => {
            if (data.code == "OK") {
              that.listgiuong.splice(that.listgiuong.indexOf(that.listgiuong.filter(c => { return c.KTX0002_ID === data.data.KTX0002_ID })[0]), 1)
            } else
              alert(data.mess)
          })
        }
      })
      //////////////////
      ////////////////// phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng phòng
      let tenphong = ""
      let idphong = 0
      $('.card').on('mousedown', '.phongclick', function (e) {//////////////console.log(e.which)
        if (e.which == 3) {
          tenphong = $(this).find('.card-title').text()
          idphong = $(this).attr('id')
          that.phong = $(this).attr('id')
          $('#addRange').attr('name', idphong)
          $('#addRange').attr('title', tenphong)
          $('#divtoshowoptionphong').css({ 'top': that.y, 'left': that.x - 100 }).show()
        $(this).click()
        }
      })
      $('#divtoshowoptionphong').on('click', 'ul>button', function (e) {
        e.stopPropagation()
        //////////////console.log('click ed')
        $('#divtoshowoptionphong').hide()
      })
      //////////////////
      $('#deleteroom').click(function () {
        if (confirm('Bạn có muốn xóa phòng: ' + tenphong)) {
          that.rest.GetDataFromAPI<result<KTX0001>>('KTX0001/Delete/' + that.phong).subscribe(data => {
            if (data.code == "OK") {
              ////////////console.log(data)
              var length= that.listphong.filter(c=>{return c.KTX0001_ID===data.data.KTX0001_ID})
              ////////////console.log(length)
              if(length.length!=0){
                that.listphong.splice(that.listphong.indexOf(length[0]),1)
              }
            } else
              alert(data.mess)
          })
        }
      })
      //////////////////
      $('#editroom').click(function (e) {//////////////console.log(e.which)
        that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall/'+that.phong).subscribe(dataa=>{
          that.phongdetail=dataa[0]
          $('#editphong').modal();
        })

      })
      //////////////////
      $('#editgiuong').click(function (e) {//////////////console.log(e.which)
        that.rest.GetDataFromAPI<KTX0002>('KTX0002/Get/'+that.giuong).subscribe(dataa=>{
          ////////////console.log(dataa)
          that.giuongdetail=dataa
          $('#editgiuongmodal').modal();
        })
      })
      //////////////////
      $('#updatebedinfo').click(function (e) {//////////////console.log(e.which)
        that.rest.PutDataToAPI<result< KTX0002>>(that.giuongdetail,'KTX0002/update').subscribe(dataa=>{
          ////////////console.log(dataa)
          if(dataa.code=="OK"){
            var l=that.listgiuong.filter(c=>{return c.KTX0002_ID===dataa.data.KTX0002_ID})
            if(l.length!=0){
              l[0].ten=dataa.data.ten;
              l[0].ghichu=dataa.data.ghichu;
              $('#editgiuongmodal').modal('hide');
            }
            
          }
          
        })
      })
      $('.filter').change(function () {
        that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall/' + $('#listkhu').val() + '/' + $('#listtoanhash').val() + '/' + $('#listtangsh').val()).subscribe(data => {
          //////////////console.log(data)
          that.phong=0
          that.listphong = []
          that.listgiuong = []
          that.listphong = data.filter(c => { return c.type === 4 })
          let l=[]
          that.listphongf=[]
          that.listphong.forEach(f=>{
            if(l.indexOf(f.idcha)==-1){
              l.push(f.idcha)
              that.listphongf.push([])
            }
          })
          l.forEach((h,index)=>{
            that.listphong.forEach(f=>{
              if(f.idcha==h){
                that.listphongf[index].push(f)
              }
            })
          })
         // ////////////console.log(that.listphongf)
          that.ktx01out.emit(that.listphong)
        })
      })
      ////////////////////////
      $('#themtoanha').click(function () {
        that.isaddtoanha = true;
        that.notify = "Thêm tòa nhà"
        that.palahol = "Tên tòa nhà"
        $('#khuvuc').css('display', '')
        $('#formaddtoanhatang').modal();
      })
     
      ////////////////////////themphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphongthemphong
      $('#themphongthemphong').click(function (e) {
        e.stopPropagation()
        if ($('#listtangsh').val() == '0') {
          alert('Bạn hãy chọn Tầng trước khi tạo phòng!')
          return
        }
        if ($('#listkhu').val() == 'a') {
          alert('Bạn hãy chọn khu vực trước khi tạo phòng!')
          return
        }
        if ($('#listtoanhash').val() == '0') {
          alert('Bạn hãy chọn tòa nhà trước khi tạo phòng!')
          return
        }
        $('#khuvuc2').val($('#listkhu').val())
        $('#toa2').val($('#listtoanhash').val())
        $('#tang2').val($('#listtangsh').val())
        $('#tenphong').val($('#listtoanhash>option:selected').text()+ '-')
        $('#themphongmodal2').modal();
      })
      ////////////////////////
      $('#themkhoa').click(function (e) {
        e.stopPropagation()
        if (that.phong == 0) {
          alert('Bạn hãy chọn phòng trước khi thêm khóa')
          return
        }
        ////////////console.log(that.listkhoa)
          that.listkhoaadd=[]
          that.listkhoaadd.push(new KTX0003({ktx0001_id:that.phong}))
        $('#themkhoamodal').modal();
      })
      ////////////////////////
      $('#themgiuong').click(function (e) {
        e.stopPropagation()
     
      })
      ////////////////////////
      $('#luuphong').click(function () {
        let kt01 = new KTX0001();
        let kt02: KTX0001[] = [];
        kt01.ghichu = $('#ghichu2').val()
        kt01.ten = $('#tenphong').val()
        kt01.thutu = 999
        kt01.khu = $('#listkhu').val()
        kt01.idcha = $('#listtangsh').val()
        kt01.type = 4
        kt01.capbac = $('#loai').find('option:selected').val()
        kt01.slot = $('#soluongchochua').val()
        kt01.KTX0011=null
        if ($('#soluongchochua').val() < 1 || $('#soluongchochua').val() > 10) {
          alert('Số lượng không hợp lệ')
          return
        }
        kt01.trangthai = true
        kt02.push(kt01)
        that.rest.PostDataToAPI<result<KTX0001>[]>(kt02, 'KTX0001/add').subscribe(data => {
          data.forEach(vla => {
            if (vla.code == "OK") {
              ////////////console.log(vla.data)
              that.listphong.push(vla.data)
              //$('#themphongmodal2').modal('hide');
              let ten:string=$('#tenphong').val()
              ten=ten.substring(ten.indexOf('-')+1)
              $('#tenphong').val($('#listtoanhash>option:selected').text()+ '-'+(Number(ten) +1))
            }else{
            alert(vla.mess)
            }
          })
        })

      })
      ////////////////////////
      var khutemp: KTX0001[] = []
      var toatemp: KTX0001[] = []
      $('#listkhu').change(function () {
        that.listtang = []
        khutemp = []
        khutemp = that.listktx0001.filter(c => { return (c.khu === $('#listkhu').val() || $('#listkhu').val() === 'a') })
        that.listtoanha = khutemp.filter(c => { return c.type === 2 })
        $('#listtoanhash').change()
      })
      ////////////////////////
      $('#listtoanhash').change(function () {
        toatemp = []
        toatemp = khutemp.filter(c => { return (c.idcha === Number($('#listtoanhash').val()) || $('#listtoanhash').val() == '0') })
        that.listtang = toatemp.filter(c => { return c.type === 3 })
        //////////////console.log(toatemp)
      })
      ////////////////////////
      $('#listtangsh').change(function () {


      })
      function filttergiuong(){
        that.rest.GetDataFromAPI<KTX0002[]>('KTX0002/Getall/'+that.phong).subscribe(data=>{
          that.listgiuong=[]
          //////////////console.log(data)
              that.listgiuong=data
          that.ktx02out.emit(that.listgiuong)
        })
      }
      function filtterkhoa(){
        that.rest.GetDataFromAPI<KTX0003[]>('KTX0003/Get/onPhong/'+that.phong).subscribe(data=>{
          that.listkhoa=[]
          //////////////console.log(data)
          that.listkhoa=data
          that.ktx03out.emit(that.listkhoa)
        })
      }
      ////////////////////////
      $('.cardcard').on('click', '.phongclick', function (e) {
        e.stopPropagation()
        e.stopImmediatePropagation()
        that.phong = $(this).attr('id')
        that.tenphong = $(this).attr('title')
        $(this).parent().find('.card').removeClass('select')
        $(this).parent().find('.card').removeClass('text-white')
        $(this).addClass('select')
        $(this).addClass('text-white')
        filttergiuong()
        filtterkhoa()
        //////////////console.log(that.listphong.filter(c=>{return c.KTX0001_ID===Number($(this).attr('id'))})[0])
        that.ktx01oneout.emit(that.listphong.filter(c=>{return c.KTX0001_ID===Number($(this).attr('id')) })[0])
      })
      ////////////////////////
      $('#divtoshow').on('click', '#viewinforgiuong', function () {
        // $(this).parent().find('.card').removeClass('bg-info')
        // $(this).parent().find('.card').removeClass('text-white')
        // $(this).addClass('bg-info')
        // $(this).addClass('text-white')
        $('#giuonginfo').modal()
      })
      ////////////////////////
      $('#updateroominfo').click(function () {
        that.rest.PutDataToAPI<result<KTX0001>>(that.phongdetail, 'KTX0001/Update').subscribe(data => {
          ////////////console.log(data)
          if (data.code == "OK") {
            let k = that.listphong.filter(c => { return c.KTX0001_ID === data.data.KTX0001_ID })[0]
            k.KTX0001_ID = k.KTX0001_ID
            k.ten = data.data.ten
            k.ghichu = data.data.ghichu
            k.slot = data.data.slot
            k.idcha = data.data.idcha
            k.khu = data.data.khu
            k.capbac = data.data.capbac
            k.thutu = data.data.thutu
            k.trangthai = data.data.trangthai;
            k.type = data.data.type
            if(data.data.KTX0002!=null)
            data.data.KTX0002.forEach(vc=>{
              var l=that.listgiuong.filter(c=>{return c.KTX0002_ID===vc.KTX0002_ID})
              if(l.length==0){
                that.listgiuong.push(vc)
              }
            })
            $('#editphong').modal('hide')
          }
          else {
            alert(data.mess)
          }
        })
      })
      ///////////////////////////////////hidecolumn
        $('#hidecolumn>button').click(function(){
          $('#hidecolumn>button').removeClass('active')
          $(this).addClass('active')
          if($(this).index()==0) {
            $('.tab2').css('display','none')
            $('.tab1').css('display','')
          }else if($(this).index()==1) {
            $('.tab1').css('display','none')
            $('.tab2').css('display','')
          }
        })
      ///////////////
      $('#listkhu').change()
      $('#hidecolumn>button:eq(1)').click()
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $('.tab1').on('click','table>tr>td>button:not(.del)',function(Event){
        Event.stopPropagation()
        Event.preventDefault()
        Event.stopImmediatePropagation()
        if($(this).find('i').hasClass('fa-edit')){
          $(this).parent().parent().find('input,textarea').removeClass('none').removeAttr('disabled')
          $(this).find('i').removeClass('fa-edit').addClass('fa-save')
        }else{
          let id=$(this).parent().parent().find('input[name=ID]').val()
          var f=that.listktx0001.filter(c=>{return c.KTX0001_ID===Number(id) })[0]
          that.rest.PutDataToAPI<result< KTX0001>>(f,'KTX0001/Update2').subscribe(data=>{
            ////////////console.log(data)
            if(data.code=="OK"){
              f.ten=data.data.ten
              $(this).parent().parent().find('input,textarea').addClass('none').attr('disabled',true)
              $(this).find('i').removeClass('fa-save').addClass('fa-edit')
            }
          })
        }
      })
      ///////////////////////////////////    
      $('.tab1').on('click','table>tr>td>button:not(.edit)',function(Event){
        Event.stopPropagation()
        Event.preventDefault()
        Event.stopImmediatePropagation()
        if(!confirm('Bạn muốn xóa: '+$(this).parent().parent().find('input[name=ID]').attr('title'))){
          return false
        }
          let id=$(this).parent().parent().find('input[name=ID]').val()
          that.rest.GetDataFromAPI<result< KTX0001>>('KTX0001/Delete/'+id).subscribe(data=>{
            ////////////console.log(data)
            if(data.code=="OK"){
              that.listtoanha.splice(that.listktx0001.indexOf(that.listktx0001.filter(c=>{return c.KTX0001_ID==id})[0]),1)
              that.listtang.splice(that.listktx0001.indexOf(that.listktx0001.filter(c=>{return c.KTX0001_ID==id})[0]),1)
              that.listktx0001.splice(that.listktx0001.indexOf(that.listktx0001.filter(c=>{return c.KTX0001_ID==id})[0]),1)
            }
          })
      })
      ///////////////////////////////////    
      $('.tab1').on('click','ul>li',function(){
        $(this).parent().find('li').removeClass('actived')
        $(this).addClass('actived')
      })
      ///////////////////////////////////   
      $('.tab1').on('click','table>tr',function(Event){        
       
        $(this).parent().find('tr').removeClass('actived')
        $(this).addClass('actived')
      })
      ///////////////////////////////////
      $('#tab1-khu').on('click','li',function(){
        $('#listkhu').val($(this).attr('value'))
        $('#listkhu').change()
      })
      ///////////////////////////////////
      $('#tab1-toa').on('click','tr',function(){
        //////////////console.log($(this).find('input').attr('name'))
        $('#listtoanhash').val(that.listtoanha[$(this).attr('id')].KTX0001_ID)
        $('#listkhu').change()
      })
      /////////////////////////////////// ////////////////////////
      $('#themtang2').click(function() {
        if ($('#tab1-toa>.actived').length== 0) {
          alert('Bạn hãy chọn tòa nhà trước nhé')
          return
        }
        that.isaddtoanha = false;
        that.notify = "Thêm tầng cho tòa nhà: " +$('#tab1-toa>.actived').find('input').val()
        that.palahol = "Tên tầng"
        $('#khuvuc').css('display', 'none')
        $('#formaddtoanhatang').modal();
      })
      /////////////////////////////////// ////////////////////////
      $('#themtoanha2').click(function() {
        if ($('#tab1-khu>.actived').length== 0) {
          alert('Bạn hãy chọn khu trước nhé')
          return
        }
        that.isaddtoanha = true;
        that.notify = "Thêm tòa nhà cho khu: " +$('#tab1-khu>.actived').text()
        $('#khuvuc').val($('#tab1-khu>.actived').attr('value'))
        that.palahol = "Tên tòa nhà"
        $('#formaddtoanhatang').modal();
      })
      ////////////////////////
      $('#formaddtoanhatang').on('click', '#luutoanha', function () {
        let kt01 = new KTX0001();
        let kt02: KTX0001[] = [];
        kt01.ghichu = $('#ghichu').val()
        kt01.khu = $('#listkhu').val()
        kt01.ten = $('#tentoanha').val()
        kt01.thutu = 999
        kt01.idcha = $('#tab1-toa>.actived').find('input[name=ID]').val()
        if (that.isaddtoanha)
          kt01.type = 2
        else
          kt01.type = 3
        kt01.trangthai = true
        kt02.push(kt01)
        that.rest.PostDataToAPI<result<KTX0001>[]>(kt02, 'KTX0001/add').subscribe(data => {
          data.forEach(vla => {
            if (vla.code == "OK") {
              if (that.isaddtoanha){
                that.listtoanha.push(vla.data)
                that.listktx0001.push(vla.data)
              }
              else {
                that.listktx0001.push(vla.data)
                that.listtang.push(vla.data)
              }
            }
            else{
              alert(vla.mess)
            }
          })
        })
      })
      //////////////////////////////////////edit taisancodinh
      
    ///////////////
          var row=null
          var rowtr=null
          $('.table-click').on('click','.edititem',function(Event){
            Event.stopPropagation()
            if(row==null){
              $(this).find('.fa-edit').removeClass('fa-edit').addClass('fa-save')
            row=$(this).parent().parent().find('.none')
            rowtr=$(this).parent().parent()
            row.removeClass('none')
            row.removeAttr('disabled')
            }else{
              that.rest.PutDataToAPI<result<KTX0011 >[]>(that.phongdetail.KTX0011,'KTX0011/edit').subscribe(vals=>{
                vals.forEach(val=>{
                  if(val.code=='OK'){
                  }
                  else alert(val.mess)
                })
                    $(this).find('.fa-save').removeClass('fa-save').addClass('fa-edit')
                    row.addClass('none')
                    row.attr('disabled',true)
                    row=null
              })
            }
          })
      /////////////////////////themtaisancodinh
      $('#themtaisancodinh').click(function(){
        // that.rest.Get<result< WH0006[]>>('http://192.84.100.207/adminapi/api/wh_admin/r1_loaisanphamgetbyselect').subscribe(data=>{
        //   that.listdanhmuctaisan=data.data
        //    that.rest.Get<result< WH0007[]>>('http://192.84.100.207/adminapi/api/wh_admin/r1_sanphamgetbyselect').subscribe(data=>{
        //     that.listhanghoatemp=data.data
        //       $('#themtaisancodinhMODAL').modal()
        //     })
        // })
        that.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getall').subscribe(data=>{
           that.listdanhmuctaisan=data.filter(c=>{ return c.loai===1})
           $('#themtaisancodinhMODAL').modal()
        })
       
        
      })
      /////////////////////////themtaisancodinh
      $('#danhmucloaisanpham').change(function(){
        //that.listhanghoa=that.listhanghoatemp.filter(c=>{return c.WH0006_ID==$('#danhmucloaisanpham').val()})
      })
      /////////////////////////themtaisancodinh
      $('#luudanhmuctaisan').click(function(){
        that.rest.PostDataToAPI<result<KTX0011>[]>(that.listdanhmuctaisan,"KTX0011/add/"+that.phongdetail.KTX0001_ID).subscribe(data=>{
          that.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall/'+that.phong).subscribe(dataa=>{
            that.phongdetail=dataa[0]
            $('#themtaisancodinhMODAL').modal('hide')
          })
        })
      })
    })////////////end ready function
  }
    public listdanhmuctaisan:KTX0010[]=[]
    delete(event:KTX0011){
      if(!confirm('Bạn có chắc chăn muốn xóa: '+event.KTX0010.ten+' ra khỏi phòng: '+this.phongdetail.ten))return false
      this.rest.PutDataToAPI<result<KTX0011 >>(event,'KTX0011/delete').subscribe(val=>{
          if(val.code=='OK'){
            this.phongdetail.KTX0011.splice(this.phongdetail.KTX0011.indexOf(event),1)
          }
          else alert(val.mess)
      })
    }
    deleteitemdanhmuc(event){
      this.listdanhmuctaisan.splice(this.listdanhmuctaisan.indexOf(event),1)
    }
    hiddencard($event){
     if($('.'+$event).find('.card-body').css('display')!='none') {
       $('.'+$event).find('.card-body').css('display','none')
       $('.'+$event).css({'width':'100px',"height":"100px"})
    }
      else{ $('.'+$event).find('.card-body').css('display','')
       $('.'+$event).css({'width':'250px',"height":"auto"})}
    }
    addkhoanew( ){
      this.listkhoaadd.push(new KTX0003({KTX0001_ID:this.phong}))
    }
    removekhoanew( element){
      this.listkhoaadd.splice(this.listkhoaadd.indexOf(element),1)
    }
    luukhoa(){
      this.rest.PostDataToAPI<result<KTX0003>[]>(this.listkhoaadd,'KTX0003/Add').subscribe(data=>{
        ////////////console.log(data)
        data.forEach(val=>{
          if(val.code=="OK"){
            this.listkhoa.push(val.data)
          }else{
            alert(val.mess)
          }
        })
        $('#themkhoamodal').modal('hide')
      })
    }
  deleteallpeople(even) {
    this.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall/' + this.phong).subscribe(dataa => {
      if (confirm("Bạn có chắc chắn xóa hết người trong phòng: " + dataa[0].ten)) {
        this.rest.PostDataToAPI<result<KTX0002>[]>(this.listgiuong, 'QLSP/DeleteBed').subscribe(data => {
          data.forEach(val => {
            if (val.code == "OK") {
              var l=this.listgiuong.filter(c=>{return c.KTX0002_ID===val.data.KTX0002_ID})
              if(l.length!=0){
                l[0].KTX0020=null;
                l[0].trangthai=false
              } 
              var k=this.listphong.filter(c=>{return c.KTX0001_ID===val.data.KTX0001_ID})
              if(k.length!=0){
                k[0].slotuse--
              }
            } else {
              //alert(data.mess)
            }
          })
        })
      }
    })
  }
  public listkhoaedit:KTX0003[]=[]
  editkhoaclick(){
    this.listkhoaedit=this.listkhoa
    
    $('#SUAkhoamodal').modal()
  }
  addkhoanew2(){
    this.rest.PostDataToAPI<result<KTX0003>[]>([new KTX0003({KTX0001_ID:this.phong,})],"KTX0003/Add").subscribe(datas=>{
      datas.forEach(data => {
        if(data.code=="OK"){
          this.listkhoaedit.push(data.data)
        }
      })
    })
  }
  removekhoanew2( element:KTX0003){
    if(confirm("Bạn chắc chắn muốn xóa mã khóa tủ này?")){
      if(element.KTX0003_ID!=null){
        element.KTX0001=null
        this.rest.PostDataToAPI<result<KTX0003>[]>([element],"KTX0003/delete").subscribe(datas=>{
          datas.forEach(data => {
            if(data.code=="OK"){
              var l=this.listkhoa.filter(c=>{return c.KTX0003_ID===data.data.KTX0003_ID})
              if(l.length!=0){
                this.listkhoa.splice(this.listkhoa.indexOf(l[0]),1)
                //this.listkhoaedit.splice(this.listkhoaedit.indexOf(element),1)
              }
            }
          });
        })
      }else
      this.listkhoaedit.splice(this.listkhoaedit.indexOf(element),1)
    }
  }
  luukhoa2(){
    this.listkhoaedit.forEach(kf=>{
      kf.KTX0001=null
    })
    this.rest.PostDataToAPI<result<KTX0003>[]>(this.listkhoaedit,"KTX0003/update").subscribe(datas=>{
      datas.forEach(data => {
        if(data.code=="OK"){
        }else{
          var l=this.listkhoa.filter(c=>{return c.KTX0003_ID===data.data.KTX0003_ID})
          if(l.length!=0){
            l[0].MaKhoa=data.data.MaKhoa
            l[0].SoTu=data.data.SoTu
            l[0].ghichu=data.data.ghichu
          }
        }
      })
      $('#SUAkhoamodal').modal('hide')
    })
  }
  parseInt(h){
    return ~~h
  }
}
