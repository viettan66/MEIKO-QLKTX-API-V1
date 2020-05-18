import { Component, OnInit, Input } from '@angular/core';
import { RM0015 } from 'src/app/TUYENDUNG/Models/RM0015';
import { result } from 'src/app/QLKTX/models/result';
import { RESTService } from 'src/app/Service/rest.service';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { RM0006 } from 'src/app/TUYENDUNG/Models/RM0006';
import { RM0013 } from 'src/app/TUYENDUNG/Models/RM0013';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0007 } from 'src/app/TUYENDUNG/Models/RM0007';
import { RM0001 } from 'src/app/TUYENDUNG/Models/RM0001';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { async } from 'rxjs/internal/scheduler/async';
declare var $: any

@Component({
  selector: 'app-danhsachdanhgia',
  templateUrl: './danhsachdanhgia.component.html',
  styleUrls: ['./danhsachdanhgia.component.css']
})
export class DanhsachdanhgiaComponent implements OnInit {
@Input() MKV9999_ID
@Input()disabled
  public start:number=0
  public step:number=20
  public filterketqua:any='all'
  public listRM0015: RM0015[] = []
  public listRM0006: RM0006[] = []
  public listRM0007: RM0007[] = []
  public listRM0001: RM0001[] = []
  public listMKV9998: MKV9998[] = []
  public listphongid:string[] = []
  public rm0010in: RM0010 = new RM0010()
  public user:MKV9999=JSON.parse(localStorage.getItem('KTX_User'))
  constructor(public rest: RESTService) { }

  async ngOnInit() {
    this.listRM0007 = await this.rest.PostDataToAPI<RM0007[]>({MKV9999_ID:this.user.MKV9999_ID},"RM0007/GetallMKV999ID").toPromise()
    this.getdata()
   
  }
  filterketquafunction($event){
    if($event.target.value=='all'){this.filterketqua='all'
  return}
    this.filterketqua=($event.target.value)==="TRUE"
    ////////console.log(this.filterketqua)
  }
  showungvien(element: RM0015) {
    if (element.RM0010 != null) {
      this.rm0010in = element.RM0010
      $('#modalungvien').modal()
    }
  }
  close() {
    $("#modalungvien").modal('hide')
  }

  async danhgia(element:RM0015,element2:RM0006){{
    if(this.listRM0007.filter(c=>{return c.RM0006_ID===element2.RM0006_ID}).length==0){{
      alert("Bạn không có quyền đánh giá mục này, hãy liên hệ với Nhân sự.")
      return false
    }}
    if(element.trangThai==true){{
      alert("Ứng viên này đã hoàn thành đánh giá, Nếu bạn muốn đánh giá lại, hãy liên hệ với bộ phận HR.")
      return false
    }}
   await this.danhgiaconnect(element,element2)
  }}
  async danhgiaconnect(element:RM0015,element2:RM0006,ketQua?:boolean){
    if(element2.RM0013==null){
      let temp:RM0013=new RM0013()
      temp.MKV9999_ID=this.user.MKV9999_ID
      temp.RM0006_ID=element2.RM0006_ID
      temp.RM0015_ID=element.RM0015_ID
      temp.ghiChu=""
      temp.nhanXet=""
      temp.ketQua=true
      temp.trangThai=true
      let datas= await this.rest.PostDataToAPI<result<RM0013>[]>([temp],"RM0013/add").toPromise()
      datas.forEach(data=>{
        if(data.code=="OK"){
          element2.RM0013.RM0013_ID=data.data.RM0013_ID
        }else{
          alert(data.mess)
        }
        //////////console.log(datas)
      })
    }else{
      
      element2.RM0013.ketQua=!element2.RM0013.ketQua
      if(ketQua!=null)element2.RM0013.ketQua=ketQua
      let datas= await this.rest.PostDataToAPI<result<RM0013>[]>([element2.RM0013],"RM0013/add").toPromise()
      datas.forEach(data=>{
        if(data.code=="OK"){
          element2.RM0013=data.data
        }else{
          alert(data.mess)
        }
        //////////console.log(datas)
      })
    }
    
    this.updateRM0015(element)
  }
  public thisRM0015:RM0015=new RM0015()
  async hoidongphongvan(element:RM0015){
   await this.checkele(element)
    this.thisRM0015=element
    $('#hoidongphongvan').modal()
  }
  async checkele(element:RM0015){
    element.RM0006.forEach(l=>{
      if(l.RM0013==null)l.RM0013=new RM0013({RM0015_ID:element.RM0015_ID,MKV9999_ID:this.user.MKV9999_ID,RM0006_ID:l.RM0006_ID})
    })
  }
 async suachitietdanhgia( element:RM0015){
   await this.checkele(element)
    this.thisRM0015=element
    
    $('#suachitietdanhgia').modal()
  }
 async saveeditdanhgia(){
   let listtemp:RM0013[]=[]
    this.thisRM0015.RM0006.forEach(val=>{
      listtemp.push(val.RM0013)
    })
      let datas = await this.rest.PostDataToAPI<result<RM0013>[]>(listtemp, "RM0013/add").toPromise()
      datas.forEach(data => {
        if (data.code == "OK") {
         let l= this.thisRM0015.RM0006.filter(c=>{return c.RM0006_ID===data.data.RM0006_ID})
         if(l.length>0)l[0].RM0013 = data.data
        } else {
          alert(data.mess)
        }
        //////////console.log(datas)
      })
      $('#suachitietdanhgia').modal('hide')
    this.updateRM0015(this.thisRM0015)
  }
 async updateRM0015(element:RM0015){
    let k=await this.rest.GetDataFromAPI<RM0015>("RM0015/Getall2/"+element.RM0015_ID).toPromise()
    //////////console.log(k)
    element.ketQua=k.ketQua
  }
  public phongid='all'
  bophanchange($event){
    this.phongid=$event.target.value
  }
  public vitriid='all'
  vitrichange($event){
    this.vitriid=$event.target.value
  }
  
  checkRM0006_ID(RM0006_ID){
    if(this.listRM0007.filter(c=>{return c.RM0006_ID===RM0006_ID}).length==0) return false
    else return true
  }
  chooserow(element:RM0015){
    element.check=element.check==null?true:(!element.check)
  }
  public checkall:boolean=false
  chooserowall(){
    this.listRM0015.forEach(val=>{val.check=this.checkall})
  }
 public filtertype ='false'
  async filter($event){
   await this.getdata()
  }
  checkper(element2:RM0006){
    if(this.listRM0007.filter(c=>c.RM0006_ID===element2.RM0006_ID).length==0){
      alert('Bạn không có quyền đánh giá mục này, hãy liên hệ với Nhân sự.')
      element2.RM0013.nhanXet=''
      return false
    }
  }
  async getdata() {
    this.listRM0015=[]
    this.listRM0001=[]
    this.listRM0006=[]
    this.listMKV9998=[]
    this.listphongid=[]
    this.listRM0015 = await this.rest.PostDataToAPI<RM0015[]>({ type: true, MKV9999_ID: this.MKV9999_ID, trangthai: this.filtertype }, "RM0015/Getalldanhgia").toPromise()
    for(const o of this.listRM0015){
      await this.checkele(o)
    }
    this.listRM0015.map(x=>{
      x['ten']=x.RM0010!=null?(x.RM0010.HODEM+' '+x.RM0010.TEN):''
      x['ngaysinh']=x.RM0010!=null?(x.RM0010.NGAYSINH):''
      x['vitri1']=x.RM0010!=null?(x.RM0010.RM0001!=null?x.RM0010.RM0001.tenCongViec:""):''
    })
    ////////console.log(this.listRM0015)
    if (this.listRM0015.length > 0) {
      this.listRM0015[0].RM0006.forEach(val => {
        this.listRM0006.push(new RM0006({ RM0006_ID: val.RM0006_ID, maTieuChiDG: val.maTieuChiDG, tenTieuChiDG: val.tenTieuChiDG }))
      })
    }
    this.listRM0015.forEach(val => {
      if (val.RM0010.RM0001 != null) {
        if (this.listRM0001.filter(c => { return c.RM0001_ID === val.RM0010.RM0001.RM0001_ID }).length == 0)
          this.listRM0001.push(val.RM0010.RM0001)
      }
      if (val.RM0010['RM0001_2'] != null) {
        if (this.listRM0001.filter(c => { return c.RM0001_ID === val.RM0010['RM0001_2'].RM0001_ID }).length == 0)
          this.listRM0001.push(val.RM0010['RM0001_2'])
      }
      if (val.RM0010.bophanid != null)
        this.listphongid.push(val.RM0010.bophanid)
    })
    const uni = new Set(this.listphongid)
    this.listphongid = [...uni]
    for(const f of this.listphongid){
      let kkl=await this.rest.PostDataToAPI<MKV9998>({ id: f }, "MKV9998/Getall").toPromise()
      if(kkl!=null)
      this.listMKV9998.push(kkl)
    }
    ////////console.log(this.listMKV9998)
  }
  async hoanthanhdanhgia() {
    var arrtemp = this.listRM0015.filter(c => { return c.check === true })
    arrtemp.forEach(val => { val.trangThai = true })
    let datas = await this.rest.PostDataToAPI<result<RM0015>[]>(arrtemp, 'RM0015/update2').toPromise();
    //////////console.log(datas)
    datas.forEach(val => {
      if (val.code == "OK") {
        this.listRM0015.splice(this.listRM0015.indexOf(this.listRM0015.filter(c => { return c.RM0015_ID === val.data.RM0015_ID })[0]), 1)
      }
    })
  }
  async danhgialai() {
    var arrtemp = this.listRM0015.filter(c => { return c.check === true })
    arrtemp.forEach(val => { val.trangThai = false })
    let datas = await this.rest.PostDataToAPI<result<RM0015>[]>(arrtemp, 'RM0015/update2').toPromise();
    //////////console.log(datas)
    datas.forEach(val => {
      if (val.code == "OK") {
        this.listRM0015.splice(this.listRM0015.indexOf(this.listRM0015.filter(c => { return c.RM0015_ID === val.data.RM0015_ID })[0]), 1)
      }
    })
  }
  async danhGiaTruotAll(){
    await this.danhGiaAll(false)
   }
   async danhGiaDatAll(){
     await this.danhGiaAll(true)
    }
  danhGiaAll(ketQua:boolean){
    let arrtemp=this.listRM0015.filter(c=>{return (c.check===true&&c.trangThai!=true)})
    arrtemp.map( x=>{
      this.listRM0007.forEach(val=>{
        x.RM0006.filter(c=>{return c.RM0006_ID===val.RM0006_ID}).forEach(async b=>{
          await this.danhgiaconnect(x,b,ketQua)
        })
      })
    })
    alert("Đã đánh giá "+arrtemp.length+' ứng viên.')
  }
  
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  getlist($event){
    this.listRM0015=$event
  }
  async test(RM0013){
    //////////console.log(RM0013.nhanXet)
    let datas= await this.rest.PostDataToAPI<result<RM0013>[]>([RM0013],"RM0013/add").toPromise()
  }
}
