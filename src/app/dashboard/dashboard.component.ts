import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { dataservice } from '../Service/dataservice';
import { MKV9981 } from '../Models/MKV9981';
import { ActivatedRoute, Router } from '@angular/router';
import { MKV9999 } from '../Models/MKV9999';
declare var $:any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService,
    public route: Router) { }
public listapp:MKV9981[]=[]
  ngOnInit() {
    let that=this
    $(document).ready(function(){
      let kf:MKV9981[]=JSON.parse( localStorage.getItem('KTX_Menu'))
   that.listapp=kf.filter(c=>{return c.CAPMENU===0})
      
      ////////////////////
    })
  }
go(id:string,link:string){
  localStorage.setItem('KTX_Menu_Parent',id)
  this.route.navigate([link])
}
}
