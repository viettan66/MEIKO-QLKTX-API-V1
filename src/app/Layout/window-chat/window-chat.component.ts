import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window-chat',
  templateUrl: './window-chat.component.html',
  styleUrls: ['./window-chat.component.css']
})
export class WindowChatComponent implements OnInit {

  constructor() { }
tab=0;
  ngOnInit() {
  }
  tabs(d){
this.tab=d
  }
}
