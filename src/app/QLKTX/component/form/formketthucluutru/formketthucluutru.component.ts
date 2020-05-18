import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core'
import { MKV9999 } from 'src/app/Models/MKV9999';
import { KTX0023 } from 'src/app/QLKTX/models/KTX0023';
import { KTX0031 } from 'src/app/QLKTX/models/KTX0031';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
import { result } from 'src/app/QLKTX/models/result';
declare var $:any

@Component({
  selector: 'app-formketthucluutru',
  templateUrl: './formketthucluutru.component.html',
  styleUrls: ['./formketthucluutru.component.css']
})
export class FormketthucluutruComponent implements OnInit {

  @Input() ktx0023temp: KTX0023;
  @Input() check: boolean;
  @Output('ktx0023out') ktx0023out=new EventEmitter<KTX0023>()
  constructor(public rest:RESTService) { 

    
  }
  public user: MKV9999
  public newDate=new Date()
  public ktx0031:KTX0031[]=[]
  public ktx0020:KTX0020=null
  public sum=0.1
   ngOnInit() {
    if(this.check){
      $('.form1ketthuc').find('input').attr('readonly',true)
      $('.form1ketthuc').find('textarea').attr('readonly',true)
      $('.form1ketthuc').find('button').css('display','none')
    }
    //////////console.log(this.ktx0023temp)
    let that = this
     this.user = JSON.parse(localStorage.getItem('KTX_User'))
    $(document).ready(function name() {
      that.tinhtien()
    })
  }
  tinhtien(){
    this.sum=0
    this.ktx0023temp.KTX0031.forEach(c=>{
      this.sum+=(c.soluongcap-c.soluongtra)*Number(c.KTX0010.giatien)
    })
  }
  async save(){
    
    //////////console.log(this.ktx0023temp.KTX0031)
    let data= await  this.rest.PutDataToAPI<result< KTX0031>[]>(this.ktx0023temp.KTX0031,'KTX0031/Update').toPromise();
    
    this.ktx0023temp.MKV9999_ID=this.user.MKV9999_ID
    this.ktx0023temp.nldhoten=this.user.hodem+' '+this.user.ten
    this.ktx0023temp.trangthai=false
    let data2= await  this.rest.PostDataToAPI<result< KTX0023>>(this.ktx0023temp,'KTX0023/add').toPromise();
    //////////console.log(data2)
    if(data2.code=="OK"){
      data2.data.KTX0031=[]
      //////////console.log(data)
      data.filter(c=>{return c.code==="OK"}).forEach(v=>{
        data2.data.KTX0031.push(this.ktx0023temp.KTX0031.filter(b=>{return b.KTX0010_ID===v.data.KTX0010_ID})[0] )
      })
      data2.data.MKV9999=this.ktx0023temp.MKV9999
      this.ktx0023out.emit(data2.data)
    }
  }
}
