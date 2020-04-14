import { Component, OnInit, Input } from '@angular/core';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { Socket } from 'ngx-socket-io';
import { MKV7001 } from 'src/app/Models/MKV7001';

@Component({
  selector: 'app-button-messager',
  templateUrl: './button-messager.component.html',
  styleUrls: ['./button-messager.component.css']
})
export class ButtonMessagerComponent implements OnInit {
@Input() MKV9999:MKV9999
@Input() MKV99992:MKV9999
  constructor(public socket:Socket) { }

 async ngOnInit() {
  
  }
click(){
  this.socket.emit("Message",new MKV7001({
    MKV9999_ID:this.MKV9999.MKV9999_ID,
    MKV9999_ID2:this.MKV99992.MKV9999_ID,
    MKV9999:this.MKV9999,
    MKV99992:this.MKV99992,
    trangthai:false,
    noiDung:"Bắt đầu trò chuyện.",
    date:new Date(),
    type:1}))
}
}
