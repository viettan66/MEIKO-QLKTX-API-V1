import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
import { NgModule ,Injectable, Input} from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import * as Globle from './Service/global.service';
import { CKEditorModule } from 'ngx-ckeditor';
import { Safe } from './Service/innerHTML';



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
import { DatabaseComponent } from './dashboard/setting/database/database.component';
import { UngvienComponent } from './TUYENDUNG/component/ungvien/ungvien.component';
import { TuyendungDashboardComponent } from './TUYENDUNG/component/tuyendung-dashboard/tuyendung-dashboard.component';
import { TuyendungYeucauComponent } from './TUYENDUNG/component/tuyendung-yeucau/tuyendung-yeucau.component';
import { TuyendungLichhenComponent } from './TUYENDUNG/component/tuyendung-lichhen/tuyendung-lichhen.component';
import { TuyendungDanhgiaComponent } from './TUYENDUNG/component/tuyendung-danhgia/tuyendung-danhgia.component';
import { TuyendungDanhmucComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc.component';
import { TuyendungDanhmucCongviecComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-congviec/tuyendung-danhmuc-congviec.component';
import { TuyendungDanhmucLinhvucComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-linhvuc/tuyendung-danhmuc-linhvuc.component';
import { TuyendungDanhmucChuyennganhComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-chuyennganh/tuyendung-danhmuc-chuyennganh.component';
import { TuyendungDanhmucBacdaotaoComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-bacdaotao/tuyendung-danhmuc-bacdaotao.component';
import { TuyendungDanhmucTieuchidanhgiaComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-tieuchidanhgia/tuyendung-danhmuc-tieuchidanhgia.component';
import { TuyendungDanhmucDiadiemphongvanComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-diadiemphongvan/tuyendung-danhmuc-diadiemphongvan.component';
import { TuyendungDanhmucNguonthongtinComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-nguonthongtin/tuyendung-danhmuc-nguonthongtin.component';
import { FormLylichungvienComponent } from './TUYENDUNG/component/Form/form-lylichungvien/form-lylichungvien.component';
import { TdLhThemlichenComponent } from './TUYENDUNG/component/tuyendung-lichhen/td-lh-themlichen/td-lh-themlichen.component';
import { TdLhDanhsachlichenComponent } from './TUYENDUNG/component/tuyendung-lichhen/td-lh-danhsachlichen/td-lh-danhsachlichen.component';
import { TuyendungUngvienComponent } from './TUYENDUNG/component/tuyendung-ungvien/tuyendung-ungvien.component';
import { DanhsachdanhgiaComponent } from './TUYENDUNG/component/tuyendung-danhgia/danhsachdanhgia/danhsachdanhgia.component';
import { TuyendungDanhmucQuyendanhgiaComponent } from './TUYENDUNG/component/tuyendung-danhmuc/tuyendung-danhmuc-quyendanhgia/tuyendung-danhmuc-quyendanhgia.component';
import { ButtonMessagerComponent } from './Layout/button/button-messager/button-messager.component';
import { ButtonEmailComponent } from './Layout/button/button-email/button-email.component';
import { ButtonCallComponent } from './Layout/button/button-call/button-call.component';
import { DanhsachtuyendungComponent } from './TUYENDUNG/component/tuyendung-yeucau/danhsachtuyendung/danhsachtuyendung.component';
import { TuyendungYeucaubophanComponent } from './TUYENDUNG/component/tuyendung-yeucaubophan/tuyendung-yeucaubophan.component';
import { TuyendungLichhencuatoiComponent } from './TUYENDUNG/component/tuyendung-lichhencuatoi/tuyendung-lichhencuatoi.component';
import { TuyendungDanhgiacuatoiComponent } from './TUYENDUNG/component/tuyendung-danhgiacuatoi/tuyendung-danhgiacuatoi.component';
import { ButtonDownloadComponent } from './Layout/button/button-download/button-download.component';
import { QlktxUploadComponent } from './QLKTX/component/qlktx-upload/qlktx-upload.component';
import { DashboardFGPComponent } from './dashboard/setting/dashboard-fgp/dashboard-fgp.component';
import { QlktxUploadPhongComponent } from './QLKTX/component/qlktx-upload/qlktx-upload-phong/qlktx-upload-phong.component';
import { ButtonUploadComponent } from './Layout/button/button-upload/button-upload.component';
import { QlktxUploadTuComponent } from './QLKTX/component/qlktx-upload/qlktx-upload-tu/qlktx-upload-tu.component';
import { QlktxUploadGiuongComponent } from './QLKTX/component/qlktx-upload/qlktx-upload-giuong/qlktx-upload-giuong.component';
import { QlktxUploadNhanvienComponent } from './QLKTX/component/qlktx-upload/qlktx-upload-nhanvien/qlktx-upload-nhanvien.component';
import { ButtonNextComponent } from './Layout/button/button-next/button-next.component';
import { ButtonPreviewComponent } from './Layout/button/button-preview/button-preview.component';
import { ButtonCountComponent } from './Layout/button/button-count/button-count.component';
import { ButtonDownloadJsonComponent } from './Layout/button/button-download-json/button-download-json.component';
import { ButtonDatetimepickerComponent } from './Layout/button/button-datetimepicker/button-datetimepicker.component';
import { ButtonSortComponent } from './Layout/button/button-sort/button-sort.component';
import { SelectAccountModalComponent } from './Layout/select-account-modal/select-account-modal.component';
import { SelectAccountAddKTXComponent } from './Layout/select-account-add-ktx/select-account-add-ktx.component';
import { TaikhoanchuadongboComponent } from './QLKTX/component/tracuuthongke/taikhoanchuadongbo/taikhoanchuadongbo.component';
import { WindowChatComponent } from './Layout/window-chat/window-chat.component';
import { ButtonSearchComponent } from './Layout/button/button-search/button-search.component';
import { TaikhoanDongboComponent } from './dashboard/setting/taikhoan-dongbo/taikhoan-dongbo.component';


const config: SocketIoConfig = { url: Globle.SocketServer, options: {} };
const routes: Routes = [
  {path: '', component: DashboardComponent,canActivate:[Auth]},
  {path: 'Login', component: LoginComponent},
  {path: 'QLKTX', component: KTXDashboardComponent,canActivate:[Auth]},
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
  {path: 'QLKTX/UL', component: QlktxUploadComponent,canActivate:[Auth]},
  {path: 'DASHBOARD/DTB', component: DatabaseComponent,canActivate:[Auth]},
  {path: 'DASHBOARD/SETTING', component: SettingComponent,canActivate:[Auth]},
  {path: 'DASHBOARD/FGP', component: DashboardFGPComponent,canActivate:[Auth]},
  {path: 'notfoundpage', component: NotfoundpageComponent},
  {path: 'ForgotPassworld', component: QuenmatkhauComponent},
  {path: 'NewComer', component: DangkyComponent},
  
  {path: 'TUYENDUNG', component: TuyendungDashboardComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/UV', component: TuyendungUngvienComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/YC', component: TuyendungYeucauComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/LH', component: TuyendungLichhenComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/DG', component: TuyendungDanhgiaComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/DM', component: TuyendungDanhmucComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/YCBP', component: TuyendungYeucaubophanComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/LHCT', component: TuyendungLichhencuatoiComponent,canActivate:[Auth]},
  {path: 'TUYENDUNG/DGCT', component: TuyendungDanhgiacuatoiComponent,canActivate:[Auth]},
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
    DatabaseComponent,
    UngvienComponent,
    TuyendungDashboardComponent,
    TuyendungYeucauComponent,
    TuyendungLichhenComponent,
    TuyendungDanhgiaComponent,
    TuyendungDanhmucComponent,
    TuyendungDanhmucCongviecComponent,
    TuyendungDanhmucLinhvucComponent,
    TuyendungDanhmucChuyennganhComponent,
    TuyendungDanhmucBacdaotaoComponent,
    TuyendungDanhmucTieuchidanhgiaComponent,
    TuyendungDanhmucDiadiemphongvanComponent,
    TuyendungDanhmucNguonthongtinComponent,
    FormLylichungvienComponent,
    TdLhThemlichenComponent,
    TdLhDanhsachlichenComponent,
    TuyendungUngvienComponent,
    DanhsachdanhgiaComponent,
    TuyendungDanhmucQuyendanhgiaComponent,
    ButtonMessagerComponent,
    ButtonEmailComponent,
    ButtonCallComponent,
    DanhsachtuyendungComponent,
    TuyendungYeucaubophanComponent,
    TuyendungLichhencuatoiComponent,
    TuyendungDanhgiacuatoiComponent,
    ButtonDownloadComponent,
    QlktxUploadComponent,
    DashboardFGPComponent,
    QlktxUploadPhongComponent,
    ButtonUploadComponent,
    QlktxUploadTuComponent,
    QlktxUploadGiuongComponent,
    QlktxUploadNhanvienComponent,
    ButtonNextComponent,
    ButtonPreviewComponent,
    ButtonCountComponent,
    ButtonDownloadJsonComponent,
    ButtonDatetimepickerComponent,
    ButtonSortComponent,
    SelectAccountModalComponent,
    SelectAccountAddKTXComponent,
    TaikhoanchuadongboComponent,
    WindowChatComponent,
    ButtonSearchComponent,
    TaikhoanDongboComponent,
    Safe
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),CKEditorModule
  ],
  exports: [RouterModule],
  providers: [CookieService,Auth,{provide: LocationStrategy, useClass: HashLocationStrategy},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
