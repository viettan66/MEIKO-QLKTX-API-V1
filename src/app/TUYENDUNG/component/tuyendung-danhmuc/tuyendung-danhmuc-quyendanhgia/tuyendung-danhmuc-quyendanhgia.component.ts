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
  public listMKV9999s: MKV9999[] = []
  public listRM0006: RM0006[]=[]
  public listDEPT=[]
  public start:number=0
  public step:number=20
  public keysearch=''
  public phong_id='all'
  public loading=true
  async ngOnInit() {
    this.listMKV9999 = await this.rest.GetDataFromAPI<MKV9999[]>('RM0007/Getall').toPromise()
    console.log(this.listMKV9999)
    this.listMKV9999s=this.listMKV9999
    if (this.listMKV9999.length > 0) {
      this.listRM0006=this.listMKV9999[0].RM0006
    }
    this.listMKV9999.forEach(VAL=>{
      if(this.listDEPT.filter(c=>{return c['id']===VAL.phong_id}).length==0&&VAL.phong_id!=null)
      this.listDEPT.push({id:VAL.phong_id,ten:VAL.thetu_id})
    })
    //console.log(this.listMKV9999)
    //console.log(this.listRM0006)
    //console.log(this.listDEPT)
    this.loading=false
  }
  async setpermistion(element: MKV9999,element2:RM0006){
    if(element2.RM0007==null)
    element2.RM0007=new RM0007({MKV9999_ID:element.MKV9999_ID,RM0006_ID:element2.RM0006_ID})
    let data=await this.rest.PostDataToAPI<result< RM0007>>( element2.RM0007,"RM0007/add").toPromise()
    if(data.code=="OK"){
      element2.RM0007=data.data
    }
  }
  
  bophanchange($event){
    this.listMKV9999s=this.listMKV9999.filter(c=>{return c.phong_id===$event.target.value})
    if($event.target.value=='all')this.listMKV9999s=this.listMKV9999
  }
  getstart($event) {
    this.start = $event
  }
  getstep($event) {
    this.step = $event
    //console.log($event)
  }
  getlist($event) {
    this.listMKV9999 = $event
  }
  onKeydown(event) {
    // if (event.key === "Enter") {
    //   //console.log(event);
    // }
    //this.keysearch=
  }
  checkkey(element:MKV9999){
    if(element.manhansu.indexOf(this.keysearch)!=-1)return true
    if((element.hodem+' '+element.ten).toLowerCase().indexOf(this.keysearch.toLowerCase())!=-1)return true
  }
}
