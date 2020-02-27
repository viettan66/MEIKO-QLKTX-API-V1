import { Component, OnInit } from '@angular/core';
import { KTX0010 } from '../../models/KTX0010';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any

@Component({
  selector: 'app-nhanviendangky',
  templateUrl: './nhanviendangky.component.html',
  styleUrls: ['./nhanviendangky.component.css']
})
export class NhanviendangkyComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
public ktx10: KTX0010[]=[]
  ngOnInit() {
    let that=this
    function showdodung(){
        that.rest.GetDataFromAPI<KTX0010[]>('KTX0010/Getall').subscribe(data=>{
          that.ktx10=data
        })
    }
    $(document).ready(function(){
      showdodung()
      //////////////////////
        $('#themdon').click(function(){
          $('#formdangdyokytucxa').modal()
        })
      ////////////////////
    })
  }

}
