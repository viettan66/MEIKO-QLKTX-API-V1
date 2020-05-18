import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RESTService } from './Service/rest.service';
import * as Globals from './Service/global.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public rest:RESTService,public cookie:CookieService) {
  //console.log(JSON.parse('{"xapk_version":2,"package_name":"com.FogwattGames.BeadSort","name":"Bead Sort!","locales_name":{"af":"Bead Sort!","am":"Bead Sort!","ar":"Bead Sort!","as":"Bead Sort!","az":"Bead Sort!","be":"Bead Sort!","bg":"Bead Sort!","bn":"Bead Sort!","bs":"Bead Sort!","ca":"Bead Sort!","cs":"Bead Sort!","da":"Bead Sort!","de":"Bead Sort!","el":"Bead Sort!","en-AU":"Bead Sort!","en-CA":"Bead Sort!","en-GB":"Bead Sort!","en-IN":"Bead Sort!","en-XC":"Bead Sort!","es":"Bead Sort!","es-ES":"Bead Sort!","es-US":"Bead Sort!","et":"Bead Sort!","eu":"Bead Sort!","fa":"Bead Sort!","fi":"Bead Sort!","fr":"Bead Sort!","fr-CA":"Bead Sort!","gl":"Bead Sort!","gu":"Bead Sort!","hi":"Bead Sort!","hr":"Bead Sort!","hu":"Bead Sort!","hy":"Bead Sort!","id":"Bead Sort!","in":"Bead Sort!","is":"Bead Sort!","it":"Bead Sort!","iw":"Bead Sort!","ja":"Bead Sort!","ka":"Bead Sort!","kk":"Bead Sort!","km":"Bead Sort!","kn":"Bead Sort!","ko":"Bead Sort!","ky":"Bead Sort!","lo":"Bead Sort!","lt":"Bead Sort!","lv":"Bead Sort!","mk":"Bead Sort!","ml":"Bead Sort!","mn":"Bead Sort!","mr":"Bead Sort!","ms":"Bead Sort!","my":"Bead Sort!","nb":"Bead Sort!","ne":"Bead Sort!","nl":"Bead Sort!","or":"Bead Sort!","pa":"Bead Sort!","pl":"Bead Sort!","pt":"Bead Sort!","pt-BR":"Bead Sort!","pt-PT":"Bead Sort!","ro":"Bead Sort!","ru":"Bead Sort!","si":"Bead Sort!","sk":"Bead Sort!","sl":"Bead Sort!","sq":"Bead Sort!","sr":"Bead Sort!","sr-Latn":"Bead Sort!","sv":"Bead Sort!","sw":"Bead Sort!","ta":"Bead Sort!","te":"Bead Sort!","th":"Bead Sort!","tl":"Bead Sort!","tr":"Bead Sort!","uk":"Bead Sort!","ur":"Bead Sort!","uz":"Bead Sort!","vi":"Bead Sort!","zh-CN":"Bead Sort!","zh-HK":"Bead Sort!","zh-TW":"Bead Sort!","zu":"Bead Sort!"},"version_code":"6","version_name":"1.13","min_sdk_version":"16","target_sdk_version":"28","permissions":["android.permission.INTERNET","android.permission.VIBRATE","android.permission.ACCESS_NETWORK_STATE","com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE","android.permission.WRITE_EXTERNAL_STORAGE","com.android.vending.BILLING","android.permission.READ_EXTERNAL_STORAGE","android.permission.WAKE_LOCK"],"split_configs":["config.arm64_v8a"],"total_size":33158213,"icon":"icon.png","split_apks":[{"file":"com.FogwattGames.BeadSort.apk","id":"base"},{"file":"config.arm64_v8a.apk","id":"config.arm64_v8a"}]}'))
   }
  title = 'MEIKO-QLKTX-API-V1';
}
