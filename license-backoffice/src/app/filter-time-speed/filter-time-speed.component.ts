import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  speedInput = "";

  filterDictionary = new Map<string, any>();

  constructor(private filterService: FilterlicenseService) { }

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
  clearFilter() {
    this.datepickerInput1 = "";
    this.datepickerInput2 = "";
    this.speedInput = "";
    this.filterService.setFilter("");
  }
}
