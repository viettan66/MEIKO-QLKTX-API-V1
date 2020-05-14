import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import * as Global from 'src/app/Service/global.service';
import { result } from 'src/app/QLKTX/models/result';
import { xuatkho } from 'src/app/QLKTX/models/xuatkho';
import { KTX0031 } from 'src/app/QLKTX/models/KTX0031';

@Component({
  selector: 'app-taikhoanchuadongbo',
  templateUrl: './taikhoanchuadongbo.component.html',
  styleUrls: ['./taikhoanchuadongbo.component.css']
})
export class TaikhoanchuadongboComponent implements OnInit {

  constructor(public rest:RESTService) { }
public listMKV9999:MKV9999[]=[]
public loading=true
public listMKV9999207:MKV9999[]=[]
  async ngOnInit() {
    this.load()
  }
 async load(){

    this.listMKV9999= await this.rest.PostDataToAPI<MKV9999[]>({cmd:`select [MKV9999_ID],[manhansu],[matkhau],[id],[hodem],[ten],[ngaysinh],[gioitinh],[noisinh],[quequan],[diachithuongtru],[diachitamtru],[cmtnd_so],[cmtnd_ngayhethan],[cmtnd_noicap],[hochieu_so],[hochieu_ngaycap],[hochieu_ngayhethan],[ngayvaocongty],[phong_id],[ban_id],[congdoan_id],[chucvu_id],[nganhang_stk],[nganhang_id],[sosobaohiem],[honnhantinhtrang],[datnuoc_id],[phuongxa],[suckhoetinhtrang],[dienthoai_nharieng],[dienthoai_didong],[email],[tinhtrangnhansu],[thutu],[chucvu],[capbac],thetu_id=(select top(1) bophan_ten from mkv9998 where G.phong_id=mkv9998.phong_id),[type] from mkv9999 as G where type=0 `},"Account/GetSQL").toPromise()
    this.listMKV9999207 = await this.rest.Get207<MKV9999[]>(Global.AsoftAPI).toPromise()
    this.loading=false
  }
async dongbo(){
  this.loading=true
  for(const x of this.listMKV9999){
   for(const v of  this.listMKV9999207.filter(c=>c.cmtnd_so===x.cmtnd_so)){
      v.MKV9999_ID=x.MKV9999_ID
      v.matkhau=x.matkhau
      let data=await this.rest.PutDataToAPI<result<MKV9999>>(v,"Account/Updateinfo").toPromise()
      if(data.code=="OK"){
        let adata=await this.rest.GetDataFromAPI<KTX0031[]>("KTX0031/Get/"+data.data.MKV9999_ID).toPromise()
        let input = new FormData();
        input.append('ListUser',JSON.stringify([data.data.manhansu]) );
        let ListProduct=[]
        for(const qqq of adata){await ListProduct.push({soLuong:qqq.soluongcap,donViTinh:qqq.KTX0010.donvi,WH0007_ID:qqq.KTX0010.WH0007_ID})}
        input.append('ListProduct',JSON.stringify(ListProduct) );
        ////console.log(input)
        ////console.log(data)
        let kkkk=await this.rest.Post<any>(input, Global.xuatkhoAPI).toPromise()
        ////console.log(kkkk)
      }
    }
  }


    this.load()
}
}
