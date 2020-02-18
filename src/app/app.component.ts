import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RESTService } from './QLKTX/Service/rest.service';
import * as Globals from './QLKTX/Service/global.service';

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
   }
  title = 'MEIKO-QLKTX-API-V1';
}
