import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { isNumber, isString } from 'util';

@Component({
  selector: 'app-button-sort',
  templateUrl: './button-sort.component.html',
  styleUrls: ['./button-sort.component.css']
})
export class ButtonSortComponent implements OnInit {

  constructor() { }
  @Input() listdata
  @Output('listdata') out = new EventEmitter<any>()
  @Input() index: number
  @Input() key: string
  public up = true
  ngOnInit() {

  }
  async click() {
    if (this.up) {
        this.up=false
      this.out.emit(this.listdata.sort((a, b) => {
        if(isString(a[this.key])){
          var aName = (a[this.key]+"").trim() ;""
          var bName = (b[this.key]+"").trim() ;
          return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }else{
          return (( a[this.key] < b[this.key]) ? -1 : (( a[this.key] > b[this.key]) ? 1 : 0));
        }
      }))
    }
    else {
        this.up=true
      this.out.emit(this.listdata.sort((a, b) => {
        if(isString(a[this.key])){
          var aName = (a[this.key]+"").trim() ;""
          var bName = (b[this.key]+"").trim() ;
          return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
        }else{
          return (( a[this.key]> b[this.key]) ? -1 : (( a[this.key] < b[this.key]) ? 1 : 0));
        }
      }))
    }
  }


}
