import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-search',
  templateUrl: './button-search.component.html',
  styleUrls: ['./button-search.component.css']
})
export class ButtonSearchComponent implements OnInit {

  @Input() listdata
  @Output('listdata') out = new EventEmitter<any>()
  @Input() ids: string
  @Input() placeholder: string
  constructor() { }

  ngOnInit() {
  }
  send($event){
    console.log(this.listdata)
    let ra=[]
    this.listdata.map(x=>{
      Object.keys(x).forEach(key=>{
        if((x[key]+"").indexOf($event.target.value)>=0)
        ra.push(x)
      })
    })
    this.out.emit(ra)
  }
}
