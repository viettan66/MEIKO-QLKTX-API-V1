import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { A0028 } from 'src/app/TUYENDUNG/Models/A0028';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { yeucau } from 'src/app/TUYENDUNG/Models/yeucau';
import * as Global from '../../../../Service/global.service'
import { result } from 'src/app/QLKTX/models/result';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0008 } from 'src/app/TUYENDUNG/Models/RM0008';
import { Mail } from 'src/app/Models/Mail';
import { RM0015 } from 'src/app/TUYENDUNG/Models/RM0015';
import { RM0013 } from 'src/app/TUYENDUNG/Models/RM0013';
import { RM0007 } from 'src/app/TUYENDUNG/Models/RM0007';
import { A0028E } from 'src/app/TUYENDUNG/Models/A0028E';
declare var $: any

@Component({
  selector: 'app-danhsachtuyendung',
  templateUrl: './danhsachtuyendung.component.html',
  styleUrls: ['./danhsachtuyendung.component.css']
})

export class DanhsachtuyendungComponent implements OnInit {
  @Input() bophanID
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
  @Input() checks
  constructor(public rest: RESTService) {
    this.thisA0028.RM0010 = []
    this.localimage = Global.localimage
    
  }
  localimage = ""
  filtertrangthai = 'all'
  filtercapbac = 'all'
  loading = true
  public listdon: A0028[] = []
  public listbophan: MKV9998[] = []
  public start: number = 0
  public step: number = 20
  listRM0008: any
  async ngOnInit() {
    
    this.listRM0007 = await this.rest.PostDataToAPI<RM0007[]>({MKV9999_ID:this.user.MKV9999_ID},"RM0007/GetallMKV999ID").toPromise()
    this.listRM0008 = await this.rest.GetDataFromAPI<RM0008[]>('RM0008/Getall').toPromise()
    this.listbophan = await this.rest.PostDataToAPI<MKV9998[]>({}, 'MKV9998/Getall').toPromise()
    let arrtemp: any[] = []
    let data = await this.rest.Get207<yeucau>(Global.HostSmartOffice + 'api/Work/R1_TuyenDungCompleted/' + (this.bophanID == null ? 'all' : this.bophanID)).toPromise()
    for (const element of data.data) {
      element.A0028D = data.data2.filter(c => { return c.A0028_ID === element.A0028_ID })[0]
      //   element.RM0001 = await this.rest.GetDataFromAPI<RM0001>('RM0001/Getid/' + (element.T005C == null ? '0' : element.T005C)).toPromise()
      //   element.RM0002 = await this.rest.GetDataFromAPI<RM0002>('RM0002/Getid/' + (element.A0028D.C014C == null ? '0' : element.A0028D.C014C)).toPromise()
      //   element.RM0003 = await this.rest.GetDataFromAPI<RM0003>('RM0003/Getid/' + (element.A0028D.C009C == null ? '0' : element.A0028D.C009C)).toPromise()
      //   element.RM0004 = await this.rest.GetDataFromAPI<RM0004>('RM0004/Getid/' + (element.A0028D.C010C == null ? '0' : element.A0028D.C010C)).toPromise()
      //   arrtemp.push(element.T098C)
    }
    let noti = await this.rest.PostDataToAPI<result<A0028>[]>(data.data, "A0028/add").toPromise()
    ////////////console.log(noti)
    let datas = await this.rest.PostDataToAPI<A0028[]>({phongid:this.bophanID},"A0028/Getall").toPromise()
    // for(const x of data.data){
    //   x.RM0010=await this.rest.PostDataToAPI<RM0010[]>({A0028_ID:x.A0028_ID},'RM0010/Getall').toPromise()
    // }
    // arrtemp = [...new Set(arrtemp)]
    // arrtemp.forEach(async val => {
    //   if (val != null) this.listbophan.push(await this.rest.PostDataToAPI<MKV9998>({ id: val }, 'MKV9998/Getall').toPromise())

    // })
    datas.map(d=>
      d['conno']=(Number(d.A0028D.C001C)+Number(d.A0028D.C005C))-d['ok']
      )
    //////////console.log(datas)
    this.loading = false
    this.listdon = datas
  }
  async  updateyeucau(value) {
    if (this.listdon.filter(c => c.check).length == 0) return
    if (!confirm("Bạn có chắc chắn muốn chuyển trạng thái yêu cầu đã chọn sang " + (value == 1 ? "Đang tuyển" : "Hoàn thành"))) return
    this.listdon.filter(c => c.check).map(x => { x.trangThai = value; x.check = null })
    let data = await this.rest.PostDataToAPI<any>(this.listdon, "A0028/hoanthanhdanhgia").toPromise()
    //////////console.log(data)
  }
  trclick(id) {
    $('.trtwo:not(#' + id + ')').addClass('trnone')

    if ($('#' + id).hasClass('trnone'))
      $('#' + id).removeClass('trnone')
    else
      $('#' + id).addClass('trnone')

    $('.trclick').removeClass('actived')
    $('#TRR' + id).addClass('actived')
    $('.tbody').removeClass('border')
    $('#tbody' + id).addClass('border')
  }
  public phongid = 'all'
  bophanchange($event) {
    this.phongid = $event.target.value
  }
  // public vitriid='all'
  // vitrichange($event){
  //   this.vitriid=$event.target.value
  // }

  pre() {
    if (this.start == 0) return false
    this.start--
  }
  nex() {
    if ((this.start + 1) * this.step >= this.listdon.length) return false
    this.start++
  }
  getstep($event) {
    this.step = $event
  }
  getstart($event) {
    this.start = $event
  }
  getlist($event) {
    this.listdon = $event
  }
  public thisA0028: A0028 = new A0028

  getungvienmodal(element) {
    this.thisA0028 = element; this.isactive()
    $("#modalungviens").modal()
  }
  async getlistRM0010all($event) {
  }
  public listrm0010: RM0010[] = []
  async getlistRM0010($event: RM0010[]) {

    if (this.thisA0028.A0028_ID == null) {
      this.listrm0010 = $event
      return
    }
    $event.filter(c => c.check).map(x => {
      x.A0028_ID = this.thisA0028.A0028_ID
    })
    var k = await this.rest.PostDataToAPI<result<RM0010>[]>($event.filter(c => c.check), "RM0010/add").toPromise()

    k.filter(c => c.code === "OK").map(x => {
      $event.filter(f => f.RM0010_ID === x.data.RM0010_ID).map(m => $event.splice($event.indexOf(m), 1))
      this.thisA0028.RM0010.push(x.data)
    })
  }
  showRM0010(element) {
    this.thisA0028 = element
    $("#modalungvienshow").modal()

  }
  async listRM0010delete($event) {
    //////////console.log(this.listrm0010)
    $event.filter(c => c.check).map(x => {
      x.A0028_ID = null
    })
    var k = await this.rest.PostDataToAPI<result<RM0010>[]>($event.filter(c => c.check), "RM0010/add").toPromise()

    k.filter(c => c.code === "OK").map(x => {
      $event.filter(f => f.RM0010_ID === x.data.RM0010_ID).map(m => this.listrm0010.push(m))
      this.thisA0028.RM0010.filter(q => q.RM0010_ID === x.data.RM0010_ID).map(w => this.thisA0028.RM0010.splice(this.thisA0028.RM0010.indexOf(w), 1))
    })
  }
  checkallrow($event) {
    this.listdon.map(x => x.check = $event.target.checked)
  }
  async checkele(element:RM0015){
    element.RM0006.forEach(l=>{
      if(l.RM0013==null)l.RM0013=new RM0013({RM0015_ID:element.RM0015_ID,MKV9999_ID:this.user.MKV9999_ID,RM0006_ID:l.RM0006_ID})
    })
  }
listRM0006:any=[]
  async showinterview(element) {
    this.thisA0028 = element; 
    let data=await this.rest.GetDataFromAPI<A0028E[]>("A0028/getnguoiphongvan/"+this.thisA0028.A0028_ID).toPromise()
    //////////console.log(data)
    this.isactive()
    this.thisA0028['RM0015'] = await this.rest.PostDataToAPI<RM0015[]>({ A0028_ID: this.thisA0028.A0028_ID }, "RM0015/Getalldanhgia").toPromise()
    if(this.thisA0028['RM0015'].length!=0)
    this.listRM0006=this.thisA0028['RM0015'][0].RM0006
    for(const o of this.thisA0028['RM0015']){
      await this.checkele(o)
    }
   // //////////console.log(this.listRM0006)
    $('#modaldanhgia').modal()
  }
  isactive() {
    this.thisA0028['RM0010s'] = this.thisA0028.RM0010.filter(c => !c['isactive'])
    // //////////console.log(this.thisA0028['RM0010s'])
  }
  Createtimer(element) {
    this.thisA0028 = element; 
    this.isactive()
    $('#createtimer').modal()
  }
  thoigianphongvan = ''
  diadiemphongvan = 'null'
  public listaccountchoose: any
  getstartdate($event) {
    this.thoigianphongvan = $event
  }
  selectaccount() {
    $('#uyt').modal()
  }
  getlistdataacc($event) {
    this.listaccountchoose = $event
  }

  removechoose(element: MKV9999) {
    this.listaccountchoose.splice(this.listaccountchoose.indexOf(element), 1)
  }
  listRM0010show: any
  getlistRM0010show($event) {
    this.listRM0010show = $event
  }
  user = JSON.parse(localStorage.getItem("KTX_User"))
  caption='Đang đồng bộ dữ liệu, vui lòng chờ.'
  async themlichhen() {
    if (this.user.email == null || this.user.email == '') {
      if (confirm("Bạn chưa có thông tin eMail. Bạn có muốn thiết lập?\n Bỏ qua để tiếp tục.")) {
        let k = await prompt("Email: ", 'email@meiko-elec.com')
        this.user.email = k
        let dataa = await this.rest.PutDataToAPI<result<MKV9999>>(this.user, "Account/updateinfo").toPromise()
        if (dataa.code == "OK") {
          localStorage.setItem("KTX_User", JSON.stringify(dataa.data))
          this.user.email = dataa.data.email
        }
      }
    }
    if (this.listaccountchoose.filter(x => (x.email === null || x.email === '')).length > 0) {
      if (!confirm("Một số thành viên hội đồng phỏng vấn chưa được cập nhật email.\nHọ sẽ không nhận được lịch qua mail.\nBạn Muốn tiếp tục tạo lịch hẹn?")) return false
    }
    if (this.thoigianphongvan == null) {
      alert("Bạn chưa thiết lập thời gian phỏng vấn.")
      return false
    }
    if (this.diadiemphongvan == null || this.diadiemphongvan == 'null') {
      alert("Bạn chưa chọn địa điểm phỏng vấn.")
      return false
    }
    if (this.listRM0010show.filter(c => { return c.check === true }).length == 0) {
      alert("Bạn chưa chọn ứng viên phỏng vấn.")
      return false
    }
    this.loading=true
    this.caption="Đang gửi thư mời phỏng vấn qua mail. Xin vui lòng chờ."
    if(this.thisA0028.A0028E==null)this.thisA0028.A0028E=[]
    this.thisA0028.thoigian=this.thoigianphongvan
    this.thisA0028.RM0008_ID=Number(this.diadiemphongvan)
    this.thisA0028['diadiem']=await this.rest.GetDataFromAPI<RM0008>("RM0008/Get/"+this.thisA0028.RM0008_ID).toPromise()
    //this.thisA0028.A0028E.filter(c=>!this.listaccountchoose.map(d=>d.MKV9999_ID).includes(c.MKV9999_ID) ).map(c=>this.thisA0028.A0028E.push(new A0028E({MKV9999_ID:c.MKV9999_ID,A0028_ID:this.thisA0028.A0028_ID})))
    let arr=[]
    this.listaccountchoose.map(x=>{
      arr.push(new A0028E({MKV9999_ID:x.MKV9999_ID,A0028_ID:this.thisA0028.A0028_ID}))
    })
    //////////console.log(arr)
    let kjkjkjr=await this.rest.PostDataToAPI<result<any>>(this.thisA0028,"A0028/updatethoidiandiadiem").toPromise()
    let kjkjkj=await this.rest.PostDataToAPI<result<any>>(arr,"A0028/updatenguoiphongvan").toPromise()
    //////////console.log(kjkjkj)
    ////////////console.log(this.listaccountchoose)
    for (const x of this.listaccountchoose) {
      let mail: Mail = new Mail()
      mail.from = this.user.email
      mail.to = x.email
      mail.subject = "[HR] Lịch phỏng vấn ứng viên | 面接スケジュール"
      mail.bobdy = "Dear " + (x.gioitinh ? "Mr. " : "Ms. ") + x.hodem + ' ' + x.ten + `.
Bạn nhận được một thông báo về lịch phỏng vấn nhân sự từ bộ phận HR.
Thông tin chi tiết:
\t- Thời gian: `+ this.thoigianphongvan + `
\t- Địa điểm: `+ this.listRM0008.filter(x => x.RM0008_ID === Number(this.diadiemphongvan))[0].DiaDiem + `
\t- Ứng viên:\n\t\t`+ this.listRM0010show.filter(xxx => xxx.check === true).map((ccc, index) => ((index + 1) + ": " + ccc.HODEM + ' ' + ccc.TEN)).join('\n\t\t') + `
\nĐây là email tự động, vui lòng không trả lời email này. Nếu có yêu cầu nào khác, hãy liên hệ với bộ phận HR theo mail: `+ this.user.email + `
------------------------------------------------------------------
親愛なる `+ (x.gioitinh ? "Mr. " : "Ms. ") + x.hodem + ' ' + x.ten + `.
人事部門から従業員面接スケジュールの通知を受け取ります。
詳細：
\t-時間：`+ this.thoigianphongvan + `
\t-場所：`+ this.listRM0008.filter(x => x.RM0008_ID === Number(this.diadiemphongvan))[0].DiaDiem + `
\t-候補者：\n\t\t`+ this.listRM0010show.filter(xxx => xxx.check === true).map((ccc, index) => ((index + 1) + ": " + ccc.HODEM + ' ' + ccc.TEN)).join('\n\t\t') + `
\nこれは自動メールです。 このメールには返信しないでください。 他にご要望がございましたら、人事部までメールでお問い合わせください:`+ this.user.email + `
`
      let kj = await this.rest.PostDataToAPI<result<any>>(mail, "Mail/Sendmail").toPromise()
    }
    let data = await this.rest.PostDataToAPI<result<RM0015>[]>({
      thoigian: this.thoigianphongvan, diadiem: this.diadiemphongvan, RM0010: this.listRM0010show.filter(c => { return c.check === true }),
      MKV9999: this.listaccountchoose
    }, 'RM0015/add').toPromise()
    let count = 0
    data.filter(val => val.code === "OK").map(val => {
      let l = this.listRM0010show.filter(c => { return c.RM0010_ID === val.data.RM0010_ID })
      if (l.length > 0) {
        count++
        this.listRM0010show.splice(this.listRM0010show.indexOf(l[0]), 1)
      }
    })
    this.loading=false
    alert("Đã thêm lịch hẹn cho " + count + " ứng viên.")

  }
  async danhgiaelement(element) {
   
  }
  public listRM0007: RM0007[] = []
  check(element:RM0013){
     if(this.listRM0007.filter(c=>{return c.RM0006_ID===element.RM0006_ID}).length==0){{
     //alert("Bạn không có quyền đánh giá mục này, hãy liên hệ với Nhân sự.")
      return false
    }}
    if(element.trangThai==true){{
      //alert("Ứng viên này đã hoàn thành đánh giá, Nếu bạn muốn đánh giá lại, hãy liên hệ với bộ phận HR.")
      return false
    }}return true
  }
  async updateRM0013(element:RM0013,rm0015?){
    if(this.listRM0007.filter(c=>{return c.RM0006_ID===element.RM0006_ID}).length==0){{
      alert("Bạn không có quyền đánh giá mục này, hãy liên hệ với Nhân sự.")
      return false
    }}
    if(element.trangThai==true){{
      alert("Ứng viên này đã hoàn thành đánh giá, Nếu bạn muốn đánh giá lại, hãy liên hệ với bộ phận HR.")
      return false
    }}
    let data=await this.rest.PostDataToAPI<result<RM0013>[]>([element],'RM0013/add').toPromise()
    data.filter(c=>c.code==="OK").map(x=>{
      if(x.data.RM0006_ID==element.RM0006_ID)element.RM0013_ID=x.data.RM0013_ID
      
    })
    
    this.updateRM0015(rm0015)
  }
  async updateRM0015(element:RM0015){
    let k=await this.rest.GetDataFromAPI<RM0015>("RM0015/Getall2/"+element.RM0015_ID).toPromise()
    ////////////console.log(k)
    element.ketQua=k.ketQua
  }
  async updatecmtRM0015(element:RM0015){
    let k=await this.rest.PutDataToAPI<RM0015>(element,"RM0015/update").toPromise()
    //////////console.log(k)
    //element.ketQua=k.ketQua
  }
  async updateA0028(){
    let datas = await this.rest.PostDataToAPI<A0028>({A0028_ID:this.thisA0028.A0028_ID},"A0028/Getall").toPromise()
    this.thisA0028['ok']=datas['ok']
    this.thisA0028['wait']=datas['wait']
    this.thisA0028['conno']=(Number(datas.A0028D.C001C)+Number(datas.A0028D.C005C))-datas['ok']
    //////////console.log(datas)
    $('#modaldanhgia').modal('hide')
  }
  dowloadtable(){
   let kj= $('.trnone').find('tr')
   kj.css('display','none')
   this.rest.ExportTOExcel(document.getElementById('tabletoexport'),'Danh sách yêu cầu '+new Date(),null,true)
   kj.css('display','')
  }
  print(){
    window.print()
  }
}