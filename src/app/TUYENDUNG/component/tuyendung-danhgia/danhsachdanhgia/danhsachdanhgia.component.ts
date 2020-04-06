import { Component, OnInit } from '@angular/core';
import { RM0015 } from 'src/app/TUYENDUNG/Models/RM0015';
import { result } from 'src/app/QLKTX/models/result';
import { RESTService } from 'src/app/Service/rest.service';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { RM0006 } from 'src/app/TUYENDUNG/Models/RM0006';
import { RM0013 } from 'src/app/TUYENDUNG/Models/RM0013';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0007 } from 'src/app/TUYENDUNG/Models/RM0007';
import { RM0001 } from 'src/app/TUYENDUNG/Models/RM0001';
declare var $: any

@Component({
  selector: 'app-danhsachdanhgia',
  templateUrl: './danhsachdanhgia.component.html',
  styleUrls: ['./danhsachdanhgia.component.css']
})
export class DanhsachdanhgiaComponent implements OnInit {

  public listRM0015: RM0015[] = []
  public listRM0006: RM0006[] = []
  public listRM0007: RM0007[] = []
  public listRM0001: RM0001[] = []
  public rm0010in: RM0010 = new RM0010()
  public user:MKV9999=JSON.parse(localStorage.getItem('KTX_User'))
  constructor(public rest: RESTService) { }

  async ngOnInit() {
    this.listRM0015 = await this.rest.GetDataFromAPI<RM0015[]>("RM0015/Getalldanhgia").toPromise()
    this.listRM0007 = await this.rest.PostDataToAPI<RM0007[]>({MKV9999_ID:this.user.MKV9999_ID},"RM0007/GetallMKV999ID").toPromise()
    console.log(this.listRM0015)
    if (this.listRM0015.length > 0) {
      this.listRM0015[0].RM0006.forEach(val=>{
        this.listRM0006.push(new RM0006({RM0006_ID:val.RM0006_ID,maTieuChiDG:val.maTieuChiDG,tenTieuChiDG:val.tenTieuChiDG}))
      })
    }
    this.listRM0015.forEach(val=>{
      if(val.RM0010.RM0001!=null){
        if(this.listRM0001.filter(c=>{return c.RM0001_ID===val.RM0010.RM0001.RM0001_ID}).length==0)
          this.listRM0001.push(val.RM0010.RM0001)
      }
      if(val.RM0010['RM0001_2']!=null){
        if(this.listRM0001.filter(c=>{return c.RM0001_ID===val.RM0010['RM0001_2'].RM0001_ID}).length==0)
          this.listRM0001.push(val.RM0010['RM0001_2'])
      }
    })
      console.log(this.listRM0001)
  }

  showungvien(element: RM0015) {
    if (element.RM0010 != null) {
      this.rm0010in = element.RM0010
      $('#modalungvien').modal()
    }
  }
  close() {
    $("#modalungvien").modal('hide')
  }
  async danhgia(element:RM0015,element2:RM0006){{
    if(this.listRM0007.filter(c=>{return c.RM0006_ID===element2.RM0006_ID}).length==0){{
      alert("Bạn không có quyền đánh giá mục này, hãy liên hệ với Nhân sự.")
      return false
    }}
    if(element2.RM0013==null){
      let temp:RM0013=new RM0013()
      temp.MKV9999_ID=this.user.MKV9999_ID
      temp.RM0006_ID=element2.RM0006_ID
      temp.RM0015_ID=element.RM0015_ID
      temp.ghiChu=""
      temp.nhanXet=""
      temp.ketQua=true
      temp.trangThai=true
      let datas= await this.rest.PostDataToAPI<result<RM0013>[]>([temp],"RM0013/add").toPromise()
      datas.forEach(data=>{
        if(data.code=="OK"){
          element2.RM0013=data.data
        }else{
          alert(data.mess)
        }
        console.log(datas)
      })
    }else{
      element2.RM0013.ketQua=!element2.RM0013.ketQua
      let datas= await this.rest.PostDataToAPI<result<RM0013>[]>([element2.RM0013],"RM0013/add").toPromise()
      datas.forEach(data=>{
        if(data.code=="OK"){
          element2.RM0013=data.data
        }else{
          alert(data.mess)
        }
        console.log(datas)
      })
    }
    
    this.updateRM0015(element)
  }}
  public thisRM0015:RM0015=new RM0015()
  hoidongphongvan(element:RM0015){
    this.thisRM0015=element
    $('#hoidongphongvan').modal()
  }
 async suachitietdanhgia( element:RM0015){
    element.RM0006.forEach(l=>{
      if(l.RM0013==null)l.RM0013=new RM0013({RM0015_ID:element.RM0015_ID,MKV9999_ID:this.user.MKV9999_ID,RM0006_ID:l.RM0006_ID})
    })
    this.thisRM0015=element
    $('#suachitietdanhgia').modal()
  }
 async saveeditdanhgia(){
   let listtemp:RM0013[]=[]
    this.thisRM0015.RM0006.forEach(val=>{
      listtemp.push(val.RM0013)
    })
      let datas = await this.rest.PostDataToAPI<result<RM0013>[]>(listtemp, "RM0013/add").toPromise()
      datas.forEach(data => {
        if (data.code == "OK") {
         let l= this.thisRM0015.RM0006.filter(c=>{return c.RM0006_ID===data.data.RM0006_ID})
         if(l.length>0)l[0].RM0013 = data.data
        } else {
          alert(data.mess)
        }
        console.log(datas)
      })
      $('#suachitietdanhgia').modal('hide')
    this.updateRM0015(this.thisRM0015)
  }
 async updateRM0015(element:RM0015){
    let k=await this.rest.GetDataFromAPI<RM0015>("RM0015/Getall2/"+element.RM0015_ID).toPromise()
    console.log(k)
    element.ketQua=k.ketQua
  }
}
