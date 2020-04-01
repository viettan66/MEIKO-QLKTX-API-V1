
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
declare var $:any

export class PrintWidthDivElement{
    public static PrintWidthDiv(div){
        let data = document.getElementById(div);  
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg',1.0)  
          let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in landscape mode
          // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
          pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
          pdf.save('Filename.pdf');   
        }); 
      }
      public static PrintWidthDiv2(div){
        window.scrollTo(0,0);     
        let data = document.getElementById(div);  
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg',1.0)  
         
          let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in landscape mode
          // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
          pdf.addImage(contentDataURL, 'JPEG', 0, 0, 20.1, 30);  
          pdf.save('Filename.pdf');   
        }); 
      }
      public static PrintWidthDiv3(div){
        window.scrollTo(0,0);     
        var data = document.getElementById(div);  
        html2canvas(data, {scale: 1}).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
      
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight)  
          pdf.save('MYPdf.pdf'); // Generated PDF   
        });  
      }
      public static PrintWidthDiv4(div){ 
          var printDoc = new jspdf();
        printDoc.fromHTML(div, 10, 10, {'width': 180});
        //printDoc.autoPrint();
        printDoc.output("dataurlnewwindow");
      }
}