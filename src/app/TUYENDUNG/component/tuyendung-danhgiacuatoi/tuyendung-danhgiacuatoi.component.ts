import { Component, OnInit } from '@angular/core';
import { MKV9999 } from 'src/app/Models/MKV9999';

@Component({
  selector: 'app-tuyendung-danhgiacuatoi',
  templateUrl: './tuyendung-danhgiacuatoi.component.html',
  styleUrls: ['./tuyendung-danhgiacuatoi.component.css']
})
export class TuyendungDanhgiacuatoiComponent implements OnInit {

  constructor() { }
public user:MKV9999=new MKV9999()
 async ngOnInit() {
   this.user=JSON.parse(localStorage.getItem('KTX_User'))
  }

}
