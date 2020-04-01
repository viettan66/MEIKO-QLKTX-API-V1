import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MKV9981 } from '../Models/MKV9981';

@Injectable()
export class Auth implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}