import { Component, OnInit } from '@angular/core';
import { RESTService } from '../Service/rest.service';
import { MKV9999 } from '../Models/MKV9999';
import { CookieService } from 'ngx-cookie-service';
import { result } from '../QLKTX/models/result';
import { MKV9991 } from '../Models/MKV9991';
import { Router, ActivatedRoute } from '@angular/router';
import { MKV9981 } from '../Models/MKV9981';

declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public rest: RESTService, public cookie: CookieService,private router: Router,public active:ActivatedRoute) { }

  ngOnInit() {
    this.active.queryParams.subscribe(vla=>{
      $('#ID').val(vla['ID'])
    })
    
    let that = this
    $(document).ready(function () {
      function  LOGIN(data: MKV9999, o?: boolean) {
        if (o) {
          that.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + data.phong_id).subscribe(dat => {
            data.bophan = dat
            if(data.ban_id==null)data.ban_id='sdsd'
            that.rest.Get207<MKV9991>('http://192.84.100.207/AsoftAPI/EC0002/' + data.ban_id).subscribe(dat2 => {
              //////////////console.log(dat2)
              if(dat2!=null)
              that.rest.PostDataToAPI({phong_id:dat2.id,bophan_ma:dat2.bophan_ma,bophan_ten:dat2.bophan_ten,idcha:dat2.idcha},'MKV9998/add').subscribe(dataa=>{
                //////////////console.log(dataa)
              })
              data.ban = dat2
              localStorage.setItem('KTX_User', JSON.stringify(data)); 
              that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+data.MKV9999_ID).subscribe(data=>{
                localStorage.setItem('KTX_Menu', JSON.stringify(data)); 
                that.router.navigate(['']).finally (() => {
                  window.location.reload();
                });
                //window.location.reload()
              })
            })
          })
        } else {
          localStorage.setItem('KTX_User', JSON.stringify(data));
              that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+data.MKV9999_ID).subscribe(data=>{
                localStorage.setItem('KTX_Menu', JSON.stringify(data)); 
                that.router.navigate([' ']).finally(() => {
                  window.location.reload();
                });
                //window.location.reload()
              })
        }


      }
      $('#LOGIN').click(function () {
        that.rest.PostDataToAPI<MKV9999>({ ID: $('#ID').val(), pass: $('#PASS').val() }, 'Account/Check').subscribe(data => {
          if (data == null) {
            //alert('Sai tên đăng nhập hoặc mật khẩu...')
            //$(':text').val('')
            that.rest.Get207<MKV9999[]>('http://192.84.100.207/AsoftAPI/E00003/GetByStatus/1/100000/1').subscribe(data => {
              let checkf=true
              data.forEach(val => {
                if (val.manhansu + '' == $('#ID').val()||val.cmtnd_so==$('#ID').val()) {
                  checkf=false
                  //////////////console.log(val)
                  val.matkhau = $('#PASS').val()
                  that.rest.PostDataToAPI<result<MKV9999>>(val, 'Account/add').subscribe(data1 => {
                    if (data1.code == "OK") {
                      //alert('Tài khoản của bạn đã được tạo')
                      ////////////console.log("1111111")
                      LOGIN(data1.data, true)
                    } else {
                      alert(data1.mess)
                    }
                  })
                }
              })
              if(checkf){
                that.router.navigate(['NewComer'],{ queryParams: { cmtnd_so: $('#ID').val() } })
              }
              
            })
          }
          else {
            if( data.matkhau == $('#PASS').val()){
            //////////////console.log("22222");
            LOGIN(data, false)
          }
            else{
              alert('Sai mật khẩu')
            }

          }
        })
      })
    })
  }
forgot(){
  this.router.navigate(['ForgotPassworld'])
}
kk(){{
 // localStorage.setItem('loginSO','{"Users_ID":"7D705F889F8D4E1D89206A6499ADA384","displayName":"Nguyễn Việt Tấn","anhDaiDien":"http://192.84.100.207/AdminApi/Content/noimages.gif","UserCode":"017677","Department":"85a79fe3-dbba-4c3a-86ef-646052e4dfda","Level":4,"Chucvu":"Chuyên viên sơ cấp","dept":{"id":"85a79fe3-dbba-4c3a-86ef-646052e4dfda","bophan_diachi":null,"bophan_dienthoai":null,"bophan_ma":"AIT1000","bophan_ten":"Ứng dụng","congty_id":null,"idcha":"98556f84-6d3e-42fa-a084-6b9d22839181","logo":null,"muc":"A04","thutu":0,"tinhtrang":true},"PhongBanParent":[{"id":"98556f84-6d3e-42fa-a084-6b9d22839181","bophan_diachi":null,"bophan_dienthoai":null,"bophan_ma":"AIT0000","bophan_ten":"IT","congty_id":null,"idcha":"f8d05c95-b6ba-4bf7-ad9b-11fc8d1aab43","logo":null,"muc":"A03","thutu":0,"tinhtrang":true},{"id":"f8d05c95-b6ba-4bf7-ad9b-11fc8d1aab43","bophan_diachi":null,"bophan_dienthoai":null,"bophan_ma":"A000000","bophan_ten":"Quản lý","congty_id":null,"idcha":null,"logo":null,"muc":"A02","thutu":0,"tinhtrang":true}],"PhongBanParentID":"98556f84-6d3e-42fa-a084-6b9d22839181","tenPhongBan":"Quản lý/IT/Ứng dụng","Language":[{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"20AF6DED9C5A435681AA4CA43EF0B302","maCode":"ButtonSend","tenTieuDe":"Gửi"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"2141B32EB145462FB1628FE246981D85","maCode":"TitleNumberPage","tenTieuDe":"trong số"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"282E87187FFB4AA98CCE28867F3C86FC","maCode":"TitleNguoiLap","tenTieuDe":"Người lập"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"2A6762B9E2D344A695C0AC903D484486","maCode":"TitleLuuLai","tenTieuDe":"Lưu lại"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"3307066888B64AF692706321AE7EAE72","maCode":"ButtonExit","tenTieuDe":"Thoát"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"36040574401143E49050D447B74EFE52","maCode":"ButtonSendTo","tenTieuDe":"Gửi đích danh"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"3B03858B8829481EA09D792D97088755","maCode":"NotifyPhanLoaiBai","tenTieuDe":"Cải tiến này chưa được phân loại bài"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"4684A2539B4C4559931A4FF060BF4FD5","maCode":"NotifyThongBao","tenTieuDe":"Thông báo"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"4D06B2BD91E44F118C6465E78E403B25","maCode":"TitleNguoiThucHien","tenTieuDe":"Người Thực Hiện"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"5DE6EA9957EE4CEC91DFACF489503367","maCode":"TitlSearch","tenTieuDe":"Tìm kiếm ..."},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"6863F177DB53449C9EF05692184A1A28","maCode":"TitleTenCongViec","tenTieuDe":"Tên công việc"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"8B4E64C879744F2790621ADD832F9060","maCode":"TitleTacVu","tenTieuDe":"Tác vụ"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"A2889D265B2B4A398967B31C7B198149","maCode":"ButtonReject","tenTieuDe":"Trả lại"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"A2AC633978DB428DAB19A3282E68F450","maCode":"TitleChucNang","tenTieuDe":"Chức năng"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"AB70967FA2B1456DA8EEAB5F4EBB8EAB","maCode":"TitleTienTrinh","tenTieuDe":"Tiến trình"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"B4A8BD81B39F4B82B171149F70EDAA75","maCode":"TitleNoiDungCongViec","tenTieuDe":"Nội dung công việc"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"CE89B5496E6047DDB42FD84F135C9668","maCode":"TitleMaCongViec","tenTieuDe":"Mã công việc"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"D0D593B51E4949C4B639BCEF02439A0F","maCode":"TitleNhomXuLy","tenTieuDe":"Nhóm xử lý"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"E394E6C48A9A425996197AAFA5BE7838","maCode":"TitleLichSuTrinhKy","tenTieuDe":"Lịch Sử Trình Ký"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"EC594AA65D5549DA990EB13D4BB52A9F","maCode":"TitleSTT","tenTieuDe":"STT"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"F750087CBCFB4AAE861A4281DE103303","maCode":"TitleEventLog","tenTieuDe":"Ghi Chú Trình Ký"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"FC3C42D32D68497E952B7C4B8AE5F08B","maCode":"TitleNgayLap","tenTieuDe":"Ngày lập"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"FDF4AF3E42774B7A8FBBF588572E048B","maCode":"TitleKyVaGui","tenTieuDe":"Ký Và Gửi"}]}')
}}
kkkk($event){
  if ($event.key === "Enter") {
    $('#LOGIN').click()
  }
}
}
