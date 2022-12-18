import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterlicenseService } from '../services/filterlicense.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chart-pie-car-per-month',
  templateUrl: './chart-pie-car-per-month.component.html',
  styleUrls: ['./chart-pie-car-per-month.component.css'],
})
export class ChartPieCarPerMonthComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  chartDictionary = new Map<string, number>();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 18,
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          var txt =
            ctx.chart.data.labels![ctx.dataIndex] +
            ' ' +
            value.toLocaleString();
          return txt;
        },
        display: (context) => {
          var datas = context.dataset.data;
          var data = context.dataset.data[context.dataIndex] as number;
          var sum = 0;
          datas.forEach((obj) => {
            sum += obj as number;
          });
          const percent = (data / sum) * 100 || 0;
          return percent > 4;
        },
        font: {
          weight: 'bold',
          size: 18,
        },
      },
    },
    maintainAspectRatio: false,
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(
    private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    private tran: TranslateService,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'printer',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg')
    );
  }

  bike = 0;
  car = 0;
  o50bike = 0;
  o50car = 0;
  o50 = 0;
  o50bike_per = 0;
  o50car_per = 0;

  ngOnInit(): void {}
  displayData() {
    this.clearDic();
    for (let row of this.dataSource.filteredData) {
      let isBike: boolean = row.Type == '7' || row.Type == '8';
      if (isBike) {
        this.bike++;
        if (row.Speed > 50) this.o50bike++;
      } else {
        this.car++;
        if (row.Speed > 50) this.o50car++;
      }

      let createDate = new Date(row.aDate);
      let value = 0;
      switch (createDate.getMonth()) {
        case 0: {
          value = this.chartDictionary.get('january')!;
          this.chartDictionary.set('january', value + 1);
          break;
        }
        case 1: {
          value = this.chartDictionary.get('february')!;
          this.chartDictionary.set('february', value + 1);
          break;
        }
        case 2: {
          value = this.chartDictionary.get('march')!;
          this.chartDictionary.set('march', value + 1);
          break;
        }
        case 3: {
          value = this.chartDictionary.get('april')!;
          this.chartDictionary.set('april', value + 1);
          break;
        }
        case 4: {
          value = this.chartDictionary.get('mayy')!;
          this.chartDictionary.set('mayy', value + 1);
          break;
        }
        case 5: {
          value = this.chartDictionary.get('june')!;
          this.chartDictionary.set('june', value + 1);
          break;
        }
        case 6: {
          value = this.chartDictionary.get('july')!;
          this.chartDictionary.set('july', value + 1);
          break;
        }
        case 7: {
          value = this.chartDictionary.get('august')!;
          this.chartDictionary.set('august', value + 1);
          break;
        }
        case 8: {
          value = this.chartDictionary.get('september')!;
          this.chartDictionary.set('september', value + 1);
          break;
        }
        case 9: {
          value = this.chartDictionary.get('october')!;
          this.chartDictionary.set('october', value + 1);
          break;
        }
        case 10: {
          value = this.chartDictionary.get('november')!;
          this.chartDictionary.set('november', value + 1);
          break;
        }
        case 11: {
          value = this.chartDictionary.get('december')!;
          this.chartDictionary.set('december', value + 1);
          break;
        }
      }
    }
    let datavalue: number[] = [];
    let datacolor: string[] = [];
    this.o50 = this.o50bike + this.o50car;
    this.o50bike_per = (this.o50bike / this.o50) * 100;
    this.o50car_per = (this.o50car / this.o50) * 100;
    for (let [key, value] of this.chartDictionary) {
      this.pieChartData.labels!.push(this.tran.instant(key));
      datavalue.push(value);
    }
    this.pieChartData.datasets.push({
      data: datavalue,
      // backgroundColor: datacolor,
    });
    this.chart?.update();
  }
  clearDic() {
    this.chartDictionary.clear();
    this.chartDictionary.set('january', 0);
    this.chartDictionary.set('february', 0);
    this.chartDictionary.set('march', 0);
    this.chartDictionary.set('april', 0);
    this.chartDictionary.set('mayy', 0);
    this.chartDictionary.set('june', 0);

    this.chartDictionary.set('july', 0);
    this.chartDictionary.set('august', 0);
    this.chartDictionary.set('september', 0);
    this.chartDictionary.set('october', 0);
    this.chartDictionary.set('november', 0);
    this.chartDictionary.set('december', 0);
    this.pieChartData.datasets = [];
    this.pieChartData.labels = [];
    this.bike = 0;
    this.car = 0;
    this.o50bike = 0;
    this.o50car = 0;
    this.o50 = 0;
    this.o50bike_per = 0;
    this.o50car_per = 0;
  }
  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.displayData();
  }
  printDataEvent(event: any) {
    window.print();
  }
}
