import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { dataservice } from '../Service/dataservice';
import { MKV9981 } from '../Models/MKV9981';
import { ActivatedRoute, Router } from '@angular/router';
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
      that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+that.cookie.get('MKV9999_ID')).pipe().subscribe(data=>{
        console.log(data)
        that.listapp=data
      })
      //////////////////////
      $(document).on('click','.appclick',function(){
        let link=$(this).attr('name')
        
        window.location.assign(link)
      })
      ////////////////////
    })
  }

}
