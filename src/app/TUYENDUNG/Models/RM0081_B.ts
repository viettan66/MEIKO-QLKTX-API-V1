export class RM0081_B{    
    constructor(obj?){
    if(obj!=null)
    Object.keys(obj).forEach(key=>{
        this[key]=obj[key]
    })
 }
    public  RM0010_ID : string   ;
    public  NGOAINGU : string   ;
    public  CHUNGCHI :string    ;
    public  XEPLOAI :  string  ;
    public  NGAYCAP :Date    ;
    public  NGHE : string   ;
    public  NOI :string    ;
    public  DOC : string   ;
    public  VIET :string    ;
    public  RM0081_ID : number   ;

   // public   RM0010 :RM0010    ;
}