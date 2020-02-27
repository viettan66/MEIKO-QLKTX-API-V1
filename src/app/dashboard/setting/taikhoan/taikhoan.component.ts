import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9999 } from 'src/app/Models/MKV9999';
declare var $:any
@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.css']
})
export class TaikhoanComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
  public listacc:MKV9999[]=[]
  ngOnInit() {
    let that=this
    $(document).ready(function(){
      that.rest.GetDataFromAPI<MKV9999[]>('Account/Get').subscribe(data=>{
        that.listacc=data
      })
      ///////////////////////////
      $('#taikhoan').on('click','tr',function(){
        $('#taikhoan>tr').css('background','white')
        $(this).css('background','gray')
      })
    })
  }

}
