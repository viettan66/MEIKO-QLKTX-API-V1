import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { yeucau } from '../../Models/yeucau';
import * as Global from 'src/app/Service/global.service';
import { A0028 } from '../../Models/A0028';
import { RM0010 } from '../../Models/RM0010';
import { result } from 'src/app/QLKTX/models/result';
import { RM0001 } from '../../Models/RM0001';
declare var $: any

@Component({
  selector: 'app-ungvien',
  templateUrl: './ungvien.component.html',
  styleUrls: ['./ungvien.component.css']
})
export class UngvienComponent implements OnInit {
  @Input() rm0010show:RM0010[]
  @Input() button1
  @Input() button2
  @Input() button3
  @Input() button4
  @Input() button5
  @Input() button6
  @Input() button7
  @Input() button8
  @Input() button9
  @Input() button10
  @Input() button11
  @Input() button12
  @Input() button13
  @Input() emty
  @Input() ids
  @Input() sophieu
  @Output('listRM0010') listRM0010 = new EventEmitter<RM0010[]>()
  @Output('listRM0010delete') listRM0010delete = new EventEmitter<RM0010[]>()
  constructor(public rest: RESTService) { }
  public listdon: A0028[] = []
  public bophanid = 'all'
  public vitriid = 'all'
  public listmkv9998: A0028[] = []
  public listrm0001: any[] = []
  public listRM0001: RM0001[] = []
  public listrm0010: RM0010[] = []
  public listrm0010DUPLICATE: RM0010[] = []
  public rm0010in: RM0010 = new RM0010()
  public start: number = 0
  public step: number = 20

  async ngOnInit() {
    console.log(this.emty)
    await this.rest.Get207<yeucau>(Global.HostSmartOffice + 'api/Work/R1_TuyenDungCompleted/all').subscribe(data => {
      data.data.forEach(element => {
        element.A0028D = data.data2.filter(c => { return c.A0028_ID === element.A0028_ID })[0]
        if (this.listmkv9998.filter(c => { return c.T098C === element.T098C }).length == 0)
          if (element.T098C != null)
            this.listmkv9998.push(element)
      });
      this.listdon = data.data
      //console.log(this.listdon)
    })
    await this.getdatarm0010('all')
    this.bophanchange({target:{value:'all'}})
  }
  async getdatarm0010(type: any) {
    
    this.listrm0010 = await this.rest.PostDataToAPI<RM0010[]>({ type: type,emty:this.emty }, 'RM0010/Getall').toPromise()
    
    this.listRM0010.emit(this.listrm0010)
  }
  themungvien() {
    if(this.sophieu==null){
      alert('Bạn chưa chọn yêu cầu cần thêm ứng viện.')
      return false
    }
    this.rm0010in.sophieu = this.sophieu
    $("#"+(this.ids==null? "modalungvien":this.ids)).modal()
  }
  bophanchange(id) { 
    this.listRM0001=[]
    this.bophanid = id.target.value
    if (this.bophanid != 'all'){
      this.listrm0001 =[...new Set(this.listdon.filter(c => { return c.T098C === this.bophanid }).map(x=>{return x.T005C}))] 
      //console.log(this.listrm0001)
      this.listrm0001.forEach(async b=>{
        this.listRM0001.push(await this.rest.GetDataFromAPI<RM0001>('RM0001/Getid/'+b).toPromise())
      })
    }
    else  {
      this.listrm0001 =[...new Set(this.listdon.map(x=>{return x.T005C}))] 
    this.listrm0001.forEach(async b=>{
      this.listRM0001.push(await this.rest.GetDataFromAPI<RM0001>('RM0001/Getid/'+b).toPromise())
    })
    }
  }
  vitrichange($event) {
    this.vitriid = $event.target.value
    // //console.log(this.bophanid)
  }
  getrm0010($event) {
    if(this.rm0010show==null){
      let l = this.listrm0010.filter(c => { return c.RM0010_ID === $event.RM0010_ID })
      if (l.length == 0) {
        this.listrm0010.push($event)
      }
      else {
        l[0] = $event
      }
    }else{
      let l = this.rm0010show.filter(c => { return c.RM0010_ID === $event.RM0010_ID })
      if (l.length == 0) {
        this.rm0010show.push($event)
      }
      else {
        l[0] = $event
      }
    }
    
    $("#"+(this.ids==null? "modalungvien":this.ids)).modal('hide')
  }
  parseint(i) {
    return parseInt(i)
  }
  public detailrm0010 = new RM0010()
  showdetail(element: RM0010) {
    this.rm0010in = element
    console.log('fffffff')
    $("#"+(this.ids==null? "modalungvien":this.ids)).modal()
  }
  close(c,d?) {
    if (this.rm0010in.RM0010_ID != null)
      this.rm0010in = new RM0010()
      if(d!=null)if(!confirm(d))return false
    $("#"+c).modal('hide')
  }

  public checkall: boolean = false
  public checkalls: boolean = false
  Choose(element: RM0010, a?: boolean) {

    element.check = element.check == null ? true : !element.check
    if(this.rm0010show!=null)
    this.listRM0010.emit(this.rm0010show)
  }
  checkallitem($event) {
    //console.log( $event.target.checked)
    if(this.rm0010show!=null){
      this.rm0010show.forEach(val => val.check =$event.target.checked)
    }else{
      this.listrm0010.map(x=>x.check=$event.target.checked)
    }
    return false
  }
  checkallitems() {
    this.listrm0010DUPLICATE.forEach(val => val.check = this.checkalls)
    return false
  }

  download(tableID) {
    this.rest.ExportTOExcel(document.getElementById(tableID), 'Danh sách ứng viên ' + new Date())
  }
  download2(data,namefile) {
    this.rest.ExportTOExcelFromJson(data, namefile + new Date())
  }

  async save2(){
    let data = await this.rest.PostDataToAPI<result<RM0010>[]>(this.listrm0010DUPLICATE.filter(c=>c.check===true), "RM0010/add").toPromise()
    data.filter(c=>c.code==="OK").map(x=>{
      this.listrm0010DUPLICATE.filter(b=>b.CMTND_SO.toString()===x.data.CMTND_SO.toString()).map(h=>this.listrm0010DUPLICATE.splice(this.listrm0010DUPLICATE.indexOf(h),1))
      this.listrm0010.push(x.data)
    })
    alert("đã thêm "+data.length+" ưng viên.")
  }
  
  async upload() {
      this.listrm0010DUPLICATE=[]
    var listtemp: RM0010[] = await this.rest.ChooseFileExcel<RM0010[]>()
    listtemp.map(f=>{
      f.CMTND_SO=f.CMTND_SO+""
      f.MOBILE=f.MOBILE+""
      f.EMAIL=f.EMAIL+""
  })
    let dataf =await this.rest.PostDataToAPI<RM0010[]>({cmtnd:listtemp.filter(x=>x.CMTND_SO!="").map(x=>x.CMTND_SO),sdt:listtemp.filter(x=>x.MOBILE!="").map(x=>x.MOBILE),email:listtemp.filter(x=>x.EMAIL!="").map(x=>x.EMAIL),}, "RM0010/GetallCMTND").toPromise()
   
    let arr=listtemp.filter(c=>!dataf.map(v=>v.CMTND_SO ).includes(c.CMTND_SO))
    console.log(arr)
    arr=$.merge(arr,listtemp.filter(c=>{return c.RM0010_ID!=null}))
    let data = await this.rest.PostDataToAPI<result<RM0010>[]>(arr, "RM0010/add").toPromise()
    if(dataf.length>0){
      for(const hjk of listtemp.filter(c=>dataf.map(v=>v.CMTND_SO).includes(c.CMTND_SO))){
        if(hjk.sophieu==null)hjk.sophieu=0
        hjk.RM0001= await this.rest.GetDataFromAPI<RM0001>("RM0001/GetidA0028/"+hjk.sophieu) .toPromise()
      }
      this.listrm0010DUPLICATE=listtemp.filter(c=>((dataf.filter(x=>x.CMTND_SO!="").map(v=>v.CMTND_SO ).includes(c.CMTND_SO)||dataf.filter(x=>x.MOBILE!="").map(v=>v.MOBILE ).includes(c.MOBILE)||dataf.filter(x=>x.EMAIL!="").map(v=>v.EMAIL ).includes(c.EMAIL))&&c.RM0010_ID==null))
      // this.listrm0010DUPLICATE=$.merge(this.listrm0010DUPLICATE,listtemp.filter(c=>(dataf.filter(x=>x.MOBILE!="").map(v=>v.MOBILE ).includes(c.MOBILE)&&c.RM0010_ID==null)))
      // this.listrm0010DUPLICATE=$.merge(this.listrm0010DUPLICATE,listtemp.filter(c=>(dataf.filter(x=>x.EMAIL!="").map(v=>v.EMAIL ).includes(c.EMAIL)&&c.RM0010_ID==null)))
       console.log(this.listrm0010DUPLICATE)
      // console.log(this.listrm0010)
      if(this.listrm0010DUPLICATE.length>0)
      $('#ungvienduplicate').modal()
    }
    for(const val of data) {
      if (val.code == "OK") {
        var l = this.listrm0010.filter(c => { return c.RM0010_ID === val.data.RM0010_ID })
        if (l.length == 0)
          this.listrm0010.push(val.data)
        else {
          this.listrm0010.splice(this.listrm0010.indexOf(l[0]), 1)
          this.listrm0010.push(val.data)
        }
      }
    }
  }
  async xoavien() {
    let arrdelete = this.listrm0010.filter(c => { return c.check === true })
    if (arrdelete.length == 0) {
      alert('Bạn chưa chọn ứng viên nào để xóa')
      return false
    }
    if (!confirm("Bạn có chắc chắn muốn xóa " + arrdelete.length + ' ứng viên?')) return false
    let count = 0
    let data = await this.rest.PutDataToAPI<result<RM0010>[]>(arrdelete, 'RM0010/delete').toPromise()
    data.forEach(val => {
      if (val.code == "OK") {
        count++
        var l = this.listrm0010.filter(c => { return c.RM0010_ID === val.data.RM0010_ID }).map(x => { this.listrm0010.splice(this.listrm0010.indexOf(x), 1) })
      }
    })
    alert('Đã xóa ' + count + ' ứng viên.')
  }
  public ungvientype = "all"
  ungvientypechange($event) {
    this.getdatarm0010(this.ungvientype)
  }
  
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  getlist($event){
   //rm0010
  }
  getlistrm0010show($event){
    this.rm0010show=$event
  }
  ok(){
    this.listRM0010.emit(this.listrm0010)
  }
 deleteitem(){
  this.listRM0010delete.emit(this.rm0010show)
  }
 async updatecomment(element){{
  let data=await this.rest.PutDataToAPI<result<any>>(element,"RM0010/updatecomment").toPromise()
    console.log(data)
  }}
}
