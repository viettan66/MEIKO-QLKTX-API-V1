import { Component, OnInit, Input } from '@angular/core';
import { MKV9999 } from 'src/app/Models/MKV9999';

@Component({
  selector: 'app-button-messager',
  templateUrl: './button-messager.component.html',
  styleUrls: ['./button-messager.component.css']
})
export class ButtonMessagerComponent implements OnInit {
@Input() MKV9999:MKV9999
  constructor() { }

  ngOnInit() {
  }

}
