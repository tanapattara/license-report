import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { License } from '../model/license';
import { LicenseDialogData } from '../model/LicenseDialogData';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { fontString } from '../services/font';
@Component({
  selector: 'app-license-warning-letter-dialog',
  templateUrl: './license-warning-letter-dialog.component.html',
  styleUrls: ['./license-warning-letter-dialog.component.css']
})
export class LicenseWarningLetterDialogComponent implements OnInit {
  licenseData: License;
  image1: string;
  image2: string;

  strDate: string;
  cartype: string;
  constructor(public dialogRef: MatDialogRef<LicenseWarningLetterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: License) {
    this.licenseData = data;

    let splitted = data.Path1.split('\\');
    let imagename = splitted[splitted.length - 1];
    this.image1 = '../assets/photo/' + imagename;

    splitted = data.Path2.split('\\');
    imagename = splitted[splitted.length - 1]
    this.image2 = '../assets/photo/' + imagename;

    let d = new Date(data.aDate);
    this.strDate = d.getDate().toString() + " " + this.convertMonth(d.getMonth()) + " " + this.convertYear(d.getFullYear());
    this.cartype = data.Type == '7' || data.Type == '8' ? "รถจักรยานยนต์" : "รถยนต์";
  }

  convertMonth(m: number): string {
    switch (m) {
      case 0: { return 'มกราคม'; break; }
      case 1: { return 'กุมภาพันธ์'; break; }
      case 2: { return 'มีนาคม'; break; }
      case 3: { return 'เมษายน'; break; }
      case 4: { return 'พฤษภาคม'; break; }
      case 5: { return 'มิถุนายน'; break; }
      case 6: { return 'กรกฎาคม'; break; }
      case 7: { return 'สิงหาคม'; break; }
      case 8: { return 'กันยายน'; break; }
      case 9: { return 'ตุลาคม'; break; }
      case 10: { return 'พฤศจิกายน'; break; }
      case 11: { return 'ธันวาคม'; break; }
    }
    return '';
  }
  convertYear(y: number): number {
    return y + 543;
  }

  ngOnInit(): void {
  }

  savePDF(): void {
    let doc = new jsPDF({
      unit: 'px',
      format: [595, 842]
    });
    doc.addFileToVFS('BaiJamjuree-Medium-normal.ttf', fontString);
    doc.addFont(
      'BaiJamjuree-Medium-normal.ttf',
      'BaiJamjuree-Medium',
      'normal'
    );
    doc.setFont('BaiJamjuree-Medium', 'normal');
    var data = document.getElementById("lettercontent");
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      var position = 20;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      let d = new Date(this.licenseData.aDate);
      let filename = "ใบแจ้งเตือนความเร็ว " + this.licenseData.LicNo + " " + d.getDate() + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear() + 543) + ".pdf";
      pdf.save(filename); // Generated PDF
    });
  }


}
