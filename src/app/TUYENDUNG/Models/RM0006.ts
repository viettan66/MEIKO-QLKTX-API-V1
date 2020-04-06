import { RM0013 } from './RM0013';
import { RM0007 } from './RM0007';

// import { RM0013 } from './RM0013';
export class RM0006{
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public  RM0006_ID :number    ;
    public  maTieuChiDG :string    ;
    public  tenTieuChiDG : string   ;
    public thuTu : number   ;
    public  tinhTrang : boolean   ;
    public  ghiChu :string    ;

    public  RM0013 :RM0013    ;
    public  RM0007 :RM0007    ;
}