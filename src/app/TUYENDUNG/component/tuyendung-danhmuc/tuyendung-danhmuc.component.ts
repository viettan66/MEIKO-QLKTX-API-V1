import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';
import { RM0002 } from '../../Models/RM0002';
declare var $:any

@Component({
  selector: 'app-tuyendung-danhmuc',
  templateUrl: './tuyendung-danhmuc.component.html',
  styleUrls: ['./tuyendung-danhmuc.component.css']
})
export class TuyendungDanhmucComponent implements OnInit {
public tab=3
  constructor(public rest:RESTService) { }

  ngOnInit() {
  }
  tabs(a){
    this.tab=a
  }
}
