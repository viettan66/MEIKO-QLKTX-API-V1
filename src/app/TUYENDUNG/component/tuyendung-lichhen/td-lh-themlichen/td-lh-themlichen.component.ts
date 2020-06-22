import { Component, OnInit } from '@angular/core';
import { RM0008 } from 'src/app/TUYENDUNG/Models/RM0008';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { result } from 'src/app/QLKTX/models/result';
import { RM0015 } from 'src/app/TUYENDUNG/Models/RM0015';
import { element } from 'protractor';
import { Mail } from 'src/app/Models/Mail';
declare var $:any

@Component({
  selector: 'app-td-lh-themlichen',
  templateUrl: './td-lh-themlichen.component.html',
  styleUrls: ['./td-lh-themlichen.component.css']
})
export class TdLhThemlichenComponent implements OnInit {
public listRM0008:RM0008[]=[]
public listRM0010:RM0010[]=[]
public listMKV9999:MKV9999[]=[]
public listMKV9999choose:MKV9999[]=[]
public thoigianphongvan=null
public diadiem=null
public start:number=0
public step:number=20
public user:MKV9999
  constructor(public rest:RESTService) { }

  async ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("KTX_User"))
    this.listRM0008= await this.rest.GetDataFromAPI<RM0008[]>('RM0008/Getall').toPromise()
  }
  selectaccount(){
    $("#select-account-modal").modal()
  }
  getlistdata($event){
    this.listMKV9999choose=$event
  }
  removechoose(element:MKV9999){
      this.listMKV9999choose.splice(this.listMKV9999choose.indexOf(element),1)
  }
  getlistRM0010($event:RM0010[]){
    this.listRM0010=$event
    //////////////console.log($event)
  }
  async themlichhen(){
    if(this.user.email==null||this.user.email==''){
      if(confirm("Bạn chưa có thông tin eMail. Bạn có muốn thiết lập?\n Bỏ qua để tiếp tục.")){
      let k= await prompt("Email: ",'email@meiko-elec.com')
      this.user.email=k
      let dataa=await  this.rest.PutDataToAPI<result<MKV9999>>(this.user,"Account/updateinfo").toPromise()
      if(dataa.code=="OK"){localStorage.setItem("KTX_User",JSON.stringify(dataa.data))
      this.user.email=dataa.data.email}
      }
    }
    if(this.listMKV9999choose.filter(x=>(x.email===null||x.email==='')).length>0){
      if(!confirm("Một số thành viên hội đồng phỏng vấn chưa được cập nhật email.\nHọ sẽ không nhận được lịch qua mail.\nBạn Muốn tiếp tục tạo lịch hẹn?"))return false
    }
    if(this.thoigianphongvan==null){
      alert("Bạn chưa thiết lập thời gian phỏng vấn.")
      return false
    }
    if(this.diadiem==null||this.diadiem=='null'){
      alert("Bạn chưa chọn địa điểm phỏng vấn.")
      return false
    }
    if(this.listRM0010.filter(c=>{return c.check===true}).length==0){
      alert("Bạn chưa chọn ứng viên phỏng vấn.")
      return false
    }
    ////////////console.log(this.listMKV9999choose)
    for(const x of this.listMKV9999choose){
      let mail:Mail=new Mail()
      mail.from=this.user.email
      mail.to=x.email
      mail.subject="[HR] Lịch phỏng vấn ứng viên | 面接スケジュール"
      mail.bobdy="Dear "+(x.gioitinh?"Mr. ":"Ms. ")+x.hodem+' '+x.ten+`.
Bạn nhận được một thông báo về lịch phỏng vấn nhân sự từ bộ phận HR.
Thông tin chi tiết:
\t- Thời gian: `+this.thoigianphongvan+`
\t- Địa điểm: `+this.listRM0008.filter(x=>x.RM0008_ID===Number(this.diadiem) )[0].DiaDiem+`
\t- Ứng viên:\n\t\t`+this.listRM0010.filter(xxx=>xxx.check===true).map((ccc,index)=>((index+1)+": "+ccc.HODEM+' '+ccc.TEN)).join('\n\t\t')+`
\nĐây là email tự động, vui lòng không trả lời email này. Nếu có yêu cầu nào khác, hãy liên hệ với bộ phận HR theo mail: `+this.user.email+`
------------------------------------------------------------------
親愛なる `+(x.gioitinh?"Mr. ":"Ms. ")+x.hodem+' '+x.ten+`.
人事部門から従業員面接スケジュールの通知を受け取ります。
詳細：
\t-時間：`+this.thoigianphongvan+`
\t-場所：`+this.listRM0008.filter(x=>x.RM0008_ID===Number(this.diadiem) )[0].DiaDiem+`
\t-候補者：\n\t\t`+this.listRM0010.filter(xxx=>xxx.check===true).map((ccc,index)=>((index+1)+": "+ccc.HODEM+' '+ccc.TEN)).join('\n\t\t')+`
\nこれは自動メールです。 このメールには返信しないでください。 他にご要望がございましたら、人事部までメールでお問い合わせください:`+this.user.email+`
`
     let kj=await this.rest.PostDataToAPI<result<any>>(mail,"Mail/Sendmail").toPromise()
    }
    let data= await this.rest.PostDataToAPI<result< RM0015>[]>({thoigian:this.thoigianphongvan,diadiem:this.diadiem,RM0010:this.listRM0010.filter(c=>{return c.check===true}),
  MKV9999:this.listMKV9999choose},'RM0015/add').toPromise()
  let count=0
    data.filter(val=>val.code==="OK").map(val=>{
       let l= this.listRM0010.filter(c=>{return c.RM0010_ID===val.data.RM0010_ID})
       if(l.length>0){
         count++
         this.listRM0010.splice(this.listRM0010.indexOf(l[0]),1)
       }
    })
    alert("Đã thêm lịch hẹn cho "+count+" ứng viên.")
  }
  Choose(element:RM0015){
    element.check=element.check==null?true:!element.check
  }
  getstartdate($event){
    this.thoigianphongvan=$event
  }
}
