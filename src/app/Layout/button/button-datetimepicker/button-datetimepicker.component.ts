import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-button-datetimepicker',
  templateUrl: './button-datetimepicker.component.html',
  styleUrls: ['./button-datetimepicker.component.css']
})
export class ButtonDatetimepickerComponent implements OnInit {

  constructor() { }
@Input() values
@Input() width
@Input() classs
@Input() ids
@Input() format
@Input() formats
Month=new Date().getMonth()+ 1
Date= new Date().getDate()
Hours=new Date().getHours()
Minute=new Date().getMinutes()
Second=new Date().getSeconds()
public now = ''
//public now2 = new Date().getFullYear() + '-' + (( this.Month)<10?'0':'') +this.Month+ '-' + (( this.Date)<10?'0':'') +this.Date + ' ' + (( this.Hours)<10?'0':'') +this.Hours + ':' + (( this.Minute)<10?'0':'') +this.Minute + ':00' 
  
@Output("data") data=new EventEmitter<string>()
  ngOnInit() {
    if(this.formats==null)
    this.now=new Date().getFullYear() + '-' + (( this.Month)<10?'0':'') +this.Month+ '-' + (( this.Date)<10?'0':'') +this.Date + ' ' + (( this.Hours)<10?'0':'') +this.Hours + ':' + (( this.Minute)<10?'0':'') +this.Minute + ':00' 
    else
    this.now=new Date().getFullYear() + '-' + (( this.Month)<10?'0':'') +this.Month+ '-' + (( this.Date)<10?'0':'') +this.Date
    ////console.log(this.classs)
    let that=this
    $(document).ready(function(){
      send()
      
      $('#'+that.ids).datetimepicker({onChangeDateTime:send,format:that.formats==null?'Y-m-d H:i:s':that.formats,step:1})

      function send(){
      that.data.emit($('#'+that.ids).val())
        }
    })
    
  }
}
