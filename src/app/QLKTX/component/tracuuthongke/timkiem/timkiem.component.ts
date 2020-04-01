import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { KTX0020 } from 'src/app/QLKTX/models/KTX0020';
import { KTX0023 } from 'src/app/QLKTX/models/KTX0023';
import { KTX0002 } from 'src/app/QLKTX/models/KTX0002';
declare var $:any

@Component({
  selector: 'app-timkiem',
  templateUrl: './timkiem.component.html',
  styleUrls: ['./timkiem.component.css']
})
export class TimkiemComponent implements OnInit {

  @Input() lisktx0020: KTX0020[] ;
  @Input() lisktx0023: KTX0023[] ;
 // @Output('ktx10out') ktx10out=new EventEmitter<KTX0010>() ;
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('#tablelisstabcdef1').on('click','tr',function(){
        $('#tablelisstabcdef1>tr').removeClass('actived')
        $(this).addClass('actived')
      })
    })
  }
  public element
  public ra=null
  showdetaildonra(element){
    this.element =element
    this.ra=true
  }
  showdetaildonvao(element){
    this.element =element
    this.ra=false
  }
}
