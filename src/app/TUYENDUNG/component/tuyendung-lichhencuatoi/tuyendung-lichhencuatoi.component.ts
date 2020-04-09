import { Component, OnInit } from '@angular/core';
import { MKV9999 } from 'src/app/Models/MKV9999';

@Component({
  selector: 'app-tuyendung-lichhencuatoi',
  templateUrl: './tuyendung-lichhencuatoi.component.html',
  styleUrls: ['./tuyendung-lichhencuatoi.component.css']
})
export class TuyendungLichhencuatoiComponent implements OnInit {

  constructor() { }
public tab=0;
public user:MKV9999;
 async ngOnInit() {
   this.user=JSON.parse(localStorage.getItem('KTX_User'))
  }

  tabs(a){
    this.tab=a
  }
}
