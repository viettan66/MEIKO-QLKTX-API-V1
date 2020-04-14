import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { A0028 } from 'src/app/TUYENDUNG/Models/A0028';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { yeucau } from 'src/app/TUYENDUNG/Models/yeucau';
import * as Global from '../../../../Service/global.service'
import { RM0001 } from 'src/app/TUYENDUNG/Models/RM0001';
import { RM0002 } from 'src/app/TUYENDUNG/Models/RM0002';
import { RM0003 } from 'src/app/TUYENDUNG/Models/RM0003';
import { RM0004 } from 'src/app/TUYENDUNG/Models/RM0004';
import { async } from 'rxjs/internal/scheduler/async';
declare var $:any

@Component({
  selector: 'app-danhsachtuyendung',
  templateUrl: './danhsachtuyendung.component.html',
  styleUrls: ['./danhsachtuyendung.component.css']
})
export class DanhsachtuyendungComponent implements OnInit {
@Input() bophanID
  constructor(public rest:RESTService) { }
public listdon:A0028[]=[]
public listbophan:MKV9998[]=[]
public start:number=0
public step:number=20
  async ngOnInit() {
    console.log(this.bophanID)
    let arrtemp: any[] = []
    let data = await this.rest.Get207<yeucau>(Global.HostSmartOffice + 'api/Work/R1_TuyenDungCompleted/' + (this.bophanID == null ? 'all' : this.bophanID)).toPromise()
    Promise.all(data.data.map(async element => {
      element.A0028D = data.data2.filter(c => { return c.A0028_ID === element.A0028_ID })[0]
      element.RM0001 = await this.rest.GetDataFromAPI<RM0001>('RM0001/Getid/' + (element.T005C == null ? '0' : element.T005C)).toPromise()
      element.RM0002 = await this.rest.GetDataFromAPI<RM0002>('RM0002/Getid/' + (element.A0028D.C014C == null ? '0' : element.A0028D.C014C)).toPromise()
      element.RM0003 = await this.rest.GetDataFromAPI<RM0003>('RM0003/Getid/' + (element.A0028D.C009C == null ? '0' : element.A0028D.C009C)).toPromise()
      element.RM0004 = await this.rest.GetDataFromAPI<RM0004>('RM0004/Getid/' + (element.A0028D.C010C == null ? '0' : element.A0028D.C010C)).toPromise()
      arrtemp.push(element.T098C)
    })).then(df => {
      this.listdon = data.data
      arrtemp = [...new Set(arrtemp)]
      arrtemp.forEach(async val => {
        if (val != null) this.listbophan.push(await this.rest.PostDataToAPI<MKV9998>({ id: val }, 'MKV9998/Getall').toPromise())
       
      })

    })
  }
trclick(id){
  $('.trtwo:not(#'+id+')').addClass('trnone')

  if($('#'+id).hasClass('trnone'))
  $('#'+id).removeClass('trnone')
  else
  $('#'+id).addClass('trnone')

  $('.trclick').removeClass('actived')
  $('#TRR'+id).addClass('actived')
  $('.tbody').removeClass('border')
  $('#tbody'+id).addClass('border')
}
public phongid='all'
bophanchange($event){
  this.phongid=$event.target.value
}
// public vitriid='all'
// vitrichange($event){
//   this.vitriid=$event.target.value
// }

pre(){
  if(this.start==0)return false
  this.start--
}
nex(){
  if((this.start+1)*this.step>=this.listdon.length)return false
  this.start++
}
getstep ($event){
  this.step=$event
}
getstart ($event){
this.start=$event
}
getlist($event){
  this.listdon=$event
}
}