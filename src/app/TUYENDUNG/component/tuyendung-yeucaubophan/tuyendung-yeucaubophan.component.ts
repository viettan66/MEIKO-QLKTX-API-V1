import { Component, OnInit } from '@angular/core';
import { MKV9999 } from 'src/app/Models/MKV9999';

@Component({
  selector: 'app-tuyendung-yeucaubophan',
  templateUrl: './tuyendung-yeucaubophan.component.html',
  styleUrls: ['./tuyendung-yeucaubophan.component.css']
})
export class TuyendungYeucaubophanComponent implements OnInit {

  constructor() { }
public bophanID
public user:MKV9999=new MKV9999()
  async ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("KTX_User"))
    this.bophanID=this.user.phong_id
  }
}
