import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { FilterlicenseService } from '../services/filterlicense.service';
import { MatTableDataSource } from '@angular/material/table';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-chart-heatmap-month',
  templateUrl: './chart-heatmap-month.component.html',
  styleUrls: ['./chart-heatmap-month.component.css'],
})
export class ChartHeatmapMonthComponent implements OnInit {
  @ViewChild('mychart') mychart!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>;
  dataSource!: MatTableDataSource<any>;
  filter: string = '';
  chartDictionary = new Map<string, number[]>();

  notifierSubscription: Subscription = this.filterService.event.subscribe(
    (notified) => {
      this.filter = this.filterService.getFilter();
      this.dataSource.filter = this.filter;
      this.displayData();
    }
  );

  bike = 0;
  car = 0;

  o50bike = 0;
  o50car = 0;
  o50 = 0;
  o50bike_per = 0;
  o50car_per = 0;
  constructor(
    private api: ApiService,
    private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private tran: TranslateService
  ) {
    iconRegistry.addSvgIcon(
      'printer',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg')
    );

    this.chartOptions = {
      series: [
        {
          name: this.tran.instant('january'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('february'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('march'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('april'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('mayy'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('june'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('july'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('august'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('september'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('october'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('november'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
        {
          name: this.tran.instant('december'),
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
          ],
        },
      ],
      chart: {
        redrawOnWindowResize: true,
        redrawOnParentResize: true,
        width: '100%',
        height: 500,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#CC3D00'],
      yaxis: {
        title: {
          text: this.tran.instant('day'),
        },
      },
    };
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  displayData() {
    this.clearDic();

    if (this.dataSource.filteredData.length) {
      for (let row of this.dataSource.filteredData) {
        let d: Date = new Date(row.aDate);
        let isBike: boolean = row.Type == '7' || row.Type == '8';
        if (isBike) {
          this.bike++;
          if (row.Speed > 50) this.o50bike++;
        } else {
          this.car++;
          if (row.Speed > 50) this.o50car++;
        }
        let month = '';
        let value = 0;
        switch (d.getMonth()) {
          case 0: {
            month = 'january';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 1: {
            month = 'february';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 2: {
            month = 'march';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 3: {
            month = 'april';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 4: {
            month = 'mayy';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 5: {
            month = 'june';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 6: {
            month = 'july';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 7: {
            month = 'august';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 8: {
            month = 'september';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 9: {
            month = 'october';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 10: {
            month = 'november';
            this.setDateinMonth(month, d.getDate());
            break;
          }
          case 11: {
            month = 'december';
            this.setDateinMonth(month, d.getDate());
            break;
          }
        }
      }
    }
    this.o50 = this.o50bike + this.o50car;
    this.o50bike_per = (this.o50bike / this.o50) * 100;
    this.o50car_per = (this.o50car / this.o50) * 100;
    this.chartOptions.series = [
      {
        name: this.tran.instant('january'),
        data: this.generateData('january'),
      },
      {
        name: this.tran.instant('february'),
        data: this.generateData('february'),
      },
      { name: this.tran.instant('march'), data: this.generateData('march') },
      { name: this.tran.instant('april'), data: this.generateData('april') },
      { name: this.tran.instant('mayy'), data: this.generateData('mayy') },
      { name: this.tran.instant('june'), data: this.generateData('june') },
      { name: this.tran.instant('july'), data: this.generateData('july') },
      { name: this.tran.instant('august'), data: this.generateData('august') },
      {
        name: this.tran.instant('september'),
        data: this.generateData('september'),
      },
      {
        name: this.tran.instant('october'),
        data: this.generateData('october'),
      },
      {
        name: this.tran.instant('november'),
        data: this.generateData('november'),
      },
      {
        name: this.tran.instant('december'),
        data: this.generateData('december'),
      },
    ];
  }
  setDateinMonth(strMonth: string, day: number) {
    let series = this.chartDictionary.get(strMonth)!;
    let index = day - 1;
    series[index] = series[index] + 1;
    this.chartDictionary.set(strMonth, series);
  }
  clearDic() {
    this.car = 0;
    this.bike = 0;

    this.o50bike = 0;
    this.o50car = 0;
    this.o50 = 0;
    this.o50bike_per = 0;
    this.o50car_per = 0;
    this.chartDictionary.set(
      'january',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'february',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'march',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'april',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'mayy',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'june',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'july',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'august',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'september',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'october',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'november',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
    this.chartDictionary.set(
      'december',
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ]
    );
  }
  public generateData(strMonth: string) {
    var i = 0;
    var series = [];
    var datas = this.chartDictionary.get(strMonth);
    while (i < 31) {
      series.push({
        x: (i + 1).toString(),
        y: datas![i],
      });
      i++;
    }
    return series;
  }

  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.displayData();
  }
  print() {
    window.print();
  }
  printDataEvent(event: any) {
    this.print();
  }
}
