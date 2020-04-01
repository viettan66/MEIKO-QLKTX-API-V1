import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { result } from 'src/app/QLKTX/models/result';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  public newcomer:MKV9999=new MKV9999()
  constructor(public rest:RESTService,public active:ActivatedRoute,public router:Router) {
    
   }

  ngOnInit() {
    let that=this
    this.active.queryParams.subscribe(vla=>{
      Object.keys(vla) .forEach(k=>{
            this.newcomer[k]=vla[k]
          })
    })
    
    // this.roteractive.keys.forEach(val=>{
    //   Object.keys(this.newcomer) .forEach(k=>{
    //     this.newcomer[k]=this.roteractive.get(k)
    //   })
    // })
    $(document).ready(function(){

    })
  }
  public checkpass=''
  async singin(){
    if(this.newcomer.matkhau!=this.checkpass){
      alert("Mật khẩu đã nhập không khớp.")
      return false
    }
    this.newcomer.type=0
    let data= await this.rest.PostDataToAPI<result<MKV9999>>(this.newcomer,'Account/add').toPromise();
    if(data.code=="OK"){
      alert('Đăng ký thành công, xin mời bạn quay lại trang đăng nhập')
      this.router.navigate(['Login'],{queryParams:{ID:data.data.cmtnd_so}})
    }
  }
}
