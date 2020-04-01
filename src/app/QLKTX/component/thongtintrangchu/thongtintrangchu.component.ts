import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0040 } from '../../models/KTX0040';
import { result } from '../../models/result';

@Component({
  selector: 'app-thongtintrangchu',
  templateUrl: './thongtintrangchu.component.html',
  styleUrls: ['./thongtintrangchu.component.css']
})
export class ThongtintrangchuComponent implements OnInit {
  public fileToUpload: File = null;
public ktx0040:KTX0040=new KTX0040()
public listdon:KTX0040[]=[]
  constructor(public rest:RESTService) { }
  async ngOnInit() {
this.listdon=await this.rest.GetDataFromAPI<KTX0040[]>('KTX0040/Getall').toPromise();
//console.log(this.listdon)
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
uploadFileToActivity() {
  this.rest.postFile(this.fileToUpload).then(data=>{
    //console.log(data)
  })
}
  save(){
    //this.uploadFileToActivity()
    this.rest.PostDataToAPI<result<KTX0040>[]>([this.ktx0040],'KTX0040/add').subscribe(data=>{
      data.forEach(val=>{
        if(val.code=="OK"){
          this.listdon.push(val.data)
        }
      })
    })
  }
}
