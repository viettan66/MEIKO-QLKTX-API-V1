import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { KTX0010 } from '../../models/KTX0010';
declare var $:any

@Component({
  selector: 'app-qltb',
  templateUrl: './qltb.component.html',
  styleUrls: ['./qltb.component.css']
})
export class QLTBComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
public ktx0010:KTX0010[]=[]
public tab=-1;
  ngOnInit() {
    let that=this
      function showdodung(){
        that.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getall').subscribe(data=>{
          that.ktx0010=data;
          that.tab=2
        })
      }
    $(document).ready(function(){
      $('.tab').click(function(){
        that.tab=$(this).index()
        $('.tab').removeClass('active')
        $(this).addClass('active')
      })
      showdodung()
    })
  }
  getktx10(event:KTX0010){
   var l= this.ktx0010.filter(c=>{return c.KTX0010_ID===event.KTX0010_ID})
   if(l.length!=0){
     var k=l[0]
    k.ghichu=event.ghichu
    k.giatien=event.giatien
    k.loai=event.loai
    k.ten=event.ten
    k.thutu=event.thutu
    k.trangthai=event.trangthai
   }else{
     this.ktx0010.push(event)
   }
  }
  deletektx10($event){
    var l= this.ktx0010.filter(c=>{return c.KTX0010_ID===$event.KTX0010_ID})
   if(l.length!=0){
     var k= l[0]
     this.ktx0010.splice(this.ktx0010.indexOf(k),1)
   }
  }
}
