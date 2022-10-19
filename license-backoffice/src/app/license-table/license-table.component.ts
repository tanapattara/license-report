import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { FilterlicenseService } from '../services/filterlicense.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { fontString } from '../services/font';
import { LicenseEditDialogComponent } from '../license-edit-dialog/license-edit-dialog.component';
import { FilterComponent } from '../filter/filter.component';
import { ExcelService } from '../services/excel.service';
import { LicenseWarningLetterDialogComponent } from '../license-warning-letter-dialog/license-warning-letter-dialog.component';

@Component({
  selector: 'app-license-table',
  templateUrl: './license-table.component.html',
  styleUrls: ['./license-table.component.css'],
})
export class LicenseTableComponent implements OnInit {
  resultsLength = 0;

  displayedColumns: string[] = [
    'position',
    'LicNo',
    'Province',
    'Color',
    'Brand',
    'Type',
    'Speed',
    'Location',
    'aDate',
    'bDate',
    'Image',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FilterComponent) childComponent!: FilterComponent;

  bike = 0;
  car = 0;
  constructor(
    private api: ApiService,
    private filterService: FilterlicenseService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private excelService: ExcelService
  ) {
    iconRegistry.addSvgIcon(
      'car',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/CarCar.svg')
    );
    iconRegistry.addSvgIcon(
      'license',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/CardCar.svg')
    );
    iconRegistry.addSvgIcon(
      'upload',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Upload.svg')
    );
    iconRegistry.addSvgIcon(
      'pencil',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Pencil.svg')
    );
  }

  filter: string = '';
  notifierSubscription: Subscription = this.filterService.event.subscribe(
    (notified) => {
      this.filter = this.filterService.getFilter();
      this.dataSource.filter = this.filter;
      this.summarise();
    }
  );

  isLoading: boolean = true;
  ngOnInit(): void { }
  ngDoCheck() { }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.summarise();
  }
  printExcelDataEvent(event: any) {
    this.printExcel();
  }
  printPDFDataEvent(event:any){
    this.printPDF();
  }

  getType(type: string) {
    if (type == '7' || type == '8') return 'รถจักรยานยนต์';
    else return 'รถยนต์';
  }
  summarise() {
    this.bike = 0;
    this.car = 0;
    for (let row of this.dataSource.filteredData) {
      let isBike: boolean = row.Type == '7' || row.Type == '8';
      if (isBike) this.bike++;
      else this.car++;
    }
  }
  openEditDialog(element: License): void {
    this.dialog
      .open(LicenseEditDialogComponent, {
        width: '348px',
        data: {
          license: element,
          color: this.filterService.getColorData(),
          province: this.filterService.getProvinceData()
        }
      })
      .afterClosed()
      .subscribe(() => {
        this.childComponent.search()
      });
  }
  exportWarning(element: License) {
    //window.open('/warningletter', '_blank');
    if (element.Speed > 50) {
      this.dialog
        .open(LicenseWarningLetterDialogComponent, {
          width: '890px',
          data: element,
        })
        .afterClosed()
        .subscribe(() => { });
    }
  }
  openDialog(imgPath: string, type: number): void {
    //removedata
    //C:\DFLicense\Photos\ขม7298_Type1_Num1_650901040036.jpg
    var splitted = imgPath.split('\\');
    let imagename = splitted[splitted.length - 1];
    let assetsPath = '../assets/photo/' + imagename;
    let w = type == 2 ? '160px' : '900px';
    let h = type == 2 ? '140px' : '520px';
    this.dialog
      .open(ImageDialogComponent, {
        width: w,
        height: h,
        data: assetsPath,
      })
      .afterClosed()
      .subscribe(() => { });
  }

  printExcel() {
    let datas = this.dataSource.data;
    this.excelService.exportAsExcelFile(datas);
  }
  printPDF() {
    let datas = this.dataSource.data;
    let row: any[][] = [];

    datas.forEach((value, index, array) => {
      let type = value.Type == '7' || value == '8' ? 'มอเตอร์ไซด์' : 'รถยนต์';
      let d = new Date(value.aDate);
      let temp = [
        index + 1,
        value.LicNo,
        value.Province,
        value.Color,
        type,
        value.Speed,
        value.Location,
        d.toLocaleString(),
      ];
      row.push(temp);
    });
    const doc = new jsPDF();
    doc.addFileToVFS('BaiJamjuree-Medium-normal.ttf', fontString);
    doc.addFont(
      'BaiJamjuree-Medium-normal.ttf',
      'BaiJamjuree-Medium',
      'normal'
    );
    doc.setFont('BaiJamjuree-Medium', 'normal');
    doc.text('รายชื่อผู้เข้าใช้บริการ', 15, 10);
    autoTable(doc, {
      head: [
        [
          'no.',
          'LicNo',
          'Province',
          'Color',
          'Type',
          'Speed',
          'Location',
          'aDate',
        ],
      ],
      body: row,
      styles: {
        font: 'BaiJamjuree-Medium', // <-- place name of your font here
        fontStyle: 'normal',
      },
      headStyles: { fillColor: [167, 59, 36] },
    });

    doc.save('license report.pdf');
  }

}
