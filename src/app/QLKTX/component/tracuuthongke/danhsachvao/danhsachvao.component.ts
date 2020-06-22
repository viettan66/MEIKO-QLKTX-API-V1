import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
declare var $:any
@Component({
  selector: 'app-danhsachvao',
  templateUrl: './danhsachvao.component.html',
  styleUrls: ['./danhsachvao.component.css']
})
export class DanhsachvaoComponent implements OnInit {

  constructor(public rest:RESTService) { }
  public newdate=new Date
  public id
  public olddate=(new Date().getFullYear()+'/'+(new Date().getMonth())+'/'+new Date().getDate())
public listktx0020:KTX0020[]=[]
  ngOnInit() {
    let that=this
    //////////////console.log(this.olddate)
this.show()
$(document).ready(function(){{
  $('.filter').change(function(){{
    that.show()
  }})
}})

  }
  
  getlist($event) {
    this.listktx0020 = $event
  }
 async show(){
  let data=await this.rest.PostDataToAPI<KTX0020[]>({startdate:this.olddate,enddate:this.newdate,trangthai:true,trangthai2:false,ID:this.id},'KTX0020/DangOKTX').toPromise()
  data.map(x=>x['iddd']=Number(x.MKV9999.manhansu))
  this.listktx0020=data
   //////////////console.log(data)
}
export(){
 $('.ddd').css('display','')
 this.rest.ExportTOExcel(document.getElementById('exporttoexvel'),'Danh sách đã ra ngoài '+(new Date).getDay+(new Date).getMonth+(new Date).getFullYear)
 $('.ddd').css('display','none')
}
shows(){
//////////////console.log(this.newdate)
//////////////console.log(this.olddate)
}
}
//phòng phân tích 360 mất mạng
//cổng chính 113
//cam7