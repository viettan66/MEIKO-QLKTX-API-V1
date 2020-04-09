import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { A0028 } from 'src/app/TUYENDUNG/Models/A0028';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { yeucau } from 'src/app/TUYENDUNG/Models/yeucau';
import * as Global from '../../../../Service/global.service'
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
    let data = await this.rest.Get207<yeucau>(Global.HostSmartOffice + 'api/Work/R1_TuyenDungCompleted/'+(this.bophanID==null?'all':this.bophanID)).toPromise()
    data.data.forEach(element => {
      element.A0028D = data.data2.filter(c => { return c.A0028_ID === element.A0028_ID })[0]
      arrtemp.push(element.T098C)
    });
    this.listdon = data.data
    arrtemp=[...new Set(arrtemp)]
    arrtemp.forEach(async val => {
      if (val != null) this.listbophan.push(await this.rest.PostDataToAPI<MKV9998>({ id: val }, 'MKV9998/Getall').toPromise())
    })
    console.log(this.listbophan)
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
}