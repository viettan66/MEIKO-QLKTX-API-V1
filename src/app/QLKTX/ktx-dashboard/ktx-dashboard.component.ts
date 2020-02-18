import { Component, OnInit } from '@angular/core';
import * as Global from '../../Service/global.service'
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9982 } from 'src/app/Models/MKV9982';
declare var $: any
@Component({
  selector: 'app-ktx-dashboard',
  templateUrl: './ktx-dashboard.component.html',
  styleUrls: ['./ktx-dashboard.component.css']
})
export class KTXDashboardComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }
public menu:MKV9982[]=[]
  ngOnInit() {
    let that = this
    $(document).ready(function () {
      let id = window.location.href.replace(Global.HostUrl, '').split('|')[0]
      that.rest.GetDataFromAPI<MKV9982[]>('Category/GetApps/Menu/'+id).subscribe(data=>{
        that.menu=data;
      })
      /////////////////////////////////////
      $('#contentmenu').load('ktx-dashboard.component.html')
///////////////////////
$(document).on('click','.menuclick',function(){
  
})
      ////////////////////////
    })
  }

}
