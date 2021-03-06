import { Component, OnInit, Pipe } from '@angular/core';
import * as Global from '../../Service/global.service'
import { RESTService } from 'src/app/Service/rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MKV9982 } from 'src/app/Models/MKV9982';
import { Router, ActivatedRoute } from '@angular/router';
import { KTX0040 } from '../models/KTX0040';
import { Title } from '@angular/platform-browser';
declare var $:any

@Component({
  selector: 'app-ktx-dashboard',
  templateUrl: './ktx-dashboard.component.html',
  styleUrls: ['./ktx-dashboard.component.css']
})
export class KTXDashboardComponent implements OnInit {

  constructor(private title: Title,public rest:RESTService,public cookie:CookieService,public route:ActivatedRoute) { }
public menu:MKV9982[]=[]
public listnew:KTX0040[]=[]
public detail:KTX0040=new KTX0040()
view(element){
this.detail=element
$('#modaldetail').modal()
}
substring(l){
  return l.substring(0,200)
}
 async ngOnInit() {
   
  this.title.setTitle('Quản lý KTX Website');
    this.listnew= await (await this.rest.GetDataFromAPI<KTX0040[]>('KTX0040/Getall').toPromise()).filter(f=>f.trangthai===true)
    let that = this
   
    $(document).ready(function () {
//       var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         responsive:false,
//     }
// });


// var ctx2 = document.getElementById('myChart2');
// var myChart = new Chart(ctx2, {
//     type: 'line',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         responsive:false,
//     }
// });

// var ctx3 = document.getElementById('myChart3');
// var myChart = new Chart(ctx3, {
//     type: 'pie',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         responsive:false,
//     }
// });
      ////////////////////////
    })
  } 
  
}

 
