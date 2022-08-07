import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartPiCarComponent } from './chart-pi-car/chart-pi-car.component';
import { LicenseTableComponent } from './license-table/license-table.component';

const routes: Routes = [
  { path: '', component: LicenseTableComponent },
  { path: 'car', component: ChartPiCarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
