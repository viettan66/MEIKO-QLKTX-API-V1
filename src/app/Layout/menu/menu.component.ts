import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9982 } from 'src/app/Models/MKV9982';
import * as Global from '../../Service/global.service'
import { MKV9981 } from 'src/app/Models/MKV9981';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { MKV9999 } from 'src/app/Models/MKV9999';
declare var $: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public host=''
public uri=''
public idcha=0
  constructor( public rest:RESTService,public cookie:CookieService,public route:Router) { 
    //this.host=Global.HostUrl
  }
  public menu:MKV9981[]=[]
  ngOnInit() {
    this.uri=this.route.url
    ////////////console.log(this.uri)
    let that = this 
    $(document).ready(function () {
     let temp:MKV9981[]=JSON.parse(localStorage.getItem('KTX_Menu'))
     that.menu=temp.filter(c=>{return c.CAPMENU!=0&&c.IDCHA===Number(localStorage.getItem('KTX_Menu_Parent')) })
    })
  }

}
