import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-td-lh-themlichen',
  templateUrl: './td-lh-themlichen.component.html',
  styleUrls: ['./td-lh-themlichen.component.css']
})
export class TdLhThemlichenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
$('.gh').css('display','none')
  }

}
