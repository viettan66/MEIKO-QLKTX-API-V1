import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public cookie:CookieService) { }

  ngOnInit() {
  }
  logout(){
    this.cookie.deleteAll();
    localStorage.removeItem('KTX_User')
    window.location.assign('');
  }
}
