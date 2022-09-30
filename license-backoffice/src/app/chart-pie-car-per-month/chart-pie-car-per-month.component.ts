import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterlicenseService } from '../services/filterlicense.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-pie-car-per-month',
  templateUrl: './chart-pie-car-per-month.component.html',
  styleUrls: ['./chart-pie-car-per-month.component.css']
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
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'printer',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg')
    );
  }

  car = 0;
  bike = 0;

  ngOnInit(): void {
  }
  displayData() {
    this.clearDic();
    for (let row of this.dataSource.filteredData) {
      let isBike: boolean = row.Type == '7' || row.Type == '8';
      if (isBike) {
        this.bike++;
      } else {
        this.car++;
      }

      let createDate = new Date(row.aDate);
      let value = 0;
      switch (createDate.getMonth()) {
        case 0: {
          value = this.chartDictionary.get('มกราคม')!;
          this.chartDictionary.set('มกราคม', value + 1); break;
        }
        case 1: {
          value = this.chartDictionary.get('กุมภาพันธ์')!;
          this.chartDictionary.set('กุมภาพันธ์', value + 1); break;
        }
        case 2: {
          value = this.chartDictionary.get('มีนาคม')!;
          this.chartDictionary.set('มีนาคม', value + 1); break;
        }
        case 3: {
          value = this.chartDictionary.get('เมษายน')!;
          this.chartDictionary.set('เมษายน', value + 1); break;
        }
        case 4: {
          value = this.chartDictionary.get('พฤษภาคม')!;
          this.chartDictionary.set('พฤษภาคม', value + 1); break;
        }
        case 5: {
          value = this.chartDictionary.get('มิถุนายน')!;
          this.chartDictionary.set('มิถุนายน', value + 1); break;
        }
        case 6: {
          value = this.chartDictionary.get('กรกฎาคม')!;
          this.chartDictionary.set('กรกฎาคม', value + 1); break;
        }
        case 7: {
          value = this.chartDictionary.get('สิงหาคม')!;
          this.chartDictionary.set('สิงหาคม', value + 1); break;
        }
        case 8: {
          value = this.chartDictionary.get('กันยายน')!;
          this.chartDictionary.set('กันยายน', value + 1); break;
        }
        case 9: {
          value = this.chartDictionary.get('ตุลาคม')!;
          this.chartDictionary.set('ตุลาคม', value + 1); break;
        }
        case 10: {
          value = this.chartDictionary.get('พฤศจิกายน')!;
          this.chartDictionary.set('พฤศจิกายน', value + 1); break;
        }
        case 11: {
          value = this.chartDictionary.get('ธันวาคม')!;
          this.chartDictionary.set('ธันวาคม', value + 1); break;
        }

      }
    }
    let datavalue: number[] = [];
    let datacolor: string[] = [];

    for (let [key, value] of this.chartDictionary) {
      this.pieChartData.labels!.push(key);
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
    this.chartDictionary.set('มกราคม', 0);
    this.chartDictionary.set('กุมภาพันธ์', 0);
    this.chartDictionary.set('มีนาคม', 0);
    this.chartDictionary.set('เมษายน', 0);
    this.chartDictionary.set('พฤษภาคม', 0);
    this.chartDictionary.set('มิถุนายน', 0);

    this.chartDictionary.set('กรกฎาคม', 0);
    this.chartDictionary.set('สิงหาคม', 0);
    this.chartDictionary.set('กันยายน', 0);
    this.chartDictionary.set('ตุลาคม', 0);
    this.chartDictionary.set('พฤศจิกายน', 0);
    this.chartDictionary.set('ธันวาคม', 0);
    this.pieChartData.datasets = [];
    this.pieChartData.labels = [];
    this.bike = 0;
    this.car = 0;
  }
  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.displayData();
  }
  printDataEvent(event: any) {
    window.print();
  }
}
