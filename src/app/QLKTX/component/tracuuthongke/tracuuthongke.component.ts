import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { valuesearch } from '../../models/valuesearch';
import { KTX0023 } from '../../models/KTX0023';
import { KTX0020 } from '../../models/KTX0020';
import { KTX0031 } from '../../models/KTX0031';
declare var $:any

@Component({
  selector: 'app-tracuuthongke',
  templateUrl: './tracuuthongke.component.html',
  styleUrls: ['./tracuuthongke.component.css']
})
export class TracuuthongkeComponent implements OnInit {

  constructor(public rest:RESTService) { }
  public tab=3

  ngOnInit() {
    let that=this
    $(document).ready(function(){{
      $('#searchbox').change(function(){
        that.inputchange($('#searchbox').val())
      })
      $('#SEARCH').click(function(){
        that.inputchange($('#searchbox').val())
      })
    }})
  }
  tabchange(i){
    this.tab=i
  }
  public lisktx0020:KTX0020[]=[];
  public lisktx0023:KTX0023[]=[];
  public listktx0031:KTX0031[]=[];
  async inputchange($value){
   this.lisktx0020=[];
   this.lisktx0023=[];
   this.listktx0031=[];
    let data= await this.rest.PostDataToAPI<valuesearch>({key:$value},'Search/Search').toPromise()
    if(data!=null){
      if(data.KTX0020!=null)this.lisktx0020=data.KTX0020
      if(data.KTX0023!=null)this.lisktx0023=data.KTX0023
    }
  }
}
