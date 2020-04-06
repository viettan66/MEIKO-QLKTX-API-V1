import { MKV9999 } from 'src/app/Models/MKV9999';
import { RM0006 } from './RM0006';

export class RM0007 {
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public  RM0007_ID :  number  ;
    public  MKV9999_ID : number   ;
    public  RM0006_ID : number   ;
    public  trangThai :boolean    ;
    public   MKV9999 :MKV9999    ;
    public   RM0006 : RM0006   ;
}