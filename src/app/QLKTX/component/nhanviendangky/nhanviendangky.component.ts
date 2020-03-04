import { Component, OnInit } from '@angular/core';
import { KTX0010 } from '../../models/KTX0010';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any

@Component({
  selector: 'app-nhanviendangky',
  templateUrl: './nhanviendangky.component.html',
  styleUrls: ['./nhanviendangky.component.css']
})
export class NhanviendangkyComponent implements OnInit {

  constructor(public rest:RESTService,public cookie:CookieService) { }

public form='formdangkyokytucxa'
  ngOnInit() {
    let that=this

    $(document).ready(function(){
      //////////////formdangkyokytucxa////////
        $('#adddon').click(function(){
          $('#selecttemplateform').modal()
        })
      //////////////////////
        $('#adddonxinokytucxa').click(function(){
          $('#selecttemplateform').modal('hide')
          that.form='formdangkyokytucxa'
        })
      ////////////////////
    })
  }

}
