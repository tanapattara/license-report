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
import { UsersComponent } from './users/users.component';
import { ChartBarCarPerDayComponent } from './chart-bar-car-per-day/chart-bar-car-per-day.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  { path: 'signin', component: LoginLayoutComponent, children: [{ path: '', component: SigninComponent }] },
  { path: 'dashboard', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: DashboardComponent }] },
  { path: 'license', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: LicenseTableComponent },] },
  { path: 'color', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: ChartPieCarColorComponent },] },
  { path: 'type', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: ChartPieCarTypeComponent },] },
  { path: 'speed', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: ChartBarCarSpeedComponent },] },
  { path: 'hour', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: ChartBarCarPerHourComponent },] },
  { path: 'day', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: ChartBarCarPerDayComponent },] },
  { path: 'month', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: ChartBarCarPerMonthComponent },] },
  { path: 'users', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [{ path: '', component: UsersComponent },] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
