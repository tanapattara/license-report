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
