import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseTableComponent } from './license-table/license-table.component';

const routes: Routes = [
  { path: '', component: LicenseTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
