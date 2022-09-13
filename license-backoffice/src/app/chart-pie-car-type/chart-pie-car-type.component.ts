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
          var txt = ctx.chart.data.labels![ctx.dataIndex] + " " + value.toString();
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
    this.getAllLicense();
  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }
  getAllLicense() {
    this.api.getLicenses().
      subscribe({
        next: (res) => {
          //console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.filter = this.filter;
          this.dataSource.filterPredicate = function (record, filter) {
            var map = new Map(JSON.parse(filter));
            let isMatch = false;
            for (let [key, value] of map) {

              var isMatchFilter: boolean = false;

              if (key == 'Speed') {
                if (value as string == 'All')
                  isMatchFilter = true;
                let speedFilter: number = parseInt(value as string);
                isMatchFilter = (record[key as keyof License] <= speedFilter);
              } else if (key == 'LicNo') {
                if (value as string == 'All')
                  isMatchFilter = true;
                else
                  isMatchFilter = (record[key as keyof License].includes(value));
              } else if (key == 'date') {
                let date = value as string[];
                let sDate = new Date(date[0]);
                let eDate = new Date(date[1]);
                let adate_key = 'aDate', bdate_key = 'bDate'

                let RecValueA = new Date(record[adate_key as keyof License]);
                let RecValueB = new Date(record[bdate_key as keyof License]);

                if (sDate.getTime() == eDate.getTime()) {
                  isMatchFilter = (RecValueA.getFullYear() == sDate.getFullYear() && RecValueA.getMonth() == sDate.getMonth() && RecValueA.getDate() == sDate.getDate()) ||
                    (RecValueB.getFullYear() == sDate.getFullYear() && RecValueB.getMonth() == sDate.getMonth() && RecValueB.getDate() == sDate.getDate());
                }
                else {
                  isMatchFilter = (RecValueA >= sDate && RecValueA <= eDate) || (RecValueB >= sDate && RecValueB <= eDate);
                }
              } else {
                isMatchFilter = (record[key as keyof License] == value);
              }
              isMatch = (value == "All") || isMatchFilter;
              if (!isMatch) return false;
            }
            return isMatch;
          }
          this.displayData();
        },
        error: (err) => {
          console.log("Error while fetching licenses ");
        }
      });
  }
  print() {
    window.print();
  }
}
