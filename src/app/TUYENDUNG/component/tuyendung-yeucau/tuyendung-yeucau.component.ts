import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import* as Global from 'src/app/Service/global.service';
import { yeucau } from '../../Models/yeucau';
import { A0028 } from '../../Models/A0028';
declare var $:any

@Component({
  selector: 'app-tuyendung-yeucau',
  templateUrl: './tuyendung-yeucau.component.html',
  styleUrls: ['./tuyendung-yeucau.component.css']
})
export class TuyendungYeucauComponent implements OnInit {

  constructor(public rest:RESTService) { }
public listdon:A0028[]=[]
  ngOnInit() {

    this.rest.Get207<yeucau>(Global.HostSmartOffice+'api/Work/R1_TuyenDungCompleted/all').subscribe(data => {
      data.data.forEach(element => {
        element.A0028D=data.data2.filter(c=>{return c.A0028_ID===element.A0028_ID})[0]
      });
      this.listdon=data.data
      console.log(this.listdon)
    })
  }
trclick(id){
  $('.trtwo:not(#'+id+')').addClass('trnone')

  if($('#'+id).hasClass('trnone'))
  $('#'+id).removeClass('trnone')
  else
  $('#'+id).addClass('trnone')
}
}
