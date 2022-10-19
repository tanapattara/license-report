import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { LicenseFilter } from '../model/licensefilter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';
import { MatOption } from '@angular/material/core';
import { Filter } from '../model/Filter';
import { License } from '../model/license';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
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
  defaultValue = 'All';
  filterDictionary = new Map<string, any>();

  @Input() car: number = 0;
  @Input() bike: number = 0;
  @Input() isSum = false;
  data: License[] = [];
  time: string[] = [
    'All',
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];

  @ViewChild('provinceSelection') provinceSelection!: MatSelect;
  @ViewChild('colorSelection') colorSelection!: MatSelect;
  @ViewChild('placeSelection') placeSelection!: MatSelect;
  @ViewChild('startTimeSelection') startTimeSelection!: MatSelect;
  @ViewChild('endTimeSelection') endTimeSelection!: MatSelect;

  @Output() searchedDataEvent: EventEmitter<any> = new EventEmitter(true);
  @Output() printPDFDataEvent: EventEmitter<any> = new EventEmitter(true);
  @Output() printExcelDataEvent: EventEmitter<any> = new EventEmitter(true);

  constructor(
    private api: ApiService,
    private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) { 
    iconRegistry.addSvgIcon(
      'pdf',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Pdf.svg')
    );
    iconRegistry.addSvgIcon(
      'excel',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Excel.svg')
    );
  }

  _filter: string = '';

  datepickerInput1 = '';
  datepickerInput2 = '';
  licensenoInput = '';
  speedInputA = '';
  speedInputB = '';

  ngOnInit(): void {
    this.getFilter();
  }

  getFilter() {
    this.api.getColor().subscribe({
      next: (res) => {
        for (var item of res) this.color.push(item['color']);
        this.filterService.setColorData(this.color);
        this.licenseFilter.push({
          name: 'Color',
          options: this.color,
          defaultValue: this.defaultValue,
        });
      },
      error: (err) => {
        console.log('Error while fetching filter ');
      },
    });
    this.api.getLocation().subscribe({
      next: (res) => {
        for (var item of res) this.location.push(item['location']);
        this.filterService.setLocationData(this.location);
        this.licenseFilter.push({
          name: 'Location',
          options: this.location,
          defaultValue: this.defaultValue,
        });
      },
      error: (err) => {
        console.log('Error while fetching filter ');
      },
    });
    this.api.getProvince().subscribe({
      next: (res) => {
        for (var item of res) this.province.push(item['province']);
        this.filterService.setProvinceData(this.province);
        this.licenseFilter.push({
          name: 'Province',
          options: this.province,
          defaultValue: this.defaultValue,
        });
      },
      error: (err) => {
        console.log('Error while fetching filter ');
      },
    });
  }
  search() {
    let filter = {} as Filter;
    filter.color = this.colorSelection.value;
    filter.place = this.placeSelection.value;
    filter.province = this.provinceSelection.value;
    filter.startDate = this.range.value.start as Date;
    filter.endDate = this.range.value.end as Date;
    filter.license = this.licensenoInput.valueOf();
    filter.minSpeed = parseInt(this.speedInputA.valueOf());
    filter.maxSpeed = parseInt(this.speedInputB.valueOf());
    filter.startHour = this.startTimeSelection.value;
    filter.endHour = this.endTimeSelection.value;
    // console.log(filter);
    this.api.getLicensesWithFilter(filter).subscribe({
      next: (res) => {
        this.searchedDataEvent.emit(res);
      },
      error: (err) => {
        console.log('Error while fetching licenses with params');
      },
    });
  }
  clearFilter() {
    this.datepickerInput1 = '';
    this.datepickerInput2 = '';
    this.licensenoInput = '';
    this.speedInputA = '';
    this.speedInputB = '';
    this.provinceSelection.options.first.select();
    this.colorSelection.options.first.select();
    this.placeSelection.options.first.select();
    this.startTimeSelection.options.first.select();
    this.endTimeSelection.options.first.select();
    let filter = {} as Filter;
    this.searchedDataEvent.emit({});
  }
  printPDF() {
    this.printPDFDataEvent.emit({});
  }
  printExcel(){
    this.printExcelDataEvent.emit({});
  }
}
