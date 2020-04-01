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
  
   }
  title = 'MEIKO-QLKTX-API-V1';
}
