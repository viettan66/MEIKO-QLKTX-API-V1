import { KTX0020 } from './KTX0020';
import { KTX0001 } from './KTX0001';

export class KTX0002{
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public  KTX0002_ID : number   ;
    public  KTX0001_ID : number   ;
    public  ten : string   ;
    public  ghichu :string    ;
    public  trangthai :boolean    ;
    public  thutu :  number  ;
    public KTX0020:KTX0020;
    public KTX0001:KTX0001;
}