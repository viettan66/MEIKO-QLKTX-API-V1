import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-next',
  templateUrl: './button-next.component.html',
  styleUrls: ['./button-next.component.css']
})
export class ButtonNextComponent implements OnInit {
@Input() class
@Input() start
@Output('start') dd=new EventEmitter<number>()
@Input() step
@Input() listdata
  constructor() { }

  ngOnInit() {
  }

  nex(){
    if((this.start+1)*this.step>=this.listdata.length)return false
    this.start++
    this.dd.emit(this.start)
  }
}
