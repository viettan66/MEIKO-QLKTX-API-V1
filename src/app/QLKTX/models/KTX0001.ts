import { KTX0002 } from './KTX0002';
import { KTX0011 } from './KTX0011';
import { KTX0010 } from './KTX0010';

export class KTX0001{
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
   public  KTX0001_ID: number;
   public  khu:string;
   public  type:number;
  public   ten:string;
  public   makhoa:string;
  public   trangthaidodung:string;
   public  ghichu:string;
   public  trangthai:boolean;
   public  check:boolean;
   public  thutu:number;
   public  idcha:number;
   public  slot:number;
   public  capbac:number;
    public slotuse:number
    public KTX0002: KTX0002[]
    public KTX0011 :KTX0011[] 
    public KTX0010 :KTX0010[] 
}