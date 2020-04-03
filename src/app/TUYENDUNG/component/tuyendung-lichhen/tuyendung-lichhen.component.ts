import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tuyendung-lichhen',
  templateUrl: './tuyendung-lichhen.component.html',
  styleUrls: ['./tuyendung-lichhen.component.css']
})
export class TuyendungLichhenComponent implements OnInit {
public tab=0
  constructor() { }

  ngOnInit() {
  }

  tabs(a){
    this.tab=a
  }
}
