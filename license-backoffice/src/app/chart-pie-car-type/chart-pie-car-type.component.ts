import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { License } from '../model/license';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-pie-car-type',
  templateUrl: './chart-pie-car-type.component.html',
  styleUrls: ['./chart-pie-car-type.component.css']
})
export class ChartPieCarTypeComponent implements OnInit {
  title = 'แผนภูมิประเภทรถ';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];

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
          }
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          var txt = ctx.chart.data.labels![ctx.dataIndex] + " " + value.toLocaleString();
          return txt;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 18,
        }
      },
    },
    maintainAspectRatio: false,
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['รถยนต์', 'รถจักรยานยนต์'],
    datasets: [{
      data: [],
      backgroundColor: ['rgb(204, 61, 0)', 'rgb(255, 172, 131)']

    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  filter: string = "";
  notifierSubscription: Subscription = this.filterService.event.subscribe(notified => {
    this.filter = this.filterService.getFilter();
    this.dataSource.filter = this.filter;
    this.displayData();
  });

  constructor(private api: ApiService, private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('printer', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg'));

  }

  chartDictionary = new Map<string, number>();

  pieChartDatasets: string[] = [];
  displayData() {
    this.chartDictionary.clear();
    this.pieChartData.datasets[0].data = [];
    this.pieChartData.labels = [];

    for (let row of this.dataSource.filteredData) {
      let type = "รถยนต์"
      if (row.Type == '8' || row.Type == '7') {
        type = "รถจักรยานยนต์"
      }

      if (this.chartDictionary.has(type)) {
        let ex = this.chartDictionary.get(type)!;
        this.chartDictionary.set(type, ex + 1);
      }
      else {
        this.chartDictionary.set(type, 1);
      }
    }
    for (let [key, value] of this.chartDictionary) {
      this.pieChartData.labels!.push(key);
      this.pieChartData.datasets[0].data.push(value);
    }

    this.chart?.update();
  }
  ngOnInit(): void {
  }
  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.displayData();
  }
  print() {
    window.print();
  }
}
