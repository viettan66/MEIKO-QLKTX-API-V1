import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor() { }
public tabindex=3
  ngOnInit() {
    let that=this
    $(document).ready(function(){
      //////////////////////////
      $('.listmenu').on('click','li',function(){
        $('.listmenu>li').removeClass('active')
        $(this).addClass('active')
        that.tabindex=$(this).index()
      })
      /////////////////////////////
    })
  }

}
