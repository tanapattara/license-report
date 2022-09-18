import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
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
  defaultValue = "All";
  time: string[] = ['All', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

  @Output() searchedDataEvent: EventEmitter<any> = new EventEmitter(true);

  @ViewChild('startTimeSelection') startTimeSelection!: MatSelect;
  @ViewChild('endTimeSelection') endTimeSelection!: MatSelect;

  constructor(private api: ApiService, private filterService: FilterlicenseService) { }

  ngOnInit(): void {
  }

  DatePickervalueChanged() { }
  onChangeEvent(event: any, filtername: string) { }

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
    filter.startHour = this.startTimeSelection.value;
    filter.endHour = this.endTimeSelection.value;

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
    this.startTimeSelection.options.first.select();
    this.endTimeSelection.options.first.select();
    let data = {};
    this.searchedDataEvent.emit(data);
  }
}
