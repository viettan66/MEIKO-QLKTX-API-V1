import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RESTService } from './Service/rest.service';
import * as Globals from './Service/global.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public rest:RESTService,public cookie:CookieService) {
    if(cookie.get('manhansu')==''){
      if(window.location.href!=Globals.HostUrl+"Login"){
        window.location.assign('Login')
      }
    }else{
      if(window.location.href==Globals.HostUrl+"Login"){
      window.location.assign('')
      }
      // if(cookie.get('permistion')=='1'){
      //   if(window.location.href==Globals.HostUrl+'Admin'){
      //   window.location.assign('')
      //   }
      // }else{
      //   if(window.location.href!=Globals.HostUrl+'Admin')
      //   window.location.assign('Admin')
      // }
    }
    $(document).ready(function () {
     
    })
   }
  title = 'MEIKO-QLKTX-API-V1';
}
