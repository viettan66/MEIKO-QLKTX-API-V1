import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MKV9981 } from '../Models/MKV9981';
import { RESTService } from './rest.service';
import { MKV9999 } from '../Models/MKV9999';
import * as Global from '../Service/global.service'
import { result } from '../QLKTX/models/result';
import { MKV9991 } from '../Models/MKV9991';

@Injectable()
export class Auth implements CanActivate {

    constructor(private router: Router,public rest: RESTService, ) { }

   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('loginSO') != null) {
           let io= JSON.parse(localStorage.getItem('loginSO'))

                    if (localStorage.getItem('KTX_User') != null) {
                        let io2= JSON.parse(localStorage.getItem('KTX_User'))
                        if(io.UserCode==io2.manhansu){
                            let kf: MKV9981[] = JSON.parse(localStorage.getItem('KTX_Menu'))
                            if (kf.filter(c => { return (('/' + c.LINKMENU) === state.url) }).length != 0) {
                                return true
                            } else if (state.url == '/') {
                                return true
                            } else {
                                this.router.navigate(['notfoundpage'], { queryParams: { returnUrl: state.url } });
                                return false;
                            }
                        }else{
                            localStorage.removeItem('KTX_User')
                                this.router.navigate(['']);
                                return false;
                        }
                    }
                    else{
                        let user= await this.rest.PostDataToAPI<MKV9999>({ ID: io.UserCode, pass: '' }, 'Account/Check').toPromise()
                        if(user!=null){
                            localStorage.setItem('KTX_User', JSON.stringify(user));
                        let yu= await this.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+user.MKV9999_ID).toPromise()
                        localStorage.setItem('KTX_Menu', JSON.stringify(yu)); 
                        this.router.navigate([' ']).finally(() => {
                            window.location.reload();
                        });
                            return true;
                        }else{
                            let arr=await this.rest.Get207<MKV9999[]>(Global.AsoftAPI).toPromise()
                            for(const x of arr.filter(c=>c.manhansu===io.UserCode)){
                                x.matkhau="123456"
                                let result= await this.rest.PostDataToAPI<result<MKV9999>>(x, 'Account/add').toPromise()
                                if(result.code=="OK"){
                                    result.data.bophan=await this.rest.Get207<MKV9991>(Global.AsoftAPI_Phong_id + result.data.phong_id).toPromise()
                                    result.data.ban=await this.rest.Get207<MKV9991>(Global.AsoftAPI_Phong_id + result.data.ban_id==null?"dfdf":result.data.ban_id).toPromise()
                                    await this.rest.PostDataToAPI({phong_id:result.data.ban.id,bophan_ma:result.data.ban.bophan_ma,bophan_ten:result.data.ban.bophan_ten,idcha:result.data.ban.idcha},'MKV9998/add').toPromise()
                                    localStorage.setItem('KTX_User', JSON.stringify(result.data)); 
                                    let per=await this.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetAcctionWidthMKV9999ID/'+result.data.MKV9999_ID).toPromise()
                                    localStorage.setItem('KTX_Menu', JSON.stringify(per));
                                    this.router.navigate([' ']).finally(() => {
                                        window.location.reload();
                                    }); 
                                    return true
                                }
                            }
                        }
                    }
        }
        else{
            if (localStorage.getItem('KTX_User') != null) {
                let kf: MKV9981[] = JSON.parse(localStorage.getItem('KTX_Menu'))
                if (kf.filter(c => { return (('/' + c.LINKMENU) === state.url) }).length != 0) {
                    return true
                } else if (state.url == '/') {
                    return true
                } else {
                    this.router.navigate(['notfoundpage'], { queryParams: { returnUrl: state.url } });
                    return false;
                }
            }
            else{
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url } });
        return false;
            }
        }
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}