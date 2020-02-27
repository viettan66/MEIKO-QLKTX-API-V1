import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9982 } from 'src/app/Models/MKV9982';
import * as Global from '../../Service/global.service'
declare var $: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public host=''
  constructor( public rest:RESTService,public cookie:CookieService) { 
    this.host=Global.HostUrl
  }
  public menu:MKV9982[]=[]
  ngOnInit() {
    let that = this
    $(document).ready(function () {
      let id = window.location.href.replace(Global.HostUrl, '').split('/')[0]
      that.rest.GetDataFromAPI<MKV9982[]>('Category/GetApps/Menu/'+id).subscribe(data=>{
        that.menu=data;
      })
    })
  }

}
