import { Component, OnInit, ViewChild } from '@angular/core';
import { LicenseFilter } from '../model/licensefilter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  licenseFilter: LicenseFilter[] = [];
  color: string[] = ['All'];
  province: string[] = ['All'];
  brand: string[] = ['All'];
  defaultValue = "All";
  filterDictionary = new Map<string, any>();

  @ViewChild('provinceSelection') provinceSelection!: MatSelect;
  @ViewChild('colorSelection') colorSelection!: MatSelect;
  @ViewChild('brandSelection') brandSelection!: MatSelect;
  constructor(private api: ApiService, private filterService: FilterlicenseService) { }

  _filter: string = "";

  datepickerInput1 = "";
  datepickerInput2 = "";
  licensenoInput = "";
  speedInput = "";

  ngOnInit(): void {
    this.getFilter();
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
  applyLicenseFilter(ob: MatSelectChange, filtername: string) {
    this.filterDictionary.set(filtername, ob.value);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.filterService.setFilter(jsonString);
  }
  onChangeEvent(event: any, filtername: string) {
    var filtervalue = (event.target as HTMLInputElement).value == "" ? "All" : (event.target as HTMLInputElement).value;
    this.filterDictionary.set(filtername, filtervalue);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.filterService.setFilter(jsonString);
  }
  DatePickervalueChanged() {
    var startdate = this.range.value.start as Date
    var enddate = this.range.value.end as Date
    this.filterDictionary.set("date", [startdate, enddate]);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.filterService.setFilter(jsonString);
  }
  clearFilter() {
    this.datepickerInput1 = "";
    this.datepickerInput2 = "";
    this.licensenoInput = "";
    this.speedInput = "";
    this.provinceSelection.options.first.select();
    this.colorSelection.options.first.select();
    this.brandSelection.options.first.select();

    this.filterService.setFilter("");
  }
}
