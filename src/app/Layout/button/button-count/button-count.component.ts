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
  @Input() classs
  @Input() listdata
  ngOnInit() {
  }
  show(){
    if($('.zxcvbnm'+(this.classs==null?"":this.classs)).css('width')=='80px')
    $('.zxcvbnm'+(this.classs==null?"":this.classs)).css('width','0px')
    else
    $('.zxcvbnm'+(this.classs==null?"":this.classs)).css('width','80px')
  }
  // send(){
  //   this.dd.emit($('.zxcvbnm'+(this.classs==null?"":this.classs)).val())
  // }
  send($event){
    this.dd.emit($event.target.value)
  }
}
