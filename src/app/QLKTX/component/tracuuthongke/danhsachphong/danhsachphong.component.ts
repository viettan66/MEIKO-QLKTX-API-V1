import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0001 } from 'src/app/QLKTX/models/KTX0001';
import { KTX0010 } from 'src/app/QLKTX/models/KTX0010';
declare var $:any

@Component({
  selector: 'app-danhsachphong',
  templateUrl: './danhsachphong.component.html',
  styleUrls: ['./danhsachphong.component.css']
})
export class DanhsachphongComponent implements OnInit {

  constructor(public rest:RESTService) { }
public listktx0001:KTX0001[]=[]
public listktx0010:KTX0010[]=[]
  async ngOnInit() {
     this.listktx0001=await this.rest.GetDataFromAPI<KTX0001[]>('KTX0001/Getall/a/0/0').toPromise()
     this.listktx0010=await this.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getalltaisancodinh').toPromise()
     this.listktx0001.forEach(val=>{
       val.trangthaidodung=""
       val.KTX0010.forEach(d=>{
         if(d.soluongfull!=null&&d.soluongfull!=0){
            if(d.KTX0011!=null){
              if(d.soluongfull>d.KTX0011.soluong){
                val.trangthaidodung+="Thiếu:"+(d.soluongfull-d.KTX0011.soluong)+" "+d.ten+';'
              }else if(d.soluongfull<d.KTX0011.soluong){
                val.trangthaidodung+="Thừa:"+(d.KTX0011.soluong-d.soluongfull)+" "+d.ten+';'
              }
            }
            else{
                val.trangthaidodung+="Thiếu:"+(d.soluongfull)+" "+d.ten+';'
            }
         }
       })
       if(val.trangthaidodung=="")val.trangthaidodung="Đủ"
       else val.trangthaidodung=val.trangthaidodung.substring(0,val.trangthaidodung.length-1)
     })
    //////console.log()
  }
  onKey(event: any) { // without type info
      $('#exporttoexvel>tbody>tr').css('display','none')
      //////console.log($('#exporttoexvel>tbody>tr>td:eq(4):contains('+event.target.value+')'))
     $('#exporttoexvel>tbody>tr>td:eq(4):contains('+event.target.value+')').parent().css('display','')
  }
  export(){
    $('.ddd').css('display','')
    this.rest.ExportTOExcel(document.getElementById('exporttoexvel'),'Thống kê tài sản phòng '+(new Date).getDay+(new Date).getMonth+(new Date).getFullYear)
    $('.ddd').css('display','none')
  }
}
