import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { Router } from '@angular/router';
import { RESTService } from 'src/app/Service/rest.service';
import { result } from 'src/app/QLKTX/models/result';

import { Socket } from 'ngx-socket-io';
import { MKV7001 } from 'src/app/Models/MKV7001';

import * as Global from '../../Service/global.service'
import { formatDate, DatePipe } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public listMKV7001: MKV7001[] = []
  public listmesstoshow: MKV7001[] = []
  public isshowmess = false
  localimage=''
  constructor(public router: Router, public rest: RESTService, private socket: Socket, private datePipe: DatePipe) {
    
    this.localimage = Global.localimage
  }
  public user: MKV9999
  async ngOnInit() {
    
    let that = this
    this.user = JSON.parse(localStorage.getItem('KTX_User'))
    if(this.user!=null){
    this.socket.emit('ChangeStatusUser', this.user);
    this.listMKV7001 = await this.rest.PostDataToAPI<MKV7001[]>({ MKV9999_ID: this.user.MKV9999_ID, mybox: true }, 'MKV7001/Getall').toPromise()
    //console.log(this.listMKV7001)
    this.listMKV7001.map(x=>{
      if(this.listMKV7001.filter(c=>{return c.MKV9999_ID===x.MKV9999_ID2}).length==1)this.listMKV7001.splice(this.listMKV7001.indexOf(x),1)
    })
    that.socket.on("Message", (dataa: MKV7001) => {
      if (dataa.MKV9999_ID == this.user.MKV9999_ID || dataa.MKV9999_ID2 == this.user.MKV9999_ID) {
        if (this.listMKV7001.filter(c => { return (c.MKV9999_ID === dataa.MKV9999_ID && c.MKV9999_ID2 === dataa.MKV9999_ID2 || c.MKV9999_ID2 === dataa.MKV9999_ID && c.MKV9999_ID === dataa.MKV9999_ID2) }).length == 0) {
          this.listMKV7001.push(dataa)
        }
        this.showmessage(dataa)
      }
    })
   }
  }
  createroom(){
    $('#dkfdfkjkj').modal()
  }
  ten(element: MKV7001) {
    if (element.MKV9999 != null) {
      if (element.MKV9999.MKV9999_ID == this.user.MKV9999_ID) {
        if (element.MKV99992 != null)
          return element.MKV99992.hodem + ' ' + element.MKV99992.ten
      } else {
        return element.MKV9999.hodem + ' ' + element.MKV9999.ten
      }
    }
    element.MKV99992 != null ? (element.MKV99992.hodem + ' ' + element.MKV99992.ten) : ''
  }
  showmess() {
    this.isshowmess = !this.isshowmess
  }
  async showmessage(element: MKV7001) {
    if ($('.user' + element.MKV9999_ID2 + '_' + element.MKV9999_ID).length == 0) {
      element.list = await this.rest.PostDataToAPI<MKV7001[]>({
        MKV9999_ID: element.MKV9999_ID,
        MKV9999_ID2: element.MKV9999_ID2,
        point: this.datePipe.transform('2050-01-01 23:59:50', "yyyy-MM-dd HH:mm"),
        length: 10
      }, "MKV7001/Getall").toPromise()
      this.listmesstoshow.push(element)
      //element.list.unshift(element)
    } else {
      let kjk = this.listmesstoshow.filter(c => { return (c.MKV9999_ID === element.MKV9999_ID && c.MKV9999_ID2 === element.MKV9999_ID2 || c.MKV9999_ID === element.MKV9999_ID2 && c.MKV9999_ID2 === element.MKV9999_ID) })

      if (kjk.length != 0) {
        if (kjk[0].list.filter(c => { return c.MKV7001_ID === element.MKV7001_ID }).length == 0)
          kjk[0].list.unshift(element)
      }
    }

    this.rest.PostDataToAPI<any>({ MKV9999_ID: this.user.MKV9999_ID, MKV9999_ID2: (element.MKV9999_ID == this.user.MKV9999_ID ? element.MKV9999_ID2 : element.MKV9999_ID) }, 'MKV7001/markread').subscribe(df => {
      //console.log(df)
    })
    element.count = 0;
  }
  loadmore(element: MKV7001) {
    if(element.list==null)return false
    this.rest.PostDataToAPI<MKV7001[]>({
      MKV9999_ID: element.MKV9999_ID,
      MKV9999_ID2: element.MKV9999_ID2,
      point: element.list[element.list.length - 1].date,
      length: 10
    }, "MKV7001/Getall").toPromise().then(d => {
      d.forEach(k => element.list.push(k))
    })
  }
  async send($event, element: MKV7001) {
    let data = await this.rest.PostDataToAPI<MKV7001>(new MKV7001({
      MKV9999_ID: this.user.MKV9999_ID,
      MKV9999_ID2: (element.MKV9999_ID == this.user.MKV9999_ID ? element.MKV9999_ID2 : element.MKV9999_ID),
      trangthai: false,
      noiDung: $event.target.value,
      date: new Date(),
      type: 1
    }), 'MKV7001/CreateMess').toPromise()
    //console.log(data)
    if (data != null) {
      this.socket.emit("Message", data)
    }
    $event.target.value = ""
  }
  mousedown(element) {
  }
  sum() {
    let k = 0;
    this.listMKV7001.map(x => k += x.count)
    return k
  }
  removemessage(element) {
    this.listmesstoshow.splice(this.listmesstoshow.indexOf(element), 1)
  }
  logout() {
    localStorage.removeItem('KTX_User')
    localStorage.removeItem('loginSO')
    window.location.assign('');
  }
  search($event) {
    this.router.navigate(['QLKTX/QLTCTK'], { queryParams: { key: "test" } });
  }
  public userclickc: boolean = false
  userclick() {
    this.userclickc = !this.userclickc
  }
  changepass() {
    $('#changepassworld').modal()
  }
  savechange() {
    this.user = JSON.parse(localStorage.getItem('KTX_User'))
    let oldpass: string = $('#oldpass').val()
    let newpass: string = $('#newpass').val()
    let confirmnewpass: string = $('#confirmnewpass').val()
    if (newpass != confirmnewpass) {
      alert('Bạn nhập mật khẩu mới không khớp.')
      $('#newpass').val("")
      $('#confirmnewpass').val("")
      return false
    }
    else if (newpass.trim() == "") {
      alert('Bạn chưa nhập mật khẩu mới.')
      return false
    }
    else if (oldpass != this.user.matkhau) {
      alert('Mật khẩu cũ chưa chính xác.')
      return false
    }
    this.user.matkhau = newpass
    this.rest.PutDataToAPI<result<MKV9999>>(this.user, 'Account/Update').subscribe(data => {
      if (data.code == 'OK') {
        localStorage.removeItem('KTX_User')
        localStorage.setItem('KTX_User', JSON.stringify(data.data))
        alert("Bạn đã đổi mật khẩu thành công.")
        $('#changepassworld').modal('hide')
      } else alert(data.mess)
    })
  }
}
