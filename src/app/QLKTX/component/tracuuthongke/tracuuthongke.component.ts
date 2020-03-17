import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-tracuuthongke',
  templateUrl: './tracuuthongke.component.html',
  styleUrls: ['./tracuuthongke.component.css']
})
export class TracuuthongkeComponent implements OnInit {

  constructor() { }
  public tab=0

  ngOnInit() {
    let that=this
    $(document).ready(function(){{
      ////////////
      $('.tab').click(function(){
        that.tab=$(this).index()
      })
      ////////////////
      $('#searchbox').change(function(){
        that.tab=$(this).index()
        
      })
      //////////////

    }})//end $(document).ready
  }

}
