import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { WH0007 } from 'src/app/Models/WH0007';
import { result } from 'src/app/QLKTX/models/result';
import { KTX0010 } from 'src/app/QLKTX/models/KTX0010';
import * as Global from 'src/app/Service/global.service';
declare var $:any

@Component({
  selector: 'app-dodungcapphatkhisapphong',
  templateUrl: './dodungcapphatkhisapphong.component.html',
  styleUrls: ['./dodungcapphatkhisapphong.component.css']
})
export class DodungcapphatkhisapphongComponent implements OnInit {

  @Input() ktx10temp: KTX0010[] ;
  @Output('ktx10out') ktx10out=new EventEmitter<KTX0010>() ;
  @Output('ktx10delete') ktx10delete=new EventEmitter<KTX0010>() ;
  constructor(public rest: RESTService) { }
  public arr: WH0007[] = []
  public ktx0010: KTX0010[] = []
  public count=0
  public i=1
  ngOnInit() {
    //////////////console.log(this.ktx10temp)
    this.ktx0010=this.ktx10temp.filter(c=>{return c.loai===2})
    let that = this
    this.show()
    $(document).ready(function () {
      
      $('thead>tr>td>input:checkbox').change(function(){
        //////////////console.log($(this).is(':checked'))
        $(this).parent().parent().parent().parent().find('tbody').find('input:checkbox').click()
      })
      $('.tabledodung').on('click','tbody>tr>td>input:checkbox',function(Event){
        Event.stopPropagation()
        if($(this).attr('checked')){
            $(this).parent().parent().addClass('active')
        }else{
          $(this).parent().parent().removeClass('active')
        }
      })
      $('.tabledodung').on('click','tbody>tr',function(){
        $(this).find('input:checkbox').click()
      })
    ////////////////
    })
  }
  public index=0;
  show(){
    let that = this
    let input = new FormData();
    this.index=((this.i -1)*20)+1
    input.append('pz', '20');
    input.append('p', (that.i+''));
    input.append('ob', '');
    input.append('sort', '');
    input.append('s', '');
    input.append('sts', '');
    input.append('WH0001_ID', Global.Khohang);
    that.rest.Post<any>(input, 'http://192.84.100.207/AdminAPI/api/WH/R1_GetKhoHang').subscribe(data => {
      that.arr = JSON.parse(data['data'])[0]
      that.count=Number(JSON.parse(data['data'])[1][0]['c']) 
      //////////////console.log(that.arr )
    })
  }
  next(){
    this.i++
    this.show()
  }
  back(){
    if(this.i==1)return
    this.i--
    this.show()
  }
  expand(colexpan){
    $('.colexpand:not(#'+colexpan+')').removeClass('col-8').removeClass('col-6').addClass('col-4')
    $('#'+colexpan).parent().addClass('col-8').removeClass('col-4')
    ////////////////console.log($(colexpan.toElement).parent())
  }
  save(){
    let arradd=this.arr.filter(c=>{return c.check===true})
    let arrktx10:KTX0010[]=[]
    arradd.forEach(val=>{
      let temp =new KTX0010
      temp.ghichu=val.moTa
      temp.soluongmacdinh=0
      temp.trangthai=true
      temp.thutu=1
      temp.ten=val.tenSanPham
      temp.loai=2
      temp.WH0007_ID=val.WH0007_ID
      temp.maSanPham=val.maSanPham
      arrktx10.push(temp)
    })
    this.rest.PostDataToAPI<result<KTX0010>[]>(arrktx10,'KTX0010/add').subscribe(data=>{
      data.forEach(val=>{
        if(val.code=='OK'){
          this.ktx10out.emit(val.data)
          this.ktx0010.push(val.data)
          $('.new').val('')
        }
        else alert(val.mess)
      })
    })
  }
  savedo() {
    this.rest.PutDataToAPI<result<KTX0010>[]>(this.ktx0010, 'KTX0010/edit').subscribe(vals => {
      //////////////console.log(vals)
      vals.forEach(val => {
        if (val.code == 'OK') {
          this.ktx10out.emit(val.data)
        }
        else alert(val.mess)
      })
    })
  }
}
