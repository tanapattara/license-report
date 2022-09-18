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

@Component({
  selector: 'app-license-table',
  templateUrl: './license-table.component.html',
  styleUrls: ['./license-table.component.css']
})

export class LicenseTableComponent implements OnInit {

  resultsLength = 0;

  displayedColumns: string[] = ['position', 'LicNo', 'Image', 'Province', 'Color', 'Brand', 'Type', 'Speed', 'Location', 'aDate', 'bDate'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bike = 0;
  car = 0;

  constructor(private api: ApiService,
    private filterService: FilterlicenseService,
    private storageService: StorageService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('car', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Car.svg'));
    iconRegistry.addSvgIcon('license', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/License.svg'));

  }

  filter: string = "";
  notifierSubscription: Subscription = this.filterService.event.subscribe(notified => {
    this.filter = this.filterService.getFilter();
    this.dataSource.filter = this.filter;
    this.summarise();
  });

  isLoading: boolean = true;
  ngOnInit(): void {
  }
  ngDoCheck() {

  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.summarise();
  }

  getType(type: string) {
    if (type == '7' || type == '8')
      return "รถจักรยานยนต์";
    else
      return "รถยนต์";
  }
  summarise() {
    this.bike = 0;
    this.car = 0;
    for (let row of this.dataSource.filteredData) {
      let isBike: boolean = row.Type == '7' || row.Type == '8';
      if (isBike)
        this.bike++;
      else
        this.car++;
    }
  }
  openDialog(imgPath: string, type: number): void {
    //removedata
    //C:\DFLicense\Photos\ขม7298_Type1_Num1_650901040036.jpg
    var splitted = imgPath.split("\\");
    let imagename = splitted[splitted.length - 1]
    let assetsPath = "../assets/photo/" + imagename;
    let w = type == 2 ? '160px' : '900px';
    let h = type == 2 ? '140px' : '520px';
    this.dialog.open(ImageDialogComponent, {
      width: w,
      height: h,
      data: assetsPath
    }).afterClosed().subscribe(() => { });
  }
}
