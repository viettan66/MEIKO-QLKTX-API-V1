import { KTX0010 } from './KTX0010';
import { MKV9999 } from 'src/app/Models/MKV9999';

export class KTX0031{
    public  KTX0010_ID :  number  ;
        public  MKV9999_ID : number   ;
        public  ngaycap :Date    ;
        public  ngaytra : Date ;
        public  trangthai :boolean    ;
        public  ghichu : string   ;
        public  thutu :number    ;

        public   KTX0010 : KTX0010   ;
        public   MKV9999 : MKV9999   ;
}