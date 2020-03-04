import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9982 } from 'src/app/Models/MKV9982';
import * as Global from '../../Service/global.service'
import { MKV9981 } from 'src/app/Models/MKV9981';
import { ActivatedRoute } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public host=''
public idcha=0
  constructor( public rest:RESTService,public cookie:CookieService,public route:ActivatedRoute) { 
    this.host=Global.HostUrl
  }
  public menu:MKV9981[]=[]
  ngOnInit() {
    let that = this 
    this.route.queryParams.subscribe(params => {
      that.idcha=params['flag']
  })
    $(document).ready(function () {
      let id = window.location.href.replace(Global.HostUrl, '').split('/')[0]
      that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+that.cookie.get('MKV9999_ID')).subscribe(data=>{
        
        data.forEach(val=>{
          if(val.MKV9980_ID==that.idcha&&val.CAPMENU!=0)
          that.menu.push(val)
        })
      })
    })
  }

}
