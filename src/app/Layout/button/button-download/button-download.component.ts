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
@Input() hide
@Input() tableName
@Input() bg
@Input() step
@Input() rows
  constructor(public rest:RESTService) { }

  ngOnInit() {
    ////////////console.log(this.hide)
  }

  download(){
 
      this.rest.ExportTOExcel(document.getElementById(this.tableID),this.tableName,null,this.hide)
    
    //$('#'+this.tableID).find('.ShowToExport').css('display','none')
  }
}
