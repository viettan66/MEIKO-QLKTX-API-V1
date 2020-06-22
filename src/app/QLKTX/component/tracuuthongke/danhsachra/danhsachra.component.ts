import { Component, OnInit } from '@angular/core';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
import { RESTService } from 'src/app/Service/rest.service';
declare var $:any
@Component({
  selector: 'app-danhsachra',
  templateUrl: './danhsachra.component.html',
  styleUrls: ['./danhsachra.component.css']
})
export class DanhsachraComponent implements OnInit {

  public newdate=new Date
  public id
  public olddate=(new Date().getFullYear()+'/'+(new Date().getMonth())+'/'+new Date().getDate())
  constructor(public rest:RESTService) { }
public listktx0020:KTX0020[]=[]
  ngOnInit() {
    let that=this
this.show()
$(document).ready(function(){{
  $('.filter').change(function(){{
    that.show()
  }})
}})
  }

  async show(){
    //////////////console.log('1')
   let data=await this.rest.PostDataToAPI<KTX0020[]>({startdate:this.olddate,enddate:this.newdate,trangthai:true,trangthai2:true,ID:this.id},'KTX0020/DangOKTX').toPromise()
    //////////////console.log('2')
    this.listktx0020=data
    //////////////console.log(data)
 }
 
 export(){
  $('.ddd').css('display','')
  this.rest.ExportTOExcel(document.getElementById('exporttoexvel'),'Danh sách đã ra ngoài '+(new Date).getDay+(new Date).getMonth+(new Date).getFullYear)
  $('.ddd').css('display','none')
}
}
