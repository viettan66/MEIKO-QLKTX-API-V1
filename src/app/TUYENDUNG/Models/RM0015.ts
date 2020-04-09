import { RM0015A } from './RM0015A';
import { RM0010 } from './RM0010';
import { Time } from '@angular/common';
import { RM0006 } from './RM0006';

export class RM0015{
    public  RM0015_ID : number  ;
    public  RM0010_ID :number   ;
    public  RM0008_ID :number   ;
    public  ngayPV :string  ;
    public  thoiGianPV :string  ;
    public  thoiGianPhongVan :string  ;
    public  ghiChu :string   ;
    public  trangThai : boolean  ;
    public  check : boolean  ;
    public  ketQua :boolean   ;
    public  vongPhongVan :number   ;
    public  RM0015A :RM0015A[]   ;
    public  RM0006 :RM0006[]=[]   ;
    public  RM0010 :RM0010   ;
}