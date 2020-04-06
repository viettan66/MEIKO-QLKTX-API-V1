import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { yeucau } from '../../Models/yeucau';
import* as Global from 'src/app/Service/global.service';
import { A0028 } from '../../Models/A0028';
import { RM0010 } from '../../Models/RM0010';
import { RM0001 } from '../../Models/RM0001';
declare var $:any

@Component({
  selector: 'app-ungvien',
  templateUrl: './ungvien.component.html',
  styleUrls: ['./ungvien.component.css']
})
export class UngvienComponent implements OnInit {
@Output('listRM0010')listRM0010=new EventEmitter<RM0010[]>()
  constructor(public rest:RESTService) { }
  public listdon:A0028[]=[]
  public bophanid=''
  public vitriid=''
  public listmkv9998:A0028[]=[]
  public listrm0001:A0028[]=[]
  public listrm0010:RM0010[]=[]
  public rm0010in:RM0010=new RM0010()

  async ngOnInit() {
    await this.rest.Get207<yeucau>(Global.HostSmartOffice+'api/Work/R1_TuyenDungCompleted/all').subscribe(data => {
      data.data.forEach(element => {
        element.A0028D=data.data2.filter(c=>{return c.A0028_ID===element.A0028_ID})[0]
        if(this.listmkv9998.filter(c=>{return c.T098C===element.T098C}).length==0)
        if(element.T098C!=null)
        this.listmkv9998.push(element)
      });
      this.listdon=data.data
      console.log(this.listdon)
    })
    this.listrm0010=await this.rest.PostDataToAPI<RM0010[]>({type:true},'RM0010/Getall').toPromise()
    console.log(this.listrm0010)
    this.listrm0010.forEach(val=>{
      val.i=0
      val.j=0
      Object.keys(val).forEach(g=>{
        if(val[g]==null)
        val.i+=1
          val.j+=1
      })
    })
    this.listRM0010.emit(this.listrm0010)
  }
  themungvien(){
    // if(this.bophanid==''||this.bophanid=='all'){
    //   alert('Bạn chưa chọn bộ phận cần thêm ứng viên.')
    //   return false
    // }
    // if(this.vitriid==''||this.vitriid=='all'){
    //   alert('Bạn chưa chọn vị trí cần thêm ứng viên.')
    //   return false
    // }
    $("#modalungvien").modal()
  }
  bophanchange(id) {
    this.bophanid = id.target.value
    if (this.bophanid != 'all')
      this.listrm0001 = this.listdon.filter(c => { return c.T098C === this.bophanid })
    else this.listrm0001 = this.listdon
  }
  vitrichange($event){
    this.vitriid=$event.target.value
   // console.log(this.bophanid)
  }
  getrm0010($event){
    $event.i=0
    $event.j=0
    Object.keys($event).forEach(g=>{
      if($event[g]==null)
      $event.i+=1
      $event.j+=1
    })
    let l=this.listrm0010.filter(c=>{return c.RM0010_ID===$event.RM0010_ID})
    if(l.length==0){
      this.listrm0010.push($event)
    }
    else{
      l[0]=$event
    }
    $("#modalungvien").modal('hide')
  }
  parseint(i){
    return parseInt(i)
  }
  public detailrm0010=new RM0010()
  showdetail(element:RM0010){
    this.rm0010in=element
    $("#modalungvien").modal()
  }
  close(){
    if(this.rm0010in.RM0010_ID!=null)
    this.rm0010in=new RM0010()
    $("#modalungvien").modal('hide')
  }
}
