import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-button-download-json',
  templateUrl: './button-download-json.component.html',
  styleUrls: ['./button-download-json.component.css']
})
export class ButtonDownloadJsonComponent implements OnInit {
@Input() listdata
@Input() classs
@Input() fileName
  constructor(public rest:RESTService) { }

  ngOnInit() {
  }
  download(){
if(this.listdata!=null){
  this.rest.ExportTOExcelFromJson(this.listdata,this.fileName)
}
  }
}
