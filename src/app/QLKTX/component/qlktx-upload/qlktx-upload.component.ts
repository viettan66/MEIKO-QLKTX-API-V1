import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qlktx-upload',
  templateUrl: './qlktx-upload.component.html',
  styleUrls: ['./qlktx-upload.component.css']
})
export class QlktxUploadComponent implements OnInit {

  constructor() { }

  public tab=2
  ngOnInit() {
  }
tabs(k){
this.tab=k
}
}
