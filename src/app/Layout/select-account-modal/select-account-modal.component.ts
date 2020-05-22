import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9998 } from 'src/app/Models/MKV9998';
import { MKV9991 } from 'src/app/Models/MKV9991';
declare var $: any

@Component({
  selector: 'app-select-account-modal',
  templateUrl: './select-account-modal.component.html',
  styleUrls: ['./select-account-modal.component.css']
})
export class SelectAccountModalComponent implements OnInit {

  @Output('data') data = new EventEmitter<MKV9999[]>()
  @Output('datasingle') datasingle = new EventEmitter<MKV9999>()
  @Input() listMKV9999choose: MKV9999[] = []
  @Input() ids
  @Input() showmail
  @Input() buttoncheck
  @Output('checked') checked = new EventEmitter<boolean>()
  constructor(public rest: RESTService) { }
  public start: number = 0
  public step: number = 20
  public listMKV9999: MKV9999[] = []
  public listMKV9999s: MKV9999[] = []
  public listbophan:any[]=[]
  public keysearch=''
  async ngOnInit() {
    this.rest.GetDataFromAPI<MKV9999[]>('Account/Get').subscribe(s=>{
      this.listMKV9999=s 
       this.listMKV9999s=this.listMKV9999
    })
    // this.listMKV9999.map(async x=>{
    //   let kk=await this.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + x.phong_id).toPromise()
    //   if(kk!=null)x.thetu_id=kk.bophan_ten
    // })
    //this.listMKV9999 = await this.rest.GetDataFromAPI<MKV9999[]>('Account/Get').toPromise()
  this.rest.PostDataToAPI<MKV9998[]>({},'MKV9998/Getall').subscribe(s=>{
    this.listbophan=s
  })
  }
  check(){
    this.checked.emit(true);
  }
 async savemail(element){
    ////////////console.log("save mail "+element.hodem+' '+element.ten+":"+element.email)
    let dataa=await  this.rest.PutDataToAPI<any>(element,"Account/updateinfo").toPromise()
    ////////////console.log(dataa)
  }
 
  bophanchange($event){
    this.listMKV9999s=this.listMKV9999.filter(c=>{return c.phong_id===$event.target.value})
    if($event.target.value=='all')this.listMKV9999s=this.listMKV9999
  }
  closeselectaccount() {
    $('#select-account-modal').modal('hide')
  }
  checkelement(element: MKV9999) {
    if (this.listMKV9999choose.filter(c => { return c.MKV9999_ID === element.MKV9999_ID }).length > 0) {
      return 'actived'
    }
    else return ''
  }
  te(){this.keysearch=''}
  chooseaccount(element: MKV9999) {
    let l = this.listMKV9999choose.filter(c => { return c.MKV9999_ID === element.MKV9999_ID })
    if (l.length == 0) {
      this.listMKV9999choose.push(element)
      $('#tr' + element.manhansu).addClass('actived')
    } else {
      this.listMKV9999choose.splice(this.listMKV9999choose.indexOf(l[0]), 1)
      $('#tr' + element.manhansu).removeClass('actived')
    }
    this.datasingle.emit(element)
    this.data.emit(this.listMKV9999choose)
  }
  checkkey(element:MKV9999){
    if(element.manhansu.indexOf(this.keysearch)!=-1)return true
    if((element.hodem+' '+element.ten).toLowerCase().indexOf(this.keysearch.toLowerCase())!=-1)return true
  }
  getstart($event) {
    this.start = $event
  }
  getstep($event) {
    ////////console.log($event)
    this.step = $event
  }
  getphongid(phong_id){
    let l= this.listbophan.filter(c=>c.phong_id===phong_id)
    l.length>0?l[0].bophan_ten:'gr'
  }
}
