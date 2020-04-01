import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router) { }
public user:MKV9999
  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('KTX_User'))
  }
  logout(){
    localStorage.removeItem('KTX_User')
    window.location.assign('');
  }
  search($event){
    this.router.navigate(['QLKTX/QLTCTK'], { queryParams: { key: "test" } });
  }
}
