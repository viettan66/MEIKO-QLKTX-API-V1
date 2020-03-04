import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-sapphong',
  templateUrl: './sapphong.component.html',
  styleUrls: ['./sapphong.component.css']
})
export class SapphongComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.card').on('click','.giuongclick',function(event){
       event.stopImmediatePropagation()
        $('#danhsachchomodal').modal()
      })
    })
  }

}
