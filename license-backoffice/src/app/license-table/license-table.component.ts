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
    // get data from api
    this.getAllLicense();
  }
  ngDoCheck() {

  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  getAllLicense() {
    this.isLoading = true;
    this.api.getLicenses().
      subscribe({
        next: (res) => {
          //console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filter = this.filter;
          this.dataSource.filterPredicate = function (record, filter) {
            var map = new Map(JSON.parse(filter));
            let isMatch = false;
            for (let [key, value] of map) {

              var isMatchFilter: boolean = false;

              if (key == 'Speed') {
                if (value as string == 'All')
                  isMatchFilter = true;
                let speedFilter: number = parseInt(value as string);
                isMatchFilter = (record[key as keyof License] <= speedFilter);
              } else if (key == 'LicNo') {
                if (value as string == 'All')
                  isMatchFilter = true;
                else
                  isMatchFilter = (record[key as keyof License].includes(value));
              } else if (key == 'date') {
                let date = value as string[];
                let sDate = new Date(date[0]);
                let eDate = new Date(date[1]);
                let adate_key = 'aDate', bdate_key = 'bDate'
                let RecValueA = new Date(record[adate_key as keyof License]);
                let RecValueB = new Date(record[bdate_key as keyof License]);
                if (sDate.getTime() == eDate.getTime()) {
                  isMatchFilter = (RecValueA.getFullYear() == sDate.getFullYear() && RecValueA.getMonth() == sDate.getMonth() && RecValueA.getDate() == sDate.getDate()) ||
                    (RecValueB.getFullYear() == sDate.getFullYear() && RecValueB.getMonth() == sDate.getMonth() && RecValueB.getDate() == sDate.getDate());
                }
                else {
                  isMatchFilter = (RecValueA.getFullYear() == sDate.getFullYear() && RecValueA.getMonth() == sDate.getMonth() && RecValueA.getDate() >= sDate.getDate()) &&
                    (RecValueB.getFullYear() == sDate.getFullYear() && RecValueB.getMonth() == sDate.getMonth() && RecValueB.getDate() >= sDate.getDate()) &&
                    (RecValueA.getFullYear() == eDate.getFullYear() && RecValueA.getMonth() == eDate.getMonth() && RecValueA.getDate() <= eDate.getDate()) &&
                    (RecValueB.getFullYear() == eDate.getFullYear() && RecValueB.getMonth() == eDate.getMonth() && RecValueB.getDate() <= eDate.getDate());
                }
              } else {
                isMatchFilter = (record[key as keyof License] == value);
              }
              isMatch = (value == "All") || isMatchFilter;
              if (!isMatch) return false;
            }
            return isMatch;
          }
          this.isLoading = false;
          this.summarise();
          this.sort.
            sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        },
        error: (err) => {
          console.log("Error while fetching licenses ");
        }
      });
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
