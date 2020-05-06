export class KTX0052{
    constructor(obj?){
        if(obj!=null)
        Object.keys(obj).forEach(key=>{
            this[key]=obj[key]
        })
    }
    public  KTX0052_ID :number
    public  User_ID :string
    public  manhansu :string
    public  hodem :string
    public  ten :string
    public  ngaysinh :Date
    public  gioitinh :boolean
    public  check :boolean
    public  cmtnd_so :string
    public  cmtnd_ngayhethan :Date
    public  cmtnd_noicap :string
    public  phong_id :string
    public  dienthoai_didong :string
    public  chucvu :string
    public  capbac :string
    public  thetu_id :string
}