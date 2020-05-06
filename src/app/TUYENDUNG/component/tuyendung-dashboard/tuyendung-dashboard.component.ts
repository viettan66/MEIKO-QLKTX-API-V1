import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tuyendung-dashboard',
  templateUrl: './tuyendung-dashboard.component.html',
  styleUrls: ['./tuyendung-dashboard.component.css']
})
export class TuyendungDashboardComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Tuyển dụng Website');
  }

}
