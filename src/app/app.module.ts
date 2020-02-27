import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KTXDashboardComponent } from './QLKTX/ktx-dashboard/ktx-dashboard.component';
import { QLPComponent } from './QLKTX/component/qlp/qlp.component';
import { QLTBComponent } from './QLKTX/component/qltb/qltb.component';
import { MenuComponent } from './Layout/menu/menu.component';
import { NhanviendangkyComponent } from './QLKTX/component/nhanviendangky/nhanviendangky.component';
import { SettingComponent } from './dashboard/setting/setting.component';
import { TaikhoanComponent } from './dashboard/setting/taikhoan/taikhoan.component';
import { MenuaccountComponent } from './dashboard/setting/menuaccount/menuaccount.component';
import { NhomComponent } from './dashboard/setting/nhom/nhom.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'QLKTX', component: KTXDashboardComponent},
  {path: 'QLKTX/QLP', component: QLPComponent},
  {path: 'QLKTX/QLTB', component: QLTBComponent},
  {path: 'QLKTX/QLDK', component: NhanviendangkyComponent},
  {path: 'DASHBOARD', component: SettingComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    KTXDashboardComponent,
    QLPComponent,
    QLTBComponent,
    MenuComponent,
    NhanviendangkyComponent,
    SettingComponent,
    TaikhoanComponent,
    MenuaccountComponent,
    NhomComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
