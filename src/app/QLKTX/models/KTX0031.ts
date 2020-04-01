import { KTX0010 } from './KTX0010';
import { MKV9999 } from 'src/app/Models/MKV9999';

export class KTX0031 {

    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public KTX0031_ID: number;
    public KTX0010_ID: number;
    public MKV9999_ID: number;
    public KTX0023_ID: number;
    public ngaycap: Date;
    public ngaytra: Date;
    public trangthai: boolean;
    public ghichu: string;
    public thutu: number;
    public soluongcap: number;
    public soluongtra: number;
    public soluongtinh: number;

    public KTX0010: KTX0010;
    public MKV9999: MKV9999;
}