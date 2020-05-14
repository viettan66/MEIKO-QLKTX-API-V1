export class RM0081_A{   
   constructor(obj?){
   if(obj!=null)
   Object.keys(obj).forEach(key=>{
       this[key]=obj[key]
   })
}
    public  RM0010_ID :  string  ;
    public  BATDAU :  Date  ;
    public KETTHUC :  Date  ;
    public  CHUYENNGANH : string   ;
    public  TENTRUONG :   string ;
    public  QUOCGIA :  string  ;
    public  HEDAOTAO : string   ;
    public  XEPLOAI :string    ;
    public  RM0081_ID :number    ;
    public  TYPE :number    ;
    
       // public   RM0010 :RM0010    ;
    }