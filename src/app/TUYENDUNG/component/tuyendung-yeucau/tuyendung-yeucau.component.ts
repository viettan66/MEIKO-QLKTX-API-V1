import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import* as Global from 'src/app/Service/global.service';
import { yeucau } from '../../Models/yeucau';
import { A0028 } from '../../Models/A0028';
import { MKV9998 } from 'src/app/Models/MKV9998';
declare var $:any

@Component({
  selector: 'app-tuyendung-yeucau',
  templateUrl: './tuyendung-yeucau.component.html',
  styleUrls: ['./tuyendung-yeucau.component.css']
})
export class TuyendungYeucauComponent implements OnInit {

  constructor(public rest:RESTService) { }
  async ngOnInit() {
  }
}
