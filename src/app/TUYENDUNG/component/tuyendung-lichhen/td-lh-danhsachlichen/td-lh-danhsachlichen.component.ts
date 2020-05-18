import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { RM0015 } from 'src/app/TUYENDUNG/Models/RM0015';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { RM0008 } from 'src/app/TUYENDUNG/Models/RM0008';
import { RM0015A } from 'src/app/TUYENDUNG/Models/RM0015A';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from 'src/app/QLKTX/models/result';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { RM0001 } from 'src/app/TUYENDUNG/Models/RM0001';
import { Mail } from 'src/app/Models/Mail';
declare var $:any

@Component({
  selector: 'app-td-lh-danhsachlichen',
  templateUrl: './td-lh-danhsachlichen.component.html',
  styleUrls: ['./td-lh-danhsachlichen.component.css']
})
export class TdLhDanhsachlichenComponent implements OnInit {
@Input()MKV9999_ID
@Input()phong_id
@Input()disabled
  constructor(public rest:RESTService) { }
public listRM0015:RM0015[]=[]
public listRM0008:RM0008[]=[]
public listMKV9998:MKV9998[]=[]
public listRM0001: RM0001[] = []
public rm0010in:RM0010=new RM0010()
public start:number=0
public step:number=20
public user:MKV9999=new MKV9999()
 async ngOnInit() {
   this.user=JSON.parse(localStorage.getItem('KTX_User'))
   let arrtemp=[]
    this.listRM0015=await this.rest.PostDataToAPI<RM0015[]>({type:false,MKV9999_ID:this.MKV9999_ID,phong_id:this.phong_id},"RM0015/Getall").toPromise()
    this.listRM0008=await this.rest.GetDataFromAPI<RM0008[]>("RM0008/Getall").toPromise()
       //////////console.log(this.listRM0015)
  //  this.listRM0015.forEach(val=>{
  //    if(val.RM0010.bophanid!=null)
  //     arrtemp.push(val.RM0010.bophanid)
  //  })
  //  arrtemp=[...new Set(arrtemp)]
  //   arrtemp.forEach(async val=>{
      // this.listMKV9998.push(await this.rest.PostDataToAPI<MKV9998>({id:val},"MKV9998/Getall").toPromise())
      this.listMKV9998=await this.rest.PostDataToAPI<MKV9998[]>({},"MKV9998/Getall").toPromise()
    // })
    ////////console.log(this.listRM0015)
    this.listRM0015.forEach(val=>{
      if(val.RM0010.RM0001!=null){
        if(this.listRM0001.filter(c=>{return c.RM0001_ID===val.RM0010.RM0001.RM0001_ID}).length==0)
          this.listRM0001.push(val.RM0010.RM0001)
      }
      if(val.RM0010['RM0001_2']!=null){
        if(this.listRM0001.filter(c=>{return c.RM0001_ID===val.RM0010['RM0001_2'].RM0001_ID}).length==0)
          this.listRM0001.push(val.RM0010['RM0001_2'])
      }
    })
  }
  getstartdate($event,element:RM0015){
    element.thoiGianPhongVan=$event
  }
  showungvien(element:RM0015){
    if(element.RM0010!=null){
      this.rm0010in=element.RM0010
      $('#modalungvien').modal()
    }
  }
  close(){
    $("#modalungvien").modal('hide')
  }
 async edititem(element:RM0015){
    this.thisrm0015=element
    var show=$('#tr'+element.RM0015_ID).find('.show')
    var hide=$('#tr'+element.RM0015_ID).find('.hide')
    show.addClass('hide').removeClass('show')
    hide.addClass('show').removeClass('hide')
    if($('#edit'+element.RM0015_ID).find('i').hasClass('fa-edit'))$('#edit'+element.RM0015_ID).find('i').removeClass('fa-edit').addClass('fa-save')
    else{
      $('#edit'+element.RM0015_ID).find('i').removeClass('fa-save').addClass('fa-edit')
      //this.thisrm0015.thoiGianPhongVan=this.thisrm0015.ngayPV+' '+this.thisrm0015.thoiGianPV
      //////////console.log(this.thisrm0015)
     let data= await this.rest.PutDataToAPI<result< RM0015>>(this.thisrm0015,'RM0015/update').toPromise()
     if(data.code=="OK"){
       this.thisrm0015['RM0008']=data.data['RM0008']
       ////////////////////////////////////////////////////
       for(const x of element.RM0015A){
        let mail:Mail=new Mail()
        mail.from=this.user.email
        mail.to=x.MKV9999.email
        mail.subject="[HR] Thay đổi lịch phỏng vấn | 面接スケジュールの変更"
        mail.bobdy="Dear "+(x.MKV9999.gioitinh?"Mr. ":"Ms. ")+x.MKV9999.hodem+' '+x.MKV9999.ten+`.
Bạn nhận được một thông báo về thay đổi lịch phỏng vấn từ bộ phận HR.
Thông tin chi tiết:
\t- Thời gian: `+element.thoiGianPhongVan+`
\t- Địa điểm: `+element['RM0008'].DiaDiem+`
\t- Ứng viên:\n\t\t`+element.RM0010.HODEM+' ' +element.RM0010.TEN+`
\nĐây là email tự động, vui lòng không trả lời email này. Nếu có yêu cầu nào khác, hãy liên hệ với bộ phận HR theo mail: `+this.user.email+`
------------------------------------------------------------------
親愛なる `+(x.MKV9999.gioitinh?"Mr. ":"Ms. ")+x.MKV9999.hodem+' '+x.MKV9999.ten+`.
人事部から面接スケジュール変更の通知を受け取る。
詳細：
\t-時間：`+element.thoiGianPhongVan+`
\t-場所：`+element['RM0008'].DiaDiem+`
\t-候補者：\n\t\t`+element.RM0010.HODEM+' ' +element.RM0010.TEN+`
\nこれは自動メールです。 このメールには返信しないでください。 他にご要望がございましたら、人事部までメールでお問い合わせください:`+this.user.email+`
  `
       let kj=await this.rest.PostDataToAPI<result<any>>(mail,"Mail/Sendmail").toPromise()
       ////////console.log(kj)
      }
       //////////////////////////////////////////////////
     }
    } 
  }
 async deleteitem(element:RM0015){
    if(confirm("Bạn muốn xóa lịch hẹn này?")){
      let data= await this.rest.GetDataFromAPI<result< RM0015>>('RM0015/delete/'+element.RM0015_ID).toPromise()
     if(data.code=="OK"){
        this.listRM0015.splice(this.listRM0015.indexOf(element),1)
     }else{
       alert(data.mess)
     }
    }
  }
  removeaccount(element:RM0015,button:RM0015A){
    element.RM0015A.splice(element.RM0015A.indexOf(button),1)
  }
  public thisrm0015:RM0015=null
  selectaccount(element:RM0015){
    this.thisrm0015=element
    this.listMKV9999choose=[]
    this.listMKV9999choose=(this.thisrm0015.RM0015A.map(x=>{return x.MKV9999}))
    //////////console.log(this.listMKV9999choose)
    $('#select-account-modal').modal()
  }
  pre(){
    if(this.start==0)return false
    this.start--
  }
  nex(){
    if((this.start+1)*this.step>=this.listRM0015.length)return false
    this.start++
  }
  public listMKV9999choose:MKV9999[]=[]

  chooseaccount(element:MKV9999){
    if(this.thisrm0015.RM0015A.indexOf(this.thisrm0015.RM0015A.filter(c=>{return c.MKV9999_ID===element.MKV9999_ID})[0] )==-1){
      let temp:RM0015A=new RM0015A()
      temp.MKV9999=element
      temp.MKV9999_ID=element.MKV9999_ID
      temp.RM0015_ID=this.thisrm0015.RM0015_ID
      temp.ghiChu=this.thisrm0015.ghiChu
      temp.trangThai=this.thisrm0015.trangThai
      temp.check=true
      this.thisrm0015.RM0015A.push(temp)
      $('#tracc'+element.manhansu).addClass('actived')
    }else{
      this.thisrm0015.RM0015A.splice(this.thisrm0015.RM0015A.indexOf(this.thisrm0015.RM0015A.filter(c=>{return c.MKV9999_ID===element.MKV9999_ID})[0]),1)
      $('#tracc'+element.manhansu).removeClass('actived')
    }
  }
  Choose(element:RM0015){
    element.check=element.check==null?true:!element.check
  }
  public checkall:boolean=false
  Chooseall(){
    this.listRM0015.forEach(val=>val.check=this.checkall)
  }
  public userinfor:RM0015A=new RM0015A()
  info(button:RM0015A){
    this.userinfor=button
    //////////console.log(this.userinfor )
   $('#userinfor') .modal()
  }
  public bophanid='all'
  public vitriid='all'

  bophanchange(id) {
    this.bophanid = id.target.value
  }
  vitrichange($event){
    this.vitriid=$event.target.value
  }
 async agree(){
   let listtemp:RM0015A[]=[]
    let arrtemp=this.listRM0015.filter(c=>{return c.check===true})
    arrtemp.forEach(async val=>{
      let l= val.RM0015A.filter(c=>{return c.MKV9999_ID===this.user.MKV9999_ID})
      if(l.length>0){
        l[0].trangThai=true
        l[0].ghiChu='Đồng ý lúc'+new Date()
        listtemp.push(l[0])
      }
    })
    let data=await this.rest.PostDataToAPI<result<RM0015A>[]>(listtemp,'RM0015A/update').toPromise()
    //////////console.log(listtemp)
    //////////console.log(data)
    data.forEach( async val=>{
      if(val.code=="OK"){
        let l= this.listRM0015.filter(c=>{return c.RM0015_ID===val.data.RM0015.RM0015_ID})
        if(l.length!=0){
          l[0].RM0015A.map(item=>{
            if(item.RM0015A_ID==val.data.RM0015A_ID)item=val.data
          })
        }
      }
    })
  }
  download(tableexport){
    this.rest.ExportTOExcel(document.getElementById(tableexport),'List')
  }
  
  getstart($event){
    this.start=$event
  }
  getstep($event){
    this.step=$event
  }
  // getlist($event){
  //   this.listdon=$event
  // }
}
