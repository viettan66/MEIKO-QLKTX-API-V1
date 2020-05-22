import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { FingerPrints } from 'src/app/Models/FingerPrints';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { MKV8002 } from 'src/app/Models/MKV8002';
import { result } from '../../models/result';
import { async } from 'rxjs/internal/scheduler/async';
import { merge } from 'rxjs';
import { KTX0052 } from '../../models/KTX0052';
declare var $: any

@Component({
  selector: 'app-qlrvc',
  templateUrl: './qlrvc.component.html',
  styleUrls: ['./qlrvc.component.css']
})
export class QlrvcComponent implements OnInit {
    constructor(public rest: RESTService) { }
  public listMKV9999 = []
  public listMKV9999207: MKV9999[] = []
  public listKTX0052:KTX0052[] = []
  public start = 0;
  public tab = 0
  public step = 50;
  public listMKV8002: MKV8002[] = []
  public newnhaan = new MKV8002()
  public loading = true
  async ngOnInit() {
    this.newnhaan.port = '4370'
    this.newnhaan.commkey = '0'
    this.newnhaan.type = 2
    this.newnhaan.trangthai = true
    this.newnhaan.ip = '192.84.100.xxx'
    this.listMKV8002 = await this.rest.PostDataToAPI<MKV8002[]>({ type: 2, trangthai: true }, 'MKV8002/Getall').toPromise()
    this.listMKV9999207 = await this.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1').toPromise()
    this.listKTX0052=await this.rest.GetDataFromAPI<KTX0052[]>("KTX0052/Getall").toPromise()
    this.loading=false
  }
  
 async delete(){
   if(!confirm("Bạn có chắc chắn muốn xóa dữ liệu?"))return false
  this.listMKV8002.map(async x=>{
    let data=await this.rest.PostDataToAPI<any>({ip:x.ip,port:x.port,commkey:x.commkey,startdate:this.startdate,enddate:this.enddate},'FingerPrint/Deletedata').toPromise()
    //////////console.log(data)
  })
   
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
    if (this.startdate == '') {
      alert('Bạn phải chọn thời gian bắt đầu')
      return false
    }
    if (this.enddate == '') {
      alert('Bạn phải chọn thời gian kết thúc')
      return false
    }
    let data = await this.rest.PostDataToAPI<any[]>({ip:this.listMKV8002,  startdate: this.startdate, enddate: this.enddate,style:2 }, 'KTX0050/Getall').toPromise()

    this.listdatadatabase = $.merge(this.listdatadatabase, data)
    let newdate=this.enddate.slice(0,10).replace(/-/g,'')
    let starttime=this.startdate.slice(0,10).replace(/-/g,'')
    this.listdatadatabase.map(x=>{
      x.phong='z'
      x.ten='z'
      x.iddd=Number(x.User_ID)
      x.list.push(newdate)
      x.list.unshift (starttime)
      x.step=0
      for(let i=-1;i<x.list.length-1;i++){
        if(Number(x.list[i+1])-Number(x.list[i])>x.step)x.step=Number(x.list[i+1])-Number(x.list[i])
      }
      x.step--
    })
    this.listdatadatabase.map(async x=>{
      if(x.MKV9999==null){
          x.User_ID = "00000000".substring(0, 6 - x.User_ID.length) + x.User_ID
        for (const t of this.listMKV9999207.filter(c => { return c.manhansu === x.User_ID })) {
          t.matkhau = "123456"
          ////////////console.log(await this.rest.PostDataToAPI<result<MKV9999>>(t, 'Account/add').toPromise())
          x.MKV9999 = t
        x.id=x.MKV9999.manhansu
        x.ten=x.MKV9999.hodem+' '+x.MKV9999.ten
        }
      }else{
        x.id=x.MKV9999.manhansu
        x.phong=x.MKV9999.email
        x.ten=x.MKV9999.hodem+' '+x.MKV9999.ten
      }
      this.listKTX0052.filter(c=>c.User_ID===x.User_ID).map(xp=>{x.MKV9999=xp;x.ten=xp.hodem+' '+xp.ten})
    })
    ////////////console.log(this.listdatadatabase)
    this.listMKV9999=this.listdatadatabase;
    // this.listMKV9999.map(async x => {
    //   let kk = await this.rest.GetDataFromAPI<any>('KTX0001/GetMKV9999_ID/'+(x.MKV9999!=null?x.MKV9999.manhansu:x.User_ID)).toPromise()
    //   if(kk!=null)x.phong=kk.ten
    // })
    ////////////console.log("done")
    this.loading = false

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
      ////////////console.log(dataa)
      if (dataa.code == "OK") {
        {
          element = dataa.data
        }
      }
    }
  }
  Downloadtable(){
    let temp=this.step
    this.step=10000
    setTimeout(() => {
      this.rest.ExportTOExcel(document.getElementById('export'),"Danh sách thanh toán tiền ăn KTX",null,false)
      this.step=temp
    }, 3000);
    
  }
  
  keysearch=''
  search(element){
    if(element.MKV9999!=null){
      if(element.MKV9999.manhansu.indexOf(this.keysearch)!=-1)return true
      if((element.MKV9999.hodem+" "+element.MKV9999.ten).indexOf(this.keysearch)!=-1)return true
      if(element.MKV9999.cmtnd_so.indexOf(this.keysearch)!=-1)return true
      return false
    }else{
      if(element.User_ID.indexOf(this.keysearch)!=-1)return true
      return false

    }
    
  }
}
