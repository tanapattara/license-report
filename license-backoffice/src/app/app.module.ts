import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LicenseTableComponent } from './license-table/license-table.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartPiCarComponent } from './chart-pi-car/chart-pi-car.component';


@NgModule({
  declarations: [
    AppComponent,
    LicenseTableComponent,
    ChartPiCarComponent,

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
