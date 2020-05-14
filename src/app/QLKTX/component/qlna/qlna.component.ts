import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { FingerPrints } from 'src/app/Models/FingerPrints';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { MKV8002 } from 'src/app/Models/MKV8002';
import { result } from '../../models/result';
import { async } from 'rxjs/internal/scheduler/async';
import { merge } from 'rxjs';
import { KTX0052 } from '../../models/KTX0052';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { KTX0053 } from '../../models/KTX0053';
import { isPlatformBrowser } from '@angular/common';
import { KTX0049 } from '../../models/KTX0049';
declare var $: any

@Component({
  selector: 'app-qlna',
  templateUrl: './qlna.component.html',
  styleUrls: ['./qlna.component.css']
})
export class QlnaComponent implements OnInit {
    constructor(public rest: RESTService) { }
  public listMKV9999 = []
  public listKTX0053:KTX0053[] = []
  public listKTX0052:KTX0052[] = []
  public listMKV9999207: MKV9999[] = []
  public start = 0;
  public tab = 0
  public step = 30;
  public loaidanhsach = '1'
  public listMKV8002: MKV8002[] = []
  public newnhaan = new MKV8002()
  public loading = true
  async ngOnInit() {
    this.newnhaan.port = '4370'
    this.newnhaan.commkey = '0'
    this.newnhaan.type = 2
    this.newnhaan.trangthai = true
    this.newnhaan.ip = '192.84.100.xxx'
    this.listMKV8002 = await this.rest.PostDataToAPI<MKV8002[]>({ type: 1, trangthai: true }, 'MKV8002/Getall').toPromise()
    this.listMKV9999207 = await this.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1').toPromise()
    this.listKTX0053=await this.rest.GetDataFromAPI<KTX0053[]>("KTX0053/Getall").toPromise()
    this.loading=false
  }
  themnhaan() {
    $('#themnhaanmodal').modal()
  }
  async  save() {
    let data = await this.rest.PostDataToAPI<result<MKV8002>>(this.newnhaan, 'MKV8002/add').toPromise()
    if (data.code == "OK") {
      this.listMKV8002.push(data.data)
      $('#themnhaanmodal').modal('hide')
    }
  }
  async getdataa(choo?: boolean) {
    this.loading = true
    this.listMKV9999 = []
    this.listdatadatabase = []
    if (choo)
      this.listdatamachine = []
    if (this.startdate == '') { alert('Bạn phải chọn thời gian bắt đầu');return false }
    if (this.enddate == '') {  alert('Bạn phải chọn thời gian kết thúc');return false }
    let data = await this.rest.PostDataToAPI<any[]>({ip:this.listMKV8002,  startdate: this.startdate, enddate: this.enddate,style:1 }, 'KTX0050/Getall').toPromise()

    this.listdatadatabase = $.merge(this.listdatadatabase, data)
    for(const x of this.listdatadatabase){ x.ten='zzz'
      if(x.MKV9999==null){
          x.User_ID = "00000000".substring(0, 6 - x.User_ID.length) + x.User_ID
         let lej= this.listMKV9999207.filter(c => { return c.manhansu === x.User_ID })
        for (const t of lej) {
          t.matkhau = "123456"
          //////console.log(await this.rest.PostDataToAPI<result<MKV9999>>(t, 'Account/add').toPromise())
          x.MKV9999 = t
        x.id=x.MKV9999.manhansu
        x.ten=x.MKV9999.hodem+' '+x.MKV9999.ten
        }
        if(lej.length==0){
          this.listKTX0052.filter(c => { return c.User_ID === x.User_ID }).map(ffg=>x.MKV9999=ffg)
        }
      }else{
        x.id=x.MKV9999.manhansu
        x.ten=x.MKV9999.hodem+' '+x.MKV9999.ten
      }
    }
    //console.log(this.listdatadatabase)
    //this.listMKV9999=this.listdatadatabase;
    for(const x of this.listdatadatabase){
      if(x.User_ID==null)console.log(x)
      let tien=await this.rest.PostDataToAPI<any>({User_ID:x.User_ID,startdate:this.startdate,enddate:this.enddate},'KTX0049/GetPay').toPromise()
  
      x.thanhtoan=tien.thanhtien
    }
    let listtemp=[...new Set(this.listKTX0052.map(g=>g.User_ID))]
    for(const x of this.listdatadatabase.filter(c=>!listtemp.includes(c.User_ID))){
      x.thanhtienbuasang=x.thanhtienbuasang*1.1;
      x.thanhtienbuatrua=x.thanhtienbuatrua*1.1;
      x.thanhtienbuatoi=x.thanhtienbuatoi*1.1;
      x.thanhtoan=x.thanhtoan*1.1;
    }
    for(const x of this.listdatadatabase){
      x.tong=x.thanhtienbuasang+x.thanhtienbuatrua+x.thanhtienbuatoi
      x.thanhtien=x.tong-x.thanhtoan
    }
        
    this.filter()
    ////console.log("done")
    this.loading = false

  }
  filter(){this.listMKV9999=[]
        let listtemp=[...new Set(this.listKTX0052.map(g=>g.User_ID))]
        if(this.loaidanhsach=='1'){
          this.listMKV9999=this.listdatadatabase.filter(c=>!listtemp.includes(c.User_ID));
        }else
      
      if(this.loaidanhsach=='2')
      this.listMKV9999=this.listdatadatabase.filter(c=>listtemp.includes(c.User_ID));

    

  }
  async loadmachine(){
    let tempargs=[]
    let ip=""
    for(const val of this.listMKV8002){
      ip+=val.ip+" "
     tempargs=$.merge(tempargs, await this.rest.PostDataToAPI<result<MKV9999>>({ip:val.ip,port:val.port,commkey:val.commkey,startdate:this.startdate,enddate:this.enddate}, 'FingerPrints/Getdata').toPromise()) 
    }
    if(tempargs.length>0)
    this.rest.ExportTOExcelFromJson(tempargs,"Danh sách chấm vân tay từ "+this.startdate+" đến "+this.enddate+" của "+this.listMKV8002.length+' máy '+ip,"export")
    else alert("Không có dữ liệu...")
  }
  public listdatadatabase = []
  public listdatamachine = []
  public enddate = ''
  getenddaate($event) {
    this.enddate = $event
  }
  public startdate = ''
  getstartdate($event) {
    this.startdate = $event
  }
  getstart($event) {
    this.start = $event
  }
  getstep($event) {
    this.step = $event
  }
  getlist($event) {
    this.listMKV9999 = $event
  }
  getlistdata($event){
    this.listKTX0052=$event
  }
 async delete(){
  if(!confirm("Bạn có chắc chắn muốn xóa dữ liệu?"))return false
   this.listMKV8002.map(async x=>{
     let data=await this.rest.PostDataToAPI<any>({ip:x.ip,port:x.port,commkey:x.commkey,startdate:this.startdate,enddate:this.enddate},'FingerPrint/Deletedata').toPromise()
     ////console.log(data)
   })
    
  }
  async deleteitem(element) {
    if (!confirm('Bạn muốn xóa máy chấm vân tay "' + element.ten + '" này chứ?')) return false
    let dataa = await this.rest.PutDataToAPI<result<MKV8002>[]>([element], 'MKV8002/delete').toPromise()
    dataa.filter(c => { return c.code === "OK" }).forEach(dataa => {

      if (dataa.code == "OK") {
        {
          this.listMKV8002.splice(this.listMKV8002.indexOf(element), 1)
        }
      }
    })
  }
  async edititem(element: MKV8002) {
    if ($('#edit' + element.MKV8002_ID).find('i').hasClass('fa-edit')) {
      $('#row' + element.MKV8002_ID).find('input:text,select').removeClass('none').removeAttr('disabled')
      $('#edit' + element.MKV8002_ID).find('i').removeClass('fa-edit').addClass('fa-save')
    } else {
      $('#row' + element.MKV8002_ID).find('input:text,select').addClass('none').attr('disabled', true)
      $('#edit' + element.MKV8002_ID).find('i').removeClass('fa-save').addClass('fa-edit')
      let dataa = await this.rest.PutDataToAPI<result<MKV8002>>(element, 'MKV8002/update').toPromise()
      //////console.log(dataa)
      if (dataa.code == "OK") {
        {
          element = dataa.data
        }
      }
    }
  }
 
 async themmocthoigian(){
    let data= await this.rest.PostDataToAPI<result<KTX0053>>(new KTX0053(),'KTX0053/add').toPromise()
    if(data.code=="OK")this.listKTX0053.push(data.data)
  }
  getdateforelement($event,element:KTX0053){
element.ngay=$event
  }
 async edidmocthoigian(element:KTX0053){
    if ($('#editmocthoigian' + element.KTX0053_ID).find('i').hasClass('fa-edit')) {
      $('#editmocthoigiantr' + element.KTX0053_ID).find('input:text,select').removeClass('none').removeAttr('disabled')
      $('#editmocthoigian' + element.KTX0053_ID).find('i').removeClass('fa-edit').addClass('fa-save')
    } else {
      $('#editmocthoigiantr' + element.KTX0053_ID).find('input:text,select').addClass('none').attr('disabled', true)
      $('#editmocthoigian' + element.KTX0053_ID).find('i').removeClass('fa-save').addClass('fa-edit')
      let dataa = await this.rest.PutDataToAPI<result<KTX0053>>(element, 'KTX0053/update').toPromise()
      //////console.log(dataa)
      if (dataa.code == "OK") {
        {
          element = dataa.data
        }
      }
    }
  }
checkallelement($event){
  //console.log($event.target.checked)
  this.listMKV9999.map(x=>x.check=$event.target.checked)
  }
 async quyettoan(){
   if(!confirm("Bạn có chắc chắc muốn quyết toán cho "+this.listMKV9999.filter(c=>c.check).length+" người từ "+this.startdate+" đến "+this.enddate+"?"))return false

    let arr=[]
    this.listMKV9999.filter(c=>c.check).map(p=>{
      arr.push({User_ID:(p.User_ID),startdate:this.startdate,enddate:this.enddate,ghichu:'',trangthai:true})
    })
    //console.log(arr)
    let data=await this.rest.PostDataToAPI<result<KTX0049>[]>(arr,"KTX0049/add").toPromise()
    //console.log(data)
    alert("OK. hãy tải lại trang để đồng bộ lại dữ liệu.")
  }
  Downloadtable(){
    let temp=this.step
    this.step=10000
    setTimeout(() => {
      this.rest.ExportTOExcel(document.getElementById('export'),"Danh sách thanh toán tiền ăn KTX",null,false)
      this.step=temp
    }, 3000);
    
  }
}
