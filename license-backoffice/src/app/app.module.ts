import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LicenseTableComponent } from './license-table/license-table.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartPieCarColorComponent } from './chart-pie-car-color/chart-pie-car-color.component';
import { ChartPieCarTypeComponent } from './chart-pie-car-type/chart-pie-car-type.component';
import { ChartBarCarPerHourComponent } from './chart-bar-car-per-hour/chart-bar-car-per-hour.component';
import { ChartBarCarPerMonthComponent } from './chart-bar-car-per-month/chart-bar-car-per-month.component';
import { ChartBarCarSpeedComponent } from './chart-bar-car-speed/chart-bar-car-speed.component';
import { FilterComponent } from './filter/filter.component';
import { FilterTimeSpeedComponent } from './filter-time-speed/filter-time-speed.component';
import { AuthService } from './services/auth.service';
import { SigninComponent } from './signin/signin.component';
import { SignupNewUserComponent } from './signup-new-user/signup-new-user.component';
import { UsersComponent } from './users/users.component';
import { UserNewDialogComponent } from './user-new-dialog/user-new-dialog.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { ChartBarCarPerDayComponent } from './chart-bar-car-per-day/chart-bar-car-per-day.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ChartHeatmapMonthComponent } from './chart-heatmap-month/chart-heatmap-month.component';
import { ChartHeatmapHourComponent } from './chart-heatmap-hour/chart-heatmap-hour.component';

import { NgApexchartsModule } from "ng-apexcharts";
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ChartPieCarPerMonthComponent } from './chart-pie-car-per-month/chart-pie-car-per-month.component';
import { LicenseEditDialogComponent } from './license-edit-dialog/license-edit-dialog.component';

import { ExcelDataType } from 'xlsx';
import { LicenseWarningLetterComponent } from './license-warning-letter/license-warning-letter.component';
import { LicenseWarningLetterDialogComponent } from './license-warning-letter-dialog/license-warning-letter-dialog.component';
import { SigninErrorDialogComponent } from './signin-error-dialog/signin-error-dialog.component';
import { UserDeleteDialogComponent } from './user-delete-dialog/user-delete-dialog.component';
import { ChartBarPeopleHourComponent } from './chart-bar-people-hour/chart-bar-people-hour.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LicenseTableComponent,
    ChartPieCarColorComponent,
    ChartPieCarTypeComponent,
    ChartBarCarPerHourComponent,
    ChartBarCarPerMonthComponent,
    ChartBarCarSpeedComponent,
    FilterComponent,
    FilterTimeSpeedComponent,
    SigninComponent,
    SignupNewUserComponent,
    UsersComponent,
    UserNewDialogComponent,
    UserEditDialogComponent,
    ChartBarCarPerDayComponent,
    DashboardComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    ChartHeatmapMonthComponent,
    ChartHeatmapHourComponent,
    ImageDialogComponent,
    ChartPieCarPerMonthComponent,
    LicenseEditDialogComponent,
    LicenseWarningLetterComponent,
    LicenseWarningLetterDialogComponent,
    SigninErrorDialogComponent,
    UserDeleteDialogComponent,
    ChartBarPeopleHourComponent,
    MapDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgChartsModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
