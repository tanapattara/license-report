import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { LicenseFilter } from '../model/licensefilter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';
import { MatOption } from '@angular/material/core';
import { Filter } from '../model/Filter';
import { License } from '../model/license';

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
  location: string[] = ['All'];
  defaultValue = "All";
  filterDictionary = new Map<string, any>();

  data: License[] = [];

  @ViewChild('provinceSelection') provinceSelection!: MatSelect;
  @ViewChild('colorSelection') colorSelection!: MatSelect;
  @ViewChild('placeSelection') placeSelection!: MatSelect;
  @Output() searchedDataEvent: EventEmitter<any> = new EventEmitter(true);
  constructor(private api: ApiService,
    private filterService: FilterlicenseService) { }

  _filter: string = "";

  datepickerInput1 = "";
  datepickerInput2 = "";
  licensenoInput = "";
  speedInputA = "";
  speedInputB = "";

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
    this.api.getLocation().
      subscribe({
        next: (res) => {
          for (var item of res)
            this.location.push(item['location']);
          this.licenseFilter.push({ name: 'Location', options: this.location, defaultValue: this.defaultValue });
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
  search() {
    let placeSeleted = this.placeSelection.value;
    let colorSelected = this.colorSelection.value;
    let provinceSelected = this.provinceSelection.value;
    let startdate = this.range.value.start as Date
    let enddate = this.range.value.end as Date
    let licenseInput = this.licensenoInput.valueOf();
    let speedA = this.speedInputA.valueOf();
    let speedB = this.speedInputB.valueOf();

    let filter = {} as Filter;
    filter.color = colorSelected;
    filter.place = placeSeleted;
    filter.province = provinceSelected;
    filter.startDate = startdate;
    filter.endDate = enddate;
    filter.license = licenseInput;
    filter.minSpeed = parseInt(speedA);
    filter.maxSpeed = parseInt(speedB);

    this.api.getLicensesWithFilter(filter).subscribe({
      next: (res) => {
        this.searchedDataEvent.emit(res);
      },
      error: (err) => {
        console.log("Error while fetching licenses with params");
      }
    });

  }
  clearFilter() {
    this.datepickerInput1 = "";
    this.datepickerInput2 = "";
    this.licensenoInput = "";
    this.speedInputA = "";
    this.speedInputB = ""
    this.provinceSelection.options.first.select();
    this.colorSelection.options.first.select();
    this.placeSelection.options.first.select();

    this.filterService.setFilter("");
  }
}
