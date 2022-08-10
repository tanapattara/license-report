import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LicenseFilter } from '../model/licensefilter';
import { ApiService } from '../services/api.service';
import { MatSelectChange } from '@angular/material/select';
import { License } from '../model/license';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-license-table',
  templateUrl: './license-table.component.html',
  styleUrls: ['./license-table.component.css']
})

export class LicenseTableComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  resultsLength = 0;

  displayedColumns: string[] = ['LicNo', 'Province', 'Color', 'Brand', 'Speed', 'Location', 'aDate', 'bDate'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  licenseFilter: LicenseFilter[] = [];
  color: string[] = ['All'];
  province: string[] = ['All'];
  brand: string[] = ['All'];
  defaultValue = "All";
  filterDictionary = new Map<string, string>();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // get selected control from api
    this.getFilter();
    // get data from api
    this.getAllLicense();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  getFilter() {
    this.api.getColor().
      subscribe({
        next: (res) => {
          for (var item of res)
            this.color.push(item['color']);
          this.licenseFilter.push({ name: 'Color', options: this.color, defaultValue: this.defaultValue });
        },
        error: (err) => {
          console.log("Error while fetching filter ");
        }

      });
    this.api.getBrand().
      subscribe({
        next: (res) => {
          for (var item of res)
            this.brand.push(item['brand']);
          this.licenseFilter.push({ name: 'Brand', options: this.brand, defaultValue: this.defaultValue });
        },
        error: (err) => {
          console.log("Error while fetching filter ");
        }

      });
    this.api.getProvince().
      subscribe({
        next: (res) => {
          for (var item of res)
            this.province.push(item['province']);
          this.licenseFilter.push({ name: 'Province', options: this.province, defaultValue: this.defaultValue });
        },
        error: (err) => {
          console.log("Error while fetching filter ");
        }

      });
  }
  getAllLicense() {
    this.api.getLicenses().
      subscribe({
        next: (res) => {
          //console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
              } else {
                isMatchFilter = (record[key as keyof License] == value);
              }
              isMatch = (value == "All") || isMatchFilter;
              if (!isMatch) return false;
            }
            return isMatch;
          }
        },
        error: (err) => {
          console.log("Error while fetching licenses ");
        }
      });
  }

  applyLicenseFilter(ob: MatSelectChange, filtername: string) {

    this.filterDictionary.set(filtername, ob.value.toLowerCase());
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
    console.log(jsonString);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChangeEvent(event: any, filtername: string) {
    var filtervalue = (event.target as HTMLInputElement).value == "" ? "All" : (event.target as HTMLInputElement).value;
    this.filterDictionary.set(filtername, filtervalue);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    console.log(jsonString);
    this.dataSource.filter = jsonString;
  }
}
