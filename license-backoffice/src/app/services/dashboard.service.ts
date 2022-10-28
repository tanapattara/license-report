import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  HOST_URL = API_URL;

  getLicenses() {
    return this.http.get<any>(this.HOST_URL + "/license");
  }

  getDashboard(){
    return this.http.get<any>(this.HOST_URL + "/dashboard");
  }

  getGraphDashboard(){
    return this.http.get<any>(this.HOST_URL + "/graphdashboard");
  }
}
