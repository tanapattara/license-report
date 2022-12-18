import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FilterlicenseService } from '../services/filterlicense.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chart-bar-car-per-month',
  templateUrl: './chart-bar-car-per-month.component.html',
  styleUrls: ['./chart-bar-car-per-month.component.css'],
})
export class ChartBarCarPerMonthComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถตลอดปี';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  datepickerInput1 = '';
  datepickerInput2 = '';
  speedInput = '';

  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<string, number>();
  chartDictionaryBike = new Map<string, number>();

  car = 0;
  bike = 0;

  o50bike = 0;
  o50car = 0;
  o50 = 0;
  o50bike_per = 0;
  o50car_per = 0;
  public barChartOptions: ChartConfiguration['options'];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'>;

  filter: string = '';
  notifierSubscription: Subscription = this.filterService.event.subscribe(
    (notified) => {
      this.filter = this.filterService.getFilter();
      this.dataSource.filter = this.filter;
      this.displayData();
    }
  );

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
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: this.tran.instant('chart.month'),
            color: 'rgb(204, 61, 0)',
          },
        },
        y: {
          stacked: true,
          min: 0,
          title: {
            display: true,
            text: this.tran.instant('chart.count'),
            color: 'rgb(204, 61, 0)',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          align: 'start',
        },
        datalabels: {
          anchor: 'center',
          align: 'center',
          display: (context) => {
            return context.dataset.data[context.dataIndex] != 0;
          },
          color: (context) => {
            var strColor = context.datasetIndex == 0 ? 'white' : 'black';
            return strColor;
          },
          formatter: (value, ctx) => {
            return value.toLocaleString();
          },
        },
      },
    };
    this.barChartData = {
      labels: [
        this.tran.instant('january'),
        this.tran.instant('february'),
        this.tran.instant('march'),
        this.tran.instant('april'),
        this.tran.instant('mayy'),
        this.tran.instant('june'),
        this.tran.instant('july'),
        this.tran.instant('august'),
        this.tran.instant('september'),
        this.tran.instant('october'),
        this.tran.instant('november'),
        this.tran.instant('december'),
      ],
      datasets: [
        {
          data: [],
          label: this.tran.instant('car'),
          borderColor: 'rgb(204, 61, 0)',
          backgroundColor: 'rgb(204, 61, 0)',
          borderRadius: Number.MAX_VALUE,
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
          borderSkipped: 'middle',
        },
        {
          data: [],
          label: this.tran.instant('bike'),
          borderColor: 'rgb(255, 172, 131)',
          backgroundColor: 'rgb(255, 172, 131)',
          borderRadius: Number.MAX_VALUE,
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
        },
      ],
    };
  }

  ngOnInit(): void {}
  displayData() {
    this.clearDic();
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    if (this.dataSource.filteredData.length) {
      for (let row of this.dataSource.filteredData) {
        let d: Date = new Date(row.aDate);
        let isBike: boolean = row.Type == '7' || row.Type == '8';
        if (isBike) {
          if (row.Speed > 50) this.o50bike++;
        } else {
          if (row.Speed > 50) this.o50car++;
        }

        let month = '';
        let value = 0;
        switch (d.getMonth()) {
          case 0: {
            month = 'มกราคม';
            value = isBike
              ? this.chartDictionaryBike.get('มกราคม')! + 1
              : this.chartDictionaryCar.get('มกราคม')! + 1;
            break;
          }
          case 1: {
            month = 'กุมภาพันธ์';
            value = isBike
              ? this.chartDictionaryBike.get('กุมภาพันธ์')! + 1
              : this.chartDictionaryCar.get('กุมภาพันธ์')! + 1;
            break;
          }
          case 2: {
            month = 'มีนาคม';
            value = isBike
              ? this.chartDictionaryBike.get('มีนาคม')! + 1
              : this.chartDictionaryCar.get('มีนาคม')! + 1;
            break;
          }
          case 3: {
            month = 'เมษายน';
            value = isBike
              ? this.chartDictionaryBike.get('เมษายน')! + 1
              : this.chartDictionaryCar.get('เมษายน')! + 1;
            break;
          }
          case 4: {
            month = 'พฤษภาคม';
            value = isBike
              ? this.chartDictionaryBike.get('พฤษภาคม')! + 1
              : this.chartDictionaryCar.get('พฤษภาคม')! + 1;
            break;
          }
          case 5: {
            month = 'มิถุนายน';
            value = isBike
              ? this.chartDictionaryBike.get('มิถุนายน')! + 1
              : this.chartDictionaryCar.get('มิถุนายน')! + 1;
            break;
          }
          case 6: {
            month = 'กรกฎาคม';
            value = isBike
              ? this.chartDictionaryBike.get('กรกฎาคม')! + 1
              : this.chartDictionaryCar.get('กรกฎาคม')! + 1;
            break;
          }
          case 7: {
            month = 'สิงหาคม';
            value = isBike
              ? this.chartDictionaryBike.get('สิงหาคม')! + 1
              : this.chartDictionaryCar.get('สิงหาคม')! + 1;
            break;
          }
          case 8: {
            month = 'กันยายน';
            value = isBike
              ? this.chartDictionaryBike.get('กันยายน')! + 1
              : this.chartDictionaryCar.get('กันยายน')! + 1;
            break;
          }
          case 9: {
            month = 'ตุลาคม';
            value = isBike
              ? this.chartDictionaryBike.get('ตุลาคม')! + 1
              : this.chartDictionaryCar.get('ตุลาคม')! + 1;
            break;
          }
          case 10: {
            month = 'พฤศจิกายน';
            value = isBike
              ? this.chartDictionaryBike.get('พฤศจิกายน')! + 1
              : this.chartDictionaryCar.get('พฤศจิกายน')! + 1;
            break;
          }
          case 11: {
            month = 'ธันวาคม';
            value = isBike
              ? this.chartDictionaryBike.get('ธันวาคม')! + 1
              : this.chartDictionaryCar.get('ธันวาคม')! + 1;
            break;
          }
        }

        if (month == '') continue;

        if (isBike) {
          this.chartDictionaryBike.set(month, value);
          this.bike++;
        } else {
          this.chartDictionaryCar.set(month, value);
          this.car++;
        }
      }
    }

    this.o50 = this.o50bike + this.o50car;
    this.o50bike_per = (this.o50bike / this.o50) * 100;
    this.o50car_per = (this.o50car / this.o50) * 100;

    for (let [key, value] of this.chartDictionaryCar) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }
    let n = this.dataSource.filteredData.length;
    for (let [key, value] of this.chartDictionaryBike) {
      let perValue = (value / n) * 100;
      this.barChartData.datasets[1].data.push(value);
      // if (value < 100) {
      //   this.barChartData.datasets[1].datalabels!.align! = 'top';
      //   this.barChartData.datasets[1].datalabels!.anchor! = 'end';
      // }
    }

    this.chart?.update();
  }
  clearDic() {
    this.bike = 0;
    this.car = 0;

    this.o50bike = 0;
    this.o50car = 0;
    this.o50 = 0;
    this.o50bike_per = 0;
    this.o50car_per = 0;

    this.chartDictionaryCar.set('มกราคม', 0);
    this.chartDictionaryCar.set('กุมภาพันธ์', 0);
    this.chartDictionaryCar.set('มีนาคม', 0);
    this.chartDictionaryCar.set('เมษายน', 0);
    this.chartDictionaryCar.set('พฤษภาคม', 0);
    this.chartDictionaryCar.set('มิถุนายน', 0);
    this.chartDictionaryCar.set('กรกฎาคม', 0);
    this.chartDictionaryCar.set('สิงหาคม', 0);
    this.chartDictionaryCar.set('กันยายน', 0);
    this.chartDictionaryCar.set('ตุลาคม', 0);
    this.chartDictionaryCar.set('พฤศจิกายน', 0);
    this.chartDictionaryCar.set('ธันวาคม', 0);

    this.chartDictionaryBike.set('มกราคม', 0);
    this.chartDictionaryBike.set('กุมภาพันธ์', 0);
    this.chartDictionaryBike.set('มีนาคม', 0);
    this.chartDictionaryBike.set('เมษายน', 0);
    this.chartDictionaryBike.set('พฤษภาคม', 0);
    this.chartDictionaryBike.set('มิถุนายน', 0);
    this.chartDictionaryBike.set('กรกฎาคม', 0);
    this.chartDictionaryBike.set('สิงหาคม', 0);
    this.chartDictionaryBike.set('กันยายน', 0);
    this.chartDictionaryBike.set('ตุลาคม', 0);
    this.chartDictionaryBike.set('พฤศจิกายน', 0);
    this.chartDictionaryBike.set('ธันวาคม', 0);
  }
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
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
