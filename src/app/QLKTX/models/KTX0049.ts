export class KTX0049{
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public  User_ID :string
        public   startdate :string
        public  enddate :string
        public  trangthai :boolean
        public  ghichu :string
}