import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LicenseTableComponent } from './components/license-table/license-table.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartPieCarColorComponent } from './components/chart/chart-pie-car-color/chart-pie-car-color.component';
import { ChartPieCarTypeComponent } from './components/chart/chart-pie-car-type/chart-pie-car-type.component';
import { ChartBarCarPerHourComponent } from './components/chart/chart-bar-car-per-hour/chart-bar-car-per-hour.component';
import { ChartBarCarPerMonthComponent } from './components/chart/chart-bar-car-per-month/chart-bar-car-per-month.component';
import { ChartBarCarSpeedComponent } from './components/chart/chart-bar-car-speed/chart-bar-car-speed.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterTimeSpeedComponent } from './components/filter-time-speed/filter-time-speed.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './components/register/register.component';


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
    LoginComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
