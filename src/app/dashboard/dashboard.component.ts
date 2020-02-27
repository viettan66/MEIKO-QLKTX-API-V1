import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9982 } from '../Models/MKV9982';
declare var $:any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }

  ngOnInit() {
    let that=this
    $(document).ready(function(){
      that.rest.GetDataFromAPI<MKV9982[]>('Category/GetApps/'+that.cookie.get('MKV9999_ID')).pipe().subscribe(data=>{
        console.log(data)

        data.forEach(val=>{
          console.log(val)
            $('#contentapp').append(`<div class="card" style="width: 18rem;margin:10px;height:300px">
            <img class="card-img-top" src="`+val.IMAGE+`" alt="`+val.TENMENU+`">
            <div class="card-body">
            
              <p class="card-text"><button class="btn appclick" name="`+val.LINKMENU+`">`+val.TENMENU+`</button></p>
            </div>
          </div>`)
        })
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
