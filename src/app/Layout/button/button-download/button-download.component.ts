import { Component, OnInit, Input } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
declare var $:any
@Component({
  selector: 'app-button-download',
  templateUrl: './button-download.component.html',
  styleUrls: ['./button-download.component.css']
})
export class ButtonDownloadComponent implements OnInit {
@Input() tableID
@Input() tableName
@Input() bg
  constructor(public rest:RESTService) { }

  ngOnInit() {
  }

  download(){
    //console.log($('#'+this.tableID))
    //$('#'+this.tableID).find('.ShowToExport').css('display','')
    this.rest.ExportTOExcel(document.getElementById(this.tableID),this.tableName)
    //$('#'+this.tableID).find('.ShowToExport').css('display','none')
  }
}
