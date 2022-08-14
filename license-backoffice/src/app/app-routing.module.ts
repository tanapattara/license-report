import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseTableComponent } from './license-table/license-table.component';
import { ChartPieCarColorComponent } from './chart-pie-car-color/chart-pie-car-color.component';
import { ChartPieCarTypeComponent } from './chart-pie-car-type/chart-pie-car-type.component';
import { ChartBarCarPerHourComponent } from './chart-bar-car-per-hour/chart-bar-car-per-hour.component';
import { ChartBarCarPerMonthComponent } from './chart-bar-car-per-month/chart-bar-car-per-month.component';
import { ChartBarCarSpeedComponent } from './chart-bar-car-speed/chart-bar-car-speed.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'license', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'license', component: LicenseTableComponent, canActivate: [AuthGuard] },
  { path: 'color', component: ChartPieCarColorComponent, canActivate: [AuthGuard] },
  { path: 'type', component: ChartPieCarTypeComponent, canActivate: [AuthGuard] },
  { path: 'speed', component: ChartBarCarSpeedComponent, canActivate: [AuthGuard] },
  { path: 'hour', component: ChartBarCarPerHourComponent, canActivate: [AuthGuard] },
  { path: 'month', component: ChartBarCarPerMonthComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
