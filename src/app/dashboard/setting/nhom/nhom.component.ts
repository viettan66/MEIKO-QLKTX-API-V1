import { Component, OnInit } from '@angular/core';
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9980 } from 'src/app/Models/MKV9980';
import { MKV9981 } from 'src/app/Models/MKV9981';
import { MKV9999 } from 'src/app/Models/MKV9999';
import { MKV9983 } from 'src/app/Models/MKV9983';
import { result } from 'src/app/QLKTX/models/result';
import { MKV9982 } from 'src/app/Models/MKV9982';
import { MKV9984 } from 'src/app/Models/MKV9984';
declare var $:any
@Component({
  selector: 'app-nhom',
  templateUrl: './nhom.component.html',
  styleUrls: ['./nhom.component.css']
})
export class NhomComponent implements OnInit {

  public listper:MKV9980[]=[]
  public listgroup:MKV9983[]=[]
  public listaction:MKV9981[]=[]
  public listactionactive:MKV9981[]=[]
  public listacc:MKV9999[]=[]
  public listaccofgroup:MKV9999[]=[]
  public listMKV9999show:MKV9999[]=[]
  public listMKV9999input:MKV9999[]=[]
  public NHOM=""
  constructor(public rest:RESTService,public cookie : CookieService) { }
  ngOnInit() { 
    let that=this
    $(document).ready(function(){

      that.rest.GetDataFromAPI<MKV9980[]>('Permistion/GetAll').subscribe(data=>{
        that.listper=data
      }) 
      ///////////////////////////
      that.rest.GetDataFromAPI<MKV9983[]>('Permistion/GetGroup').subscribe(data=>{
        that.listgroup=data
      }) 
      ///////////////////////////
      function showacc(){

        that.rest.GetDataFromAPI<MKV9999[]>('Account/Get').subscribe(data=>{
         let kjj:MKV9999[]=[]
           data.forEach(l=>{
            let ck=true
          that.listaccofgroup.forEach(k=>{
             if(l.MKV9999_ID==k.MKV9999_ID)
             ck=false
           })
           if(ck)
              kjj.push(l)
          }) 
          that.listacc=kjj
        })
      }
      showacc()
      ///////////////////////////
      $('#taikhoan').on('click','tr',function(){
       if(!$(this).hasClass('actives'))
        $(this).addClass('actives')
        else{
          $(this).removeClass('actives')
        }
      })
      ///////////////////////////
      $('#taikhoanofgr').on('click','tr',function(){
       if(!$(this).hasClass('actives'))
        $(this).addClass('actives')
        else{
          $(this).removeClass('actives')
        }
      })
      ///////////////////////////
      $('.addgroup').click(function(){
       $('#modaladdgroup').modal()
      })
      let mkv9980_id=null
      let mkv9983_id=null
      ///////////////////
      $('#listper').on('click','li',function(){
        $('#listper>li').removeClass('active')
        $(this).addClass('active')
        mkv9980_id=$(this).attr('id')
        lochanhdong()
      })
      ///////////////////
      $('#listfunction').on('click','li',function(){
        //$('#listfunction>li').removeClass('active')
        
        if($(this).hasClass('active')){
          that.rest.GetDataFromAPI<result<MKV9982>>('Permistion/AddAction/'+mkv9983_id+'/'+$(this).attr('id')).subscribe(data=>{
            if(data.code=='OK'){
              $(this).removeClass('active')
            }
            else console.log(data)
          })
        }
        else{
          that.rest.GetDataFromAPI<result<MKV9982>>('Permistion/AddAction/'+mkv9983_id+'/'+$(this).attr('id')).subscribe(data=>{
            if(data.code=='OK'){
              $(this).addClass('active')
            }
            else console.log(data)
          })
          
        } 
      })
      ///////////////////
      $('#listgroup').on('click','li',function(){
        $('#listgroup>li').removeClass('active')
        $(this).addClass('active')
        mkv9983_id=$(this).attr('id')
        that.NHOM=$(this).text()
        lochanhdong()
        that.rest.GetDataFromAPI<MKV9999[]>('Permistion/GetAllUserOfGroup/'+mkv9983_id).subscribe(data=>{
            that.listaccofgroup=data
           that. listMKV9999input=data
           that. listMKV9999show=data
            showacc();
            
          })
        
      })
      /////////////////////////////////
      function lochanhdong(){
        if(mkv9980_id!=null&&mkv9983_id!=null){
          that.rest.GetDataFromAPI<MKV9981[]>('Permistion/GetActionofgroup/'+mkv9983_id+'/'+mkv9980_id).subscribe(data=>{
           
            that.listaction=data
          })
        }
      }
      /////////////////////////////////
      $('#savemodal').click(function(){
          var mkv83:MKV9983=new MKV9983()
          mkv83.TENNHOM=$('#ten').val()
          mkv83.TINHTRANG==true
          that.rest.PostDataToAPI<result<MKV9983>>(mkv83,'Permistion/AddGroup').subscribe(data=>{
            if(data.code=="OK"){
              that.listgroup.push(data.data)
            }
            else if(data.code=="ERR")alert(data.mess)
          })
        
      })
      ///////////////////////////////// addacctogroup
      $('#addacctogroup').click(function(){
          var mkv84:MKV9984[]=[]
          $('#taikhoan>tr').each(function(){
            if($(this).hasClass('actives')){
              let t:MKV9984=new MKV9984()
              t.MKV9983_ID=mkv9983_id
              t.MKV9999_ID= $(this).find('input[name=MKV9999_ID]').val();
              mkv84.push(t)
            }
          })
          
          that.rest.PostDataToAPI<result<MKV9999>[]>(mkv84,'Permistion/AddUserToGr').subscribe(data=>{
            data.forEach(val=>{
              if(val.code=="OK"){
                that.listaccofgroup.push(val.data)
                showacc()
              }
              else if(val.code=="ERR")alert(val.mess)
            })
          })
        
      })
      ///////////////////////////////// removeacctogroup
      $('#removeacctogroup').click(function(){
          var mkv84:MKV9984[]=[]
          $('#taikhoanofgr>tr').each(function(){
            if($(this).hasClass('actives')){
              let t:MKV9984=new MKV9984()
              t.MKV9983_ID=mkv9983_id
              t.MKV9999_ID= $(this).find('input[name=MKV9999_ID]').val();
              mkv84.push(t)
            }
          })
          
          that.rest.PostDataToAPI<result<MKV9999>[]>(mkv84,'Permistion/RmUserToGr').subscribe(data=>{
            data.forEach(val=>{
              if(val.code=="OK"){
                that.listacc.push(val.data)
                that.listaccofgroup.forEach(function(l,index){
                  if(l.MKV9999_ID==val.data.MKV9999_ID){
                    that.listaccofgroup.splice(index,1)
                  }
                })
              }
              else if(val.code=="ERR")alert(val.mess)
            })
          })
        
      })
      
    })
  }

}
