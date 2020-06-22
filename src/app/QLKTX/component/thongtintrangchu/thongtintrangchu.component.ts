import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { KTX0040 } from '../../models/KTX0040';
import { result } from '../../models/result';
import { element } from 'protractor';
declare var $: any

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
//////////////console.log(this.listdon)
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
uploadFileToActivity() {
  this.rest.postFile(this.fileToUpload).then(data=>{
    //////////////console.log(data)
  })
}
themthem(){
  $("#themthem").modal()
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
  saved(){
    //this.uploadFileToActivity()
    this.rest.PostDataToAPI<result<KTX0040>>(this.element,'KTX0040/update').subscribe(data=>{
        if(data.code=="OK"){
          this.listdon.splice(this.listdon.indexOf(this.element),1)
          this.listdon.push(data.data)
$("#formdangdyokytucxa").modal('hide')
        }
    })
  }
  public element:KTX0040=new KTX0040()
  edit(element){
    this.element=element
$("#formdangdyokytucxa").modal()
  }
  async delete(element) {
    if (!confirm("Bạn muốn xóa tin này?")) return false
    let datas = await this.rest.PutDataToAPI<result<KTX0040>[]>([element], 'KTX0040/delete').toPromise()
    datas.filter(c => { return c.code === "OK" }).map(data => {
      if (data.code == "OK") {
        this.listdon.filter(c => { return c.KTX0040_ID === data.data.KTX0040_ID }).map(x => { this.listdon.splice(this.listdon.indexOf(x), 1) })
      }
    })

  }
  substr(t:string){
    return t.substring(0,t.length>200?200:t.length)+'...'
  }
}
