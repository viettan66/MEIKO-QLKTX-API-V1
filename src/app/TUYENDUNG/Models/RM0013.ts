import { RM0006 } from './RM0006';
import { RM0015 } from './RM0015';

export class RM0013{
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public  RM0013_ID:number   ;
    public  RM0015_ID: number  ;
    public  MKV9999_ID: number  ;
    public  RM0006_ID:number   ;
    public  nhanXet: string  ;
    public  ghiChu:string   ;
    public  ketQua:boolean   ;
    public  trangThai:boolean   ;
    public   RM0015: RM0015  ;
    public   RM0006:  RM0006 ;
}