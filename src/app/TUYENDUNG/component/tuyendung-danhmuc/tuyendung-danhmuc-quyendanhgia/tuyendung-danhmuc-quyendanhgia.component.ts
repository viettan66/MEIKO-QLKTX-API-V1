import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0007 } from 'src/app/TUYENDUNG/Models/RM0007';
import { RM0006 } from 'src/app/TUYENDUNG/Models/RM0006';
import { result } from 'src/app/QLKTX/models/result';
declare var $: any

@Component({
  selector: 'app-tuyendung-danhmuc-quyendanhgia',
  templateUrl: './tuyendung-danhmuc-quyendanhgia.component.html',
  styleUrls: ['./tuyendung-danhmuc-quyendanhgia.component.css']
})
export class TuyendungDanhmucQuyendanhgiaComponent implements OnInit {

  constructor(public rest: RESTService) { }
  public listMKV9999: MKV9999[] = []
  public listRM0006: RM0006[]=[]
  public start:number=0
  public step:number=20
  public keysearch=''
  public phong_id='all'
  async ngOnInit() {
    this.listMKV9999 = await this.rest.GetDataFromAPI<MKV9999[]>('RM0007/Getall').toPromise()
    if (this.listMKV9999.length > 0) {
      this.listRM0006=this.listMKV9999[0].RM0006
    }
    console.log(this.listMKV9999)
    console.log(this.listRM0006)
  }
  async setpermistion(element: MKV9999,element2:RM0006){
    if(element2.RM0007==null)
    element2.RM0007=new RM0007({MKV9999_ID:element.MKV9999_ID,RM0006_ID:element2.RM0006_ID})
    let data=await this.rest.PostDataToAPI<result< RM0007>>( element2.RM0007,"RM0007/add").toPromise()
    if(data.code=="OK"){
      element2.RM0007=data.data
    }
  }
  pre(){
    if(this.start==0)return false
    this.start--
  }
  nex(){
    if((this.start+1)*this.step>=this.listMKV9999.length)return false
    this.start++
  }
  onKeydown(event) {
    // if (event.key === "Enter") {
    //   console.log(event);
    // }
    //this.keysearch=
  }
  checkkey(element:MKV9999){
    if(element.manhansu.indexOf(this.keysearch)!=-1)return true
    if((element.hodem+' '+element.ten).toLowerCase().indexOf(this.keysearch.toLowerCase())!=-1)return true
  }
}
