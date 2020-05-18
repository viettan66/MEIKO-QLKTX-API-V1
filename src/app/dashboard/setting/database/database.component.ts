import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  constructor(public rest:RESTService) { }
  public cmd=""
  ngOnInit() {
  }
run(){
this.rest.PostDataToAPI<result<any>>({cmd:this.cmd},'Command/Run').subscribe(data=>{
  if(data.code='OK'){
    alert('OK')
    ////////console.log(data.data)
  }else{
    alert(data.mess)
  }
})
}
}
