import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RM0010 } from 'src/app/TUYENDUNG/Models/RM0010';
import { RM0080 } from 'src/app/TUYENDUNG/Models/RM0080';
import { RM0001 } from 'src/app/TUYENDUNG/Models/RM0001';
import { RESTService } from 'src/app/Service/rest.service';
import { RM0009 } from 'src/app/TUYENDUNG/Models/RM0009';
import { RM0081_A } from 'src/app/TUYENDUNG/Models/RM0081_A';
import { RM0081_B } from 'src/app/TUYENDUNG/Models/RM0081_B';
import { RM0081_C, RM0081_D, RM0081_E, RM0081_F } from 'src/app/TUYENDUNG/Models/RM0080_C';
import { result } from 'src/app/QLKTX/models/result';

@Component({
  selector: 'app-form-lylichungvien',
  templateUrl: './form-lylichungvien.component.html',
  styleUrls: ['./form-lylichungvien.component.css']
})
export class FormLylichungvienComponent implements OnInit {
@Input() rm0010in:RM0010
@Output('rm0010out') rm0010out=new EventEmitter<RM0010>()
  constructor(public rest:RESTService) { }
public listrm0001:RM0001[]=[]
public rm0100:RM0009[]=[]
 async ngOnInit() {
   this.listrm0001=await this.rest.GetDataFromAPI<RM0001[]>('RM0001/Getall').toPromise()
   this.rm0100=await this.rest.GetDataFromAPI<RM0009[]>('RM0009/Getall').toPromise()
  }

save(){
  console.log(this.rm0010in)
  if(this.rm0010in.RM0010_ID==null){
    this.rest.PostDataToAPI<result<RM0010>>(this.rm0010in,"RM0010/add").subscribe(data=>{
      if(data.code=="OK"){
        this.rm0010out.emit(data.data)
      }
    })
  }else{
    this.rest.PutDataToAPI<result<RM0010>>(this.rm0010in,"RM0010/update").subscribe(data=>{
      if(data.code=="OK"){
        this.rm0010out.emit(data.data)
      }
    })
    
  }
}
thanhphangiadinh(lop?:RM0080){
  if(lop==null)
  this.rm0010in.RM0080.push(new RM0080())
  else
  this.rm0010in.RM0080.splice(this.rm0010in.RM0080.indexOf(lop),1)
}
addrm0081_a(lop?:RM0081_A){
  if(lop==null)
  this.rm0010in.RM0081_A.push(new RM0081_A())
  else
  this.rm0010in.RM0081_A.splice(this.rm0010in.RM0081_A.indexOf(lop),1)
}
addrm0081_b(lop?:RM0081_B){
  if(lop==null)
  this.rm0010in.RM0081_B.push(new RM0081_B())
  else
  this.rm0010in.RM0081_B.splice(this.rm0010in.RM0081_B.indexOf(lop),1)
}
vitinh(lop?:RM0081_C){
  if(lop==null)
  this.rm0010in.RM0081_C.push(new RM0081_C())
  else
  this.rm0010in.RM0081_C.splice(this.rm0010in.RM0081_C.indexOf(lop),1)
}
giaithuong(lop?:RM0081_D){
  if(lop==null)
  this.rm0010in.RM0081_D.push(new RM0081_D())
  else
  this.rm0010in.RM0081_D.splice(this.rm0010in.RM0081_D.indexOf(lop),1)
}
qtlv(lop?:RM0081_E){
  if(lop==null)
  this.rm0010in.RM0081_E.push(new RM0081_E())
  else
  this.rm0010in.RM0081_E.splice(this.rm0010in.RM0081_E.indexOf(lop),1)
}
ntk(lop?:RM0081_F){
  if(lop==null)
  this.rm0010in.RM0081_F.push(new RM0081_F())
  else
  this.rm0010in.RM0081_F.splice(this.rm0010in.RM0081_F.indexOf(lop),1)
}
}
