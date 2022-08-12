import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseTableComponent } from './components/license-table/license-table.component';
import { ChartPieCarColorComponent } from './components/chart/chart-pie-car-color/chart-pie-car-color.component';
import { ChartPieCarTypeComponent } from './components/chart/chart-pie-car-type/chart-pie-car-type.component';
import { ChartBarCarPerHourComponent } from './components/chart/chart-bar-car-per-hour/chart-bar-car-per-hour.component';
import { ChartBarCarPerMonthComponent } from './components/chart/chart-bar-car-per-month/chart-bar-car-per-month.component';
import { ChartBarCarSpeedComponent } from './components/chart/chart-bar-car-speed/chart-bar-car-speed.component';

const routes: Routes = [
  { path: '', component: LicenseTableComponent },
  { path: 'color', component: ChartPieCarColorComponent },
  { path: 'type', component: ChartPieCarTypeComponent },
  { path: 'speed', component: ChartBarCarSpeedComponent },
  { path: 'hour', component: ChartBarCarPerHourComponent },
  { path: 'month', component: ChartBarCarPerMonthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
