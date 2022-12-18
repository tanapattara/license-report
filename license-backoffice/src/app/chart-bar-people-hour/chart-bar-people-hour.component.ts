import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ChartConfiguration, ChartType, ChartData, ChartEvent } from 'chart.js';
import { ChannelFilter } from '../model/Filter';
import { ApiService } from '../services/api.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatTableDataSource } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chart-bar-people-hour',
  templateUrl: './chart-bar-people-hour.component.html',
  styleUrls: ['./chart-bar-people-hour.component.css'],
})
export class ChartBarPeopleHourComponent implements OnInit {
  datepickerInput1 = '';
  datepickerInput2 = '';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  _count = 0;
  defaultChannel = 'All';
  channel = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('channelSelection') channelSelection!: MatSelect;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartDictionaryCount = new Map<string, number>();
  //chartDictionaryOut = new Map<string, number>();

  public barChartOptions: ChartConfiguration['options'];

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: this.translate.instant('chart.label'),
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,

        datalabels: {
          align: 'center',
          anchor: 'center',
        },
      },
    ],
  };

  constructor(
    private api: ApiService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    iconRegistry.addSvgIcon(
      'map',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Mapcolor.svg')
    );

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: this.translate.instant('chart.hour'),
            color: 'rgb(204, 61, 0)',
          },
        },
        y: {
          stacked: true,
          min: 0,
          title: {
            display: true,
            text: this.translate.instant('chart.count'),
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
  }

  ngOnInit(): void {}
  search() {
    let filter = {} as ChannelFilter;
    filter.startDate = this.range.value.start as Date;
    filter.endDate = this.range.value.end as Date;
    filter.channel = this.channelSelection.value;

    this.api.getPeopleWithFilter(filter).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.displayData();
      },
      error: (err) => {
        console.log('Error while fetching people data');
      },
    });
  }
  displayData() {
    this.clearDic();
    if (this.dataSource.filteredData.length) {
      for (let row of this.dataSource.filteredData) {
        let d: Date = new Date(row.starttime);
        this._count += row.entercount;
        switch (d.getHours()) {
          case 0: {
            this.chartDictionaryCount.set(
              '00',
              this.chartDictionaryCount.get('00') + row.entercount
            );

            break;
          }
          case 1: {
            this.chartDictionaryCount.set(
              '01',
              this.chartDictionaryCount.get('01') + row.entercount
            );

            break;
          }
          case 2: {
            this.chartDictionaryCount.set(
              '02',
              this.chartDictionaryCount.get('02') + row.entercount
            );

            break;
          }
          case 3: {
            this.chartDictionaryCount.set(
              '03',
              this.chartDictionaryCount.get('03') + row.entercount
            );

            break;
          }
          case 4: {
            this.chartDictionaryCount.set(
              '04',
              this.chartDictionaryCount.get('04') + row.entercount
            );

            break;
          }
          case 5: {
            this.chartDictionaryCount.set(
              '05',
              this.chartDictionaryCount.get('05') + row.entercount
            );

            break;
          }
          case 6: {
            this.chartDictionaryCount.set(
              '06',
              this.chartDictionaryCount.get('06') + row.entercount
            );
            break;
          }
          case 7: {
            this.chartDictionaryCount.set(
              '07',
              this.chartDictionaryCount.get('07') + row.entercount
            );

            break;
          }
          case 8: {
            this.chartDictionaryCount.set(
              '08',
              this.chartDictionaryCount.get('08') + row.entercount
            );

            break;
          }
          case 9: {
            this.chartDictionaryCount.set(
              '09',
              this.chartDictionaryCount.get('09') + row.entercount
            );

            break;
          }
          case 10: {
            this.chartDictionaryCount.set(
              '10',
              this.chartDictionaryCount.get('10') + row.entercount
            );

            break;
          }
          case 11: {
            this.chartDictionaryCount.set(
              '11',
              this.chartDictionaryCount.get('11') + row.entercount
            );

            break;
          }
          case 12: {
            this.chartDictionaryCount.set(
              '12',
              this.chartDictionaryCount.get('12') + row.entercount
            );

            break;
          }
          case 13: {
            this.chartDictionaryCount.set(
              '13',
              this.chartDictionaryCount.get('13') + row.entercount
            );

            break;
          }
          case 14: {
            this.chartDictionaryCount.set(
              '14',
              this.chartDictionaryCount.get('14') + row.entercount
            );

            break;
          }
          case 15: {
            this.chartDictionaryCount.set(
              '15',
              this.chartDictionaryCount.get('15') + row.entercount
            );

            break;
          }
          case 16: {
            this.chartDictionaryCount.set(
              '16',
              this.chartDictionaryCount.get('16') + row.entercount
            );

            break;
          }
          case 17: {
            this.chartDictionaryCount.set(
              '17',
              this.chartDictionaryCount.get('17') + row.entercount
            );

            break;
          }
          case 18: {
            this.chartDictionaryCount.set(
              '18',
              this.chartDictionaryCount.get('18') + row.entercount
            );

            break;
          }
          case 19: {
            this.chartDictionaryCount.set(
              '19',
              this.chartDictionaryCount.get('19') + row.entercount
            );

            break;
          }
          case 20: {
            this.chartDictionaryCount.set(
              '20',
              this.chartDictionaryCount.get('20') + row.entercount
            );

            break;
          }
          case 21: {
            this.chartDictionaryCount.set(
              '21',
              this.chartDictionaryCount.get('21') + row.entercount
            );

            break;
          }
          case 22: {
            this.chartDictionaryCount.set(
              '22',
              this.chartDictionaryCount.get('22') + row.entercount
            );

            break;
          }
          case 23: {
            this.chartDictionaryCount.set(
              '23',
              this.chartDictionaryCount.get('23') + row.entercount
            );

            break;
          }
        }
      }
    }
    for (let [key, value] of this.chartDictionaryCount) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }

    this.chart!.update();
  }

  clearFilter() {
    this.datepickerInput1 = '';
    this.datepickerInput2 = '';
    this.channelSelection.options.first.select();
    this.clearDic();
    this.chart!.update();
  }

  clearDic() {
    this._count = 0;

    this.barChartData.datasets[0].data = [];
    //this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    this.chartDictionaryCount.set('00', 0);
    this.chartDictionaryCount.set('01', 0);
    this.chartDictionaryCount.set('02', 0);
    this.chartDictionaryCount.set('03', 0);
    this.chartDictionaryCount.set('04', 0);
    this.chartDictionaryCount.set('05', 0);
    this.chartDictionaryCount.set('06', 0);
    this.chartDictionaryCount.set('07', 0);
    this.chartDictionaryCount.set('08', 0);
    this.chartDictionaryCount.set('09', 0);
    this.chartDictionaryCount.set('10', 0);
    this.chartDictionaryCount.set('11', 0);
    this.chartDictionaryCount.set('12', 0);
    this.chartDictionaryCount.set('13', 0);
    this.chartDictionaryCount.set('14', 0);
    this.chartDictionaryCount.set('15', 0);
    this.chartDictionaryCount.set('16', 0);
    this.chartDictionaryCount.set('17', 0);
    this.chartDictionaryCount.set('18', 0);
    this.chartDictionaryCount.set('19', 0);
    this.chartDictionaryCount.set('20', 0);
    this.chartDictionaryCount.set('21', 0);
    this.chartDictionaryCount.set('22', 0);
    this.chartDictionaryCount.set('23', 0);
  }
  print() {
    window.print();
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

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  showminimap(): void {
    this.dialog.open(MapDialogComponent, {}).afterClosed().subscribe();
  }
}
