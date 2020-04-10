import { Component, OnInit ,EventEmitter, Output, Input} from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-button-upload',
  templateUrl: './button-upload.component.html',
  styleUrls: ['./button-upload.component.css']
})
export class ButtonUploadComponent implements OnInit {

  @Output('data') data=new EventEmitter<any>()
  @Output('pending') vvv=new EventEmitter<boolean>()
  @Input() bg
  @Input() pending
  constructor(public rest:RESTService) { }

  ngOnInit() {
  }
  async upload(){{
    if(this.pending){
      alert("Chờ xử lý...")
      return false
    }
this.vvv.emit(true)
  this.data.emit(await this.rest.ChooseFileExcel()) 
  }}

}
