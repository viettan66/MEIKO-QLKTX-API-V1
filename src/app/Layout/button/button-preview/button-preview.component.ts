import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-preview',
  templateUrl: './button-preview.component.html',
  styleUrls: ['./button-preview.component.css']
})
export class ButtonPreviewComponent implements OnInit {

  constructor() { }
  @Input() class
  @Input() start
  @Output('start') dd=new EventEmitter<number>()
  @Input() step
  @Input() listdata
  ngOnInit() {
  }

  pre(){
    if(this.start==0)return false
    this.start--
    this.dd.emit(this.start)
  }
}
