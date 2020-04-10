import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var  $:any

@Component({
  selector: 'app-button-count',
  templateUrl: './button-count.component.html',
  styleUrls: ['./button-count.component.css']
})
export class ButtonCountComponent implements OnInit {

  constructor() { }
  @Input() class
  @Input() start
  @Output('step') dd=new EventEmitter<number>()
  @Input() step
  @Input() listdata
  ngOnInit() {
  }
  show(){
    if($('#inputdatalisst').css('width')=='80px')
    $('#inputdatalisst').css('width','0px')
    else
    $('#inputdatalisst').css('width','80px')
  }
  send(){
    this.dd.emit($('#inputdatalisst').val())
  }
}
