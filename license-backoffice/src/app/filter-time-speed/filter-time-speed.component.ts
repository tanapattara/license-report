import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Filter } from '../model/Filter';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';

@Component({
  selector: 'app-filter-time-speed',
  templateUrl: './filter-time-speed.component.html',
  styleUrls: ['./filter-time-speed.component.css']
})
export class FilterTimeSpeedComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  datepickerInput1 = "";
  datepickerInput2 = "";
  speedInputA = "";
  speedInputB = "";
  filterDictionary = new Map<string, any>();

  @Output() searchedDataEvent: EventEmitter<any> = new EventEmitter(true);

  constructor(private api: ApiService, private filterService: FilterlicenseService) { }

  ngOnInit(): void {
  }

  DatePickervalueChanged() {
    var startdate = this.range.value.start as Date
    var enddate = this.range.value.end as Date
    this.filterDictionary.set("date", [startdate, enddate]);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.filterService.setFilter(jsonString);
  }
  onChangeEvent(event: any, filtername: string) {
    var filtervalue = (event.target as HTMLInputElement).value == "" ? "All" : (event.target as HTMLInputElement).value;
    this.filterDictionary.set(filtername, filtervalue);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.filterService.setFilter(jsonString);
  }
  search() {
    let filter = {} as Filter;
    filter.startDate = this.range.value.start as Date
    filter.endDate = this.range.value.end as Date
    filter.minSpeed = parseInt(this.speedInputA.valueOf());
    filter.maxSpeed = parseInt(this.speedInputB.valueOf());
    filter.color = "All";
    filter.place = "All";
    filter.province = "All";
    filter.license = "All";

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
    this.speedInputA = "";
    this.speedInputB = "";
    this.filterService.setFilter("");
  }
}
