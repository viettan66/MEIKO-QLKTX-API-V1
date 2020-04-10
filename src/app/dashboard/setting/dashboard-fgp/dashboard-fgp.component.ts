import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { MKV8001 } from 'src/app/Models/MKV8001';

@Component({
  selector: 'app-dashboard-fgp',
  templateUrl: './dashboard-fgp.component.html',
  styleUrls: ['./dashboard-fgp.component.css']
})
export class DashboardFGPComponent implements OnInit {

  constructor(public rest:RESTService) { }
  public keysearch
  public phong_id
  public filter='false'
  public listMKV8801:MKV8001[]=[]
  async ngOnInit() {
    this.listMKV8801=await this.rest.GetDataFromAPI<MKV8001[]>('MKV8001/Get/false').toPromise()

  }
  async fil(){
    this.listMKV8801=await this.rest.GetDataFromAPI<MKV8001[]>('MKV8001/Get/'+this.filter).toPromise()
  }
 async  agree(element){
    await this.rest.PutDataToAPI<any>(element,'MKV8001/update').toPromise()
    this.fil()
  }
}
