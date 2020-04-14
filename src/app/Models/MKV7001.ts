import { MKV7000 } from './MKV7000'
import { MKV9999 } from './MKV9999'

export class MKV7001{
        constructor(obj?){
            if(obj!=null)
            Object.keys(obj).forEach(key=>{
                this[key]=obj[key]
            })
        }
    public  MKV7001_ID:number
    public  MKV7000_ID:number
    public  MKV9999_ID:number
    public  MKV9999_ID2:number
    public  count:number
    public  ten:string
    public  type :number
    public  trangthai:boolean
    
    public  tieuDe :string
    public  noiDung :string
    public  ghiChu :string
    public date :Date
    public   MKV7000:MKV7000
    public   list:MKV7001[]=[]
    public   MKV9999:MKV9999
    public   MKV99992:MKV9999
}