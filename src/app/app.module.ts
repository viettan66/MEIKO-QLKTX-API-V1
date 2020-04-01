import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
import { NgModule ,Injectable, Input} from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { SapphongComponent } from './QLKTX/component/sapphong/sapphong.component';
import { TracuuthongkeComponent } from './QLKTX/component/tracuuthongke/tracuuthongke.component';
import { FormdangkyokytucxaComponent } from './QLKTX/component/nhanviendangky/formtemplate/formdangkyokytucxa/formdangkyokytucxa.component';
import { QldComponent } from './QLKTX/component/qld/qld.component';
import { DanhsachraComponent } from './QLKTX/component/tracuuthongke/danhsachra/danhsachra.component';
import { DanhsachvaoComponent } from './QLKTX/component/tracuuthongke/danhsachvao/danhsachvao.component';
import { TimkiemComponent } from './QLKTX/component/tracuuthongke/timkiem/timkiem.component';
import { IndonComponent } from './QLKTX/component/tracuuthongke/indon/indon.component';
import { DanhmuctaisasnComponent } from './QLKTX/component/qltb/danhmuctaisasn/danhmuctaisasn.component';
import { ThietlaptaisancodinhComponent } from './QLKTX/component/qltb/thietlaptaisancodinh/thietlaptaisancodinh.component';
import { Auth } from './Service/Auth';
import { FormketthucluutruComponent } from './QLKTX/component/form/formketthucluutru/formketthucluutru.component';
import { NotfoundpageComponent } from './Layout/notfoundpage/notfoundpage.component';
import { DodungcapphatkhisapphongComponent } from './QLKTX/component/qltb/dodungcapphatkhisapphong/dodungcapphatkhisapphong.component';
import { QlrComponent } from './QLKTX/component/qlr/qlr.component';
import { QuenmatkhauComponent } from './login/quenmatkhau/quenmatkhau.component';
import { QlrvcComponent } from './QLKTX/component/qlrvc/qlrvc.component';
import { QlnaComponent } from './QLKTX/component/qlna/qlna.component';
import { LoadingComponent } from './Layout/loading/loading.component';
import { DangkyComponent } from './login/dangky/dangky.component';
import { DanhsachphongComponent } from './QLKTX/component/tracuuthongke/danhsachphong/danhsachphong.component';
import { ThongtintrangchuComponent } from './QLKTX/component/thongtintrangchu/thongtintrangchu.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,canActivate:[Auth]},
  {path: 'Login', component: LoginComponent},
  {path: 'QLKTX', component: KTXDashboardComponent,},
  {path: 'QLKTX/QLP', component: QLPComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLTB', component: QLTBComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLDK', component: NhanviendangkyComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLSP', component: SapphongComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLTCTK', component: TracuuthongkeComponent,canActivate:[Auth]},
  {path: 'DASHBOARD', component: SettingComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLD', component: QldComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLR', component: QlrComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLRVC', component: QlrvcComponent,canActivate:[Auth]},
  {path: 'QLKTX/QLNA', component: QlnaComponent,canActivate:[Auth]},
  {path: 'QLKTX/NEW', component: ThongtintrangchuComponent,canActivate:[Auth]},
  {path: 'notfoundpage', component: NotfoundpageComponent},
  {path: 'ForgotPassworld', component: QuenmatkhauComponent},
  {path: 'NewComer', component: DangkyComponent},
  {path: '**', redirectTo:''},
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
    SapphongComponent,
    TracuuthongkeComponent,
    FormdangkyokytucxaComponent,
    QldComponent,
    DanhsachraComponent,
    DanhsachvaoComponent,
    TimkiemComponent,
    IndonComponent,
    DanhmuctaisasnComponent,
    ThietlaptaisancodinhComponent,
    FormketthucluutruComponent,
    NotfoundpageComponent,
    DodungcapphatkhisapphongComponent,
    QlrComponent,
    QuenmatkhauComponent,
    QlrvcComponent,
    QlnaComponent,
    LoadingComponent,
    DangkyComponent,
    DanhsachphongComponent,
    ThongtintrangchuComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,FormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [CookieService,Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
