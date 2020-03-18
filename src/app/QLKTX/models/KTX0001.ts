import { KTX0002 } from './KTX0002';
import { KTX0011 } from './KTX0011';

export class KTX0001{
    KTX0001_ID: number;
    khu:string;
    type:number;
    ten:string;
    ghichu:string;
    trangthai:boolean;
    check:boolean;
    thutu:number;
    idcha:number;
    slot:number;
    slotuse:number
    public KTX0002: KTX0002[]
    public KTX0011 :KTX0011[] 
}