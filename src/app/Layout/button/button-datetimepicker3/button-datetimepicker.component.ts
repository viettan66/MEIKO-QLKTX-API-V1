import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { send } from 'process';
declare var $: any

@Component({
  selector: 'app-button-datetimepicker3',
  templateUrl: './button-datetimepicker.component.html',
  styleUrls: ['./button-datetimepicker.component.css']
})
export class ButtonDatetimepickerComponent3 implements OnInit {

  constructor() { }
  @Input() ids
  @Input() data
  Month = new Date().getMonth() + 1
  Date = new Date().getDate()
  Hours = new Date().getHours()
  Minute = new Date().getMinutes()
  Second = new Date().getSeconds()
  public now = ''
  public check
  //public now2 = new Date().getFullYear() + '-' + (( this.Month)<10?'0':'') +this.Month+ '-' + (( this.Date)<10?'0':'') +this.Date + ' ' + (( this.Hours)<10?'0':'') +this.Hours + ':' + (( this.Minute)<10?'0':'') +this.Minute + ':00' 

  @Output("data") datas = new EventEmitter<string>()
  ngOnInit() {
    let that = this
    $(document).ready(function () {
      $('#' + that.ids).datetimepicker({
        onChangeDateTime: send,
        lang: 'ch',
        timepicker: false,
        format: 'Y-m-d',
        formatDate: 'Y-m-d',
      })
      send()
      function send() {
        that.check=$('#' + that.ids).val().trim()
        console.log(that.check)
        that.datas.emit($('#' + that.ids).val())
      }
    })

  }
}
